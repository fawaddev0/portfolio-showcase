import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import portrait from "../assets/portfolio-portrait.jpg";
import aboutPortrait from "../assets/about-portrait.jpg";
import projectSpiralwear from "../assets/project-spiralwear.jpg";
import projectGascon from "../assets/project-gascon.jpg";
import { FloatingNav } from "../components/floating-nav";

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

const projects = [
  {
    number: "01",
    title: "SpiralWear",
    tagline: "Clothing Brand",
    copy: "A dark, editorial e-commerce experience for a streetwear label — fast, static-first storefront built to convert.",
    stack: ["Astro", "Cloudflare"],
    url: "https://spiralwear.pk",
    image: projectSpiralwear,
    alt: "SpiralWear clothing brand website preview",
  },
  {
    number: "02",
    title: "Gascon Chess",
    tagline: "Chess Learning App",
    copy: "An interactive chess learning platform with lessons, live boards, and progress tracking backed by realtime data.",
    stack: ["Next.js", "Supabase"],
    url: "https://gascon-chess-app.vercel.app",
    image: projectGascon,
    alt: "Gascon chess learning app interface preview",
  },
];

const testimonials = [
  {
    quote: "Working with Fawad was effortless. He understood the product vision instantly and shipped an AI website that our customers genuinely love.",
    name: "Sarah Mitchell",
    role: "Founder, Northlane Studio",
  },
  {
    quote: "The mobile app he built for us feels fast, polished, and reliable. His attention to detail is rare for someone this early in their career.",
    name: "Daniel Osei",
    role: "Product Lead, Klyde",
  },
  {
    quote: "Our internal automations now save the team over twenty hours a week. He connected tools we thought could never talk to each other.",
    name: "Amira Khan",
    role: "Operations Director, Fieldwork",
  },
  {
    quote: "From a rough idea on a call to a working app in days. The vibe-coded prototype he delivered helped us close our first round of funding.",
    name: "Lucas Weber",
    role: "CEO, Driftbase",
  },
];

function StudioMark({ type }: { type: (typeof studios)[number][0] }) {
  if (type === "ring") return <span className="studio-ring" />;
  if (type === "links") return <span className="studio-links" />;
  if (type === "arrows") return <span className="studio-arrows">◖</span>;
  if (type === "hourglass") return <span className="studio-hourglass">◆</span>;
  return <span className="studio-disc" />;
}

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const distance = track.scrollWidth - track.parentElement!.clientWidth;
      track.style.transform = `translateX(${-progress * distance}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-[5.5rem]">
          <div className="relative mb-8">
            <span className="corner-mark" aria-hidden="true" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Selected work</p>
          </div>
          <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-tight">Projects</h2>
        </div>

        <div className="mt-12">
          <div ref={trackRef} className="flex gap-6 pl-6 will-change-transform sm:pl-10 lg:pl-[5.5rem]">
            {projects.map((project) => (
              <article
                key={project.title}
                className="glass group relative flex w-[85vw] max-w-[560px] shrink-0 flex-col rounded-md p-6 transition-colors hover:bg-surface-emphasis sm:p-8"
              >
                <span className="corner-mark" aria-hidden="true" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      {project.number} — {project.tagline}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold leading-tight">{project.title}</h3>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${project.title} live site`}
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:border-signal hover:bg-signal hover:text-background"
                  >
                    <ArrowUpRight size={18} strokeWidth={1.8} />
                  </a>
                </div>
                <p className="mt-3 text-[12px] leading-[1.6] text-muted-foreground">{project.copy}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="glass rounded-full px-3 py-1 text-[10px] font-semibold text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-[1600px] items-center gap-3 px-6 sm:px-10 lg:px-[5.5rem]">
          <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Keep scrolling to explore projects</p>
        </div>
      </div>
    </section>
  );
}

function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <FloatingNav />
      <section className="relative mx-auto min-h-[900px] max-w-[1600px] px-6 pb-8 pt-5 sm:px-10 lg:min-h-[960px] lg:px-[5.5rem]">
        <header className="relative z-40 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-[15px] font-bold" aria-label="Jay Cole home">
            <span>Jay Cole<sup className="ml-0.5 text-[7px]">®</sup></span>
            <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-signal" /> Available
            </span>
          </a>
        </header>

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
            <div key={`${label}-${index}`} className="glass flex h-[62px] items-center justify-center gap-2 rounded-md px-3 text-[11px] font-bold transition-colors hover:bg-surface-emphasis">
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
                    className="glass flex h-11 items-center rounded-md px-5 text-[12px] font-bold transition-colors hover:bg-surface-emphasis"
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
              className="glass-tile group relative flex flex-col p-6 hover:-translate-y-1 sm:p-8"
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

      {/* Projects Section */}
      <ProjectsSection />

      {/* Testimonials Section */}
      <section id="testimonials" className="relative mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-[5.5rem] lg:py-32">
        <div className="relative mb-16">
          <span className="corner-mark" aria-hidden="true" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Kind words</p>
        </div>

        <h2 className="max-w-[900px] text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-tight">
          Testimonials
        </h2>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className="glass-tile group relative flex flex-col justify-between p-6 hover:-translate-y-1 sm:p-10"
            >
              <span className="corner-mark" aria-hidden="true" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <blockquote className="mt-6 text-[17px] leading-[1.6] font-medium">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="glass-strong flex size-11 items-center justify-center rounded-full text-[13px] font-bold transition-colors group-hover:bg-signal group-hover:text-background" aria-hidden="true">

                  {testimonial.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-[14px] font-semibold leading-tight">{testimonial.name}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-[5.5rem] lg:py-32">
        <div className="glass-strong relative overflow-hidden rounded-md px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-28">
          <span className="corner-mark" aria-hidden="true" />
          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Contact</p>

            <h2 className="mt-8 max-w-[1000px] text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.9] tracking-tight">
              Let&apos;s build<br />something great
            </h2>

            <p className="mt-8 max-w-[520px] text-[15px] leading-[1.7] text-muted-foreground">
              Have a project in mind? Whether it&apos;s an AI website, a mobile app, or an automation that saves your team hours — I&apos;d love to hear about it.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="mailto:hello@example.com"
                className="flex h-14 items-center rounded-full bg-signal px-8 text-[13px] font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                hello@example.com
              </a>
              <a
                href="mailto:hello@example.com"
                className="glass flex h-14 items-center rounded-full px-8 text-[13px] font-bold transition-colors hover:bg-accent"
              >
                Book a call
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-10 -right-10 size-56 rounded-full border border-border" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full border border-border/60" aria-hidden="true" />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mx-auto max-w-[1600px] px-6 pb-10 pt-4 sm:px-10 lg:px-[5.5rem]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["GitHub", "https://github.com"],
            ["LinkedIn", "https://linkedin.com"],
            ["X / Twitter", "https://x.com"],
            ["Email", "mailto:hello@example.com"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="glass flex h-[62px] items-center justify-center rounded-md px-3 text-[11px] font-bold transition-colors hover:bg-surface-emphasis"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <a href="#top" className="text-[13px] font-bold">
            Jay Cole<sup className="ml-0.5 text-[7px]">®</sup>
          </a>
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Jay Cole. Designed &amp; built with care.
          </p>
          <a href="#top" className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground">
            Back to top
          </a>
        </div>
      </footer>
    </main>
  );
}
