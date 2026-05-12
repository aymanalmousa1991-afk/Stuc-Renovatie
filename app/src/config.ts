export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavigationLink {
  label: string
  target: string
}

export interface NavigationConfig {
  brandName: string
  logoPath?: string
  logoWidth?: number
  links: NavigationLink[]
}

export interface HeroConfig {
  videoPath: string
  eyebrow: string
  titleLine: string
  titleEmphasis: string
  subtitleLine1: string
  subtitleLine2: string
  ctaText: string
  ctaTargetId: string
}

export interface ManifestoConfig {
  sectionLabel: string
  text: string
}

export interface AnatomyPillar {
  label: string
  title: string
  body: string
}

export interface AnatomyConfig {
  sectionLabel: string
  title: string
  pillars: AnatomyPillar[]
}

export interface TierConfig {
  name: string
  price: string
  frequency: string
  journeys: string
  image: string
  description: string
  amenities: string[]
  ctaText: string
  ctaHref: string
}

export interface TiersConfig {
  sectionLabel: string
  title: string
  tiers: TierConfig[]
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  heading: string
  links: FooterLink[]
}

export interface FooterConfig {
  ageGateText: string
  brandName: string
  brandTaglineLines: string[]
  columns: FooterColumn[]
  copyright: string
}

export interface ReviewConfig {
  quote: string
  name: string
  location: string
  rating: number
}

export interface ReviewsConfig {
  sectionLabel: string
  title: string
  reviews: ReviewConfig[]
}

export interface QuoteConfig {
  sectionLabel: string
  title: string
  description: string
}

export interface ContactConfig {
  address: string
  postalCode: string
  email: string
  phone: string
  kvk: string
}

// ============================================
// SITE CONFIG
// ============================================
export const siteConfig: SiteConfig = {
  language: "nl",
  siteTitle: "Stuc- & Renovatiebedrijf Nijmegen | Vakmanschap in Stucwerk & Renovatie",
  siteDescription: "Professioneel stuc- en renovatiebedrijf in Nijmegen. Specialist in stukadoorswerk, complete renovaties en afwerking. Vraag een gratis offerte aan.",
}

// ============================================
// NAVIGATION
// ============================================
export const navigationConfig: NavigationConfig = {
  brandName: "Stuc & Renovatiebedrijf",
  links: [
    { label: "Diensten", target: "#anatomy" },
    { label: "Projecten", target: "#tiers" },
    { label: "Reviews", target: "#reviews" },
    { label: "Offerte", target: "#quote" },
    { label: "Contact", target: "#contact" },
  ],
}

// ============================================
// HERO
// ============================================
export const heroConfig: HeroConfig = {
  videoPath: "videos/hero.mp4",
  eyebrow: "Stuc & Renovatiebedrijf",
  titleLine: "Professioneel",
  titleEmphasis: "Stucwerk & Renovatie",
  subtitleLine1: "in Nijmegen",
  subtitleLine2: "",
  ctaText: "Vraag Offerte Aan",
  ctaTargetId: "#quote",
}

// ============================================
// MANIFESTO (Over Ons)
// ============================================
export const manifestoConfig: ManifestoConfig = {
  sectionLabel: "OVER ONS",
  text: "Al meer dan tien jaar zijn wij het adres in Nijmegen voor vakmanschap in stucwerk en renovatie. Elk project begint met luisteren — naar uw wensen, uw huis, uw situatie. Met precisie en passie zorgen wij voor een perfecte afwerking die jaren meegaat. Geen snelle klus, maar duurzaam vakwerk.",
}

// ============================================
// ANATOMY (Diensten)
// ============================================
export const anatomyConfig: AnatomyConfig = {
  sectionLabel: "DIENSTEN",
  title: "Wat wij voor u kunnen betekenen",
  pillars: [
    {
      label: "STUCWERK",
      title: "Stukadoorswerk",
      body: "Van sauswerk tot sierlijst, wij verzorgen alle voorkomende stukadoorswerkzaamheden. Met oog voor detail en een strakke afwerking geven wij uw wanden en plafonds een perfecte uitstraling. Wij werken met hoogwaardige materialen voor een duurzaam resultaat.",
    },
    {
      label: "RENOVATIE",
      title: "Renovatie van Woningen",
      body: "Complete woningrenovatie of gedeeltelijke verbouwing? Wij begeleiden u van begin tot eind. Met jarenlange ervaring in de bouw zorgen wij voor een vlotte uitvoering en een resultaat dat uw verwachtingen overtreft.",
    },
    {
      label: "AFWERKING",
      title: "Afwerken van Vloeren en Wanden",
      body: "Een mooie ruimte verdient een perfecte afwerking. Wij leggen vloeren, plaatsen wandafwerking en zorgen voor die laatste details die het verschil maken. Van laminaat tot tegelwerk, wij doen het allemaal.",
    },
    {
      label: "TIMMERWERK",
      title: "Bouw- en Afbouw Timmerwerk",
      body: "Onze timmerlieden realiseren maatwerkoplossingen voor uw woning. Van kozijnen en deuren tot complete aanbouwen — wij combineren vakmanschap met kwalitatief houtwerk dat jaren meegaat.",
    },
    {
      label: "COMPLETE PROJECTEN",
      title: "Complete Renovatieprojecten",
      body: "Van eerste ontwerp tot oplevering: wij nemen het volledige traject uit handen. Wij coördineren alle disciplines, zorgen voor de benodigde vergunningen en houden u gedurende het hele proces op de hoogte.",
    },
  ],
}

