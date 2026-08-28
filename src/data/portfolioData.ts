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
  aboutImageUrl: "/images/pov.jpeg",
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
      "Backdrop seminar yang dirancang untuk menciptakan identitas visual yang kohesif dan profesional, meningkatkan pengalaman peserta, dan memperkuat citra merek acara.",
    tags: ["Event Design", "Backdrop", "Print Design"],
    metrics: "+42% Brand Recall",
    imageUrl: "/images/Backdrop.png",
  },
  {
    id: "p2",
    title: "Atika Care",
    category: "UI/UX Design",
    client: "UP BK Universitas Halu Oleo",
    year: "2026",
    description:
      "Atika Care adalah webstie pendaftaran konseling online Universitas Halu Oleo yang dirancang untuk memberikan pengalaman pengguna yang intuitif, responsif, dan aman bagi mahasiswa yang mencari layanan konseling.",
    tags: ["UI/UX", "Figma", "Booking System"],
    imageUrl: "/images/web.png",
  },
  {
    id: "p3",
    title: "PhiaNews Social Media Coverage",
    category: "Branding",
    client: "PhiaNews",
    year: "2026",
    description:
      "Produksi video berita yang bergerak cepat dan dioptimalkan untuk platform media sosial. Menampilkan takarir (subtitle) dinamis, grafis gerak yang informatif, serta penyampaian cerita yang ringkas dan dirancang khusus untuk memikat audiens digital PhiaNews.",
    tags: ["CapCut", "News Editing", "Sosial Media"],
    imageUrl: "/images/PhiaNews.png",
  },
];

export const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: "c1",
    title: "Desain Grafis Kegiatan Seminar",
    issuer: "UNITED CITIES AND LOCAL GOVERNMENTS ASIA-PACIFIC",
    year: "2026",
    credentialId: "Desain-Grafis-Kegiatan-Seminar-2026",
    description:
      "Comprehensive qualification in user research, wireframing, interactive prototyping, and usability testing methodologies.",
    badgeUrl: "/images/ser1.png",
  },
  {
    id: "c2",
    title: "Program Kreativitas Mahasiswa (PKM) Bidang GFT",
    issuer: "Kemdikbudristek RI",
    year: "2024",
    credentialId: "PKM-GFT-UHO-2025",
    description:
      "Pengajuan proposal Gagasan Futuristik Tertulis (GFT) yang visioner dan realistis, bertujuan untuk menawarkan solusi inovatif terhadap permasalahan bangsa dan global ke depannya.",
    badgeUrl: "/images/pkm.png",
  },
  {
    id: "c3",
    title: "Microsoft Azure AI Fundamentals",
    issuer: "Talenta AI Indonesia",
    year: "2024",
    credentialId: "MAAIF-2024",
    description:
      "Sertifikat kelulusan atas keberhasilan menyelesaikan program Microsoft Azure AI Fundamentals yang diselenggarakan oleh Microsoft, Kartu Prakerja, dan Mereka.",
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
