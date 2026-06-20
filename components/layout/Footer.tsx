"use client";

import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Sun } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

export interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#overview" },
      { name: "Pricing Plans", href: "#pricing" },
      { name: "Solutions", href: "#solutions" },
      { name: "Features", href: "#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Process & FAQ", href: "#services" },
      { name: "Contact Us", href: "#contact" },
      { name: "Careers", href: "#careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Desk", href: "#help" },
      { name: "Sales Inquiry", href: "#contact" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="h-4 w-4" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="h-4 w-4" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="h-4 w-4" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="h-4 w-4" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const getSectionIndex = (name: string, href: string): number | null => {
  const cleanName = name.toLowerCase().trim();
  const cleanHref = href.toLowerCase().trim();

  // Check href patterns first
  if (cleanHref.includes("#hero") || cleanHref === "#overview") return 0;
  if (cleanHref.includes("#about")) return 1;
  if (cleanHref.includes("#pricing")) return 2;
  if (cleanHref.includes("#solutions") || cleanHref.includes("#product") || cleanHref.includes("#marketplace") || cleanHref.includes("#features")) return 3;
  if (cleanHref.includes("#contact") || cleanHref.includes("#careers") || cleanHref.includes("#book")) return 4;
  if (cleanHref.includes("#services") || cleanHref.includes("#faq") || cleanHref.includes("#help") || cleanHref.includes("#process")) return 5;

  // Fallback to name checks
  if (cleanName === "overview" || cleanName === "home" || cleanName === "hero") return 0;
  if (cleanName === "about" || cleanName === "about us" || cleanName === "team" || cleanName === "company") return 1;
  if (cleanName === "pricing" || cleanName === "pricing plans" || cleanName === "pricing & plans") return 2;
  if (cleanName === "solutions" || cleanName === "marketplace" || cleanName === "features" || cleanName === "product") return 3;
  if (cleanName === "contact" || cleanName === "contact us" || cleanName === "careers" || cleanName === "sales" || cleanName === "book inspection" || cleanName === "sales inquiry") return 4;
  if (cleanName === "help" || cleanName === "help desk" || cleanName === "faq" || cleanName === "process & faq" || cleanName === "common questions" || cleanName === "our process") return 5;

  return null;
};

export const Footer = ({
  logo = {
    url: "#",
    src: "", // Empty string defaults to our beautiful inline SunNest branding
    alt: "logo",
    title: "SunNest Power",
  },
  sections = defaultSections,
  description = "Powering commercial projects with premium solar technology. We design and deliver custom grid integrations to yield maximum savings.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 SunNest Power. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  const { navigate } = useNavigation();

  const handleLinkClick = (e: React.MouseEvent, name: string, href: string) => {
    e.stopPropagation();
    const targetIdx = getSectionIndex(name, href);
    if (targetIdx !== null) {
      e.preventDefault();
      navigate(targetIdx);
    }
  };

  return (
    <footer className="bg-[#0A1628] border-t border-[#D4A017]/10 w-full text-white shrink-0">
      <div className="container mx-auto px-6 py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {logo.src ? (
              <a
                href={logo.url}
                onClick={(e) => handleLinkClick(e, logo.title, logo.url)}
                className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer text-left"
              >
                <img src={logo.src} alt={logo.alt} className="h-7 w-auto object-contain" />
                <span className="text-lg font-black tracking-tight text-white select-none">
                  {logo.title}
                </span>
              </a>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(0); }}
                className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4A017] to-[#FFCA28] flex items-center justify-center shadow-lg shadow-[#D4A017]/30">
                  <Sun className="w-4 h-4 text-[#0A1628]" />
                </div>
                <span className="text-lg font-black tracking-tight text-white select-none font-sans">
                  Sun<span className="text-[#FFD700]">Nest</span>
                  <span className="text-white/75 text-sm font-medium ml-1">Power</span>
                </span>
              </button>
            )}

            <p className="text-white/60 text-xs max-w-sm leading-relaxed">{description}</p>
            
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  onClick={(e) => e.stopPropagation()}
                  className="text-white/60 hover:text-[#FFD700] transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="font-bold text-xs text-white/90 uppercase tracking-widest mb-3.5">
                  {section.title}
                </h3>
                <ul className="space-y-2 list-none p-0 m-0">
                  {section.links.map((link, linkIdx) => {
                    const targetIdx = getSectionIndex(link.name, link.href);
                    return (
                      <li key={linkIdx}>
                        {targetIdx !== null ? (
                          <button
                            onClick={(e) => handleLinkClick(e, link.name, link.href)}
                            className="text-white/60 hover:text-[#FFD700] transition-colors bg-transparent border-none p-0 cursor-pointer text-xs font-semibold text-left"
                          >
                            {link.name}
                          </button>
                        ) : (
                          <a
                            href={link.href}
                            onClick={(e) => e.stopPropagation()}
                            className="text-white/60 hover:text-[#FFD700] transition-colors text-xs font-semibold"
                          >
                            {link.name}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">{copyright}</p>
          <div className="flex gap-6">
            {legalLinks.map((link, idx) => {
              const targetIdx = getSectionIndex(link.name, link.href);
              return targetIdx !== null ? (
                <button
                  key={idx}
                  onClick={(e) => handleLinkClick(e, link.name, link.href)}
                  className="text-xs text-white/50 hover:text-[#FFD700] transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-white/50 hover:text-[#FFD700] transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Also export Footer7 as alias to align with user component name
export const Footer7 = Footer;
export default Footer;
