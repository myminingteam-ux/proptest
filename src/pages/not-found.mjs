import { seo } from '../seo.mjs';
import { layout } from '../components.mjs';
const meta=seo({title:'Page not found | Your Funded Account',description:'The requested Your Funded Account page could not be found. Return to the public program comparison, trading rules, or homepage.',path:'/404.html',noindex:true});
const body=`<section class="not-found"><div class="wrap narrow"><span>404</span><h1>That page is not part of the current YFA site.</h1><p>Return to the public program comparison or canonical rule summary.</p><div class="hero-actions"><a class="btn btn-primary" href="/">Home</a><a class="btn btn-ghost" href="/challenges/">Programs</a></div></div></section>`;
export default {path:'/404.html',seo:meta,html:layout({seo:meta,path:'/404.html',body})};
