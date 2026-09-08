"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { publishedBlogs } from "@/data/blogs";
import { cn } from "@/lib/utils";

const ALL = "All";

/**
 * The blogs index.
 *
 * One grid, filtered by a row of tabs, rather than a separate band per
 * cluster. Only written blogs appear — the planned briefs stay out of the
 * index rather than filling it with cards that go nowhere.
 *
 * With twelve blogs across seven clusters the old layout produced
 * seven headings and several one-card rows; a single grid keeps the whole
 * library visible and lets the reader narrow it themselves.
 *
 * Filtering is client state because it is instant and shareable-by-nothing —
 * there is no reason to make it a URL or a round trip.
 */
export function BlogGrid() {
  const [active, setActive] = useState<string>(ALL);

  const clusters = useMemo(
    () => [ALL, ...new Set(publishedBlogs.map((g) => g.cluster))],
    [],
  );

  const shown = useMemo(
    () =>
      active === ALL
        ? publishedBlogs
        : publishedBlogs.filter((g) => g.cluster === active),
    [active],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter blogs by topic"
        className="flex flex-wrap gap-2.5"
      >
        {clusters.map((c) => {
          const on = c === active;
          const count =
            c === ALL ? publishedBlogs.length : publishedBlogs.filter((g) => g.cluster === c).length;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(c)}
              className={cn(
                "type-label rounded-pill border px-5 py-3 transition-colors duration-300",
                on
                  ? "border-forest bg-forest text-offwhite"
                  : "border-ink-12 text-ink-70 hover:border-green hover:text-forest",
              )}
            >
              {c}
              <span className={cn("ml-2 numeric", on ? "text-paper-40" : "text-ink-30")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {shown.map((g) => (
          <Link
            key={g.slug}
            href={`/blogs/${g.slug}`}
            className="group card-on-light flex h-full flex-col overflow-hidden rounded-panel border transition-colors duration-500 hover:border-clay"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
              <Image
                src={g.heroImage!}
                alt=""
                fill
                sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.04]"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-6 p-7">
              <div>
                <p className="type-label text-sand">{g.cluster}</p>
                <h3 className="type-title mt-3 text-[1.375rem]">{g.title}</h3>
                <p className="type-body card-muted mt-2.5 text-[0.9375rem]">{g.summary}</p>
              </div>
              <span className="type-label flex items-center gap-2 text-clay-soft">
                Read · {g.readMinutes} min
                <span
                  aria-hidden="true"
                  className="transition-transform duration-400 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
