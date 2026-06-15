"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV, COMPANY, type NavItem } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  const isActive = (item: NavItem) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("#")[0]);

  return (
    <header className="fixed inset-x-0 top-0 z-[120] flex justify-center px-4">
      {/* Resizable bar — shrinks to a centered pill on scroll */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          maxWidth: scrolled ? 940 : 1320,
          paddingTop: scrolled ? 8 : 14,
          paddingBottom: scrolled ? 8 : 14,
          borderRadius: scrolled ? 999 : 0,
          backgroundColor: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
          borderColor: scrolled ? "rgba(230,232,236,1)" : "rgba(230,232,236,0)",
          boxShadow: scrolled
            ? "0 12px 40px -14px rgba(16,24,40,0.22)"
            : "0 0 0 rgba(16,24,40,0)",
        }}
        transition={{
          y: { delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          opacity: { delay: 0.2, duration: 0.7 },
          default: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        className="mt-3 flex w-full items-center justify-between gap-6 border px-4 backdrop-blur-xl md:px-6"
      >
        <Link href="/" className="shrink-0" aria-label="Najran Cement — home">
          <Image
            src="/logo.png"
            alt="Najran Cement Company"
            width={592}
            height={150}
            priority
            className={cn("w-auto transition-all duration-300", scrolled ? "h-8" : "h-9 md:h-10")}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center xl:flex">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item) ? "text-kiln" : "text-bone/80 hover:text-bone"
                )}
              >
                {item.label}
                {item.children && (
                  <svg width="10" height="10" viewBox="0 0 10 10" className="mt-0.5 opacity-60">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </Link>

              {item.children && (
                <AnimatePresence>
                  {open === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-full pt-3"
                    >
                      <div className="card-soft min-w-[248px] overflow-hidden p-2">
                        {item.children.map((c, i) => (
                          <motion.div
                            key={c.href}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.03 * i }}
                          >
                            <Link
                              href={c.href}
                              className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-ash transition-colors hover:bg-coal hover:text-bone"
                            >
                              {c.label}
                              <svg
                                width="13" height="13" viewBox="0 0 14 14" fill="none"
                                className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                              >
                                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Request a Quote
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-bone" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-bone" />
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-[72px] xl:hidden"
          >
            <div className="card-soft max-h-[72vh] overflow-y-auto p-4">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-line/70 last:border-0">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileAcc((p) => (p === item.label ? null : item.label))}
                        className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium"
                      >
                        {item.label}
                        <motion.svg
                          animate={{ rotate: mobileAcc === item.label ? 180 : 0 }}
                          width="14" height="14" viewBox="0 0 10 10"
                        >
                          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {mobileAcc === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-3 pl-3">
                              {item.children.map((c) => (
                                <Link
                                  key={c.href}
                                  href={c.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-2.5 text-sm text-ash"
                                >
                                  {c.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3.5 text-base font-medium"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-5 block rounded-full bg-bone py-3 text-center font-medium text-white"
              >
                Request a Quote
              </Link>
              <p className="mt-4 text-center text-xs text-muted">{COMPANY.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
