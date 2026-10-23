import { useEffect, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Instagram, Mail, Menu, Package,
  Phone, Sparkles, X,
} from 'lucide-react';
import { brandCopy, products, type BrandId, type Product } from './catalog';
import { distributorFormUrl } from './config';

type Route = 'home' | BrandId | 'story' | 'distributor' | 'contact' | `product/${string}`;

function routeFromHash(): Route {
  const value = window.location.hash.replace(/^#\/?/, '') || 'home';
  if (value.startsWith('product/')) return value as Route;
  if (['home', 'snaxzastic', 'crespology', 'story', 'distributor', 'contact'].includes(value)) return value as Route;
  return 'home';
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  return (
    <button className={`product-card ${product.brand}`} onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
      <span className="product-image"><img src={product.image} alt={`${product.name} pack front`} loading="lazy" /></span>
      <span className="product-info">
        <span className="product-brand">{product.brand === 'snaxzastic' ? 'SNAXZASTIC' : 'CRESPOLOGY'}</span>
        <strong>{product.name}</strong>
        <span className="product-link">Explore product <ArrowUpRight size={15} /></span>
      </span>
    </button>
  );
}

function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const sync = () => { setRoute(routeFromHash()); setSelectedProduct(null); setMobileOpen(false); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const navigate = (next: Route) => {
    window.location.hash = next === 'home' ? '' : `/${next}`;
    setRoute(next);
    setMobileOpen(false);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const openProduct = (product: Product) => setSelectedProduct(product);
  const closeProduct = () => setSelectedProduct(null);
  const brand = route === 'snaxzastic' || route === 'crespology' ? route : null;
  const productRoute = route.startsWith('product/') ? route.slice('product/'.length) : null;
  const activeProduct = selectedProduct ?? (productRoute ? products.find((item) => slug(item.name) === productRoute) ?? null : null);

  useEffect(() => {
    if (!activeProduct || !productRoute) return;
    setSelectedProduct(activeProduct);
  }, [activeProduct, productRoute]);

  const navItems: Array<[Route, string]> = [
    ['home', 'Home'], ['snaxzastic', 'Snaxzastic'], ['crespology', 'Crespology'], ['story', 'Our Story'], ['contact', 'Contact'],
  ];

  return (
    <div className="site-shell">
      <div className="demo-ribbon"><span><Sparkles size={13} /> SLAYD FOODS BHARAT</span><span>Snaxzastic × Crespology</span></div>
      <header className="site-header">
        <button className="wordmark" onClick={() => navigate('home')} aria-label="Slayd Foods Bharat home">
          <img className="wordmark-mark" src="/brand-assets/slayd-foods-logo.jpg" alt="" /><span>SLAYD<span className="wordmark-light">FOODS</span><small>BHARAT</small></span>
        </button>
        <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map(([target, label]) => <button key={target} className={route === target ? 'active' : ''} onClick={() => navigate(target)}>{label}</button>)}
          <button className="nav-cta" onClick={() => navigate('distributor')}>Become a distributor <ArrowUpRight size={15} /></button>
        </nav>
        <button className="menu-toggle" onClick={() => setMobileOpen((v) => !v)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        {route === 'home' && <Home navigate={navigate} onOpen={openProduct} />}
        {brand && <BrandPage brand={brand} navigate={navigate} onOpen={openProduct} />}
        {route === 'story' && <StoryPage navigate={navigate} />}
        {route === 'distributor' && <DistributorPage />}
        {route === 'contact' && <ContactPage />}
        {activeProduct && <ProductModal product={activeProduct} close={closeProduct} navigate={navigate} />}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

function Home({ navigate, onOpen }: { navigate: (route: Route) => void; onOpen: (product: Product) => void }) {
  const snaxHero = products[0];
  const crespHero = products[3];
  return <>
    <section className="home-hero">
      <div className="hero-copy">
        <span className="eyebrow"><span className="dot" /> TWO BRANDS. ONE BIG LOVE FOR SNACKS.</span>
        <h1>Good things<br />come in <em>crunchy</em><br />packages.</h1>
        <p>Meet Snaxzastic and Crespology, the two snack worlds of Slayd Foods Bharat.</p>
        <button className="button button-dark" onClick={() => navigate('distributor')}>Let’s talk business <ArrowRight size={17} /></button>
      </div>
      <div className="hero-art" aria-label="Explore both SFB snack brands">
        <button className="brand-panel snax-panel" onClick={() => navigate('snaxzastic')}>
          <span className="panel-orbit orbit-one" /><span className="panel-orbit orbit-two" />
          <span className="panel-index">01 / THE DESI CRUNCH</span><span className="panel-word">Snax<br />zastic<span>!</span></span>
          <span className="panel-tag">Snacking Anywhere</span>
          <img className="hero-pack hero-pack-left" src={snaxHero.image} alt="Snaxzastic Roasted Chana Nimbu Pudina pack front" />
          <span className="panel-discover">Discover the range <ArrowDownRight size={18} /></span>
        </button>
        <button className="brand-panel cresp-panel" onClick={() => navigate('crespology')}>
          <span className="panel-orbit orbit-three" /><span className="panel-index">02 / EXPERT IN CRUNCH</span><span className="panel-word">Crespo<br />logy</span>
          <span className="panel-tag">Crispy Vibes Only</span>
          <img className="hero-pack hero-pack-right" src={crespHero.image} alt="Crespology Cheese Balls K-Pop Kick pack front" />
          <span className="panel-discover">Discover the range <ArrowDownRight size={18} /></span>
        </button>
        <div className="hero-sticker"><span>GOOD<br />MOOD</span><Sparkles size={20} /></div>
      </div>
      <div className="hero-footer"><span>MADE FOR EVERYDAY MOMENTS</span><span className="scroll-note">SCROLL TO EXPLORE <ArrowDownRight size={13} /></span><span>EST. / SFB</span></div>
    </section>

    <section className="brand-intro section-pad">
      <div className="section-heading"><span className="eyebrow">PICK YOUR VIBE</span><h2>Two sides of<br />the snack shelf.</h2></div>
      <div className="intro-side snax-side"><span className="big-number">01</span><div><span className="eyebrow">BOLD · DESI · FUN</span><h3>Snaxzastic</h3><p>Snacking Anywhere</p><button className="text-link" onClick={() => navigate('snaxzastic')}>Get to know us <ArrowRight size={16} /></button></div></div>
      <div className="intro-side cresp-side"><span className="big-number">02</span><div><span className="eyebrow">CRISPY · CRAFTED · COOL</span><h3>Crespology</h3><p>Crispy Vibes Only</p><button className="text-link" onClick={() => navigate('crespology')}>Get to know us <ArrowRight size={16} /></button></div></div>
    </section>

    <section className="featured section-pad">
      <div className="section-top"><div><span className="eyebrow">A FIRST TASTE</span><h2>Meet the favourites.</h2></div><span className="section-note">A peek inside the catalogue<br />Tap a pack to see more</span></div>
      <div className="product-grid home-products">{[products[0], products[3], products[1], products[4]].map((product) => <ProductCard key={product.name} product={product} onOpen={onOpen} />)}</div>
      <div className="center-action"><button className="button button-outline" onClick={() => navigate('snaxzastic')}>Explore all snacks <ArrowRight size={17} /></button></div>
    </section>

    <section className="trade-band"><div className="trade-squiggle">SFB <span>✳</span></div><div><span className="eyebrow">FOR OUR FUTURE TRADE PARTNERS</span><h2>Let’s make more<br />shelf space for joy.</h2></div><button className="button button-cream" onClick={() => navigate('distributor')}>Become a distributor <ArrowUpRight size={17} /></button></section>
    <div className="micro-note"><Package size={15} /> Product names and packaging shown for discussion; final range and artwork are subject to client confirmation.</div>
  </>;
}

function BrandPage({ brand, navigate, onOpen }: { brand: BrandId; navigate: (route: Route) => void; onOpen: (product: Product) => void }) {
  const copy = brandCopy[brand];
  const list = products.filter((product) => product.brand === brand);
  return <>
    <section className={`brand-hero ${copy.className}`}>
      <div className="brand-hero-copy"><span className="eyebrow">SLAYD FOODS BHARAT PRESENTS · {brand.toUpperCase()}</span><h1>{brand === 'snaxzastic' ? <>Snack loud.<br />Snack <em>happy.</em></> : <>The science<br />of <em>crunch.</em></>}</h1><p className="brand-tagline">{copy.tagline}</p><p className="brand-intro-copy">{copy.intro}</p><button className="button button-dark" onClick={() => navigate('distributor')}>Partner with us <ArrowRight size={17} /></button></div>
      <div className="brand-hero-product"><div className="shape shape-a" /><div className="shape shape-b" /><span className="floating-label">{brand === 'snaxzastic' ? 'THE ROASTED EDIT' : 'THE CRUNCH EDIT'}</span><img src={list[0].image} alt={`${list[0].name} pack front`} /><span className="hero-product-name">{list[0].name}</span></div>
      <div className="brand-hero-footer"><span>SCROLL THE RANGE ↓</span><span>01 — 0{list.length}</span></div>
    </section>
    <section className="brand-range section-pad"><div className="section-top"><div><span className="eyebrow">THE LINEUP</span><h2>{brand === 'snaxzastic' ? 'Flavour for the fun of it.' : 'Crunch, in all its forms.'}</h2></div><span className="section-note">{list.length} catalogue highlights</span></div><div className="product-grid">{list.map((product) => <ProductCard key={product.name} product={product} onOpen={onOpen} />)}</div></section>
    <section className={`brand-endcap ${copy.className}`}><span className="eyebrow">THAT WAS A LITTLE TASTE OF</span><h2>{brand === 'snaxzastic' ? 'SNAXZASTIC!' : 'CRESPOLOGY.'}</h2><button className="button button-cream" onClick={() => navigate(brand === 'snaxzastic' ? 'crespology' : 'snaxzastic')}>Meet the other brand <ArrowRight size={16} /></button></section>
  </>;
}

function StoryPage({ navigate }: { navigate: (route: Route) => void }) {
  return <section className="content-page story-page"><div className="content-kicker"><span className="eyebrow">A LITTLE ABOUT US</span><span className="scribble">SFB ✳</span></div><h1>One home.<br />Two <em>snack stories.</em></h1><p className="lead">Slayd Foods Bharat brings Snaxzastic and Crespology together under one roof, with two distinct personalities and a shared love of flavour-forward snacks.</p><div className="story-rule" /><div className="story-columns"><div><span className="eyebrow">01 / SNAXZASTIC</span><h2>Snacking Anywhere</h2><p>A bold, desi-spirited brand built around the energy of everyday snacking.</p></div><div><span className="eyebrow">02 / CRESPOLOGY</span><h2>Crispy Vibes Only</h2><p>A modern, playful world where the crunch takes centre stage.</p></div></div><div className="story-footnote"><Sparkles size={16} /> This story page is a conversation starter. Company history, manufacturing details and approved brand copy are still to be supplied.</div><button className="button button-dark" onClick={() => navigate('distributor')}>Let’s work together <ArrowRight size={17} /></button></section>;
}

function DistributorPage() {
  return <section className="form-page"><div className="form-heading"><span className="eyebrow">TRADE PARTNERSHIPS</span><h1>Let’s grow<br /><em>together.</em></h1><p>Interested in distributing Snaxzastic or Crespology? Share your business details through our distributor enquiry form.</p><div className="demo-warning"><Sparkles size={15} /> Complete the enquiry form below. Google Forms handles submitted responses.</div></div>
    <div className="application-form form-embed-card"><span className="eyebrow">DISTRIBUTOR ENQUIRY</span><h2>Start your application</h2><p>Complete the form below. Your response is submitted to the Google Form owner.</p><iframe title="Slayd Foods Bharat distributor enquiry form" src={distributorFormUrl} width="640" height="857" frameBorder={0} marginHeight={0} marginWidth={0}>Loading…</iframe></div>
  </section>;
}

function ContactPage() {
  return <section className="contact-page"><div className="contact-aside"><span className="eyebrow">SAY HELLO</span><h1>Got a good<br /><em>feeling?</em></h1><p>For brand conversations, trade enquiries and everything in between.</p><div className="contact-sticker">LET’S<br />CHAT <ArrowDownRight size={20} /></div></div><div className="contact-details"><span className="eyebrow">CONTACT SFB</span><a href="tel:+918976993491"><span className="contact-icon"><Phone size={19} /></span><span className="contact-value"><small>CALL US</small><strong>+91 89769 93491</strong></span><ArrowUpRight size={16} /></a><a href="mailto:sales@slaydfoods.com"><span className="contact-icon"><Mail size={19} /></span><span className="contact-value"><small>EMAIL</small><strong>sales@slaydfoods.com</strong></span><ArrowUpRight size={16} /></a><a href="https://www.instagram.com/slaydfoods?cplk=MTQzcXV0azZodXo0eA==" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Instagram size={19} /></span><span className="contact-value"><small>FOLLOW US</small><strong>Instagram · @slaydfoods</strong></span><ArrowUpRight size={16} /></a></div></section>;
}

function ProductModal({ product, close, navigate }: { product: Product; close: () => void; navigate: (route: Route) => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className={`product-modal ${product.brand}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={close} aria-label="Close"><X /></button><div className="modal-art"><span className="eyebrow">{product.brand.toUpperCase()}</span><img src={product.image} alt={`${product.name} pack front`} /></div><div className="modal-copy"><span className="eyebrow">A CATALOGUE HIGHLIGHT</span><h2 id="modal-title">{product.name}</h2><p>This product appears in the supplied catalogue. Product specifications, claims and pack details will be confirmed with the client.</p><div className="modal-rule" /><button className="text-link" onClick={() => { close(); navigate(product.brand); }}>Explore {product.brand === 'snaxzastic' ? 'Snaxzastic' : 'Crespology'} <ArrowRight size={16} /></button></div></section></div>;
}

function Footer({ navigate }: { navigate: (route: Route) => void }) {
  return <footer className="site-footer"><div className="footer-main"><div><button className="wordmark footer-mark" onClick={() => navigate('home')}><img className="wordmark-mark" src="/brand-assets/slayd-foods-logo.jpg" alt="" /><span>SLAYD<span className="wordmark-light">FOODS</span><small>BHARAT</small></span></button><p>Two snack worlds.<br />One Slayd Foods Bharat.</p></div><div className="footer-links"><span className="eyebrow">TAKE A LOOK</span><button onClick={() => navigate('snaxzastic')}>Snaxzastic</button><button onClick={() => navigate('crespology')}>Crespology</button><button onClick={() => navigate('story')}>Our Story</button></div><div className="footer-links"><span className="eyebrow">LET’S CONNECT</span><button onClick={() => navigate('distributor')}>Become a distributor</button><button onClick={() => navigate('contact')}>Contact</button><a href="tel:+918976993491">+91 89769 93491</a><a href="mailto:sales@slaydfoods.com">sales@slaydfoods.com</a><a href="https://www.instagram.com/slaydfoods?cplk=MTQzcXV0azZodXo0eA==" target="_blank" rel="noopener noreferrer">Instagram</a></div><div className="footer-aside"><span className="eyebrow">SLAYD FOODS BHARAT</span><p>Content and product visuals are drawn from the supplied project files. Product and policy details can be updated as approved files become available.</p></div></div><div className="footer-bottom"><span>© Slayd Foods Bharat</span><span>SNAXZASTIC <i>×</i> CRESPOLOGY</span></div></footer>;
}

function slug(name: string) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

export default App;




