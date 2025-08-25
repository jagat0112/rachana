// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  Moon,
  SunMedium,
  Menu,
  Music2,
  ExternalLink,
  Youtube,
  Instagram,
  Twitter,
  Github,
  Facebook,
} from "lucide-react";

// ----- theme hook (dark by default) -----
function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
    </svg>
  );
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

function SpotifyEmbed({ type = "artist", id, height = 352 }) {
  const src = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
  return (
    <iframe
      src={src}
      width="100%"
      height={height}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="w-full rounded-2xl border border-gray-200 dark:border-gray-800"
      title={`Spotify ${type}`}
    />
  );
}

function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === "dark";
  return (
    <button
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunMedium className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

// ----- content advisory (one-time) -----
function ContentAdvisory() {
  const [open, setOpen] = useState(
    () => !localStorage.getItem("rd_content_ok")
  );
  function accept() {
    localStorage.setItem("rd_content_ok", "1");
    setOpen(false);
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-200 shadow-xl">
        <h3 className="text-lg font-semibold">Content advisory</h3>
        <p className="mt-3 text-sm text-gray-300">
          This fan site explores themes like grief, self-harm, and depression
          reflected in Rachana Dahal’s art. If you’re not in the headspace for
          that, please take care of yourself first.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="https://988lifeline.org/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-800"
          >
            Get support
          </a>
          <button
            onClick={accept}
            className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black hover:bg-gray-100"
          >
            I understand
          </button>
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { id: "about", label: "About" },
  { id: "music", label: "Music" },
  { id: "lyrics", label: "Lyrics & Notes" },
  { id: "gallery", label: "Gallery" },
  { id: "shows", label: "Shows" },
  { id: "contact", label: "Contact" },
];

function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#"
          className="text-lg font-semibold tracking-tight dark:text-white"
        >
          Rachana Dahal — Fan
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {n.label}
            </a>
          ))}
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
            onClick={() => setOpen((s) => !s)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t dark:border-gray-800 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="px-2 py-2 text-sm text-gray-700 dark:text-gray-200"
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
    <div
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url('/rachana-hero.jpg')", // put an image in /public
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 text-white">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-xs">
          <Music2 className="h-4 w-4" />
          Nepali indie/folk · Dark themes, soft voice
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          Rachana Dahal
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-200">
          Songs that sit with pain, ask gentle questions, and leave room for
          light. This is a respectfully crafted fan space—lyrics, links, and
          moments.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#music"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
          >
            Listen
          </a>
          <a
            href="#lyrics"
            className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white/10"
          >
            Lyrics & Notes
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function InstagramEmbed({ url }) {
  React.useEffect(() => {
    // load embed script once
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
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
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
    <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-sm">
      <div className="space-y-4 text-gray-300">
        <p>
          This is an independent fan project celebrating{" "}
          <span className="font-semibold text-white">Rachana Dahal</span>. She
          is a Nepali singer and songwriter whose music often speaks about
          grief, loneliness, resilience, and small moments of comfort. This page
          brings together her performances, short lyric excerpts for commentary,
          and notes that highlight her artistry.
        </p>

        <p>
          Rachana blends indie and folk with influences from rock and
          alternative music. Her songs are emotional and honest, often turning
          private pain into something listeners can connect with together.
          Tracks such as <em>Daagbatti</em>, <em>Bhumari</em>, and{" "}
          <em>Aagya</em> are good starting points if you are new to her work,
          and her live sessions show the intensity and vulnerability she carries
          on stage.
        </p>

        <p className="text-sm text-gray-400">
          If these themes feel heavy today, please take a pause and look at the
          support information shared in the footer.
        </p>
      </div>
    </div>
  );
}

function Music() {
  return (
    // 👈 align items to the top so cards don't stretch to equal height
    <div className="grid items-start gap-6 md:grid-cols-2">
      {/* YouTube */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-800">
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
        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800">
          <span className="text-gray-700 dark:text-gray-300">
            Latest performance
          </span>
          <a
            href="https://youtu.be/ZMUMAeNqGgo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-gray-900 hover:underline dark:text-gray-100"
          >
            Open <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Spotify (artist) */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-800">
        <div className="p-3">
          <iframe
            src="https://open.spotify.com/embed/artist/7rEwUNVg5AYcD1MTlRJ5aj?utm_source=generator"
            title="Spotify artist"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full h-[352px] rounded-xl"
          />
        </div>
        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800">
          <span className="text-gray-700 dark:text-gray-300">
            Featured track
          </span>
          <a
            href="https://open.spotify.com/artist/7rEwUNVg5AYcD1MTlRJ5aj"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-gray-900 hover:underline dark:text-gray-100"
          >
            Open <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Lyrics() {
  const items = [
    {
      title: "टाट पल्टेर — excerpt",
      excerpt: "उठ न, गरौँ कुराकानी",
      notes: [
        "Insomnia + longing: two sleepless nights, mind ‘flipped over’.",
        "Push–pull intimacy: truth under alcohol, then retreat and regret.",
        "Vivid imagery: city painted red; body reduced to a skeleton → emptiness.",
        "Refrain “टाट पल्टेर…” anchors the spiral and emotional turbulence.",
        "Voice reads like confession and accusation at once; ending stays unresolved.",
      ],
      links: {
        youtube: "https://youtu.be/ZMUMAeNqGgo",
      },
    },
    {
      title: "दागबत्ती — excerpt",
      excerpt: "हाँस्नै मर्नँ, तिम्रो यादमा",
      notes: [
        "Grief and metaphor: laughter kills in the memory of someone.",
        "Title “daagbatti” evokes mourning rituals and lingering pain.",
        "Juxtaposition of life (laugh) and death (burning incense stick).",
        "Deep emotional resonance: memory as both comfort and torment.",
      ],
      links: {
        youtube: "https://www.youtube.com/watch?&v=rpTiqiu76HE", // lyric video
      },
    },
    {
      title: "आग्या — excerpt",
      excerpt: "सचेत रहन फेरि बोलाउँछ",
      notes: [
        "Awakening + calling back to awareness and presence.",
        "Subtle tension between silence and urge to speak again.",
        "“Aagya” (permission/call) as metaphor for internal permission.",
        "Highlights her lyrical theme of introspection and emotional truth.",
      ],
      links: {
        youtube: "https://m.youtube.com/watch?v=U_uZhDJ6iFo", // live session lyrics
      },
    },
    // ...add more similarly
  ];

  return (
    <div className="space-y-3">
      {items.map((it) => (
        <details
          key={it.title}
          className="group rounded-2xl border border-gray-200 p-4 dark:border-gray-800"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-gray-900 dark:text-white">
            <span>{it.title}</span>
            <span className="text-xs text-gray-500 group-open:hidden">
              show
            </span>
            <span className="hidden text-xs text-gray-500 group-open:inline">
              hide
            </span>
          </summary>

          <div className="mt-3 space-y-3">
            {it.excerpt && (
              <blockquote className="rounded-xl bg-gray-50 p-3 italic text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                “{it.excerpt}”
              </blockquote>
            )}

            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
              {it.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {it.links.youtube && (
                <a
                  href={it.links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  YouTube <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {it.links.lyrics && (
                <a
                  href={it.links.lyrics}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  Full lyrics <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </details>
      ))}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Short quotes shown for commentary/review. For full lyrics, please visit
        the official links.
      </p>
    </div>
  );
}

function Gallery() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      <InstagramEmbed url="https://www.instagram.com/p/DNnfgGXytq9/?hl=en" />
      <InstagramEmbed url="https://www.instagram.com/p/DM-M1EdydsU" />
      <InstagramEmbed url="https://www.instagram.com/p/DMXzUWAy_Mp" />
      {/* add more posts/reels here */}
    </div>
  );
}

function Shows() {
  const shows = [
    // { date: "Oct 12, 2025", city: "New York, NY", venue: "Small Room", link: "#" },
  ];
  if (!shows.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
        No shows announced yet — check back soon.
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-gray-800">
      <table className="w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="text-left text-gray-600 dark:text-gray-300">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Venue</th>
            <th className="px-4 py-2">Link</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900">
          {shows.map((s) => (
            <tr key={s.date} className="border-t dark:border-gray-800">
              <td className="px-4 py-2">{s.date}</td>
              <td className="px-4 py-2">{s.city}</td>
              <td className="px-4 py-2">{s.venue}</td>
              <td className="px-4 py-2">
                <a
                  href={s.link}
                  className="inline-flex items-center gap-1 text-gray-900 hover:underline dark:text-gray-100"
                >
                  Details <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t py-10 dark:border-gray-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-sm text-gray-400">
          Fan-made site. Not affiliated with the artist. If you’re struggling,
          please reach out for help. In Nepal, you can contact the{" "}
          <a
            href="https://tuth.org.np/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            TUTH Suicide Hotline (+977-1-4412505)
          </a>{" "}
          or organizations like{" "}
          <a
            href="https://koshishnepal.org/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Koshish Nepal
          </a>{" "}
          and{" "}
          <a
            href="https://tponepal.org/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            TPO Nepal
          </a>
          .
        </p>

        <div className="flex items-center gap-4 text-sm">
          <a
            className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-white"
            href="https://www.youtube.com/@rachana_dahal"
            target="_blank"
            rel="noreferrer"
          >
            <Youtube className="h-4 w-4" /> YouTube
          </a>
          <a
            className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-white"
            href="https://www.instagram.com/rachana_dahal"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
          <a
            className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-white"
            href="https://www.facebook.com/rachanadahalmusic/"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="h-4 w-4" /> Facebook
          </a>
          <a
            className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-white"
            href="https://www.tiktok.com/@rachana.live"
            target="_blank"
            rel="noreferrer"
          >
            <TikTokIcon className="h-4 w-4" /> Tiktok
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <ContentAdvisory />
      <Header theme={theme} setTheme={setTheme} />
      <Hero />

      <Section id="about" title="About">
        <About />
      </Section>

      <Section id="music" title="Music">
        <Music />
      </Section>

      <Section id="lyrics" title="Lyrics & Notes">
        <Lyrics />
      </Section>

      <Section id="gallery" title="Gallery">
        <Gallery />
      </Section>

      <Section id="shows" title="Shows">
        <Shows />
      </Section>

      <Section id="contact" title="Contact">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            For takedown requests or corrections, email:{" "}
            <a href="mailto:contact@example.com" className="underline">
              jgtpradhan@icloud.com
            </a>
          </p>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
