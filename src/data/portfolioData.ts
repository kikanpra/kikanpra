import { ProjectItem, CertificateItem, ServiceItem } from "../types";

export const HERO_DATA = {
  name: "Kikan",
  fullName: "Kikan Pratiwi R.",
  title: "Freelance Designer",
  bio: "Saya mahasiswa Teknik Informatika, Fakultas Teknik, Universitas Halu Oleo. Saya seorang Freelance Designer yang berfokus pada Graphic Design, Sosial Media Design, dan Web Design. Saya senang mengubah ide menjadi karya visual yang kreatif, menarik, dan memiliki tujuan. Selalu terbuka untuk mengeksplorasi ide baru dan menghadirkan solusi desain yang sesuai dengan kebutuhan setiap proyek.",
  yearsExperience: "15+",
  projectsCompleted: "3",
  certificatesCount: "3",
  industriesCovered: "6",
  email: "kpratiwir@gmail.com",
  instagramUrl: "https://www.instagram.com/khknnn_/",
  githubUrl: "https://github.com/kikanpra",
  linkedinUrl: "https://www.linkedin.com/in/USERNAME_KAMU/",
  location: "Kendari, Indonesia",
  portraitUrl: "/images/cover.png",
  aboutImageUrl: "/images/fotoaboutme2.jpeg",
};

export const MARQUEE_ITEMS = [
  "Graphic Designer",
  "Sosial Media",
  "Web Design",
  "Visual Design",
  "Video Editing",
  "Brand Strategy",
  "UI/UX Design",
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: "p1",
    title: "Backdrop Seminar",
    category: "Branding",
    client: "Fakultas Teknik Universitas Halu Oleo",
    year: "2026",
    description:
      "Kegiatan seminar membutuhkan identitas visual yang kuat dan konsisten untuk merepresentasikan tema acara serta institusi penyelenggara. Tanpa desain backdrop yang terarah, tampilan panggung berisiko terlihat kurang menarik dan tidak mampu membangun suasana acara yang profesional.",
    solution:
      "Merancang backdrop seminar profesional yang memadukan identitas institusi, informasi acara, dan elemen visual yang selaras ke dalam sebuah komposisi yang utuh. Berfokus pada hierarki visual, tata letak yang seimbang, dan penerapan branding yang konsisten untuk menciptakan suasana acara yang menarik dan mudah dikenali.",
    projectBackground:
      "Fakultas Teknik Universitas Halu Oleo membutuhkan desain backdrop seminar sebagai elemen visual utama dalam mendukung penyelenggaraan acara. Desain ini dibuat untuk memperkuat identitas institusi, merepresentasikan karakter kegiatan, serta menciptakan tampilan panggung yang informatif dan profesional.",
    tags: ["Event Design", "Backdrop", "Print Design"],
    metrics: "+42% Brand Recall",
    imageUrl: "/images/backdrop.png",
  },
  {
    id: "p2",
    title: "Atika Care",
    category: "UI/UX Design",
    client: "UP BK Universitas Halu Oleo",
    year: "2026",
    description:
      "Mahasiswa membutuhkan akses layanan konseling yang mudah dan praktis, tetapi proses pendaftaran secara konvensional dapat menjadi hambatan dari segi aksesibilitas, kejelasan informasi, dan kemudahan penggunaan. Oleh karena itu, diperlukan sebuah platform digital terpusat yang dapat mempermudah mahasiswa dalam mengakses layanan konseling di lingkungan universitas.",
    solution:
      "Mendesain platform digital berbasis web yang memudahkan mahasiswa dalam mengakses layanan konseling. Fokus pada pengalaman pengguna yang intuitif, navigasi yang jelas, dan antarmuka yang responsif untuk memastikan mahasiswa dapat dengan mudah menemukan informasi, mendaftar, dan berinteraksi dengan layanan konseling secara efisien.",
    projectBackground:
      "UP BK Universitas Halu Oleo ingin meningkatkan aksesibilitas layanan konseling bagi mahasiswa. Dengan adanya platform digital ini, diharapkan mahasiswa dapat lebih mudah mendapatkan dukungan psikologis dan bimbingan akademik melalui proses pendaftaran yang lebih cepat dan nyaman.",
    software: ["Figma", "Adobe Illustrator"],
    tags: ["UI/UX", "Figma", "Booking System"],
    imageUrl: "/images/web.png",
  },
  {
    id: "p3",
    title: "PhiaNews Social Media",
    category: "Branding",
    client: "Phia",
    year: "2026",
    description:
      "Penyajian berita yang hanya mengandalkan teks sering kali membuat audiens merasa bosan dan kurang tertarik untuk mengikuti perkembangan informasi. Di sisi lain, maraknya penyebaran informasi di media sosial juga menimbulkan keraguan terhadap keaslian dan kebenaran berita yang diterima masyarakat. Hal ini menjadi tantangan dalam menghadirkan informasi yang menarik sekaligus dapat dipercaya.",
    solution:
      "Menghadirkan berita dalam format video pendek yang lebih dinamis dan mudah dipahami melalui kombinasi narasi, takarir (subtitle) dinamis, serta grafis gerak yang informatif. Proses produksi dan penyuntingan dirancang untuk menyampaikan informasi secara ringkas, menarik, dan tetap memperhatikan keakuratan sumber berita agar audiens memperoleh informasi yang lebih jelas dan terpercaya.",
    projectBackground:
      "PhiaNews merupakan proyek produksi konten berita digital yang berfokus pada penyampaian informasi aktual melalui media audiovisual. Proyek ini bertujuan menghadirkan alternatif penyajian berita yang lebih menarik bagi audiens digital sekaligus mendukung penyampaian informasi yang akurat dan dapat dipertanggungjawabkan.",
    software: ["Adobe Illustrator", "CapCut"],
    tags: ["CapCut", "News Editing", "Sosial Media"],
    imageUrl: "/images/phia.png",
  },
];

