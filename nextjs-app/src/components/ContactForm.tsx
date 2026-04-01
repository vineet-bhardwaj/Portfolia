"use client";

import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mojplkww");

  if (state.succeeded) {
    return (
      <div className="bg-tertiary/10 rounded-xl p-8 text-center">
        <span className="material-symbols-outlined text-6xl text-tertiary mb-4 block">
          check_circle
        </span>
        <h3 className="text-2xl font-serif mb-3">Message Sent!</h3>
        <p className="text-on-surface-variant font-body">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xs font-label uppercase tracking-widest font-semibold text-on-surface-variant"
          >
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-tertiary/20 text-on-surface placeholder:text-outline-variant"
            placeholder="John Doe"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-xs font-label uppercase tracking-widest font-semibold text-on-surface-variant"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-tertiary/20 text-on-surface placeholder:text-outline-variant"
            placeholder="john@example.com"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="text-xs font-label uppercase tracking-widest font-semibold text-on-surface-variant"
        >
          Inquiry Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-tertiary/20 text-on-surface"
        >
          <option>New Project Proposal</option>
          <option>General Collaboration</option>
          <option>Speaking &amp; Mentorship</option>
          <option>Just saying hello</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-xs font-label uppercase tracking-widest font-semibold text-on-surface-variant"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="bg-surface-container-lowest border-none rounded-lg p-4 focus:ring-2 focus:ring-tertiary/20 text-on-surface placeholder:text-outline-variant"
          placeholder="Tell me about your vision..."
          rows={5}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full md:w-auto px-10 py-4 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-full font-bold tracking-tight hover:scale-[1.02] active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
