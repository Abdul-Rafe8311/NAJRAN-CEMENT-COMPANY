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
      {/* Dark glass resizable pill */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          maxWidth: scrolled ? 1120 : 1320,
          paddingTop: scrolled ? 7 : 11,
          paddingBottom: scrolled ? 7 : 11,
          backgroundColor: scrolled ? "rgba(8,12,24,0.86)" : "rgba(8,12,24,0.55)",
          boxShadow: scrolled
            ? "0 18px 50px -18px rgba(0,0,0,0.65)"
            : "0 10px 36px -16px rgba(0,0,0,0.5)",
        }}
        transition={{
          y: { delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          opacity: { delay: 0.2, duration: 0.7 },
          default: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        className="mt-3 flex w-full items-center justify-between gap-3 rounded-full border border-white/10 px-3 md:px-4 lg:backdrop-blur-xl"
      >
        <Link href="/" className="shrink-0" aria-label="Najran Cement — home">
          <span className="block rounded-xl bg-white px-2.5 py-1.5">
            <Image
              src="/logo.png"
              alt="Najran Cement Company"
              width={592}
              height={150}
              priority
              className={cn("w-auto transition-all duration-300", scrolled ? "h-6" : "h-7 md:h-8")}
            />
          </span>
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
                  "flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-sm font-medium transition-colors",
                  isActive(item) ? "text-[#f5c56b]" : "text-white/75 hover:text-white"
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
                      <div className="min-w-[248px] overflow-hidden rounded-2xl border border-white/10 bg-[#0c1322]/95 p-2 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                        {item.children.map((c, i) => (
                          <motion.div
                            key={c.href}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.03 * i }}
                          >
                            <Link
                              href={c.href}
                              className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              {c.label}
                              <svg
                                width="13" height="13" viewBox="0 0 14 14" fill="none"
                                className="-translate-x-1 text-[#f5c56b] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
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
            href="/quote"
            className="hidden rounded-full bg-gradient-to-r from-[#f5c56b] to-[#ff7a2d] px-5 py-2.5 text-sm font-semibold text-[#1a0f06] transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Request a Quote
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-white" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-white" />
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
            <div className="max-h-[72vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0c1322] p-4 text-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-white/10 last:border-0">
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
                                  className="block py-2.5 text-sm text-white/60"
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
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="mt-5 block rounded-full bg-gradient-to-r from-[#f5c56b] to-[#ff7a2d] py-3 text-center font-semibold text-[#1a0f06]"
              >
                Request a Quote
              </Link>
              <p className="mt-4 text-center text-xs text-white/40">{COMPANY.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
