import { createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import portrait from "../assets/portfolio-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jay Cole — Independent Designer" },
      {
        name: "description",
        content: "Jay Cole is an independent designer creating distinctive brands and digital experiences.",
      },
      { property: "og:title", content: "Jay Cole — Independent Designer" },
      {
        property: "og:description",
        content: "Distinctive brands and digital experiences by independent designer Jay Cole.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioHeader,
});

const services = [
  {
    title: "©2025",
    copy: "Designing digital experiences that captivate, connect, and convert.",
  },
  {
    title: "Brand",
    copy: "We craft bold, memorable brand identities that tell your story and leave a lasting impression.",
  },
  {
    title: "UI/UX",
    copy: "Intuitive, user-focused interfaces that elevate engagement and drive seamless interactions.",
  },
];

const studios = [
  ["disc-half", "Frame Blox"],
  ["ring", "Supa Blox"],
  ["hourglass", "Hype Blox"],
  ["hourglass", "Hype Blox"],
  ["links", "Ultra Blox"],
  ["arrows", "Ship Blox"],
] as const;

function StudioMark({ type }: { type: (typeof studios)[number][0] }) {
  if (type === "ring") return <span className="studio-ring" />;
  if (type === "links") return <span className="studio-links" />;
  if (type === "arrows") return <span className="studio-arrows">◖</span>;
  if (type === "hourglass") return <span className="studio-hourglass">◆</span>;
  return <span className="studio-disc" />;
}

function PortfolioHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative mx-auto min-h-[900px] max-w-[1600px] px-6 pb-8 pt-5 sm:px-10 lg:min-h-[960px] lg:px-[5.5rem]">
        <header className="relative z-40 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-[15px] font-bold" aria-label="Jay Cole home">
            <span>Jay Cole<sup className="ml-0.5 text-[7px]">®</sup></span>
            <span className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[9px] font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-signal" /> Available
            </span>
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 items-center gap-3 rounded-full bg-surface px-5 text-[12px] font-semibold transition-colors hover:bg-surface-emphasis focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            {menuOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>
        </header>

        {menuOpen && (
          <nav className="absolute right-6 top-20 z-50 w-56 rounded-md border border-border bg-surface-emphasis p-2 shadow-2xl sm:right-10 lg:right-[5.5rem]" aria-label="Main navigation">
            {['Work', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block rounded-sm px-4 py-3 text-sm font-semibold transition-colors hover:bg-accent">
                {item}
              </a>
            ))}
          </nav>
        )}

        <div id="top" className="absolute left-1/2 top-0 z-0 h-[66%] w-[88%] max-w-[940px] -translate-x-1/2 sm:w-[72%] lg:h-[68%] lg:w-[58%]">
          <img
            src={portrait}
            alt="Editorial portrait of Jay Cole in an orange jacket"
            width={1200}
            height={1408}
            className="h-full w-full object-cover object-top"
          />
          <div className="portrait-fade absolute inset-0" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[41%] z-20 flex justify-center px-3 sm:top-[39%]">
          <h1 className="whitespace-nowrap text-center text-[clamp(4.7rem,13.2vw,13.2rem)] font-medium leading-[0.85] text-foreground">
            Jay Cole<sup className="relative -top-[0.52em] ml-1 text-[0.36em] font-normal">®</sup>
          </h1>
        </div>

        <div className="absolute inset-x-6 top-[60%] z-30 grid gap-8 sm:inset-x-10 sm:grid-cols-3 sm:gap-10 lg:inset-x-[5.5rem] lg:top-[61%] lg:gap-24">
          {services.map((service) => (
            <article key={service.title} className="service-item relative max-w-[300px] pt-2">
              <span className="corner-mark" aria-hidden="true" />
              <h2 className="text-xl font-semibold leading-none">{service.title}</h2>
              <p className="mt-4 text-[11px] leading-[1.55] text-muted-foreground">{service.copy}</p>
            </article>
          ))}
        </div>

        <div className="absolute inset-x-6 bottom-7 z-30 grid grid-cols-2 gap-2 sm:inset-x-10 sm:grid-cols-3 lg:inset-x-[5.5rem] lg:grid-cols-6">
          {studios.map(([mark, label], index) => (
            <div key={`${label}-${index}`} className="flex h-[62px] items-center justify-center gap-2 rounded-md bg-surface px-3 text-[11px] font-bold">
              <StudioMark type={mark} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}