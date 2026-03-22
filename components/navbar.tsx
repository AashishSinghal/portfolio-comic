"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Sun, Moon, Zap, Home } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { label: "Origin Story", href: "#hero" },
  { label: "Powers", href: "#powers" },
  { label: "Missions", href: "#missions" },
  { label: "Chronicles", href: "#chronicles" },
  { label: "Signal", href: "#signal" },
];

const pageLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Games", href: "/games" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (href: string) => {
    setIsOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + href;
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          "bg-paper dark:bg-dark-bg comic-border-b",
          scrolled && "shadow-[0_4px_0_0_var(--color-ink)]"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-ink text-paper font-display text-lg dark:bg-manga-yellow dark:text-ink comic-shadow transition-transform group-hover:rotate-[-3deg]">
                A
              </span>
              <span className="font-display text-xl tracking-wider text-ink dark:text-paper hidden sm:block">
                AASHISH<span className="text-action-red">.EXE</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {isHome ? (
                /* Home: section scroll links */
                sectionLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleSectionClick(link.href)}
                    className={cn(
                      "px-3 py-1.5 font-display text-sm tracking-wide",
                      "border-2 border-transparent rounded-sm",
                      "hover:border-ink hover:bg-manga-yellow/20 dark:hover:bg-manga-yellow/10",
                      "hover:comic-shadow transition-all duration-150",
                      "text-ink dark:text-paper"
                    )}
                  >
                    {link.label}
                  </button>
                ))
              ) : (
                /* Sub-pages: page links */
                <>
                  <Link
                    href="/"
                    className={cn(
                      "px-3 py-1.5 font-display text-sm tracking-wide",
                      "border-2 border-transparent rounded-sm",
                      "hover:border-ink hover:bg-manga-yellow/20 dark:hover:bg-manga-yellow/10",
                      "hover:comic-shadow transition-all duration-150",
                      "text-ink dark:text-paper"
                    )}
                  >
                    Home
                  </Link>
                  {pageLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-3 py-1.5 font-display text-sm tracking-wide",
                        "border-2 rounded-sm transition-all duration-150",
                        pathname.startsWith(link.href)
                          ? "border-ink bg-manga-yellow/30 dark:bg-manga-yellow/20 comic-shadow"
                          : "border-transparent hover:border-ink hover:bg-manga-yellow/20 dark:hover:bg-manga-yellow/10 hover:comic-shadow",
                        "text-ink dark:text-paper"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}

              {/* Always show page links as secondary nav on home */}
              {isHome && (
                <>
                  <span className="mx-1 h-6 w-px bg-ink/15 dark:bg-paper/15" />
                  {pageLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-2.5 py-1.5 font-display text-xs tracking-wide",
                        "border-2 border-transparent rounded-sm",
                        "hover:border-ink hover:bg-panel-blue dark:hover:bg-dark-panel",
                        "hover:comic-shadow transition-all duration-150",
                        "text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}
            </div>

            {/* Right side: Theme toggle + mobile menu */}
            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center",
                    "comic-border rounded-sm bg-manga-yellow/20 dark:bg-manga-yellow/10",
                    "comic-hover"
                  )}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-manga-yellow" />
                  ) : (
                    <Moon className="h-5 w-5 text-ink" />
                  )}
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "flex md:hidden h-10 w-10 items-center justify-center",
                  "comic-border rounded-sm",
                  "comic-hover"
                )}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu — Comic panel drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/40" />
          <div
            className="absolute top-16 right-4 left-4 bg-paper dark:bg-dark-surface comic-panel-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="action-word text-action-red text-xs absolute -top-3 right-6 rotate-[-8deg]">
              MENU!
            </span>

            <div className="flex flex-col gap-2">
              {!isHome && (
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-left",
                    "font-display text-base tracking-wide",
                    "comic-border rounded-sm",
                    "hover:bg-manga-yellow/20 transition-colors",
                    "text-ink dark:text-paper"
                  )}
                >
                  <Home className="h-4 w-4 text-manga-yellow" />
                  Home
                </Link>
              )}

              {isHome &&
                sectionLinks.map((link, i) => (
                  <button
                    key={link.href}
                    onClick={() => handleSectionClick(link.href)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-left",
                      "font-display text-base tracking-wide",
                      "comic-border rounded-sm",
                      "hover:bg-manga-yellow/20 transition-colors",
                      "text-ink dark:text-paper"
                    )}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <Zap className="h-4 w-4 text-manga-yellow" />
                    {link.label}
                  </button>
                ))}

              <div className="h-px bg-ink/10 dark:bg-paper/10 my-1" />

              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-left",
                    "font-display text-base tracking-wide",
                    "comic-border rounded-sm",
                    pathname.startsWith(link.href)
                      ? "bg-manga-yellow/20 border-ink"
                      : "hover:bg-manga-yellow/20",
                    "transition-colors text-ink dark:text-paper"
                  )}
                >
                  <Zap className="h-4 w-4 text-sky-blue" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="ben-day-dots text-sky-blue absolute bottom-2 right-2 w-16 h-16 rounded-full opacity-30" />
          </div>
        </div>
      )}
    </>
  );
}
