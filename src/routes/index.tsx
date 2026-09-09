import { createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import portrait from "../assets/portfolio-portrait.jpg";
import aboutPortrait from "../assets/about-portrait.jpg";

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
  component: PortfolioPage,
});

const heroServices = [
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

const techStack = [
  "Next.js",
  "React",
  "Supabase",
  "Express.js",
  "Linux",
];

const services = [
  {
    number: "01",
    title: "AI Websites",
    copy: "Intelligent, fast-loading websites built with modern frameworks and AI-assisted workflows that adapt to your business.",
  },
  {
    number: "02",
    title: "AI Mobile Apps",
    copy: "Cross-platform mobile experiences powered by smart features, clean interfaces, and scalable cloud backends.",
  },
  {
    number: "03",
    title: "AI Automations",
    copy: "Custom workflows and integrations that eliminate repetitive tasks, connect your tools, and save hours every week.",
  },
  {
    number: "04",
    title: "Vibe Coded Apps",
    copy: "Rapidly prototyped and shipped applications that capture your idea's energy without sacrificing polish or performance.",
  },
];

function StudioMark({ type }: { type: (typeof studios)[number][0] }) {
  if (type === "ring") return <span className="studio-ring" />;
  if (type === "links") return <span className="studio-links" />;
  if (type === "arrows") return <span className="studio-arrows">◖</span>;
  if (type === "hourglass") return <span className="studio-hourglass">◆</span>;
  return <span className="studio-disc" />;
}

function PortfolioPage() {
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
            {['About', 'Services', 'Contact'].map((item) => (
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
          {heroServices.map((service) => (
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

      {/* About Section */}
      <section id="about" className="relative mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-[5.5rem] lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-md bg-surface">
              <img
                src={aboutPortrait}
                alt="Portrait of the engineer"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-24 w-24 border-r-2 border-t-2 border-signal lg:block" aria-hidden="true" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="relative mb-10">
              <span className="corner-mark" aria-hidden="true" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">About me</p>
            </div>

            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-tight">
              Software<br />Engineer
            </h2>

            <p className="mt-8 max-w-[520px] text-[15px] leading-[1.7] text-muted-foreground">
              I am a software engineer with two years of hands-on experience building modern web applications, mobile apps, and backend systems. I enjoy turning complex problems into clean, reliable products.
            </p>

            <div className="mt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tech stack</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="flex h-11 items-center rounded-md bg-surface px-5 text-[12px] font-bold transition-colors hover:bg-surface-emphasis"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-[5.5rem] lg:py-32">
        <div className="relative mb-16">
          <span className="corner-mark" aria-hidden="true" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">What I do</p>
        </div>

        <h2 className="max-w-[900px] text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-tight">
          Services
        </h2>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative flex flex-col rounded-md bg-surface p-6 transition-colors hover:bg-surface-emphasis sm:p-8"
            >
              <span className="corner-mark" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{service.number}</span>
              <h3 className="mt-6 text-xl font-semibold leading-tight">{service.title}</h3>
              <p className="mt-4 text-[12px] leading-[1.6] text-muted-foreground">{service.copy}</p>
              <div className="mt-8 h-8 w-8 rounded-full border border-border transition-colors group-hover:border-signal" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
