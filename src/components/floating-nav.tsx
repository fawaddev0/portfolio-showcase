import { useEffect, useRef, useState, useCallback } from "react";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const lastSectionRef = useRef("top");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moveIndicator = useCallback(
    (sectionId: string, animate: boolean) => {
      const link = linkRefs.current[sectionId];
      if (!link || !indicatorRef.current) return;

      const navEl = navRef.current;
      if (!navEl) return;

      const navRect = navEl.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();

      const left = linkRect.left - navRect.left;
      const width = linkRect.width;

      if (animate && "startViewTransition" in document) {
        (document as Document & {
          startViewTransition: (cb: () => void) => void;
        }).startViewTransition(() => {
          indicatorRef.current!.style.left = `${left}px`;
          indicatorRef.current!.style.width = `${width}px`;
        });
      } else {
        indicatorRef.current.style.transition = animate
          ? "left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          : "none";
        indicatorRef.current.style.left = `${left}px`;
        indicatorRef.current.style.width = `${width}px`;
      }
    },
    [],
  );

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;

        const mostVisible = visibleEntries.reduce((best, entry) =>
          entry.intersectionRatio > best.intersectionRatio ? entry : best,
        );

        const newSection = mostVisible.target.id;
        if (newSection !== lastSectionRef.current) {
          lastSectionRef.current = newSection;
          setActiveSection(newSection);
          moveIndicator(newSection, true);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [moveIndicator]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => moveIndicator(activeSection, false), 50);
    return () => clearTimeout(t);
  }, [visible, activeSection, moveIndicator]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const sectionId = href.slice(1);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Floating navigation"
      className={`glass-nav fixed left-1/2 top-5 z-50 flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-20 opacity-0 pointer-events-none"
      }`}
      style={{ viewTransitionName: "floating-nav" }}
    >
      <div
        ref={indicatorRef}
        className="nav-indicator top-1/2 h-[34px] -translate-y-1/2"
        style={{ viewTransitionName: "nav-indicator" }}
        aria-hidden="true"
      />
      {navItems.map((item) => {
        const sectionId = item.href.slice(1);
        const isActive = activeSection === sectionId;
        return (
          <a
            key={item.href}
            href={item.href}
            ref={(el) => {
              linkRefs.current[sectionId] = el;
            }}
            onClick={(e) => handleClick(e, item.href)}
            className={`relative z-10 flex items-center rounded-full px-4 py-1.5 text-[12px] font-semibold transition-colors duration-200 ${
              isActive
                ? "text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
