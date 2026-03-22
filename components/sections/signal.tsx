"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Send,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
  Zap,
} from "lucide-react";
import { socialLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const contactLinks = [
  {
    label: "GitHub",
    href: socialLinks.github,
    icon: <Github className="h-6 w-6" />,
    color: "bg-ink text-paper dark:bg-paper dark:text-ink",
    description: "Check out my code",
  },
  {
    label: "LinkedIn",
    href: socialLinks.linkedin,
    icon: <Linkedin className="h-6 w-6" />,
    color: "bg-sky-blue text-ink",
    description: "Let's connect",
  },
  {
    label: "Twitter",
    href: socialLinks.twitter,
    icon: <Twitter className="h-6 w-6" />,
    color: "bg-panel-blue text-ink dark:bg-dark-panel dark:text-sky-blue",
    description: "Follow my thoughts",
  },
  {
    label: "Email",
    href: socialLinks.email,
    icon: <Mail className="h-6 w-6" />,
    color: "bg-action-red text-paper",
    description: "Drop me a line",
  },
];

export function SignalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="signal" className="relative py-24 bg-manga-yellow/10 dark:bg-dark-surface">
      <div className="halftone-bg absolute inset-0" />

      <div ref={ref} className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-4">
            CHAPTER 05
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink dark:text-paper">
            SEND A{" "}
            <span className="text-manga-yellow text-comic-outline">SIGNAL</span>
          </h2>
        </motion.div>

        {/* Speech bubble CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring" }}
          className="speech-bubble speech-bubble-right max-w-lg mx-auto mb-16 text-center dark:bg-dark-surface"
        >
          <p className="font-body text-lg text-ink dark:text-paper">
            Got a project idea? Want to team up? Or just want to say{" "}
            <span className="font-display text-action-red">HI!</span>
            <br />
            I&apos;d love to hear from you.{" "}
            <span className="inline-block animate-wiggle">
              <Zap className="h-5 w-5 text-manga-yellow inline" />
            </span>
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={cn(
                "flex items-center gap-4 p-5 comic-panel comic-hover",
                "bg-paper dark:bg-dark-panel"
              )}
            >
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-sm comic-border shrink-0",
                  link.color
                )}
              >
                {link.icon}
              </span>
              <div>
                <span className="font-display text-lg tracking-wide text-ink dark:text-paper block">
                  {link.label}
                </span>
                <span className="text-sm text-ink/60 dark:text-paper/60">
                  {link.description}
                </span>
              </div>
              <Send className="h-4 w-4 text-ink/30 dark:text-paper/30 ml-auto shrink-0" />
            </motion.a>
          ))}
        </div>

        {/* Decorative */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
          className="action-word text-action-red text-5xl sm:text-7xl absolute top-12 left-4 rotate-[-12deg] pointer-events-none"
        >
          RING!
        </motion.span>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="relative z-10 mt-24 pt-8 border-t-3 border-ink/10 dark:border-paper/10 text-center"
        style={{ borderTop: "3px solid" }}
      >
        <p className="font-body text-sm text-ink/50 dark:text-paper/50 flex items-center justify-center gap-1.5">
          Built with{" "}
          <Heart className="h-4 w-4 text-action-red fill-action-red inline" />{" "}
          and{" "}
          <span className="font-display tracking-wide">
            COMIC ENERGY
          </span>{" "}
          by Aashish Singhal
        </p>
        <p className="font-display text-xs tracking-widest text-ink/30 dark:text-paper/30 mt-2">
          NEXT.JS · TAILWIND V4 · MOTION · 2026
        </p>
      </motion.footer>
    </section>
  );
}
