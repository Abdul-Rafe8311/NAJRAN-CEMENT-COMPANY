"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";

export function QuoteForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <h2 className="font-display text-h3 font-semibold">Please fulfil the form below.</h2>

        {sent ? (
          <div className="mt-8 rounded-[var(--radius-card)] border border-[#1f7a5a]/30 bg-[#1f7a5a]/[0.06] p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#1f7a5a]/15 text-[#1f7a5a]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="mt-4 font-display text-lg font-semibold">Quote request received</p>
            <p className="mt-2 text-sm text-ash">
              Thank you. Our sales team will get back to you with a quote shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-7 space-y-6"
          >
            <Field label="Commercial Name" name="commercial_name" type="text" />
            <Field label="Your Email" name="email" type="email" />
            <Field label="Phone Number" name="phone" type="tel" />

            <div>
              <label htmlFor="type" className="text-sm font-medium text-bone">
                Type <span className="text-ember">(required)</span>
              </label>
              <select
                id="type"
                required
                defaultValue="Cement"
                className="mt-2 w-full rounded-xl border border-line bg-coal px-4 py-3 text-sm outline-none transition-colors focus:border-kiln focus:bg-white"
              >
                <option>Cement</option>
                <option>Clinker</option>
                <option>Bulk Cement</option>
              </select>
            </div>

            <div>
              <label htmlFor="cement_type" className="text-sm font-medium text-bone">
                Cement Type <span className="text-ember">(required)</span>
              </label>
              <select
                id="cement_type"
                required
                className="mt-2 w-full rounded-xl border border-line bg-coal px-4 py-3 text-sm outline-none transition-colors focus:border-kiln focus:bg-white"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.name}>{`${p.short} — ${p.name}`}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-kiln to-ember px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Send request
            </button>
            <p className="text-xs text-muted">
              Note: form submission requires backend wiring before launch (UI-complete).
            </p>
          </form>
        )}
      </div>

      <div className="relative hidden overflow-hidden rounded-[var(--radius-card)] border border-line shadow-soft lg:block">
        <Image
          src="/images/plant-full.jpg"
          alt="Najran Cement production"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 0px, 40vw"
        />
      </div>
    </div>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-bone">
        {label} <span className="text-ember">(required)</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full rounded-xl border border-line bg-coal px-4 py-3 text-sm outline-none transition-colors focus:border-kiln focus:bg-white"
      />
    </div>
  );
}