// ============================================
// TIERS (Projecten)
// ============================================
export const tiersConfig: TiersConfig = {
  sectionLabel: "PORTFOLIO",
  title: "Onze Projecten",
  tiers: [
    {
      name: "Villa Renovatie Hees",
      price: "Renovatie",
      frequency: "2024",
      journeys: "RENOVATIE",
      image: "images/tier-01.jpg",
      description: "Complete renovatie van een jaren '30 woning in Nijmegen-Hees. Strak stucwerk, nieuwe vloeren en maatwerk timmerwerk. Het resultaat is een moderne woning met behoud van karakter.",
      amenities: [
        "Volledige stucwerk wanden en plafonds",
        "Eikenhouten vloer gelegd",
        "Maatwerk keuken",
        "Nieuwe elektra en sanitair",
        "Buitenschilderwerk",
      ],
      ctaText: "Bekijk Project",
      ctaHref: "#contact",
    },
    {
      name: "Sierlijsten Goffert",
      price: "Stucwerk",
      frequency: "2024",
      journeys: "STUCWERK",
      image: "images/tier-02.jpg",
      description: "Ambachtelijk stucwerk met klassieke sierlijsten in een monumentaal pand in de Goffert. De originele details zijn zorgvuldig gerestaureerd en aangevuld met nieuw vakwerk.",
      amenities: [
        "Restauratie sierlijsten",
        "Ornamenten gereproduceerd",
        "Traditioneel kalkstuc",
        "Kleuradvies en uitvoering",
        "Matte lak afwerking",
      ],
      ctaText: "Bekijk Project",
      ctaHref: "#contact",
    },
    {
      name: "Badkamer Centrum",
      price: "Renovatie",
      frequency: "2023",
      journeys: "RENOVATIE",
      image: "images/tier-03.jpg",
      description: "Complete badkamerrenovatie in het centrum van Nijmegen met hoogwaardige tegelwerk en stucafwerking. Een luxe wellness-gevoel in een compacte ruimte.",
      amenities: [
        "Inloopdouche met regendouche",
        "Marmerlook tegels",
        "Vloerverwarming",
        "Design wastafelmeubel",
        "LED spiegelverlichting",
      ],
      ctaText: "Bekijk Project",
      ctaHref: "#contact",
    },
  ],
}

// ============================================
// REVIEWS
// ============================================
export const reviewsConfig: ReviewsConfig = {
  sectionLabel: "KLANTEN AAN HET WOORD",
  title: "Wat onze klanten zeggen",
  reviews: [
    {
      quote: "Top kwaliteit geleverd. Zeer nette afwerking en goede communicatie. Het team werkte snel en schoon. We zijn heel tevreden met het resultaat!",
      name: "Familie Van Dijk",
      location: "Nijmegen-Hees",
      rating: 5,
    },
    {
      quote: "Onze woning compleet gerenoveerd en perfect opgeleverd. Vanaf het eerste gesprek tot de oplevering was alles professioneel geregeld.",
      name: "Peter Janssen",
      location: "Nijmegen-Centrum",
      rating: 5,
    },
    {
      quote: "Betrouwbaar bedrijf met vakmensen. Zeker aan te raden voor iedereen die kwaliteit en netheid belangrijk vindt.",
      name: "Maria Klaassen",
      location: "Nijmegen-Goffert",
      rating: 5,
    },
  ],
}

// ============================================
// QUOTE (Offerte)
// ============================================
export const quoteConfig: QuoteConfig = {
  sectionLabel: "OFFERTE AANVRAGEN",
  title: "Vraag een gratis offerte aan",
  description: "Wilt u weten wat wij voor u kunnen betekenen? Vul het formulier in en wij nemen binnen 24 uur contact met u op.",
}

// ============================================
// CONTACT
// ============================================
export const contactConfig: ContactConfig = {
  address: "Nieuwe Dukenburgseweg 103",
  postalCode: "6534AD Nijmegen",
  email: "info@stuc-renovatiebedrijf.nl",
  phone: "0640093526",
  kvk: "99780909",
}

// ============================================
// FOOTER
// ============================================
export const footerConfig: FooterConfig = {
  ageGateText: "Vakmanschap dat u kunt vertrouwen — al meer dan tien jaar het adres in Nijmegen voor stucwerk en renovatie.",

  brandName: "Stuc & Renovatiebedrijf",
  brandTaglineLines: ["Vakmanschap sinds 2014", "Nijmegen en omgeving"],
  columns: [
    {
      heading: "NAVIGATIE",
      links: [
        { label: "Home", href: "#hero" },
        { label: "Diensten", href: "#anatomy" },
        { label: "Projecten", href: "#tiers" },
        { label: "Reviews", href: "#reviews" },
        { label: "Offerte", href: "#quote" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      heading: "DIENSTEN",
      links: [
        { label: "Stukadoorswerk", href: "#anatomy" },
        { label: "Renovatie", href: "#anatomy" },
        { label: "Afwerking", href: "#anatomy" },
        { label: "Timmerwerk", href: "#anatomy" },
      ],
    },
    {
      heading: "CONTACT",
      links: [
        { label: "Nieuwe Dukenburgseweg 103", href: "#" },
        { label: "6534AD Nijmegen", href: "#" },
        { label: "0640093526", href: "tel:0640093526" },
        { label: "info@stuc-renovatiebedrijf.nl", href: "mailto:info@stuc-renovatiebedrijf.nl" },
        { label: "KVK: 99780909", href: "#" },
      ],
    },
  ],
  copyright: "© 2024 Stuc & Renovatiebedrijf Nijmegen. Alle rechten voorbehouden.",
}
