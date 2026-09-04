"use client";

import { useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* The three objections Robert says he hears most, answered plainly. */
const objections = [
  {
    q: "What does this cost me?",
    a: "Nothing, on the loans advertised on this site. The lender pays the broker a commission when the loan settles — most people don't know that, and it's the single most common thing we get asked. Fees do apply to private lending and some commercial deals, and we'll tell you the number before you commit to anything.",
  },
  {
    q: "Will shopping around hurt my credit file?",
    a: "Not the way we do it. We assess your position and shortlist lenders before anything is formally submitted, so you aren't collecting enquiries on your file while we work out where you fit.",
  },
  {
    q: "How do I know you're not just pushing one lender?",
    a: "We hold our own Australian Credit Licence rather than sitting on a restricted aggregator panel, which means we can reach lenders other brokers can't. We'll tell you which ones we compared and why the recommendation is the recommendation.",
  },
  {
    q: "What if my situation is messy?",
    a: "Then you're talking to the right people. Self-employed with two years of returns that don't tell the whole story, a deal that's already fallen over once, an ATO debt in the background — that's the work we're actually best at.",
  },
] as const;

export function Honesty() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="on-dark grain relative overflow-hidden bg-forest-warm text-offwhite"
      aria-labelledby="honesty-heading"
    >
      {/* Pull quote — taken from the brand's own stationery */}
      <div className="container-wide section-y relative border-b border-paper-20">
        {/*
          FIN-07 — the stock "client on a call" portrait that sat beside this
          quote has been removed. A stranger standing in for a real client
          undercuts the one section on the page about honesty.
        */}
        <div className="max-w-[54rem]">
          <Reveal variant="fade">
            <p className="type-label text-clay-soft">Why people refer us</p>
          </Reveal>
          <SplitLines
            as="blockquote"
            id="honesty-heading"
            className="type-title mt-6 text-[clamp(2.125rem,4vw,3.4rem)] text-offwhite"
          >
            We&rsquo;re independent brokers who work for you. That means honest
            advice, transparent options, and a person who picks up the phone
            when you call.
          </SplitLines>
        </div>
      </div>

      {/* Objections */}
      <div className="container-wide section-y">
        <div className="grid gap-12 lg:grid-cols-[auto_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="type-label text-clay-soft">Before you ask</p>
            <h3 className="type-title mt-5 max-w-none sm:max-w-[12ch] text-[clamp(2rem,2.8vw,2.75rem)] text-offwhite">
              The questions people are asking.
            </h3>
          </div>

          <ul className="grid">
            {objections.map((item, i) => (
              <Accordion
                key={item.q}
                {...item}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Accordion({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    registerGsap();

    if (prefersReducedMotion()) {
      gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
      return;
    }

    const tween = gsap.to(panel, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.55,
      ease: "brand-out",
      overwrite: "auto",
    });

    return () => {
      tween.kill();
    };
  }, [open]);

  return (
    <li className="border-b border-paper-20 first:border-t">
      <h4>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`objection-panel-${index}`}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span
            className={cn(
              "type-subtitle font-sans text-[clamp(1.05rem,1.6vw,1.35rem)] transition-colors duration-300",
              open ? "text-offwhite" : "text-paper-60 group-hover:text-offwhite",
            )}
          >
            {q}
          </span>
          <span
            aria-hidden="true"
            className="relative mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-paper-20 transition-colors duration-300 group-hover:border-sand"
          >
            <span className="absolute h-px w-2.5 bg-sand" />
            <span
              className={cn(
                "absolute h-2.5 w-px bg-sand transition-transform duration-400 ease-[var(--ease-brand)]",
                open && "scale-y-0",
              )}
            />
          </span>
        </button>
      </h4>
      <div
        ref={panelRef}
        id={`objection-panel-${index}`}
        className="h-0 overflow-hidden opacity-0"
      >
        <p className="type-body max-w-[62ch] pb-7 text-paper-60">{a}</p>
      </div>
    </li>
  );
}
