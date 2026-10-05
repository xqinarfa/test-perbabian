export type Language = "en" | "id";

export type NonHalalLevel = "pork_meat" | "lard_used" | "kitchen_100_non_halal" | "alcohol_used";

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  province: string;
  city: string;
  district: string;
  address: string;
  gmaps_url: string;
  pork_status: NonHalalLevel[];
  status_badges: string[];
  category: string;
  signature_dishes: string[];
  price_range: "$" | "$$" | "$$$";
  opening_hours: string;
  is_open_now: boolean;
  verified_by_team: boolean;
  image: string;
  description: string;
}

// Alias for backwards compatibility
export type Dish = Restaurant;

export const RESTAURANTS: Restaurant[] = [
  {
    id: "kedai-samcan-emas-pik",
    name: "Kedai Samcan Emas",
    slug: "kedai-samcan-emas-pantai-indah-kapuk",
    province: "DKI Jakarta",
    city: "Jakarta Utara",
    district: "Pantai Indah Kapuk (PIK)",
    address: "Ruko Golf Island Blok L No. 28, Pantai Indah Kapuk, Jakarta Utara",
    gmaps_url: "https://maps.google.com/?q=Golf+Island+PIK+Jakarta+Utara",
    pork_status: ["pork_meat", "lard_used", "kitchen_100_non_halal"],
    status_badges: ["Mengandung Daging Babi", "Menggunakan Minyak Babi", "100% Dapur Babi"],
    category: "Chinese Food",
    signature_dishes: ["Samcan Crispy Panggang", "Chasiu Madu Karamel", "Nasi Campur Pontianak Komplit"],
    price_range: "$$",
    opening_hours: "Setiap Hari, 10:00 - 22:00 WIB",
    is_open_now: true,
    verified_by_team: true,
    image: "/images/samcan-crispy-pik.png",
    description: "Spesialis samcan panggang dengan kulit super renyah dan daging lembut berempah khas Pontianak, disajikan bersama sambal cocolan otentik.",
  },
  {
    id: "babi-guling-karya-rejeki",
    name: "Babi Guling Karya Rejeki",
    slug: "babi-guling-karya-rejeki-sanur-bali",
    province: "Bali",
    city: "Denpasar",
    district: "Sanur",
    address: "Jl. Danau Buyan No. 18, Sanur, Denpasar Selatan, Bali",
    gmaps_url: "https://maps.google.com/?q=Sanur+Denpasar+Bali",
    pork_status: ["pork_meat", "lard_used", "kitchen_100_non_halal"],
    status_badges: ["Mengandung Daging Babi", "Menggunakan Minyak Babi", "100% Dapur Babi"],
    category: "Babi Guling",
    signature_dishes: ["Nasi Babi Guling Spesial", "Kulit Babi Krispi Kaca", "Sate Lilit Babi Bumbu Genep", "Lawar Merah"],
    price_range: "$$",
    opening_hours: "Setiap Hari, 08:30 - 19:30 WITA",
    is_open_now: true,
    verified_by_team: true,
    image: "/images/babi-guling-sanur.png",
    description: "Warung babi guling legendaris di Sanur dengan racikan base genep Bali otentik, kulit garing renyah keemasan, dan kuah ares yang kaya rempah.",
  },
  {
    id: "bakmi-khek-selat-panjang",
    name: "Bakmi Khek Selat Panjang",
    slug: "bakmi-khek-selat-panjang-medan",
    province: "Sumatera Utara",
    city: "Medan",
    district: "Medan Kota",
    address: "Jl. Selat Panjang No. 42, Pasar Baru, Medan Kota, Sumatera Utara",
    gmaps_url: "https://maps.google.com/?q=Jl+Selat+Panjang+Medan",
    pork_status: ["pork_meat", "lard_used"],
    status_badges: ["Mengandung Daging Babi", "Menggunakan Minyak Babi"],
    category: "Bakmi & Pangsit",
    signature_dishes: ["Bakmi Keriting Babi Cincang", "Pangsit Rebus Minyak Babi", "Bakso Goreng Samcan"],
    price_range: "$",
    opening_hours: "Selasa - Minggu, 06:30 - 14:30 WIB",
    is_open_now: true,
    verified_by_team: true,
    image: "/images/bakmi-babi-medan.png",
    description: "Kedai bakmi babi klasik Medan dengan tekstur mie keriting kenyal, lumuran minyak babi wangi daun bawang, dan topping cincang gurih melimpah.",
  },
  {
    id: "naughty-nuris-pork-ribs",
    name: "Naughty Nuri’s Warung",
    slug: "naughty-nuris-warung-pork-ribs-ubud",
    province: "Bali",
    city: "Gianyar",
    district: "Ubud",
    address: "Jl. Raya Sanggingan No. 88X, Kedewatan, Ubud, Bali",
    gmaps_url: "https://maps.google.com/?q=Naughty+Nuris+Ubud+Bali",
    pork_status: ["pork_meat", "kitchen_100_non_halal"],
    status_badges: ["Mengandung Daging Babi", "100% Dapur Babi"],
    category: "Western / Pork Ribs",
    signature_dishes: ["BBQ Glazed Pork Spare Ribs", "Charcoal Pork Chops", "Twisted Potato Wedges"],
    price_range: "$$$",
    opening_hours: "Setiap Hari, 11:00 - 22:30 WITA",
    is_open_now: true,
    verified_by_team: true,
    image: "/images/pork-ribs-ubud.png",
    description: "Iga babi bakar legendaris Ubud yang dimarinasi bumbu BBQ karamel manis gurih, dibakar di atas arang batok kelapa dengan aroma asap khas memikat.",
  },
  {
    id: "kwetiau-goreng-achai",
    name: "Kwetiau Goreng Babi A-Chai",
    slug: "kwetiau-goreng-babi-achai-surabaya",
    province: "Jawa Timur",
    city: "Surabaya",
    district: "Surabaya Barat",
    address: "Jl. Kupang Indah Raya No. 15, Dukuh Pakis, Surabaya, Jawa Timur",
    gmaps_url: "https://maps.google.com/?q=Kupang+Indah+Surabaya",
    pork_status: ["pork_meat", "lard_used"],
    status_badges: ["Mengandung Daging Babi", "Menggunakan Minyak Babi"],
    category: "Street Food",
    signature_dishes: ["Kwetiau Goreng Wokhei Minyak Babi", "Chasiu Panggang Arang", "Nasi Goreng Lapcheong"],
    price_range: "$",
    opening_hours: "Senin - Sabtu, 17:00 - 23:30 WIB",
    is_open_now: true,
    verified_by_team: true,
    image: "/images/kwetiau-babi-surabaya.png",
    description: "Kuliner street food malam Surabaya dengan teknik goreng wok hei berapi besar, menggunakan minyak lard aromatik dan potongan lapcheong serta chasiu manis.",
  },
  {
    id: "lomie-bakmi-gardujati",
    name: "Lomie & Bakmi Babi Gardujati",
    slug: "lomie-bakmi-babi-gardujati-bandung",
    province: "Jawa Barat",
    city: "Bandung",
    district: "Andir",
    address: "Jl. Gardujati No. 53, Kebon Jeruk, Andir, Bandung, Jawa Barat",
    gmaps_url: "https://maps.google.com/?q=Gardujati+Bandung",
    pork_status: ["pork_meat", "lard_used", "kitchen_100_non_halal"],
    status_badges: ["Mengandung Daging Babi", "Menggunakan Minyak Babi", "100% Dapur Babi"],
    category: "Bakmi & Pangsit",
    signature_dishes: ["Lomie Kuah Kental Ebi Babi", "Dorokdok Kulit Babi Krispi", "Pangsit Kuah Rebus"],
    price_range: "$$",
    opening_hours: "Rabu - Senin, 10:00 - 21:00 WIB",
    is_open_now: false,
    verified_by_team: true,
    image: "/images/lomie-babi-bandung.png",
    description: "Kedai legendaris di kawasan pecinan Gardujati Bandung dengan kuah lomie kental gurih manis bertabur ebi, daging babi empuk, dan krupuk kulit dorokdok.",
  },
];

