"use client";

import { useMemo, useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { openingQuestion } from "@/data/shared";
import { cn } from "@/lib/utils";
import type { ServicePage } from "@/data/types";

type FormType = ServicePage["formType"];

/*
 * Lead qualification, built to the discovery form rather than to a generic
 * contact template. Scope §7.3:
 *   - purpose is asked first, because it decides everything after it
 *   - qualifying questions come BEFORE contact details, so a partial
 *     completion still tells us something
 *   - progressive disclosure with a visible progress indicator
 *   - a deliberate path for "not right now" rather than losing them
 */

const purposeOptions: Record<FormType, string[]> = {
  residential: [
    "Refinancing an existing loan",
    "Buying a home to live in",
    "Buying an investment property",
    "Building or renovating",
    "Consolidating other debt",
  ],
  professional: [
    "Buying a home to live in",
    "Refinancing an existing loan",
    "Buying an investment property",
    "Practice or equipment finance",
  ],
  commercial: [
    "Cashflow or working capital",
    "Buying commercial property",
    "Buying a business",
    "Equipment or vehicles",
  ],
  asset: [
    "Trucks or trailers",
    "Excavators or machinery",
    "Vehicles or utes",
    "Workshop or other equipment",
  ],
  smsf: [
    "Buying residential property in the fund",
    "Buying commercial property in the fund",
    "Refinancing an existing SMSF loan",
  ],
};

/** The qualifying question set per service, taken from the discovery form. */
const qualifiers: Record<
  FormType,
  { id: string; label: string; options: string[]; disqualify?: string[] }[]
> = {
  residential: [
    {
      id: "employment",
      label: "How is your income earned?",
      options: ["PAYG employee", "Self-employed", "Both", "Retired or other"],
    },
    {
      id: "deposit",
      label: "Deposit or equity available?",
      options: ["Less than 5%", "5–10%", "10–20%", "More than 20%"],
      disqualify: ["Less than 5%"],
    },
    {
      id: "residency",
      label: "Residency status",
      options: ["Australian citizen", "Permanent resident", "Temporary visa"],
      disqualify: ["Temporary visa"],
    },
  ],
  professional: [
    {
      id: "profession",
      label: "Your profession",
      options: [
        "Doctor or specialist",
        "Registrar or resident",
        "Dentist or vet",
        "Accountant or lawyer",
        "Other",
      ],
    },
    {
      id: "residency",
      label: "Residency status",
      options: ["Australian citizen", "Permanent resident", "Temporary visa"],
      disqualify: ["Temporary visa"],
    },
  ],
  commercial: [
    {
      id: "trading",
      label: "How long has the business traded?",
      options: ["Under 1 year", "1–2 years", "2–5 years", "More than 5 years"],
      disqualify: ["Under 1 year"],
    },
    {
      id: "gst",
      label: "ABN and GST registered?",
      options: ["Both", "ABN only", "Neither"],
      disqualify: ["Neither"],
    },
    {
      id: "security",
      label: "Property available as security?",
      options: ["Yes", "No", "Possibly"],
    },
  ],
  asset: [
    {
      id: "trading",
      label: "How long have you held the ABN?",
      options: ["Under 1 year", "1–2 years", "More than 2 years"],
      disqualify: ["Under 1 year"],
    },
    {
      id: "asset",
      label: "New or used?",
      options: ["New", "Used, under 10 years", "Used, over 10 years"],
    },
    {
      id: "credit",
      label: "Any current defaults or credit issues?",
      options: ["None", "Resolved previously", "Yes, current"],
      disqualify: ["Yes, current"],
    },
  ],
  smsf: [
    {
      id: "fund",
      label: "Is the fund already established?",
      options: ["Yes", "No, still setting up"],
      disqualify: ["No, still setting up"],
    },
    {
      id: "balance",
      label: "Approximate fund balance",
      options: ["Under $200k", "$200k–$300k", "$300k–$500k", "More than $500k"],
      disqualify: ["Under $200k"],
    },
    {
      id: "adviser",
      label: "Accountant or adviser involved?",
      options: ["Yes", "Not yet"],
      disqualify: ["Not yet"],
    },
  ],
};

const timeframes = [
  "Ready now",
  "Within 3 months",
  "3–6 months",
  "Just looking for now",
];

export function EnquiryForm({
  formType,
  serviceName,
  heading = "Tell us the situation",
}: {
  formType: FormType;
  serviceName: string;
  heading?: string;
}) {
  const questions = qualifiers[formType];
  const totalSteps = 4;

  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeframe, setTimeframe] = useState("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const stepRef = useRef<HTMLDivElement>(null);

  /* Soft flags — never shown as a rejection, used to route the enquiry. */
  const flags = useMemo(() => {
    const out: string[] = [];
    for (const q of questions) {
      const a = answers[q.id];
      if (a && q.disqualify?.includes(a)) out.push(`${q.label}: ${a}`);
    }
    if (timeframe === "Just looking for now") out.push("Not ready yet");
    return out;
  }, [answers, questions, timeframe]);

  useIsomorphicLayoutEffect(() => {
    const el = stepRef.current;
    if (!el) return;
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-step-item]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "brand-out" },
      );
    }, el);
    return () => ctx.revert();
  }, [step, submitted]);

  const canAdvance =
    step === 0
      ? Boolean(purpose)
      : step === 1
        ? questions.every((q) => answers[q.id])
        : step === 2
          ? Boolean(timeframe)
          : Boolean(contact.name && contact.phone);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    /*
     * TODO — wire to Salestrekker 2.0 (scope §7.3 / §13).
     * The payload below is the shape the CRM needs: service type, purpose,
     * every qualifying answer, the soft flags, and campaign attribution.
     * Until the integration method is confirmed (API, webhook or email
     * parse), nothing is transmitted.
     */
    const payload = {
      service: serviceName,
      formType,
      purpose,
      answers,
      timeframe,
      flags,
      contact,
      submittedAt: new Date().toISOString(),
    };
    if (process.env.NODE_ENV === "development") console.info("Enquiry payload", payload);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="enquire" className="section-y bg-sand">
        <div className="container-content">
          <div ref={stepRef} className="mx-auto max-w-[42rem] text-center">
            <span
              data-step-item
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green text-offwhite"
            >
              <Icon name="check" className="h-7 w-7" />
            </span>
            <h2 data-step-item className="type-title mt-8 text-[clamp(1.75rem,3vw,2.5rem)] text-forest">
              {timeframe === "Just looking for now"
                ? "Noted — we'll check back in six months."
                : `We'll call you within about ${site.callbackMinutes} minutes.`}
            </h2>
            <p data-step-item className="type-body mt-5 text-forest/70">
              {timeframe === "Just looking for now"
                ? "No pressure and no chasing. If things change before then, call us any time."
                : "During business hours. We try three times before we give up on you."}
            </p>
            <p data-step-item className="type-label mt-8 text-green">
              {site.phone}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="enquire" className="section-y bg-sand" aria-labelledby="enquire-heading">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-[auto_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal variant="fade">
              <p className="type-label text-green">{serviceName}</p>
            </Reveal>
            <SplitLines
              as="h2"
              id="enquire-heading"
              className="type-title mt-5 max-w-[12ch] text-[clamp(1.75rem,3vw,2.5rem)] text-forest"
            >
              {heading}
            </SplitLines>
            <Reveal variant="rise" delay={0.1}>
              <p className="type-body mt-5 max-w-[34ch] text-forest/70">
                Four short steps. We ask what you need before we ask who you
                are.
              </p>
            </Reveal>
          </div>

          <form
            onSubmit={submit}
            className="rounded-panel border border-ink-12 bg-offwhite p-7 sm:p-9"
          >
            {/* Progress */}
            <div className="flex items-center gap-3">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-pill transition-colors duration-500",
                    i <= step ? "bg-green" : "bg-ink-12",
                  )}
                />
              ))}
              <span className="type-label shrink-0 text-ink-50 numeric">
                {step + 1}/{totalSteps}
              </span>
            </div>

            <div ref={stepRef} className="mt-8 min-h-[19rem]">
              {step === 0 && (
                <Step title={openingQuestion}>
                  <Choices
                    name="purpose"
                    options={purposeOptions[formType]}
                    value={purpose}
                    onChange={setPurpose}
                  />
                </Step>
              )}

              {step === 1 && (
                <Step title="A few quick details">
                  <div className="grid gap-7">
                    {questions.map((q) => (
                      <div key={q.id} data-step-item>
                        <p className="type-label mb-3 text-forest/60">{q.label}</p>
                        <Choices
                          name={q.id}
                          options={q.options}
                          value={answers[q.id] ?? ""}
                          onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                          small
                        />
                      </div>
                    ))}
                  </div>
                </Step>
              )}

              {step === 2 && (
                <Step title="When would you want this done?">
                  <Choices
                    name="timeframe"
                    options={timeframes}
                    value={timeframe}
                    onChange={setTimeframe}
                  />
                </Step>
              )}

              {step === 3 && (
                <Step title="How do we reach you?">
                  <div className="grid gap-4">
                    <Field
                      label="Name"
                      value={contact.name}
                      onChange={(v) => setContact((c) => ({ ...c, name: v }))}
                      autoComplete="name"
                      required
                    />
                    <Field
                      label="Phone"
                      value={contact.phone}
                      onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
                      type="tel"
                      autoComplete="tel"
                      required
                    />
                    <Field
                      label="Email (optional)"
                      value={contact.email}
                      onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                      type="email"
                      autoComplete="email"
                    />
                    <p data-step-item className="type-body mt-2 text-[0.8125rem] text-ink-50">
                      We use these details to call you about this enquiry.
                      Read our{" "}
                      <a href="/privacy-policy" className="underline underline-offset-4">
                        privacy policy
                      </a>
                      .
                    </p>
                  </div>
                </Step>
              )}
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink-12 pt-6">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="type-label text-ink-50 transition-colors hover:text-forest disabled:opacity-0"
              >
                ← Back
              </button>

              {step < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canAdvance}
                  className="type-label rounded-pill bg-forest px-7 py-3.5 text-offwhite transition-colors duration-300 enabled:hover:bg-green disabled:opacity-35"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canAdvance}
                  className="type-label rounded-pill bg-forest px-7 py-3.5 text-offwhite transition-colors duration-300 enabled:hover:bg-green disabled:opacity-35"
                >
                  Send enquiry
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend data-step-item className="type-title mb-6 text-[clamp(1.25rem,2vw,1.6rem)] text-forest">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Choices({
  name,
  options,
  value,
  onChange,
  small = false,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  small?: boolean;
}) {
  return (
    <div className={cn("grid gap-2.5", small && "sm:grid-cols-2")}>
      {options.map((o) => {
        const active = value === o;
        return (
          <label
            key={o}
            data-step-item
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-card border px-5 transition-colors duration-300",
              small ? "py-3" : "py-4",
              active
                ? "border-green bg-green/10 text-forest"
                : "border-ink-12 text-ink-70 hover:border-ink-30 hover:text-forest",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o}
              checked={active}
              onChange={() => onChange(o)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors",
                active ? "border-green" : "border-ink-30",
              )}
            >
              {active && <span className="h-2 w-2 rounded-full bg-green" />}
            </span>
            <span className={cn("type-body", small && "text-[0.9375rem]")}>{o}</span>
          </label>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const id = `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div data-step-item className="grid gap-2">
      <label htmlFor={id} className="type-label text-forest/60">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="type-body rounded-card border border-ink-12 bg-offwhite px-5 py-3.5 text-forest outline-none transition-colors focus:border-green"
      />
    </div>
  );
}
