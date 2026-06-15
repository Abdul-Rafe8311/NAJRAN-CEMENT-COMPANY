"use client";

import { Counter } from "./counter";

/**
 * On-brand "Operations" dashboard mockup for the hero — the tilted
 * product shot. KPI tiles use VERIFIED figures; the chart bars are
 * decorative (no numeric claims). Pure presentational component;
 * the 3D tilt + scroll parallax is applied by the parent.
 */
const BARS = [38, 52, 44, 66, 58, 72, 64, 80, 70, 86, 78, 92];

export function HeroMockup() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_120px_-40px_rgba(16,24,40,0.45)]">
      {/* Window bar */}
      <div className="flex items-center justify-between border-b border-line bg-coal/60 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e6e8ec]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e6e8ec]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e6e8ec]" />
        </div>
        <div className="text-[11px] font-medium text-muted">Najran Cement · Operations</div>
        <div className="flex items-center gap-1.5 rounded-full bg-[#1f7a5a]/10 px-2 py-0.5 text-[10px] font-medium text-[#1f7a5a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1f7a5a]" /> Live
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
        {/* KPI tiles */}
        <div className="grid grid-cols-2 gap-3 sm:col-span-2">
          {[
            { v: 3.0, s: "M", l: "Clinker t / yr" },
            { v: 4.1, s: "M", l: "Cement t / yr" },
            { v: 39, s: "+", l: "Distribution centers" },
            { v: 20, s: "+", l: "Years operating" },
          ].map((k) => (
            <div key={k.l} className="rounded-xl border border-line bg-white p-4">
              <div className="font-display text-2xl font-semibold tracking-tight">
                <Counter value={k.v} suffix={k.s} />
              </div>
              <div className="mt-1 text-[11px] text-muted">{k.l}</div>
            </div>
          ))}

          {/* Decorative production chart */}
          <div className="col-span-2 rounded-xl border border-line bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-bone">Production index</span>
              <span className="text-[10px] text-muted">12-month trend</span>
            </div>
            <div className="mt-3 flex h-20 items-end gap-1.5">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-kiln/30 to-ember/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Status column */}
        <div className="flex flex-col gap-3">
          {[
            { t: "Kiln line", s: "Active", ok: true },
            { t: "Quality lab", s: "Pass", ok: true },
            { t: "Dispatch", s: "39 centers", ok: true },
            { t: "Eco · Turbo", s: "Upcoming", ok: false },
          ].map((r) => (
            <div
              key={r.t}
              className="flex items-center justify-between rounded-xl border border-line bg-white px-3.5 py-3"
            >
              <span className="text-xs font-medium text-bone">{r.t}</span>
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                  r.ok ? "text-[#1f7a5a]" : "text-concrete"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${r.ok ? "bg-[#1f7a5a]" : "bg-concrete"}`}
                />
                {r.s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
