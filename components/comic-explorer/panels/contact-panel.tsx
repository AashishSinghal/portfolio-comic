"use client";

import { Send, Github, Linkedin, Twitter, Mail, Zap, Heart } from "lucide-react";
import { socialLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const contactLinks = [
  {
    label: "GitHub",
    href: socialLinks.github,
    icon: <Github className="h-5 w-5" />,
    color: "bg-ink text-paper dark:bg-paper dark:text-ink",
    desc: "Check out my code",
  },
  {
    label: "LinkedIn",
    href: socialLinks.linkedin,
    icon: <Linkedin className="h-5 w-5" />,
    color: "bg-sky-blue text-ink",
    desc: "Let's connect",
  },
  {
    label: "Twitter",
    href: socialLinks.twitter,
    icon: <Twitter className="h-5 w-5" />,
    color: "bg-panel-blue text-ink dark:bg-dark-panel dark:text-sky-blue",
    desc: "Follow my thoughts",
  },
  {
    label: "Email",
    href: socialLinks.email,
    icon: <Mail className="h-5 w-5" />,
    color: "bg-action-red text-paper",
    desc: "Drop me a line",
  },
];

export function ContactPanel() {
  return (
    <div className="h-full flex flex-col justify-center">
      <span className="inline-block bg-ink text-paper dark:bg-paper dark:text-ink px-3 py-1 font-display text-xs tracking-widest mb-3 w-fit">
        CHAPTER 05
      </span>

      <h2 className="font-display text-3xl text-ink dark:text-paper mb-3">
        SEND A{" "}
        <span className="text-manga-yellow text-comic-outline">SIGNAL</span>
      </h2>

      <div className="speech-bubble speech-bubble-right dark:bg-dark-panel mb-4">
        <p className="font-body text-sm text-ink dark:text-paper">
          Got a project idea? Want to team up? Or just say{" "}
          <span className="font-display text-action-red">HI!</span>
          <Zap className="h-4 w-4 text-manga-yellow inline ml-1" />
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 comic-border rounded-sm comic-hover bg-paper dark:bg-dark-panel"
          >
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-sm comic-border shrink-0",
                link.color
              )}
            >
              {link.icon}
            </span>
            <div className="min-w-0">
              <span className="font-display text-sm tracking-wide text-ink dark:text-paper block">
                {link.label}
              </span>
              <span className="text-[10px] text-ink/60 dark:text-paper/60">
                {link.desc}
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-4 font-body text-xs text-ink/40 dark:text-paper/40 flex items-center gap-1">
        Built with{" "}
        <Heart className="h-3 w-3 text-action-red fill-action-red" /> and{" "}
        <span className="font-display tracking-wide">COMIC ENERGY</span>
      </p>
    </div>
  );
}
