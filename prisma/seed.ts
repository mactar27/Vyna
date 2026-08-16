import { prisma } from '../lib/db'

async function main() {
  console.log('🌱 Seeding database...')
  const initialCategories = [
    { slug: 'beaute', name: 'Beauté', tagline: 'Produits beauté et maquillage', image: '/images/categories/beaute.png' },
    { slug: 'accessoires', name: 'Accessoires', tagline: 'Bracelets et accessoires', image: '/images/categories/accessoires.png' },
    { slug: 'soins', name: 'Soins', tagline: 'Produits de soin et bien-être', image: '/images/categories/soins.png' },
    { slug: 'nouveautes', name: 'Nouveautés', tagline: 'Les derniers produits disponibles', image: '/images/categories/nouveautes.png' },
  ]
  for (const cat of initialCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  const categories = await prisma.category.findMany()
  const catMap: Record<string, string> = {}
  for (const cat of categories) {
    catMap[cat.slug] = cat.id
  }

  const sampleReviews = [
    { author: 'Awa D.', rating: 5, date: new Date('2025-11-02'), text: 'Qualité au rendez-vous, livraison rapide. Je recommande vivement.' },
    { author: 'Fatou N.', rating: 4, date: new Date('2025-10-21'), text: 'Très joli produit, conforme à la description. Emballage soigné.' },
  ]

  // Helper to create or update a product
  async function upsertProduct(data: {
    id: string
    slug: string
    name: string
    categorySlug: string
    price: number
    oldPrice?: number
    isNew: boolean
    inStock: boolean
    stock: number
    shortDescription: string
    description: string
    informations: string[]
    images: string[]
    variant?: { label: string; options: string[] }
  }) {
    const existing = await prisma.product.findUnique({ where: { slug: data.slug } })
    if (existing) {
      console.log(`  ↩  Skipping existing: ${data.name}`)
      return
    }

    await prisma.product.create({
      data: {
        slug: data.slug,
        name: data.name,
        categoryId: catMap[data.categorySlug],
        price: data.price,
        oldPrice: data.oldPrice,
        isNew: data.isNew,
        inStock: data.inStock,
        stock: data.stock,
        shortDescription: data.shortDescription,
        description: data.description,
        images: {
          create: data.images.map((url, position) => ({ url, position })),
        },
        informations: {
          create: data.informations.map((value, position) => ({ value, position })),
        },
        ...(data.variant
          ? {
              variants: {
                create: {
                  label: data.variant.label,
                  options: JSON.stringify(data.variant.options),
                },
              },
            }
          : {}),
        reviews: {
          create: sampleReviews,
        },
      },
    })
    console.log(`  ✅ Created: ${data.name}`)
  }

  const productsToSeed = [
    { id: 'p1', slug: 'savon-noir', name: 'Savon Noir', categorySlug: 'soins', price: 7500, isNew: false, inStock: true, stock: 42, shortDescription: 'Savon noir traditionnel pour une peau nette, douce et purifiée.', description: "Un savon noir authentique, riche et onctueux, qui nettoie en profondeur tout en respectant l'équilibre de la peau. Idéal pour le visage et le corps, il laisse un fini doux et lumineux.", informations: ['Contenance : 200 g', 'Convient à tous types de peau', 'Fabrication artisanale'], images: ['/images/products/savon-noir.png'] },
    { id: 'p2', slug: 'bracelet-elegance', name: 'Bracelet Élégance', categorySlug: 'accessoires', price: 10000, isNew: true, inStock: true, stock: 18, shortDescription: 'Bracelet fin doré, une touche discrète et raffinée au quotidien.', description: 'Un bracelet délicat en perles dorées, pensé pour accompagner tous vos looks. Léger et intemporel, il se porte seul ou en accumulation.', informations: ['Longueur ajustable', 'Finition dorée', 'Fermoir sécurisé'], images: ['/images/products/bracelet-elegance.png'], variant: { label: 'Couleur', options: ['Doré', 'Argenté'] } },
    { id: 'p3', slug: 'mascara-volume', name: 'Mascara Volume', categorySlug: 'beaute', price: 8500, oldPrice: 10000, isNew: false, inStock: true, stock: 30, shortDescription: 'Un regard intense et volumineux, sans effet paquet.', description: "Ce mascara volumateur gaine chaque cil pour un regard profond et défini. Sa brosse ergonomique assure une application homogène et une tenue longue durée.", informations: ['Contenance : 10 ml', 'Tenue longue durée', 'Testé dermatologiquement'], images: ['/images/products/mascara-volume.png'] },
    { id: 'p4', slug: 'huile-de-soin', name: 'Huile de soin', categorySlug: 'soins', price: 9000, isNew: true, inStock: true, stock: 25, shortDescription: 'Une huile nourrissante multi-usages pour le visage, le corps et les cheveux.', description: 'Une huile précieuse aux actifs végétaux qui nourrit intensément et sublime la peau. Sa texture fine pénètre rapidement sans effet gras.', informations: ['Contenance : 50 ml', 'Multi-usages', 'Sans parfum de synthèse'], images: ['/images/products/huile-de-soin.png'] },
    { id: 'p5', slug: 'creme-hydratante', name: 'Crème Hydratante', categorySlug: 'soins', price: 11000, isNew: false, inStock: true, stock: 20, shortDescription: 'Hydratation confort 24h pour une peau souple et repulpée.', description: "Une crème riche et fondante qui restaure la barrière cutanée et procure un confort immédiat. Idéale matin et soir.", informations: ['Contenance : 50 ml', 'Hydratation 24h', 'Convient aux peaux sensibles'], images: ['/images/products/creme-hydratante.png'] },
    { id: 'p6', slug: 'bracelet-perles', name: 'Bracelet Perles', categorySlug: 'accessoires', price: 8000, isNew: false, inStock: true, stock: 15, shortDescription: 'Bracelet en perles naturelles, élégant et lumineux.', description: 'Un bracelet raffiné en perles naturelles qui apporte une note lumineuse et féminine. Parfait pour toutes les occasions.', informations: ['Longueur ajustable', 'Perles naturelles', 'Fait main'], images: ['/images/products/bracelet-perles.png'] },
    { id: 'p7', slug: 'rouge-a-levres', name: 'Rouge à Lèvres', categorySlug: 'beaute', price: 7000, isNew: true, inStock: true, stock: 28, shortDescription: 'Une teinte nude rosée, confortable et longue tenue.', description: "Un rouge à lèvres crémeux à la couleur intense et au fini satiné. Sa formule enrichie hydrate et sublime les lèvres tout au long de la journée.", informations: ['Fini satiné', 'Longue tenue', 'Formule hydratante'], images: ['/images/products/rouge-a-levres.png'], variant: { label: 'Teinte', options: ['Nude rosé', 'Rose vif', 'Bois de rose'] } },
    { id: 'p8', slug: 'serum-visage', name: 'Sérum Visage', categorySlug: 'soins', price: 13500, oldPrice: 15000, isNew: false, inStock: true, stock: 12, shortDescription: 'Un concentré éclat pour une peau lisse et lumineuse.', description: "Ce sérum booster d'éclat unifie le teint et affine le grain de peau. Sa texture légère prépare idéalement la peau à recevoir sa crème.", informations: ['Contenance : 30 ml', 'Effet éclat', 'Application matin et soir'], images: ['/images/products/serum-visage.png'] },
    { id: 'p9', slug: 'bougie-parfumee', name: 'Bougie Parfumée', categorySlug: 'accessoires', price: 9500, isNew: true, inStock: true, stock: 22, shortDescription: 'Une ambiance chaleureuse et enveloppante à la maison.', description: 'Une bougie à la cire végétale et au parfum délicat qui crée une atmosphère apaisante. Un accessoire lifestyle indispensable.', informations: ['Durée : ~40h', 'Cire végétale', 'Parfum délicat'], images: ['/images/products/bougie-parfumee.png'] },
    { id: 'p10', slug: 'foulard-soie', name: 'Foulard Soie', categorySlug: 'accessoires', price: 12000, isNew: false, inStock: true, stock: 10, shortDescription: 'Un foulard doux aux teintes sauge, chic et polyvalent.', description: "Un foulard fluide et raffiné qui se porte au cou, dans les cheveux ou noué à un sac. Une touche d'élégance intemporelle.", informations: ['Dimensions : 90 x 90 cm', 'Toucher soyeux', 'Teintes sauge et ivoire'], images: ['/images/products/foulard-soie.png'] },
    { id: 'p11', slug: 'gommage-corps', name: 'Gommage Corps', categorySlug: 'soins', price: 8500, isNew: true, inStock: true, stock: 19, shortDescription: 'Un gommage doux pour une peau lisse et éclatante.', description: 'Un gommage corps aux grains fins qui élimine les cellules mortes et laisse la peau douce et parfumée. À utiliser une à deux fois par semaine.', informations: ['Contenance : 200 g', 'Grains naturels', 'Rinçage facile'], images: ['/images/products/gommage-corps.png'] },
    { id: 'p12', slug: 'huile-cheveux', name: 'Huile Cheveux', categorySlug: 'beaute', price: 9500, isNew: false, inStock: false, stock: 0, shortDescription: 'Nutrition et brillance pour des cheveux sublimés.', description: 'Une huile capillaire légère qui nourrit les longueurs, dompte les frisottis et apporte une brillance éclatante sans alourdir.', informations: ['Contenance : 100 ml', 'Non grasse', 'Tous types de cheveux'], images: ['/images/products/huile-de-soin.png'] },
  ]

  for (const product of productsToSeed) {
    await upsertProduct(product)
  }

  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