// Alias for backwards compatibility
export const DISHES = RESTAURANTS;

export const CONTENT = {
  id: {
    nav: {
      brand: "PERBABIAN",
      links: [
        { label: "Direktori", href: "#cardapio" },
        { label: "Cara Kerja", href: "#como-funciona" },
        { label: "Keunggulan", href: "#experiencia" },
        { label: "FAQ", href: "#faq" },
      ],
      exploreCta: "Daftarkan Restoran",
    },
    hero: {
      title: "Temukan Kuliner Babi Terbaik di Kotamu",
      description:
        "Panduan lengkap restoran, kedai, dan street food dengan olahan daging serta minyak babi di seluruh Indonesia.",
      searchPlaceholder: "Cari nama restoran, menu (babi guling, samcan, bakmi), atau area...",
      cta: "Cari Restoran",
    },
    ticker: "DIREKTORI KULINER BABI TERKURASI • TRANSPARANSI MINYAK BABI • 100% TERVERIFIKASI • KEDAI LEGENDARIS & STREET FOOD • JELAJAHI SE-INDONESIA • ",
    philosophy: {
      title: "Bukan Sekadar Makan. Ini Tentang Transparansi Bahan yang Pasti.",
      description:
        "Di tengah sulitnya memastikan kejelasan bahan makanan dan status minyak babi, Perbabian hadir menyatukan direktori kuliner babi dalam satu tempat dengan transparansi penuh.",
      cta: "PELAJARI CARA KERJA →",
      cards: [
        {
          num: "01 / TRANSPARANSI",
          title: "Kejelasan Status Bahan & Minyak Babi",
          description:
            "Informasi transparan apakah tempat makan menyajikan daging babi langsung, minyak babi (lard), atau beroperasi dengan alat masak terpisah.",
          bg: "bg-[#df6b51]",
          text: "text-white",
          icon: "Clock",
        },
        {
          num: "02 / CAKUPAN NASIONAL",
          title: "Dari Kedai Legendaris hingga Street Food",
          description:
            "Mendata rekomendasi kuliner babi di berbagai kota: Jakarta, Bali, Medan, Surabaya, Bandung, hingga pelosok nusantara.",
          bg: "bg-[#c3b8eb]",
          text: "text-[#11140f]",
          icon: "Sliders",
        },
        {
          num: "03 / PENCARIAN CEPAT",
          title: "Pilihan Tepat Tanpa Ragu Saat Bepergian",
          description:
            "Filter presisi berbasis kota dan jenis olahan babi agar kamu bisa menemukan kuliner favorit kapan pun tanpa kebingungan.",
          bg: "bg-[#BE132D]",
          text: "text-white",
          icon: "CheckCircle2",
        },
      ],
    },
    foodLanguage: {
      title: "Cita Rasa Tradisi, Transparan Tanpa Kompromi.",
      description:
        "Dari aroma samcan panggang hingga rempah wangi babi guling, nikmati kekayaan kuliner nusantara dengan kepastian bahan yang teruji.",
      cta: "Jelajahi Direktori",
    },
    pathways: {
      title: "Pilih Titik Awal Petualangan Kulinermu.",
      subtitle:
        "Mulai dari olahan babi panggang renyah, semangkuk bakmi legendaris, hingga street food khas daerah.",
      cards: [
        {
          num: "01",
          title: "Daging & Panggang",
          subtitle: "SAMCAN & BABI GULING",
          description:
            "Jelajahi olahan babi panggang renyah, samcan crispy, babi guling, dan iga bakar dengan bumbu otentik.",
          cta: "Jelajahi Olahan Daging →",
          bg: "bg-[#c3b8eb]",
          text: "text-[#11140f]",
          image: "/images/samcan-crispy-pik.png",
          dishId: "kedai-samcan-emas-pik",
        },
        {
          num: "02",
          title: "Bakmi & Kedai",
          subtitle: "MIE & KEDAI PECINAN",
          description:
            "Dari bakmi babi cincang hingga hidangan legendaris beraroma minyak babi yang gurih dan wangi semerbak.",
          cta: "Jelajahi Aneka Bakmi →",
          bg: "bg-[#BE132D]",
          text: "text-white",
          image: "/images/bakmi-babi-medan.png",
          dishId: "bakmi-khek-selat-panjang",
        },
        {
          num: "03",
          title: "Street Food",
          subtitle: "KULINER KHAS DAERAH",
          description:
            "Jelajahi street food khas Bali, Medan, Pontianak, Surabaya, dan Manado yang melegenda lintas generasi.",
          cta: "Jelajahi Street Food →",
          bg: "bg-[#f8f7f3]",
          text: "text-[#11140f]",
          image: "/images/kwetiau-babi-surabaya.png",
          dishId: "kwetiau-goreng-achai",
        },
      ],
      tagline: "DIREKTORI KULINER BABI TERKURASI SE-INDONESIA.",
    },
    gallery: {
      title: "Direktori Kuliner Babi Terpilih",
      description:
        "Telusuri restoran, kedai, dan kuliner babi di kotamu dengan transparansi bahan, menu andalan, dan status terverifikasi.",
      cardCta: "Lihat Detail Restoran ↗",
      bottomTag: "DATA STATUS BAHAN DAN LOKASI TERVERIFIKASI TIM PERBABIAN.",
      bottomLink: "DAFTARKAN RESTORAN BARU ↗",
    },
    steps: {
      title: "Bagaimana Perbabian Bekerja",
      subtitle:
        "Empat langkah mudah menemukan kuliner babi terbaik dengan transparansi bahan yang teruji.",
      items: [
        {
          num: "01",
          title: "Pilih Kota & Wilayah",
          description:
            "Tentukan kota tempatmu berada atau destinasi kuliner luar kota yang ingin kamu tuju.",
          bg: "bg-[#c3b8eb]",
          text: "text-[#11140f]",
        },
        {
          num: "02",
          title: "Atur Filter Bahan",
          description:
            "Filter berdasarkan jenis olahan (daging babi, minyak babi/lard, atau dapur 100% babi).",
          bg: "bg-[#f8f7f3]",
          text: "text-[#11140f]",
        },
        {
          num: "03",
          title: "Cek Status & Menu",
          description:
            "Lihat transparansi bahan makanan, menu andalan, rentang harga, dan jam operasional.",
          bg: "bg-[#df6b51]",
          text: "text-white",
        },
        {
          num: "04",
          title: "Kunjungi Restoran",
          description:
            "Gunakan rute langsung Google Maps untuk segera berangkat dan bersantap tanpa ragu.",
          bg: "bg-[#BE132D]",
          text: "text-white",
        },
      ],
    },
    experience: {
      title: "Direktori Terpercaya untuk Pecinta Kuliner",
      cards: [
        {
          icon: "Target",
          title: "Transparansi Bahan 100%",
          description:
            "Detail jelas apakah menggunakan daging babi langsung, minyak babi (lard), atau beroperasi dengan dapur 100% babi.",
        },
        {
          icon: "Sliders",
          title: "Cakupan Nasional Terkurasi",
          description:
            "Mendata restoran keluarga, kedai lokal legendaris, hingga street food di Jakarta, Bali, Medan, Surabaya, Bandung, dan kota lainnya.",
        },
        {
          icon: "Sparkles",
          title: "Navigasi & Pencarian Cepat",
          description:
            "Filter lokasi presisi dan integrasi Google Maps untuk memudahkan pencarian kuliner babi saat bepergian ke luar kota.",
        },
      ],
      disclaimer:
        "DATA DIHIMPUN DAN DIVERIFIKASI SECARA BERKALA OLEH TIM DAN KONTRIBUTOR KOMUNITAS PERBABIAN.",
    },
    faq: {
      title: "Pertanyaan yang Sering Diajukan",
      subtitle:
        "Jawaban lengkap seputar penggunaan direktori Perbabian, transparansi bahan, dan pendaftaran restoran.",
      items: [
        {
          q: "Apa itu Perbabian?",
          a: "Perbabian adalah platform direktori kuliner babi di Indonesia. Platform ini membantu pengguna menemukan restoran yang menyajikan olahan daging babi, minyak babi (lard), atau aneka olahan babi lainnya secara akurat dan transparan berdasarkan filter wilayah.",
        },
        {
          q: "Bagaimana transparansi status bahan makanan ditampilkan?",
          a: "Setiap restoran di direktori memiliki label status yang jelas: 'Mengandung Daging Babi' untuk menu olahan daging babi langsung, 'Menggunakan Minyak Babi' untuk kedai yang menggunakan minyak lard, dan '100% Dapur Babi' untuk tempat makan dengan dapur khusus olahan babi.",
        },
        {
          q: "Apakah data restoran sudah diverifikasi?",
          a: "Ya. Data tempat makan pada direktori Perbabian diverifikasi langsung oleh tim dan kontributor komunitas untuk memastikan keakuratan menu andalan, jam operasional, dan lokasi tempat makan.",
        },
        {
          q: "Bisakah mencari kuliner babi saat bepergian ke luar kota?",
          a: "Tentu saja. Perbabian dirancang dengan filter wilayah berbasis provinsi dan kota (DKI Jakarta, Bali, Medan, Surabaya, Bandung, dll) lengkap dengan tautan rute Google Maps untuk kemudahan navigasi langsung.",
        },
        {
          q: "Bagaimana jika restoran favorit saya belum terdaftar?",
          a: "Kamu dapat merekomendasikan dan mendaftarkan kedai atau restoran langgananmu melalui tombol 'Daftarkan Restoran Baru' agar tim kami dapat meninjau dan menambahkannya ke direktori.",
        },
      ],
    },
    cta: {
      title: "Punya Rekomendasi Tempat Makan Babi Favorit?",
      subtitle:
        "Bantu sesama pecinta kuliner menemukan hidden gem dan kedai legendaris di kotamu. Daftarkan restoran sekarang juga.",
      button: "Daftarkan Restoran Baru",
      secondary: "LIHAT CARA KERJA →",
    },
    footer: {
      brand: "PERBABIAN",
      description:
        "Direktori kuliner babi terkurasi di Indonesia. Transparansi bahan, kejelasan minyak babi, dan pencarian tempat makan terdekat berdasarkan filter wilayah.",
      navTitle: "NAVIGASI",
      links: [
        { label: "Direktori Restoran", href: "#cardapio" },
        { label: "Cara Kerja", href: "#como-funciona" },
        { label: "Keunggulan", href: "#experiencia" },
        { label: "Pertanyaan Umum", href: "#faq" },
      ],
      copyright: "© 2026 PERBABIAN INDONESIA.",
      slogan: "DIREKTORI KULINER BABI TERKURASI & TRANSPARAN DI INDONESIA.",
    },
  },
  en: {
    nav: {
      brand: "PERBABIAN",
      links: [
        { label: "Directory", href: "#cardapio" },
        { label: "How It Works", href: "#como-funciona" },
        { label: "Benefits", href: "#experiencia" },
        { label: "FAQ", href: "#faq" },
      ],
      exploreCta: "Register Restaurant",
    },
    hero: {
      title: "Discover the Best Pork Culinary in Your City",
      description:
        "The comprehensive directory of restaurants, eateries, and street food with pork meat and lard preparations across Indonesia.",
      searchPlaceholder: "Search restaurant name, dishes (babi guling, samcan, bakmi), or area...",
      cta: "Find Restaurants",
    },
    ticker: "CURATED PORK CULINARY DIRECTORY • LARD TRANSPARENCY • 100% VERIFIED • LEGENDARY EATERIES & STREET FOOD • ACROSS INDONESIA • ",
    philosophy: {
      title: "More Than Just Dining. It's About Ingredient Transparency.",
      description:
        "In a landscape where ingredient clarity and lard usage are often uncertain, Perbabian brings together a verified pork culinary directory in one place with full transparency.",
      cta: "SEE HOW IT WORKS →",
      cards: [
        {
          num: "01 / TRANSPARENCY",
          title: "Clear Ingredient & Lard Status",
          description:
            "Transparent information on whether the restaurant uses pork meat directly, lard oil for cooking, or maintains dedicated pork kitchenware.",
          bg: "bg-[#df6b51]",
          text: "text-white",
          icon: "Clock",
        },
        {
          num: "02 / NATIONWIDE REACH",
          title: "From Legendary Eateries to Street Food",
          description:
            "Curating pork culinary gems across cities: Jakarta, Bali, Medan, Surabaya, Bandung, and beyond.",
          bg: "bg-[#c3b8eb]",
          text: "text-[#11140f]",
          icon: "Sliders",
        },
        {
          num: "03 / FAST SEARCH",
          title: "Confident Choices When Traveling",
          description:
            "Precise filters by city and pork preparation type so you can find your favorite comfort food anytime without second-guessing.",
          bg: "bg-[#BE132D]",
          text: "text-white",
          icon: "CheckCircle2",
        },
      ],
    },
    foodLanguage: {
      title: "Traditional Flavors, Transparent Without Compromise.",
      description:
        "From the aroma of roasted crispy pork to the rich spices of babi guling, enjoy rich culinary heritage with verified ingredient certainty.",
      cta: "Explore Directory",
    },
    pathways: {
      title: "Choose Your Culinary Starting Point.",
      subtitle:
        "From crispy pork belly, bowls of legendary noodles, to iconic regional street food specialties.",
      cards: [
        {
          num: "01",
          title: "Pork & Roasts",
          subtitle: "SAMCAN & BABI GULING",
          description:
            "Explore crispy roasted pork belly, babi guling, and charcoal-grilled spare ribs with authentic seasonings.",
          cta: "Explore Pork Roasts →",
          bg: "bg-[#c3b8eb]",
          text: "text-[#11140f]",
          image: "/images/samcan-crispy-pik.png",
          dishId: "kedai-samcan-emas-pik",
        },
        {
          num: "02",
          title: "Noodles & Eateries",
          subtitle: "NOODLES & CHINATOWN GEMS",
          description:
            "From minced pork curly noodles to classic dishes prepared with fragrant lard oil.",
          cta: "Explore Noodle Dishes →",
          bg: "bg-[#BE132D]",
          text: "text-white",
          image: "/images/bakmi-babi-medan.png",
          dishId: "bakmi-khek-selat-panjang",
        },
        {
          num: "03",
          title: "Street Food",
          subtitle: "REGIONAL HERITAGE FOOD",
          description:
            "Discover iconic street food from Bali, Medan, Pontianak, Surabaya, and Manado passed down through generations.",
          cta: "Explore Street Food →",
          bg: "bg-[#f8f7f3]",
          text: "text-[#11140f]",
          image: "/images/kwetiau-babi-surabaya.png",
          dishId: "kwetiau-goreng-achai",
        },
      ],
      tagline: "CURATED PORK DIRECTORY ACROSS INDONESIA.",
    },
    gallery: {
      title: "Curated Pork Culinary Directory",
      description:
        "Browse restaurants, eateries, and pork culinary spots in your city with ingredient transparency, signature dishes, and verified status.",
      cardCta: "View Restaurant Details ↗",
      bottomTag: "VERIFIED INGREDIENT & LOCATION DATA BY PERBABIAN TEAM.",
      bottomLink: "SUBMIT NEW RESTAURANT ↗",
    },
    steps: {
      title: "How Perbabian Works",
      subtitle:
        "Four simple steps to discover the best pork culinary with trusted ingredient transparency.",
      items: [
        {
          num: "01",
          title: "Select City & Region",
          description:
            "Choose where you are currently located or your next culinary destination.",
          bg: "bg-[#c3b8eb]",
          text: "text-[#11140f]",
        },
        {
          num: "02",
          title: "Filter by Ingredients",
          description:
            "Filter by preparation type: pork meat, lard oil, or 100% pork kitchens.",
          bg: "bg-[#f8f7f3]",
          text: "text-[#11140f]",
        },
        {
          num: "03",
          title: "Check Status & Menu",
          description:
            "Review ingredient transparency, signature dishes, price range, and verified hours.",
          bg: "bg-[#df6b51]",
          text: "text-white",
        },
        {
          num: "04",
          title: "Visit the Restaurant",
          description:
            "Use direct Google Maps integration to navigate with total confidence and ease.",
          bg: "bg-[#BE132D]",
          text: "text-white",
        },
      ],
    },
    experience: {
      title: "The Trusted Pork Culinary Guide",
      cards: [
        {
          icon: "Target",
          title: "100% Ingredient Transparency",
          description:
            "Clear details on whether food includes pork meat, lard cooking oil, or dedicated pork kitchens.",
        },
        {
          icon: "Sliders",
          title: "Nationwide Curated Coverage",
          description:
            "Cataloging family restaurants, legendary eateries, and street food across Jakarta, Bali, Medan, Surabaya, Bandung, and more.",
        },
        {
          icon: "Sparkles",
          title: "Fast Search & Navigation",
          description:
            "Precise regional filters and direct Google Maps routes to streamline your food adventures when out of town.",
        },
      ],
      disclaimer:
        "DATA IS CONTINUOUSLY CURATED AND VERIFIED BY PERBABIAN TEAM AND COMMUNITY CONTRIBUTORS.",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle:
        "Everything you need to know about using Perbabian, ingredient transparency, and restaurant submissions.",
      items: [
        {
          q: "What is Perbabian?",
          a: "Perbabian is Indonesia's pork culinary directory platform that helps diners find restaurants serving pork meat, lard, or other pork dishes accurately and transparently based on regional filters.",
        },
        {
          q: "How is ingredient and lard transparency displayed?",
          a: "Each restaurant is badged with clear status labels: 'Mengandung Daging Babi' (contains pork meat), 'Menggunakan Minyak Babi' (uses lard oil), and '100% Dapur Babi' for dedicated pork kitchens.",
        },
        {
          q: "Is the restaurant data verified?",
          a: "Yes. Restaurant entries are verified by the Perbabian team and community contributors to ensure accuracy of signature dishes, opening hours, and location.",
        },
        {
          q: "Can I find food when traveling to another city?",
          a: "Yes. Perbabian provides regional filters across provinces and cities (DKI Jakarta, Bali, Medan, Surabaya, Bandung, etc.) with integrated Google Maps links for seamless navigation.",
        },
        {
          q: "How can I submit my favorite restaurant?",
          a: "You can recommend and register your favorite eatery via the 'Daftarkan Restoran Baru' button so our team can review and list it in the directory.",
        },
      ],
    },
    cta: {
      title: "Have a Favorite Pork Food Spot?",
      subtitle:
        "Help the food lover community discover hidden gems and legendary eateries in your city. Register a restaurant today.",
      button: "Submit New Restaurant",
      secondary: "SEE HOW IT WORKS →",
    },
    footer: {
      brand: "PERBABIAN",
      description:
        "Curated pork culinary directory in Indonesia. Transparent ingredient information, lard status, and regional discovery.",
      navTitle: "NAVIGATION",
      links: [
        { label: "Restaurant Directory", href: "#cardapio" },
        { label: "How It Works", href: "#como-funciona" },
        { label: "Benefits", href: "#experiencia" },
        { label: "FAQ", href: "#faq" },
      ],
      copyright: "© 2026 PERBABIAN INDONESIA.",
      slogan: "CURATED & TRANSPARENT PORK CULINARY DIRECTORY IN INDONESIA.",
    },
  },
};
