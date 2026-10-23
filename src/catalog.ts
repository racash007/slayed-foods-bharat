export type BrandId = 'snaxzastic' | 'crespology';

export type Product = {
  name: string;
  brand: BrandId;
  image: string;
};

export const products: Product[] = [
  { name: 'Roasted Chana · Nimbu Pudina', brand: 'snaxzastic', image: '/products/snaxzastic-nimbu-pudina-chana.jpg' },
  { name: 'Roasted Peanuts · Nimbu Pudina Masala', brand: 'snaxzastic', image: '/products/snaxzastic-masala-nimbu-pudina-peanuts.jpg' },
  { name: 'Coated Peanuts · Nimbu Masala', brand: 'snaxzastic', image: '/products/snaxzastic-coated-nimbu-masala-peanuts.jpg' },
  { name: 'Cheese Balls · K-Pop Kick', brand: 'crespology', image: '/products/crespology-k-pop-balls.jpg' },
  { name: 'Krunchit · Spanish Tomato', brand: 'crespology', image: '/products/crespology-krunchit-spanish-tomato.jpg' },
  { name: 'Masala Burst Puff', brand: 'crespology', image: '/products/crespology-masala-burst-puff.jpg' },
  { name: 'Cheese Balls · Cheese & Herbs', brand: 'crespology', image: '/products/crespology-cheese-herbs.jpg' },
  { name: 'Krunchit · Masala Masti', brand: 'crespology', image: '/products/crespology-krunchit-masala-masti.jpg' },
  { name: 'Butter Salted Popcorn', brand: 'crespology', image: '/products/crespology-butter-salted-popcorn.jpg' },
  { name: 'Chilli Tomato Puff', brand: 'crespology', image: '/products/crespology-chilli-tomato-puff.jpg' },
  { name: 'Coated Tasty Peanuts', brand: 'snaxzastic', image: '/products/snaxzastic-coated-tasty-peanuts.jpg' },
  { name: 'Chana Dal', brand: 'snaxzastic', image: '/products/snaxzastic-chana-dal.jpg' },
  { name: 'Moong Dal', brand: 'snaxzastic', image: '/products/snaxzastic-moong-dal.jpg' },
  { name: 'Frymes · Mini Rings', brand: 'snaxzastic', image: '/products/snaxzastic-mini-rings.jpg' },
  { name: 'Frymes · Moonchips Masala Masti', brand: 'snaxzastic', image: '/products/snaxzastic-moonchips.jpg' },
  { name: 'Frymes · Noodeelsss', brand: 'snaxzastic', image: '/products/snaxzastic-noodles.jpg' },
  { name: 'Frymes · Pasta Fryums', brand: 'snaxzastic', image: '/products/snaxzastic-pasta.jpg' },
  { name: 'Frymes · Peri-Peri Wheels', brand: 'snaxzastic', image: '/products/snaxzastic-peri-peri-wheels.jpg' },
  { name: 'Frymes · Pipe Pop', brand: 'snaxzastic', image: '/products/snaxzastic-pipe-pop.png' },
  { name: 'Frymes · Tadka Triangles', brand: 'snaxzastic', image: '/products/snaxzastic-tadka-triangles.jpg' },
  { name: 'Marwari Magic Bhujia', brand: 'snaxzastic', image: '/products/snaxzastic-marwari-magic-bhujia.jpg' },
  { name: 'Papdi Gathiya', brand: 'snaxzastic', image: '/products/snaxzastic-papdi-gathiya.jpg' },
  { name: 'Ratlami Sev', brand: 'snaxzastic', image: '/products/snaxzastic-ratlami-sev.jpg' },
  { name: 'Roasted Peanuts · Himalayan Salt', brand: 'snaxzastic', image: '/products/snaxzastic-himalayan-salt-peanuts.jpg' },
  { name: 'Roasted Chana · Hing Jeera', brand: 'snaxzastic', image: '/products/snaxzastic-hing-jeera-chana.jpg' },
];

export const brandCopy: Record<BrandId, { tagline: string; intro: string; className: string }> = {
  snaxzastic: {
    tagline: 'Snacking Anywhere',
    intro: 'Meet the Snaxzastic range across roasted snacks, namkeen and Frymes.',
    className: 'snax',
  },
  crespology: {
    tagline: 'Crispy Vibes Only',
    intro: 'Explore Crespology packs across cheese balls, Krunchit, puffs and popcorn.',
    className: 'cresp',
  },
};
