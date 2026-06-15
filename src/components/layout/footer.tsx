import Link from "next/link";
import { COMPANY, FOOTER_EXPLORE, PRODUCTS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-kiln to-ember font-display text-sm font-bold text-void">
                N
              </span>
              <span className="font-display text-sm font-semibold">Najran Cement</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {COMPANY.tagline}. Producing premium cement in the Kingdom of Saudi Arabia
              since {COMPANY.established}.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {FOOTER_EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ash transition-colors hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Products
            </h4>
            <ul className="mt-5 space-y-3">
              {PRODUCTS.map((p) => (
                <li key={p.name} className="text-sm text-ash">
                  {p.short}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-ash">
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-bone">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-bone">
                  {COMPANY.email}
                </a>
              </li>
              <li className="text-muted">{COMPANY.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p>{COMPANY.exchange}</p>
        </div>
      </div>
    </footer>
  );
}
