"use client";

import { useState } from "react";
import Image from "next/image";

const TEXT_FIELDS = [
  { name: "trade_name", label: "Trade Name", type: "text" },
  { name: "person_in_charge", label: "Person in Charge", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
];

const FILE_FIELDS = [
  "Becoming a Supplier Application Letter",
  "Copy of the Commercial Registration",
  "Copy of Chamber of Commerce Membership",
  "Copy of Zakat and Income Certificate",
];

export function SupplierForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_0.9fr]">
      {/* Form */}
      <div>
        <h2 className="font-display text-h3 font-semibold">Please fulfil the form below.</h2>

        {sent ? (
          <div className="mt-8 rounded-[var(--radius-card)] border border-[#1f7a5a]/30 bg-[#1f7a5a]/[0.06] p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#1f7a5a]/15 text-[#1f7a5a]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="mt-4 font-display text-lg font-semibold">Application received</p>
            <p className="mt-2 text-sm text-ash">
              Thank you. Our procurement team will be in touch shortly.
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
            {TEXT_FIELDS.map((f) => (
              <div key={f.name}>
                <label htmlFor={f.name} className="text-sm font-medium text-bone">
                  {f.label} <span className="text-ember">(required)</span>
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  required
                  className="mt-2 w-full rounded-xl border border-line bg-coal px-4 py-3 text-sm outline-none transition-colors focus:border-kiln focus:bg-white"
                />
              </div>
            ))}

            {FILE_FIELDS.map((label) => (
              <div key={label}>
                <label className="text-sm font-medium text-bone">
                  {label} <span className="text-ember">(required)</span>
                </label>
                <input
                  type="file"
                  required
                  className="mt-2 block w-full text-sm text-ash file:mr-4 file:rounded-lg file:border-0 file:bg-bone file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:opacity-90"
                />
              </div>
            ))}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-kiln to-ember px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Send
            </button>
            <p className="text-xs text-muted">
              Note: file submission requires backend wiring before launch (form is UI-complete).
            </p>
          </form>
        )}
      </div>

      {/* Side image */}
      <div className="relative hidden overflow-hidden rounded-[var(--radius-card)] border border-line shadow-soft lg:block">
        <Image
          src="/images/plant-full.jpg"
          alt="Inside the Najran Cement plant"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 0px, 40vw"
        />
      </div>
    </div>
  );
}
