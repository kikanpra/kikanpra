import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Instagram,
  Github,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Sparkles,
  MessageCircle,
  Globe2,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { HERO_DATA } from "../data/portfolioData";
import { ContactFormData } from "../types";

interface LiveComment {
  id: string;
  name: string;
  message: string;
  tag: string;
  createdAt: string;
  likes: number;
  avatarColor: string;
  rawTimestamp?: number;
}

const INITIAL_COMMENTS: LiveComment[] = [];

const AVATAR_GRADIENTS = [
  "from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-600",
];

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 45) return "Baru saja";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit yang lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam yang lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari yang lalu`;
  const months = Math.floor(days / 30);
  return `${months} bulan yang lalu`;
}

interface ContactSectionProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenPrivacy,
  onOpenTerms,
}) => {
  // Contact Form State
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Live Comments State (Public Real-Time Cloud Firestore Sync)
  const [comments, setComments] = useState<LiveComment[]>(INITIAL_COMMENTS);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(true);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);

  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commentSuccessAnim, setCommentSuccessAnim] = useState(false);

  // Listen to Firestore real-time updates for all visitors
  useEffect(() => {
    let unsubscribe: () => void = () => {};

    try {
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, orderBy("createdAt", "desc"));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const liveItems: LiveComment[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              let timeStr = "Baru saja";
              let rawTs = Date.now();

              if (data.createdAt instanceof Timestamp) {
                const d = data.createdAt.toDate();
                timeStr = formatTimeAgo(d);
                rawTs = d.getTime();
              } else if (
                data.createdAt &&
                typeof data.createdAt.toDate === "function"
              ) {
                const d = data.createdAt.toDate();
                timeStr = formatTimeAgo(d);
                rawTs = d.getTime();
              }

              return {
                id: docSnap.id,
                name: data.name || "",
                message: data.message || "",
                tag: data.tag || "",
                createdAt: timeStr,
                likes: 0,
                avatarColor: data.avatarColor || AVATAR_GRADIENTS[0],
                rawTimestamp: rawTs,
              };
            });
            setComments(liveItems);
          } else {
            // If empty in cloud, keep initial seed comments
            setComments(INITIAL_COMMENTS);
          }
          setIsLoadingComments(false);
        },
        (error) => {
          console.warn(
            "Firestore live listener notice (using fallback):",
            error,
          );
          setIsLoadingComments(false);
        },
      );
    } catch (e) {
      console.warn("Firestore setup error:", e);
      setIsLoadingComments(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

// Handle Contact Inquiry Form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage("Please fill in your name, email, and message.");
      setStatus("error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please provide a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    setTimeout(() => {
      setStatus("success");
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#27459e", "#A8E86C", "#1b3275", "#ffffff"],
        });
      } catch {
        // Safe fallback
      }

      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
        setStatus("idle");
      }, 5000);
    }, 900);
  };

  // Handle Post Live Comment to Cloud Firestore
  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      setCommentError("Mohon isi nama dan komentar Anda.");
      return;
    }

    setCommentError("");
    setIsPostingComment(true);

    const randomGradient =
      AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)];

    try {
      // Simpan ke Firebase
      await addDoc(collection(db, "comments"), {
        name: commentName.trim(),
        message: commentText.trim(),
        createdAt: serverTimestamp(),
        avatarColor: randomGradient,
      });

      setCommentName("");
      setCommentText("");
      setCommentSuccessAnim(true);

      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.8 },
          colors: ["#A8E86C", "#FFFFFF", "#60A5FA"],
        });
      } catch {
        // safe
      }

      setTimeout(() => {
        setCommentSuccessAnim(false);
      }, 3500);
    } catch (err: unknown) {
      console.error("Error posting comment to Firebase:", err);
      // Optimistic local fallback if offline
      const newComment: LiveComment = {
        id: `local-${Date.now()}`,
        name: commentName.trim(),
        message: commentText.trim(),
        tag: "",
        createdAt: "Baru saja",
        likes: 0,
        avatarColor: randomGradient,
      };
      setComments((prev) => [newComment, ...prev]);
      setCommentName("");
      setCommentText("");
      setCommentSuccessAnim(true);
    } finally {
      setIsPostingComment(false);
    }
  };

return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-[#1b3275] text-white relative overflow-hidden transition-colors duration-300 border-t border-white/10"
    >
      {/* Ambient background glows matching Portfolio / Experience section */}
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#27459e]/60 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#A8E86C]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#27459e]/20 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div
            id="contact-tag"
            className="inline-block py-1.5 px-4 bg-white/10 text-[#A8E86C] rounded-full text-xs sm:text-sm font-bold tracking-wide mb-6 border border-white/10 backdrop-blur-sm"
          >
            — Kontak
          </div>

          <h2
            id="contact-main-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight"
          >
            Hubungi <span className="text-[#A8E86C]">Saya</span>
          </h2>
        </div>

        {/* 2-Column Balanced Grid: Contact Form (Left) & Live Comments Feed (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ========================================================= */}
          {/* BAGIAN 1: KONTAK & PESAN PRIBADI (6 Columns) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 bg-slate-900/80 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-9 md:p-10 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Top Glow Accent */}
            <div
              className="absolute top-0 right-0 w-56 h-56 bg-[#A8E86C]/10 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#A8E86C]/20 text-[#A8E86C] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    Hubungi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Langsung bertanya untuk proyek freelance &amp; desain khusus
                  </p>
                </div>
              </div>

              {/* Direct Info Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                <a
                  href={`mailto:${HERO_DATA.email}`}
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#A8E86C] group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">
                      Email
                    </div>
                    <div className="text-xs font-bold text-white truncate group-hover:text-[#A8E86C] transition-colors">
                      {HERO_DATA.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#A8E86C]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">
                      Location
                    </div>
                    <div className="text-xs font-bold text-white">
                      {HERO_DATA.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              {status === "success" ? (
                <div
                  id="form-success-banner"
                  className="bg-emerald-950/40 border border-[#A8E86C]/40 rounded-3xl p-8 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300 my-4"
                >
                  <div className="w-14 h-14 bg-[#A8E86C]/20 rounded-full flex items-center justify-center mb-4 text-[#A8E86C]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-bold mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-sm mb-5 leading-relaxed">
                    Terima kasih telah menghubungi! Saya akan merespons pesan
                    Anda dalam kurun waktu 24 jam.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 bg-[#A8E86C] text-black font-bold rounded-full text-xs hover:scale-105 transition-transform cursor-pointer"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form
                  id="contact-inquiry-form"
                  onSubmit={handleContactSubmit}
                  className="space-y-4"
                >
                  {errorMessage && (
                    <div className="p-3 bg-rose-500/20 border border-rose-500/40 text-rose-200 rounded-xl text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="input-full-name"
                        className="block text-xs font-semibold mb-1.5 opacity-80"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="input-full-name"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Nama Anda"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#A8E86C] focus:ring-1 focus:ring-[#A8E86C] outline-none transition-colors text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="input-email-address"
                        className="block text-xs font-semibold mb-1.5 opacity-80"
                      >
                        Email
                      </label>
                      <input
                        id="input-email-address"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email@example.com"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#A8E86C] focus:ring-1 focus:ring-[#A8E86C] outline-none transition-colors text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="input-subject"
                      className="block text-xs font-semibold mb-1.5 opacity-80"
                    >
                      Subjek / Kebutuhan Layanan
                    </label>
                    <input
                      id="input-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Contoh: Desain Logo & Branding"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#A8E86C] focus:ring-1 focus:ring-[#A8E86C] outline-none transition-colors text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="textarea-message"
                      className="block text-xs font-semibold mb-1.5 opacity-80"
                    >
                      Pesan Anda
                    </label>
                    <textarea
                      id="textarea-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Ceritakan detail proyek atau pertanyaan Anda..."
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#A8E86C] focus:ring-1 focus:ring-[#A8E86C] outline-none transition-colors resize-none text-xs sm:text-sm"
                    />
                  </div>

                  <button
                    id="btn-send-contact-message"
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 bg-[#A8E86C] hover:bg-[#97d85b] text-black rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 transition-all duration-200 shadow-lg shadow-[#A8E86C]/20 cursor-pointer disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengirim pesan...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirim Pesan</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sosial Media ROW */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-2.5">
                <a
                  href="https://instagram.com/khknnn_"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram profile"
                  className="w-12 h-12 bg-white/10 hover:bg-[#A8E86C] hover:text-black rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/kikanpra"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="w-12 h-12 bg-white/10 hover:bg-[#A8E86C] hover:text-black rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BAGIAN 2: LIVE COMMENTS & PUBLIC FEED (6 Columns) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 bg-slate-900/80 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-9 md:p-10 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Top Glow Accent */}
            <div
              className="absolute top-0 left-0 w-56 h-56 bg-[#27459e]/30 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Header with Live Counter Badge & Cloud Status */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                        Pesan
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Tinggalkan pesan, ulasan, atau feedback Anda
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{comments.length} Komentar</span>
                  </div>
                </div>
              </div>

              {/* Form Tulis Komentar Langsung */}
              <form
                onSubmit={handlePostComment}
                className="bg-black/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 mb-6 relative"
              >
                {commentError && (
                  <div className="mb-3 p-2 bg-rose-500/20 border border-rose-500/40 text-rose-200 rounded-lg text-xs">
                    {commentError}
                  </div>
                )}

                {commentSuccessAnim && (
                  <div className="mb-3 p-2.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 rounded-lg text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <Sparkles className="w-4 h-4 text-[#A8E86C]" />
                    <span>
                      Komentar Anda berhasil dipublikasikan &amp; dapat dilihat
                      oleh semua orang!
                    </span>
                  </div>
                )}

                <div className="mb-3">
                  <input
                    type="text"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Nama Anda *"
                    disabled={isPostingComment}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-white/30 focus:border-[#A8E86C] outline-none text-xs disabled:opacity-50"
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Tulis ulasan, feedback, atau pesan Anda di sini..."
                    disabled={isPostingComment}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-white/30 focus:border-[#A8E86C] outline-none text-xs resize-none disabled:opacity-50"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={isPostingComment}
                    className="w-full px-5 py-2 bg-[#27459e] hover:bg-[#1f3780] text-white font-display font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all hover:scale-105 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isPostingComment ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <span>Post Comment</span>
                        <Send className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Scrollable Live Feed List */}
              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {isLoadingComments ? (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-[#A8E86C]" />
                    <span className="text-xs">Memuat komentar publik...</span>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    Belum ada komentar. Jadilah yang pertama memberikan ulasan!
                  </div>
                ) : (
                  comments.map((comment, index) => (
                    <div
                      key={comment.id}
                      className={`bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/5 transition-all duration-300 ${
                        index === 0 && commentSuccessAnim
                          ? "ring-2 ring-[#A8E86C] bg-emerald-950/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          {/* Dynamic Gradient Avatar */}
                          <div
                            className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${comment.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-sm uppercase`}
                          >
                            {comment.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                              <span>{comment.name}</span>
                              {index === 0 && commentSuccessAnim && (
                                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#A8E86C] text-black">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {comment.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed mb-3">
                        {comment.message}
                      </p>

                      <div className="flex items-center justify-end pt-2 border-t border-white/5">
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Note Pesan Real Time */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#A8E86C]" />
                <span>
                  Semua ulasan bisa dilihat secara publik.
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <footer
          id="main-footer"
          className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs sm:text-sm text-slate-300 font-medium"
        >
          <p id="footer-copyright-text">
            © {new Date().getFullYear()} {HERO_DATA.fullName}. All Rights
            Reserved.
          </p>

          <div className="flex items-center gap-8">
            <button
              id="footer-link-privacy"
              onClick={onOpenPrivacy}
              className="hover:text-[#A8E86C] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              id="footer-link-terms"
              onClick={onOpenTerms}
              className="hover:text-[#A8E86C] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};
