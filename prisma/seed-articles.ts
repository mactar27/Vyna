import 'dotenv/config'
import { prisma } from '../lib/db'

const articles = [
  {
    slug: 'rituels-beaute-ocean',
    title: "5 rituels beauté inspirés de l'océan",
    excerpt:
      "L'eau de mer, le sel, les algues… La mer regorge de trésors pour notre peau. Découvrez 5 rituels beauté inspirés de l'océan pour retrouver une peau lumineuse et ressourcée.",
    category: 'Soins naturels',
    readTime: '5 min',
    image: '/images/blog-1.jpg',
    isPublished: true,
    publishedAt: new Date('2026-08-28'),
    content: `## 1. Le gommage au sel marin

Mélangez 3 cuillères à soupe de gros sel marin avec 2 cuillères à soupe d'huile de coco fondue et quelques gouttes d'huile essentielle de lavande. Appliquez en cercles doux sur le corps sous la douche. Le sel élimine les cellules mortes, l'huile nourrit — résultat : une peau douce comme un galet poli par la mer.

## 2. Le masque aux algues purifiant

Les algues marines sont riches en iode, magnésium et antioxydants. Diluez une cuillère de poudre d'algues spiruline ou chlorelle avec de l'eau de rose jusqu'à obtenir une pâte. Appliquez 10 minutes sur le visage. Rincez à l'eau tiède. Le teint est immédiatement plus unifié.

## 3. Le bain de pieds reminéralisant

Faites chauffer un grand bain de pieds avec 4 cuillères de sel de mer, quelques gouttes d'huile essentielle de menthe poivrée et de la camomille séchée. Laissez tremper 15 minutes. Ce rituel détend, élimine les toxines et laisse les pieds parfaitement doux.

> 💡 Astuce VYNA : conservez votre gommage au sel dans un pot en verre hermétique jusqu'à 4 semaines. Il fera un cadeau parfait pour vos proches !

## 4. La brume visage à l'eau de mer

Remplissez un petit vaporisateur d'eau minérale et ajoutez une pincée de sel marin fin. Agitez et vaporisez sur le visage tout au long de la journée. Ce geste simple hydrate, fixe le maquillage et rappelle immédiatement la sensation d'embruns marins.

## 5. Le soin cheveux aux minéraux marins

Mélangez de l'eau salée avec de l'huile d'argan et une cuillère d'aloe vera. Appliquez sur vos cheveux humides avant de les coiffer. Le sel texturise naturellement, l'argan nourrit et l'aloe vera hydrate. Résultat : des cheveux de plage sublimes, même à Paris.

## Ce qu'il vous faut pour commencer

- Gros sel marin non raffiné
- Huile de coco vierge
- Poudre d'algues (spiruline ou chlorelle)
- Eau de rose naturelle
- Huile essentielle de lavande ou menthe
- Huile d'argan
- Aloe vera pur`,
  },
  {
    slug: 'bienfaits-savon-noir',
    title: 'Les bienfaits du savon noir',
    excerpt:
      "Utilisé depuis des siècles dans les hammams d'Afrique du Nord, le savon noir est un véritable trésor de beauté. Découvrez pourquoi ce produit naturel mérite une place d'honneur dans votre routine.",
    category: 'Savon & Hammam',
    readTime: '4 min',
    image: '/images/blog-2.jpg',
    isPublished: true,
    publishedAt: new Date('2026-08-20'),
    content: `## Qu'est-ce que le savon noir ?

Le savon noir est obtenu par la saponification d'olives noires fermentées et d'huile d'olive. Sa texture est pâteuse, sa couleur va du brun foncé au noir. Contrairement aux savons classiques, il n'est pas solide : on le prélève à la main ou à la spatule.

## Ses propriétés exceptionnelles

Le savon noir est reconnu pour :

- Exfolier en douceur les cellules mortes
- Purifier en profondeur les pores
- Nourrir la peau grâce à l'huile d'olive
- Hydrater sans agresser
- Convenir à tous les types de peau, même sensibles
- Être 100% naturel, vegan et sans conservateurs

## Comment l'utiliser correctement ?

Commencez par vous humidifier abondamment sous une douche chaude pour ouvrir les pores. Appliquez le savon noir en fine couche sur tout le corps et laissez poser 5 à 10 minutes. Utilisez ensuite un kessa (gant de crin) pour frotter en mouvements circulaires. Vous verrez les cellules mortes rouler — c'est normal et très satisfaisant !

> 💡 Conseil VYNA : pour un résultat hammam authentique, réalisez ce rituel une fois par semaine. Terminez toujours par une huile de corps ou du beurre de karité pour sceller l'hydratation.

## Pour qui est-il recommandé ?

Le savon noir convient à tous — femmes, hommes, enfants dès 3 ans. Il est particulièrement apprécié des peaux sèches, ternes ou à tendance acnéique. Les personnes souffrant d'eczéma ou de psoriasis l'utilisent également, toujours en consultation avec leur dermatologue.

## Le savon noir VYNA

Chez VYNA, nous proposons un savon noir artisanal sourcé directement auprès de productrices marocaines. Il est fabriqué selon la méthode traditionnelle, enrichi à l'huile d'eucalyptus pour une sensation fraîche et purifiante. Sans colorants, sans parfums artificiels, sans SLS.`,
  },
  {
    slug: 'choisir-son-bracelet',
    title: 'Comment choisir son bracelet ?',
    excerpt:
      "Bracelet en or, en argent, en perles ou en fil ? Choisir un bracelet n'est pas anodin. Il raconte quelque chose de vous. Voici notre guide complet pour trouver le modèle qui vous ressemble vraiment.",
    category: 'Bijoux & Style',
    readTime: '6 min',
    image: '/images/blog-3.jpg',
    isPublished: true,
    publishedAt: new Date('2026-08-10'),
    content: `## Étape 1 : Définir votre style

Il existe 5 grands profils de porteuses de bracelets :

- La Minimaliste — elle aime les chaînes fines, les anneaux discrets, l'or jaune 18 carats
- La Bohème — elle collectionne les bracelets en perles naturelles, bois ou coquillages
- La Romantique — elle opte pour les breloques, les cœurs, les initiales gravées
- La Sportive — elle préfère les bracelets en silicone, joncs larges ou cordon résistant
- L'Audacieuse — elle n'a pas peur d'empiler, de mélanger les matières et les couleurs

## Étape 2 : Choisir la matière

L'or jaune apporte chaleur et sophistication. L'argent 925 est polyvalent et résiste bien au quotidien. Les perles d'eau douce donnent une touche précieuse et romantique. Le laiton doré est accessible et tendance. Les fils wax ou brodés sont colorés et ethniques.

> 💡 Astuce VYNA : si vous avez la peau dorée ou foncée, l'or jaune et les tons chauds (terracotta, miel, turquoise) subliment particulièrement votre carnation.

## Étape 3 : Bien mesurer son poignet

Utilisez un mètre ruban ou un fil pour mesurer votre poignet. Ajoutez 1 à 1,5 cm pour un bracelet ajusté, 2 à 3 cm pour un port décontracté. La plupart de nos bracelets VYNA sont réglables grâce à leur fermoir coulissant.

## L'art du stacking (l'empilement)

Le secret d'un beau stack de bracelets ? Variez les textures (fin/épais, brillant/mat), restez dans une palette de 2-3 couleurs max, et alternez les longueurs. Commencez par votre pièce signature (votre bracelet préféré), puis ajoutez les compléments autour.

Nos combinaisons VYNA préférées :

- Chaîne fine dorée + bracelet perles blanches + fil beige
- Jonc argenté + manchette gravée + perles irisées
- Bracelet coquillage + fil tressé turquoise + charm étoile

## Entretenir ses bracelets

Évitez le contact avec l'eau, les parfums et la crème solaire. Rangez chaque bracelet séparément dans un pochon en tissu pour éviter les rayures. Nettoyez vos bijoux en argent avec un chiffon doux légèrement humide. Pour l'or plaqué, séchez immédiatement après contact avec l'eau.`,
  },
]

async function main() {
  console.log('Seeding articles...')
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    })
    console.log(`✓ ${article.title}`)
  }
  console.log('Done!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
