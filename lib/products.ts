export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  tagline: string
  description: string
  isNew: boolean
  sizes: string[]
  colors: { name: string; hex: string }[]
  category: "termos" | "mates" | "accesorios"
  subcategory: string
  material: string
  care: string[]
}

export const products: Product[] = [
  // TERMOS
  {
    id: "termo-stanley-classic",
    name: "Termo Stanley Classic 1L",
    price: 45000,
    image: "/images/termo-stanley.jpg",
    images: [
      "/images/termo-stanley.jpg",
      "/images/termo-stanley.jpg",
      "/images/termo-stanley.jpg",
    ],
    tagline: "El clásico que nunca falla",
    description:
      "Termo Stanley Classic de 1 litro con grabado láser personalizado. Mantiene la temperatura hasta 24 horas. Ideal para el mate de todos los días.",
    isNew: true,
    sizes: ["1L"],
    colors: [
      { name: "Verde", hex: "#2D5A27" },
      { name: "Negro", hex: "#2C2C2C" },
      { name: "Azul", hex: "#1B4D72" },
    ],
    category: "termos",
    subcategory: "Termos clásicos",
    material: "Acero inoxidable 18/8",
    care: ["Lavar a mano", "No usar en microondas", "Secar boca abajo"],
  },
  {
    id: "termo-waterdog-1l",
    name: "Termo Waterdog TA10 1L",
    price: 32000,
    image: "/placeholder.svg?height=800&width=600&text=Termo+Waterdog",
    images: [
      "/placeholder.svg?height=800&width=600&text=Termo+Waterdog",
      "/placeholder.svg?height=800&width=600&text=Termo+Waterdog+2",
      "/placeholder.svg?height=800&width=600&text=Termo+Waterdog+3",
    ],
    tagline: "Compañero de aventuras",
    description:
      "Termo Waterdog TA10 de 1 litro. Doble pared de acero inoxidable con vacío. Personalizado con grabado láser a tu gusto.",
    isNew: false,
    sizes: ["1L"],
    colors: [
      { name: "Acero", hex: "#B0B0B0" },
      { name: "Negro", hex: "#2C2C2C" },
    ],
    category: "termos",
    subcategory: "Termos clásicos",
    material: "Acero inoxidable 304",
    care: ["Lavar a mano con agua tibia", "No usar esponjas abrasivas", "Secar bien antes de guardar"],
  },
  {
    id: "termo-lumilagro-luminox",
    name: "Termo Lumilagro Luminox 1L",
    price: 28000,
    image: "/placeholder.svg?height=800&width=600&text=Termo+Lumilagro",
    images: [
      "/placeholder.svg?height=800&width=600&text=Termo+Lumilagro",
      "/placeholder.svg?height=800&width=600&text=Termo+Lumilagro+2",
      "/placeholder.svg?height=800&width=600&text=Termo+Lumilagro+3",
    ],
    tagline: "Tradición argentina",
    description:
      "Termo Lumilagro Luminox de 1 litro. El clásico argentino con ampolla de vidrio. Grabado láser personalizado en el exterior de acero.",
    isNew: false,
    sizes: ["1L"],
    colors: [
      { name: "Acero", hex: "#C0C0C0" },
      { name: "Negro", hex: "#333333" },
    ],
    category: "termos",
    subcategory: "Termos clásicos",
    material: "Acero inoxidable con ampolla de vidrio",
    care: ["No golpear", "Lavar con agua tibia", "No sumergir completamente"],
  },
  {
    id: "botella-termica-500ml",
    name: "Botella Térmica 500ml",
    price: 18000,
    image: "/placeholder.svg?height=800&width=600&text=Botella+Termica",
    images: [
      "/placeholder.svg?height=800&width=600&text=Botella+Termica",
      "/placeholder.svg?height=800&width=600&text=Botella+Termica+2",
      "/placeholder.svg?height=800&width=600&text=Botella+Termica+3",
    ],
    tagline: "Frío o caliente, siempre lista",
    description:
      "Botella térmica de 500ml ideal para llevar a todos lados. Doble pared al vacío. Personalizada con grabado láser.",
    isNew: true,
    sizes: ["500ml"],
    colors: [
      { name: "Rosa", hex: "#E8A0BF" },
      { name: "Celeste", hex: "#87CEEB" },
      { name: "Blanco", hex: "#F5F5F5" },
      { name: "Negro", hex: "#2C2C2C" },
    ],
    category: "termos",
    subcategory: "Botellas térmicas",
    material: "Acero inoxidable 304",
    care: ["Lavar a mano", "No apto para lavavajillas", "No congelar"],
  },
  {
    id: "termo-mate-system",
    name: "Termo con Sistema Cebador 1.2L",
    price: 52000,
    image: "/placeholder.svg?height=800&width=600&text=Termo+Cebador",
    images: [
      "/placeholder.svg?height=800&width=600&text=Termo+Cebador",
      "/placeholder.svg?height=800&width=600&text=Termo+Cebador+2",
      "/placeholder.svg?height=800&width=600&text=Termo+Cebador+3",
    ],
    tagline: "Cebá mates sobre la marcha",
    description:
      "Termo con sistema cebador integrado de 1.2 litros. Pico vertedor de precisión para un cebado perfecto. Grabado láser personalizado.",
    isNew: true,
    sizes: ["1.2L"],
    colors: [
      { name: "Verde", hex: "#2D5A27" },
      { name: "Negro mate", hex: "#1A1A1A" },
    ],
    category: "termos",
    subcategory: "Termos cebadores",
    material: "Acero inoxidable 18/8",
    care: ["Lavar a mano", "Limpiar el pico después de cada uso", "No usar en microondas"],
  },
  {
    id: "termo-mini-350ml",
    name: "Mini Termo 350ml",
    price: 15000,
    image: "/placeholder.svg?height=800&width=600&text=Mini+Termo",
    images: [
      "/placeholder.svg?height=800&width=600&text=Mini+Termo",
      "/placeholder.svg?height=800&width=600&text=Mini+Termo+2",
      "/placeholder.svg?height=800&width=600&text=Mini+Termo+3",
    ],
    tagline: "Compacto y personalizado",
    description:
      "Mini termo de 350ml perfecto para café o té. Cabe en cualquier bolso o mochila. Con grabado láser personalizado.",
    isNew: false,
    sizes: ["350ml"],
    colors: [
      { name: "Dorado", hex: "#D4A855" },
      { name: "Plateado", hex: "#C0C0C0" },
      { name: "Negro", hex: "#2C2C2C" },
    ],
    category: "termos",
    subcategory: "Botellas térmicas",
    material: "Acero inoxidable 304",
    care: ["Lavar a mano", "No usar productos abrasivos"],
  },

  // MATES
  {
    id: "mate-ceramica-artesanal",
    name: "Mate Cerámico Artesanal",
    price: 12000,
    image: "/images/mate-ceramica.jpg",
    images: [
      "/images/mate-ceramica.jpg",
      "/images/mate-ceramica.jpg",
      "/images/mate-ceramica.jpg",
    ],
    tagline: "Hecho a mano, hecho con amor",
    description:
      "Mate de cerámica artesanal con grabado láser. Cada pieza es única. Interior esmaltado para mejor sabor.",
    isNew: true,
    sizes: ["Estándar"],
    colors: [
      { name: "Blanco", hex: "#F5F5F5" },
      { name: "Terracota", hex: "#B87456" },
      { name: "Negro", hex: "#2C2C2C" },
    ],
    category: "mates",
    subcategory: "Mates cerámicos",
    material: "Cerámica artesanal esmaltada",
    care: ["Lavar a mano", "No apto para microondas", "Secar bien después de cada uso"],
  },
  {
    id: "mate-vidrio-forrado",
    name: "Mate de Vidrio con Funda",
    price: 9500,
    image: "/placeholder.svg?height=800&width=600&text=Mate+Vidrio",
    images: [
      "/placeholder.svg?height=800&width=600&text=Mate+Vidrio",
      "/placeholder.svg?height=800&width=600&text=Mate+Vidrio+2",
      "/placeholder.svg?height=800&width=600&text=Mate+Vidrio+3",
    ],
    tagline: "Transparencia y estilo",
    description:
      "Mate de vidrio térmico con funda de cuero ecológico grabada con láser. No modifica el sabor de la yerba.",
    isNew: false,
    sizes: ["Estándar"],
    colors: [
      { name: "Marrón", hex: "#8B6914" },
      { name: "Negro", hex: "#2C2C2C" },
    ],
    category: "mates",
    subcategory: "Mates de vidrio",
    material: "Vidrio borosilicato con funda eco-cuero",
    care: ["Lavar el vidrio a mano", "La funda se limpia con paño húmedo", "No sumergir la funda"],
  },
  {
    id: "mate-acero-premium",
    name: "Mate de Acero Premium",
    price: 16000,
    image: "/placeholder.svg?height=800&width=600&text=Mate+Acero",
    images: [
      "/placeholder.svg?height=800&width=600&text=Mate+Acero",
      "/placeholder.svg?height=800&width=600&text=Mate+Acero+2",
      "/placeholder.svg?height=800&width=600&text=Mate+Acero+3",
    ],
    tagline: "Indestructible y elegante",
    description:
      "Mate de acero inoxidable doble pared con grabado láser. No se rompe, mantiene la temperatura y es super fácil de limpiar.",
    isNew: true,
    sizes: ["Estándar"],
    colors: [
      { name: "Acero", hex: "#B0B0B0" },
      { name: "Negro mate", hex: "#1A1A1A" },
      { name: "Dorado", hex: "#D4A855" },
    ],
    category: "mates",
    subcategory: "Mates de acero",
    material: "Acero inoxidable 18/8 doble pared",
    care: ["Lavar a mano o en lavavajillas", "Secar inmediatamente", "No usar esponjas de acero"],
  },
  {
    id: "mate-calabaza-natural",
    name: "Mate Calabaza Natural",
    price: 8500,
    image: "/placeholder.svg?height=800&width=600&text=Mate+Calabaza",
    images: [
      "/placeholder.svg?height=800&width=600&text=Mate+Calabaza",
      "/placeholder.svg?height=800&width=600&text=Mate+Calabaza+2",
      "/placeholder.svg?height=800&width=600&text=Mate+Calabaza+3",
    ],
    tagline: "El sabor de lo auténtico",
    description:
      "Mate de calabaza natural curado y listo para usar. Grabado láser en la virola de aluminio. El mate tradicional argentino.",
    isNew: false,
    sizes: ["Estándar"],
    colors: [
      { name: "Natural", hex: "#C4A86B" },
    ],
    category: "mates",
    subcategory: "Mates de calabaza",
    material: "Calabaza natural con virola de aluminio",
    care: ["Curar antes del primer uso", "Vaciar después de cada uso", "Secar boca abajo", "No dejar yerba húmeda adentro"],
  },
  {
    id: "mate-silicona-colores",
    name: "Mate de Silicona Colores",
    price: 7000,
    originalPrice: 9000,
    image: "/placeholder.svg?height=800&width=600&text=Mate+Silicona",
    images: [
      "/placeholder.svg?height=800&width=600&text=Mate+Silicona",
      "/placeholder.svg?height=800&width=600&text=Mate+Silicona+2",
      "/placeholder.svg?height=800&width=600&text=Mate+Silicona+3",
    ],
    tagline: "Color y diversión",
    description:
      "Mate de silicona irrompible, ideal para llevar a la plaza, la playa o a donde quieras. Fácil de limpiar y con grabado láser.",
    isNew: false,
    sizes: ["Estándar"],
    colors: [
      { name: "Rojo", hex: "#D32F2F" },
      { name: "Celeste", hex: "#87CEEB" },
      { name: "Verde", hex: "#4CAF50" },
      { name: "Rosa", hex: "#E8A0BF" },
    ],
    category: "mates",
    subcategory: "Mates de silicona",
    material: "Silicona apta para alimentos",
    care: ["Apto para lavavajillas", "Se puede esterilizar con agua caliente"],
  },
  {
    id: "mate-imperial-madera",
    name: "Mate Imperial de Madera",
    price: 14000,
    image: "/placeholder.svg?height=800&width=600&text=Mate+Madera",
    images: [
      "/placeholder.svg?height=800&width=600&text=Mate+Madera",
      "/placeholder.svg?height=800&width=600&text=Mate+Madera+2",
      "/placeholder.svg?height=800&width=600&text=Mate+Madera+3",
    ],
    tagline: "Nobleza en cada mate",
    description:
      "Mate imperial de madera de algarrobo con virola y base de aluminio. Grabado láser en la madera. Pieza de diseño.",
    isNew: true,
    sizes: ["Estándar"],
    colors: [
      { name: "Natural", hex: "#A67B5B" },
      { name: "Oscuro", hex: "#5C3317" },
    ],
    category: "mates",
    subcategory: "Mates de madera",
    material: "Madera de algarrobo con virola de aluminio",
    care: ["Curar antes del primer uso", "No lavar con detergente", "Secar boca abajo"],
  },

  // ACCESORIOS
  {
    id: "bombilla-acero-pico-loro",
    name: "Bombilla Pico de Loro",
    price: 5500,
    image: "/placeholder.svg?height=800&width=600&text=Bombilla+Pico",
    images: [
      "/placeholder.svg?height=800&width=600&text=Bombilla+Pico",
      "/placeholder.svg?height=800&width=600&text=Bombilla+Pico+2",
      "/placeholder.svg?height=800&width=600&text=Bombilla+Pico+3",
    ],
    tagline: "El toque final perfecto",
    description:
      "Bombilla de acero inoxidable pico de loro con grabado láser. La más clásica y funcional. Filtro desmontable para fácil limpieza.",
    isNew: false,
    sizes: ["Estándar"],
    colors: [
      { name: "Acero", hex: "#C0C0C0" },
      { name: "Dorado", hex: "#D4A855" },
    ],
    category: "accesorios",
    subcategory: "Bombillas",
    material: "Acero inoxidable 18/10",
    care: ["Lavar después de cada uso", "Usar cepillo limpia-bombillas", "Hervir periódicamente para desinfectar"],
  },
  {
    id: "yerbera-acero",
    name: "Yerbera de Acero",
    price: 11000,
    image: "/placeholder.svg?height=800&width=600&text=Yerbera",
    images: [
      "/placeholder.svg?height=800&width=600&text=Yerbera",
      "/placeholder.svg?height=800&width=600&text=Yerbera+2",
      "/placeholder.svg?height=800&width=600&text=Yerbera+3",
    ],
    tagline: "Tu yerba siempre fresca",
    description:
      "Yerbera de acero inoxidable con tapa a rosca y grabado láser personalizado. Capacidad para 500g de yerba. Ideal para regalar.",
    isNew: true,
    sizes: ["500g"],
    colors: [
      { name: "Acero", hex: "#B0B0B0" },
      { name: "Negro mate", hex: "#1A1A1A" },
    ],
    category: "accesorios",
    subcategory: "Yerberas",
    material: "Acero inoxidable 304",
    care: ["Lavar a mano", "Secar bien antes de guardar yerba", "No usar en microondas"],
  },
  {
    id: "azucarera-acero",
    name: "Azucarera de Acero",
    price: 9000,
    image: "/placeholder.svg?height=800&width=600&text=Azucarera",
    images: [
      "/placeholder.svg?height=800&width=600&text=Azucarera",
      "/placeholder.svg?height=800&width=600&text=Azucarera+2",
      "/placeholder.svg?height=800&width=600&text=Azucarera+3",
    ],
    tagline: "Dulzura con estilo",
    description:
      "Azucarera de acero inoxidable con tapa a rosca y grabado láser. Combina con nuestra yerbera para un set perfecto.",
    isNew: false,
    sizes: ["Estándar"],
    colors: [
      { name: "Acero", hex: "#B0B0B0" },
      { name: "Negro mate", hex: "#1A1A1A" },
    ],
    category: "accesorios",
    subcategory: "Azucareras",
    material: "Acero inoxidable 304",
    care: ["Lavar a mano", "Secar completamente antes de rellenar"],
  },
  {
    id: "kit-matero-completo",
    name: "Kit Matero Completo",
    price: 35000,
    originalPrice: 42000,
    image: "/images/kit-matero.jpg",
    images: [
      "/images/kit-matero.jpg",
      "/images/kit-matero.jpg",
      "/images/kit-matero.jpg",
    ],
    tagline: "Todo lo que necesitás",
    description:
      "Kit completo: mate de acero + bombilla + yerbera + azucarera. Todo personalizado con grabado láser. El regalo ideal para materos.",
    isNew: true,
    sizes: ["Único"],
    colors: [
      { name: "Acero", hex: "#B0B0B0" },
      { name: "Negro mate", hex: "#1A1A1A" },
    ],
    category: "accesorios",
    subcategory: "Kits",
    material: "Acero inoxidable 304",
    care: ["Cada pieza se lava por separado", "Ver instrucciones individuales de cada producto"],
  },
  {
    id: "bolso-matero",
    name: "Bolso Matero Térmico",
    price: 22000,
    image: "/placeholder.svg?height=800&width=600&text=Bolso+Matero",
    images: [
      "/placeholder.svg?height=800&width=600&text=Bolso+Matero",
      "/placeholder.svg?height=800&width=600&text=Bolso+Matero+2",
      "/placeholder.svg?height=800&width=600&text=Bolso+Matero+3",
    ],
    tagline: "Llevá todo organizado",
    description:
      "Bolso matero térmico con compartimentos para termo, mate, yerbera y azucarera. Interior aislante. Con grabado láser en el frente.",
    isNew: false,
    sizes: ["Único"],
    colors: [
      { name: "Negro", hex: "#2C2C2C" },
      { name: "Marrón", hex: "#8B6914" },
      { name: "Gris", hex: "#7A7A7A" },
    ],
    category: "accesorios",
    subcategory: "Bolsos materos",
    material: "Tela impermeable con interior aislante",
    care: ["Lavar a mano con agua fría", "No usar secadora", "Secar al aire"],
  },
  {
    id: "cepillo-limpia-bombilla",
    name: "Cepillo Limpia Bombilla",
    price: 2500,
    image: "/placeholder.svg?height=800&width=600&text=Cepillo",
    images: [
      "/placeholder.svg?height=800&width=600&text=Cepillo",
      "/placeholder.svg?height=800&width=600&text=Cepillo+2",
      "/placeholder.svg?height=800&width=600&text=Cepillo+3",
    ],
    tagline: "Limpieza fácil",
    description:
      "Cepillo especial para limpiar bombillas de mate. Set de 3 unidades con diferentes grosores para una limpieza profunda.",
    isNew: false,
    sizes: ["Set x3"],
    colors: [
      { name: "Natural", hex: "#E8DFD0" },
    ],
    category: "accesorios",
    subcategory: "Limpieza",
    material: "Cerdas de nylon con mango de acero",
    care: ["Enjuagar después de cada uso", "Dejar secar al aire"],
  },
]

export function getProductsByCategory(category: "termos" | "mates" | "accesorios") {
  return products.filter((p) => p.category === category)
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function getRelatedProducts(productId: string, limit = 4) {
  const product = getProductById(productId)
  if (!product) return []
  return products.filter((p) => p.category === product.category && p.id !== productId).slice(0, limit)
}
