"use client";

import { useState } from "react";

export function IRContact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mt-8">
      {/* IR info */}
      <div className="card-soft mb-8 grid gap-4 p-6 sm:grid-cols-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted">Phone</div>
          <a href="tel:0175299990" className="mt-1 block text-sm font-medium hover:text-kiln">017-529-9990</a>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted">Extensions</div>
          <div className="mt-1 text-sm font-medium">777 &amp; 544</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted">Email</div>
          <a href="mailto:IR@najrancement.com" className="mt-1 block text-sm font-medium hover:text-kiln">
            IR@najrancement.com
          </a>
        </div>
      </div>

      {sent ? (
        <div className="rounded-[var(--radius-card)] border border-[#1f7a5a]/30 bg-[#1f7a5a]/[0.06] p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#1f7a5a]/15 text-[#1f7a5a]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <p className="mt-4 font-display text-lg font-semibold">Message sent</p>
          <p className="mt-2 text-sm text-ash">Thank you. Our Investor Relations team will respond shortly.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="grid gap-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Your Name" name="name" type="text" />
            <Field label="Your Email" name="email" type="email" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Phone Number" name="phone" type="tel" />
            <Field label="Subject" name="subject" type="text" required={false} />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-bone">Your Message</label>
            <textarea
              id="message"
              rows={6}
              className="mt-2 w-full rounded-xl border border-line bg-coal px-4 py-3 text-sm outline-none transition-colors focus:border-kiln focus:bg-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-kiln to-ember px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Send
            </button>
            <p className="mt-3 text-xs text-muted">Note: form submission requires backend wiring before launch (UI-complete).</p>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({ label, name, type, required = true }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-bone">
        {label} {required && <span className="text-ember">(required)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-line bg-coal px-4 py-3 text-sm outline-none transition-colors focus:border-kiln focus:bg-white"
      />
    </div>
  );
}
