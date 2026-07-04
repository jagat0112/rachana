// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Flame,
  Menu,
  X,
  Music2,
  ExternalLink,
  Youtube,
  Instagram,
  Facebook,
  Quote,
  Disc3,
  HeartHandshake,
  Mail,
  ChevronDown,
} from "lucide-react";

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
    </svg>
  );
}

/* ---------- scroll-reveal wrapper ---------- */
function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- drifting embers, pure CSS ---------- */
function Embers({ count = 22 }) {
  const embers = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 12,
        drift: `${(Math.random() - 0.5) * 120}px`,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e) => (
        <span
          key={e.id}
          className="ember-particle animate-ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            "--drift": e.drift,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- one-time content advisory ---------- */
function ContentAdvisory() {
  const [open, setOpen] = useState(
    () => !localStorage.getItem("rd_content_ok"),
  );
  function accept() {
    localStorage.setItem("rd_content_ok", "1");
    setOpen(false);
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-sm border border-wine/40 bg-ink-panel p-8 shadow-[0_0_60px_rgba(110,20,35,0.25)]">
        <div className="grain" />
        <Flame className="h-6 w-6 text-ember" />
        <h3 className="mt-4 font-serif text-2xl italic text-ash">
          Before you enter
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ash-muted">
          This is an unofficial fan archive built around Rachana Dahal's music —
          songs that sit inside grief, loss, and the silence around mental
          health. Some pages reference suicide and loss directly. If you're not
          in a place to carry that today, it's alright to leave this for later
          and look after yourself first.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://988lifeline.org/"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-ash-dim/60 px-4 py-2 text-xs uppercase tracking-widest text-ash-muted transition hover:border-ember hover:text-ember"
          >
            Get support
          </a>
          <button
            onClick={accept}
            className="rounded-sm bg-wine px-4 py-2 text-xs uppercase tracking-widest text-ash transition hover:bg-wine-light"
          >
            I understand, continue
          </button>
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { id: "about", label: "About" },
  { id: "discography", label: "Discography" },
  { id: "music", label: "Music" },
  { id: "themes", label: "Themes" },
  { id: "verses", label: "Verses" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#" className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-ember animate-flicker" />
          <span className="font-serif text-lg tracking-wide text-ash">
            Rachana Dahal
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-xs uppercase tracking-widest text-ash-muted transition hover:text-ember"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          className="rounded-sm border border-white/10 p-2 text-ash md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-sm uppercase tracking-widest text-ash-muted"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <div className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(110,20,35,0.35), transparent 60%), linear-gradient(180deg, #0f0d12 0%, #08070a 70%)",
        }}
      />
      <Embers />
      <div className="grain opacity-[0.15]" />
      <div className="vignette" />

      <div className="relative mx-auto max-w-4xl px-4 py-28 text-center">
        <Reveal className="flex items-center justify-center gap-3 text-ember">
          <span className="h-px w-10 bg-ember/50" />
          <span className="text-xs uppercase tracking-[0.3em]">
            Nepali singer · songwriter
          </span>
          <span className="h-px w-10 bg-ember/50" />
        </Reveal>

        <Reveal
          as="h1"
          className="mt-6 font-serif text-6xl italic tracking-tight text-ash text-glow md:text-8xl"
        >
          Rachana Dahal
        </Reveal>

        <Reveal className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ash-muted">
          A voice built from grief, toxic love, and the things Nepali women are
          told not to say aloud. This is an independent fan archive — verses,
          notes, and a quiet place to sit with the songs.
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#music"
            className="inline-flex items-center gap-2 rounded-sm bg-wine px-6 py-3 text-xs uppercase tracking-widest text-ash transition hover:bg-wine-light"
          >
            <Music2 className="h-4 w-4" /> Listen
          </a>
          <a
            href="#verses"
            className="inline-flex items-center gap-2 rounded-sm border border-ash-dim/50 px-6 py-3 text-xs uppercase tracking-widest text-ash-muted transition hover:border-ember hover:text-ember"
          >
            <Quote className="h-4 w-4" /> Read the verses
          </a>
        </Reveal>

        <a
          href="#about"
          className="mt-20 inline-flex flex-col items-center gap-1 text-ash-dim transition hover:text-ember"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Descend
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal className="mb-10 text-center">
      {eyebrow && (
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-ember">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl italic text-ash">{title}</h2>
      <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-ember/60 to-transparent" />
    </Reveal>
  );
}

function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 ${className}`}>
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow={eyebrow} title={title} />
        {children}
      </div>
    </section>
  );
}

function InstagramEmbed({ url }) {
  React.useEffect(() => {
    if (!window.instgrm) {
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      s.onload = () => window.instgrm?.Embeds?.process();
      document.body.appendChild(s);
    } else {
      window.instgrm?.Embeds?.process();
    }
  }, [url]);

  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-ink-panel">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ margin: 0, border: 0, padding: 0, background: "transparent" }}
      >
        <a href={url} target="_blank" rel="noreferrer" />
      </blockquote>
    </div>
  );
}

function About() {
  return (
    <Reveal className="grid gap-8 md:grid-cols-[1fr_auto_1fr]">
      <div className="space-y-4 text-ash-muted">
        <p>
          <span className="font-serif text-xl italic text-ash">
            Rachana Dahal
          </span>{" "}
          is a Kathmandu-based singer, songwriter, and entrepreneur, born on 8
          June 1997. She found her way to music as a teenager through guitar
          lessons at a local institute, and cut her teeth as a cover artist in
          Thamel's live music scene before mentors began pushing her toward the
          stage in her own right.
        </p>
        <p>
          Her sound fuses Nepali lyricism with the Western rock she grew up on —
          Guns N' Roses, Linkin Park, Nirvana — turning private wounds into
          something an entire room can hold at once. Her live sets are often
          described as cathartic: less performance, more communal release.
        </p>
      </div>
      <div className="divider-flame mx-auto hidden md:block" />
      <div className="space-y-4 text-ash-muted">
        <p>
          She released her debut, <em className="text-ash">Bhumari</em>, in 2019
          — written, sung, and composed entirely by her — followed the same year
          by <em className="text-ash">Soch</em>. 2020 brought{" "}
          <em className="text-ash">Sapanako Raja</em> and{" "}
          <em className="text-ash">Daagbatti</em>, with{" "}
          <em className="text-ash">Hey Bhagwan</em> and{" "}
          <em className="text-ash">Aagya</em> following soon after.
        </p>
        <p>
          Across that catalogue she keeps returning to the same raw material:
          toxic relationships, the mental health that Nepali households rarely
          discuss out loud, and the narrow expectations placed on women. Grief
          runs underneath almost all of it.
        </p>
        <p className="text-sm text-ash-dim">
          If today feels heavy, the support resources in the footer are there
          for you, not just for reading about her.
        </p>
      </div>
    </Reveal>
  );
}

function Discography() {
  const releases = [
    {
      year: "2019",
      title: "Bhumari",
      note: "Her debut — written, sung, and composed by Rachana herself. The first crack in the door.",
    },
    {
      year: "2019",
      title: "Soch",
      note: "Released the same year as Bhumari, turning inward thought into sound.",
    },
    {
      year: "2020",
      title: "Sapanako Raja",
      note: "A softer register, still carrying the weight underneath.",
    },
    {
      year: "2020",
      title: "Daagbatti",
      note: "Inspired, in her own account, by her uncle's suicide and the grief his widow was left to carry — anger at his choice, guilt for not being able to stop it.",
    },
    {
      year: "2021",
      title: "Hey Bhagwan",
      note: "A question aimed upward, somewhere between prayer and accusation.",
    },
    {
      year: "2021",
      title: "Aagya",
      note: "Frustration and helplessness inside a relationship already coming apart — one more conversation, held onto like permission to try again.",
    },
  ];
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-ember/60 via-wine/40 to-transparent md:left-1/2 md:-translate-x-1/2" />
      <div className="space-y-10">
        {releases.map((r, i) => (
          <Reveal
            key={r.title}
            className={`relative flex flex-col gap-2 pl-8 md:w-1/2 md:pl-0 md:pr-10 ${
              i % 2 === 1
                ? "md:ml-auto md:pl-10 md:pr-0 md:text-left"
                : "md:text-right"
            }`}
          >
            <span
              className={`absolute left-0 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-ember bg-ink md:top-1.5 md:translate-x-0 ${
                i % 2 === 1
                  ? "md:left-0 md:-translate-x-1/2"
                  : "md:left-auto md:right-0 md:translate-x-1/2"
              }`}
            />
            <p className="font-serif text-2xl italic text-ember">{r.year}</p>
            <h3 className="font-serif text-xl text-ash">{r.title}</h3>
            <p className="text-sm leading-relaxed text-ash-muted">{r.note}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Music() {
  return (
    <Reveal className="grid items-start gap-6 md:grid-cols-2">
      <div className="overflow-hidden rounded-sm border border-white/10 bg-ink-panel">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/ZMUMAeNqGgo?rel=0&modestbranding=1&playsinline=1&color=white"
            title="Rachana Dahal — Live/Official"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-sm">
          <span className="text-ash-muted">Latest performance</span>
          <a
            href="https://youtu.be/ZMUMAeNqGgo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-ash hover:text-ember"
          >
            Open <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-sm border border-white/10 bg-ink-panel">
        <div className="p-3">
          <iframe
            src="https://open.spotify.com/embed/artist/7rEwUNVg5AYcD1MTlRJ5aj?utm_source=generator"
            title="Spotify artist"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="h-[352px] w-full rounded-sm"
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-sm">
          <span className="text-ash-muted">Full catalogue</span>
          <a
            href="https://open.spotify.com/artist/7rEwUNVg5AYcD1MTlRJ5aj"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-ash hover:text-ember"
          >
            Open <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function Themes() {
  const items = [
    {
      title: "Grief & loss",
      body: "Daagbatti sits closest to the bone here — written, by her own account, out of her uncle's suicide and the widow left holding both anger and guilt. Death in her songs is rarely abstract.",
    },
    {
      title: "Mental health, unspoken",
      body: "Hey Bhagwan and Aagya sit inside the kind of despair Nepali households often leave untranslated — she gives it a melody instead of a silence.",
    },
    {
      title: "Toxic love",
      body: "Relationships that should end but don't, told without villains — just two people doing damage they can't quite name.",
    },
    {
      title: "Being a woman, out loud",
      body: "The expectations placed on Nepali women — quiet, agreeable, small — pushed back against in a voice built for rock stages, not drawing rooms.",
    },
  ];
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((t) => (
        <Reveal
          key={t.title}
          className="rounded-sm border border-white/10 bg-ink-panel p-6 transition hover:border-wine/50"
        >
          <Flame className="h-4 w-4 text-ember" />
          <h3 className="mt-3 font-serif text-xl italic text-ash">{t.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ash-muted">
            {t.body}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

function Lyrics() {
  const items = [
    {
      title: "टाट पल्टेर — excerpt",
      excerpt: "उठ न, गरौँ कुराकानी",
      notes: [
        "Insomnia and longing: two sleepless nights, a mind 'flipped over'.",
        "Push–pull intimacy: truth surfaces under alcohol, then retreats into regret.",
        "Vivid imagery — the city painted red; the body reduced to a skeleton, then emptiness.",
        "The refrain anchors the spiral; the ending stays deliberately unresolved.",
      ],
      links: { youtube: "https://youtu.be/ZMUMAeNqGgo" },
    },
    {
      title: "दागबत्ती — excerpt",
      excerpt: "हाँस्नै मर्नँ, तिम्रो यादमा",
      notes: [
        "Grief as metaphor: laughter itself becomes lethal inside memory.",
        "The title evokes mourning rituals — a lit stick, a lingering burn.",
        "Life (laughter) and death (the burning incense) sit in the same breath.",
        "By Rachana's own account, written after her uncle's suicide — anger at him, guilt at not saving him, grief that had nowhere else to go.",
      ],
      links: { youtube: "https://www.youtube.com/watch?&v=rpTiqiu76HE" },
    },
    {
      title: "आग्या — excerpt",
      excerpt: "सचेत रहन फेरि बोलाउँछ",
      notes: [
        "A calling-back to awareness, mid-collapse.",
        "The tension between staying silent and needing to speak again.",
        "'Aagya' — permission — as a stand-in for the permission she's asking to give herself.",
        "Frustration and helplessness inside a relationship already unraveling.",
      ],
      links: { youtube: "https://m.youtube.com/watch?v=U_uZhDJ6iFo" },
    },
  ];

  return (
    <div className="space-y-4">
      {items.map((it) => (
        <Reveal
          as="details"
          key={it.title}
          className="group rounded-sm border border-white/10 bg-ink-panel p-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-lg italic text-ash">
            <span>{it.title}</span>
            <span className="text-[10px] uppercase tracking-widest text-ash-dim group-open:hidden">
              show
            </span>
            <span className="hidden text-[10px] uppercase tracking-widest text-ash-dim group-open:inline">
              hide
            </span>
          </summary>

          <div className="mt-4 space-y-4 border-t border-white/5 pt-4">
            {it.excerpt && (
              <blockquote className="flex items-start gap-2 text-lg italic text-ash">
                <Quote className="mt-1 h-4 w-4 shrink-0 text-ember" />
                {it.excerpt}
              </blockquote>
            )}

            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ash-muted">
              {it.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-1 text-sm">
              {it.links.youtube && (
                <a
                  href={it.links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-sm border border-white/10 px-3 py-1.5 text-xs uppercase tracking-widest text-ash-muted hover:border-ember hover:text-ember"
                >
                  YouTube <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      ))}

      <p className="text-xs text-ash-dim">
        Short quotes shown for commentary and review. For full lyrics, please
        visit the official releases.
      </p>
    </div>
  );
}

function Gallery() {
  return (
    <Reveal className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      <InstagramEmbed url="https://www.instagram.com/p/DNnfgGXytq9/?hl=en" />
      <InstagramEmbed url="https://www.instagram.com/p/DM-M1EdydsU" />
      <InstagramEmbed url="https://www.instagram.com/p/DMXzUWAy_Mp" />
    </Reveal>
  );
}

function FanNote() {
  return (
    <Reveal className="mx-auto max-w-2xl rounded-sm border border-wine/30 bg-gradient-to-b from-ink-panel to-ink p-8 text-center">
      <Disc3 className="mx-auto h-6 w-6 text-ember" />
      <p className="mt-5 font-serif text-xl italic leading-relaxed text-ash">
        Some songs exist so a room full of strangers can grieve the same thing
        at once, and leave a little lighter than they came in.
      </p>
      <p className="mt-4 text-xs uppercase tracking-widest text-ash-dim">
        — a note from this fan archive, not the artist
      </p>
      <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3 rounded-sm border border-white/10 bg-ink px-4 py-3 text-left text-xs text-ash-muted">
        <HeartHandshake className="h-4 w-4 shrink-0 text-ember" />
        <span>
          If a lyric on this page hits too close, it's okay to close the tab and
          talk to someone — the numbers below are real, and they answer.
        </span>
      </div>
    </Reveal>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center">
        <div className="flex items-center gap-4 text-ash-muted">
          <a
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest hover:text-ember"
            href="https://www.youtube.com/@rachana_dahal"
            target="_blank"
            rel="noreferrer"
          >
            <Youtube className="h-4 w-4" /> YouTube
          </a>
          <a
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest hover:text-ember"
            href="https://www.instagram.com/rachana_dahal"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
          <a
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest hover:text-ember"
            href="https://www.facebook.com/rachanadahalmusic/"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="h-4 w-4" /> Facebook
          </a>
          <a
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest hover:text-ember"
            href="https://www.tiktok.com/@rachana.live"
            target="_blank"
            rel="noreferrer"
          >
            <TikTokIcon className="h-4 w-4" /> TikTok
          </a>
        </div>

        <p className="max-w-2xl text-xs leading-relaxed text-ash-dim">
          Fan-made site, not affiliated with the artist. If you're struggling,
          please reach out. In Nepal:{" "}
          <a
            href="https://tuth.org.np/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-wine underline-offset-2 hover:text-ember"
          >
            TUTH Suicide Hotline (+977-1-4412505)
          </a>
          ,{" "}
          <a
            href="https://koshishnepal.org/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-wine underline-offset-2 hover:text-ember"
          >
            Koshish Nepal
          </a>
          , or{" "}
          <a
            href="https://tponepal.org/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-wine underline-offset-2 hover:text-ember"
          >
            TPO Nepal
          </a>
          .
        </p>
        <p className="text-[11px] text-ash-dim/70">
          © {new Date().getFullYear()} Unofficial Rachana Dahal fan archive.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-sans text-ash">
      <ContentAdvisory />
      <Header />
      <Hero />

      <Section id="about" eyebrow="Who she is" title="About">
        <About />
      </Section>

      <Section
        id="discography"
        eyebrow="A timeline"
        title="Discography"
        className="bg-ink-soft"
      >
        <Discography />
      </Section>

      <Section id="music" eyebrow="Listen" title="Music">
        <Music />
      </Section>

      <Section
        id="themes"
        eyebrow="What runs through it"
        title="Recurring themes"
        className="bg-ink-soft"
      >
        <Themes />
      </Section>

      <Section id="verses" eyebrow="Close reading" title="Verses & notes">
        <Lyrics />
      </Section>

      <Section
        id="gallery"
        eyebrow="Moments"
        title="Gallery"
        className="bg-ink-soft"
      >
        <Gallery />
      </Section>

      <Section id="reflection" title="">
        <FanNote />
      </Section>

      <Section id="contact" eyebrow="Reach out" title="Contact">
        <Reveal className="mx-auto max-w-md rounded-sm border border-white/10 bg-ink-panel p-6 text-center">
          <Mail className="mx-auto h-5 w-5 text-ember" />
          <p className="mt-3 text-sm text-ash-muted">
            For takedown requests or corrections, email:{" "}
            <a
              href="mailto:jagat.pradhan0112@gmail.com"
              className="text-ash underline decoration-wine underline-offset-2 hover:text-ember"
            >
              jagat.pradhan0112@gmail.com
            </a>
          </p>
        </Reveal>
      </Section>

      <Footer />
    </div>
  );
}