export const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: "c1",
    title: "Desain Grafis Kegiatan Seminar",
    issuer: "UNITED CITIES AND LOCAL GOVERNMENTS ASIA-PACIFIC",
    year: "2026",
    badgeUrl: "/images/ser1.png",
  },

  {
    id: "c2",
    title: "Program Kreativitas Mahasiswa (PKM) Bidang GFT",
    issuer: "Kemdikbudristek RI",
    year: "2024",
    badgeUrl: "/images/pkm.png",
  },
  {
    id: "c3",
    title: "Microsoft Azure AI Fundamentals",
    issuer: "Talenta AI Indonesia",
    year: "2024",
    badgeUrl: "/images/AI digital.png",
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "s1",
    title: "Graphic Design",
    iconName: "brush",
    description:
      "Crafting unique visual identities and marketing materials that resonate with your audience.",
    isFeatured: true,
    deliverables: [
      "Brand Identity & Style Guides",
      "Marketing Collaterals & Social Kits",
      "Packaging & Print Production",
      "Vector Illustrations & Iconography",
    ],
    pricingStarting: "$800",
    turnaround: "1-2 Weeks",
  },
  {
    id: "s2",
    title: "Editing Video",
    iconName: "movie_edit",
    description:
      "Transforming raw footage into cinematic stories with professional editing and effects.",
    isFeatured: false,
    deliverables: [
      "Commercials & Product Videos",
      "Social Media Reels & TikTok Cuts",
      "Color Grading & Audio Mastering",
      "Motion Graphics & Title Animations",
    ],
    pricingStarting: "$600",
    turnaround: "3-5 Days",
  },
  {
    id: "s3",
    title: "Web Design",
    iconName: "language",
    description:
      "Creating modern, responsive websites that focus on user experience and visual beauty.",
    isFeatured: false,
    deliverables: [
      "Figma UI/UX Prototypes",
      "Responsive Landing Pages",
      "Design Systems & Component Libraries",
      "Conversion Rate Optimization UI",
    ],
    pricingStarting: "$1,200",
    turnaround: "2-3 Weeks",
  },
];
