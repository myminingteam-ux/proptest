export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET' || req.query?.probe !== 'hb2-20260905') {
    return res.status(404).json({ ok: false, error: 'not_found' });
  }

  const oidc = req.headers['x-vercel-oidc-token'];
  if (!oidc || typeof oidc !== 'string') {
    return res.status(503).json({
      ok: false,
      stage: 'oidc',
      error: 'OIDC_UNAVAILABLE',
      canonical_change: false,
    });
  }

  try {
    const upstream = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${oidc}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-5.6-luna',
        messages: [{ role: 'user', content: 'Reply with exactly OIDC_OK.' }],
        temperature: 0,
        max_tokens: 16,
      }),
    });

    const text = await upstream.text();
    let payload;
    try { payload = JSON.parse(text); } catch { payload = { raw: text.slice(0, 500) }; }

    if (!upstream.ok) {
      return res.status(502).json({
        ok: false,
        stage: 'gateway',
        gateway_status: upstream.status,
        gateway_error: payload?.error?.message || payload?.error || payload?.raw || 'unknown',
        oidc_present: true,
        model: 'openai/gpt-5.6-luna',
        canonical_change: false,
      });
    }

    const output = payload?.choices?.[0]?.message?.content ?? '';
    return res.status(200).json({
      ok: true,
      stage: 'complete',
      oidc_present: true,
      model: payload?.model || 'openai/gpt-5.6-luna',
      output,
      usage: payload?.usage || null,
      auth_mode: 'VERCEL_OIDC',
      canonical_change: false,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      stage: 'exception',
      error: error instanceof Error ? error.message : String(error),
      canonical_change: false,
    });
  }
}
