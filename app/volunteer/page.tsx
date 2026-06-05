'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function VolunteerPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      interests: formData.getAll('interests'),
      availability: formData.get('availability'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message);
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20 bg-white">
        <Container>
          <div className="editorial-grid">
            <div className="lg:col-span-7">
              <p className="eyebrow">Join the Movement</p>
              <h1 className="accent-statement mb-8">
                We show up, <br />
                <span className="italic font-accent font-normal text-cinnamon text-5xl sm:text-7xl underline decoration-ice-cube decoration-4 underline-offset-8">
                  week after week.
                </span>
              </h1>
              <p className="story-copy text-espresso/80">
                Bloom is built on preparation. We are looking for students who want to turn their
                time into dependable community work.
              </p>
            </div>
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="field-note transform lg:-rotate-2 shadow-xl">
                <p className="text-xs font-bold mb-4 uppercase tracking-[0.2em] text-cinnamon">
                  Our Requirement
                </p>
                <p className="text-xl leading-relaxed text-espresso">
                  "Volunteer for the work behind the photo: planning, teaching, sorting, recording,
                  and returning."
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Form Section: Soft & Friendly */}
      <section className="section-padding bg-horchata/10 border-y border-espresso/5 px-4 sm:px-6">
        <Container className="bg-white p-12 sm:p-24 rounded-block shadow-2xl border border-horchata/50">
          <div className="editorial-grid items-start">
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-16">
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-6 text-espresso">
                    The Commitment
                  </h3>
                  <p className="text-espresso/60 text-lg leading-relaxed">
                    Most sessions require 2 hours of preparation and 2 hours of community work. We
                    value consistency over intensity.
                  </p>
                </div>
                <div className="p-8 bg-ice-cube/20 rounded-3xl border border-ice-cube/50">
                  <h3 className="font-heading text-2xl font-bold mb-6 text-espresso">
                    The Training
                  </h3>
                  <p className="text-espresso/60 text-lg leading-relaxed">
                    New volunteers are paired with experienced leads to learn our documentation
                    standards and teaching methods.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-12">
                <h2 className="accent-statement">Application</h2>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label
                        htmlFor="name"
                        className="text-xs font-bold uppercase tracking-widest text-espresso/40"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full bg-horchata/10 border-b-2 border-horchata py-4 px-2 focus:border-cinnamon outline-none transition-all rounded-t-xl"
                      />
                    </div>
                    <div className="space-y-3">
                      <label
                        htmlFor="email"
                        className="text-xs font-bold uppercase tracking-widest text-espresso/40"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full bg-horchata/10 border-b-2 border-horchata py-4 px-2 focus:border-cinnamon outline-none transition-all rounded-t-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold uppercase tracking-widest text-espresso/40"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="w-full bg-horchata/10 border-b-2 border-horchata py-4 px-2 focus:border-cinnamon outline-none transition-all rounded-t-xl"
                    />
                  </div>

                  <div className="space-y-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-espresso/40">
                      Areas of Interest
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Education',
                        'Personality',
                        'Creative',
                        'Women Empowerment',
                        'Community',
                      ].map((area) => (
                        <label
                          key={area}
                          className="flex items-center gap-4 cursor-pointer group bg-horchata/5 p-4 rounded-2xl border border-transparent hover:border-cinnamon/20 transition-all"
                        >
                          <input
                            type="checkbox"
                            name="interests"
                            value={area.toLowerCase()}
                            className="w-5 h-5 accent-cinnamon rounded-full"
                          />
                          <span className="text-espresso/70 font-bold group-hover:text-espresso transition-colors">
                            {area}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="message"
                      className="text-xs font-bold uppercase tracking-widest text-espresso/40"
                    >
                      Why Bloom?
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      placeholder="Tell us why you want to join a student-led initiative."
                      className="w-full bg-horchata/5 border-2 border-horchata p-6 rounded-3xl focus:border-cinnamon outline-none transition-all resize-none text-lg"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-6 text-xl shadow-lg hover:shadow-xl translate-y-0 active:translate-y-1 transition-all"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                  </Button>

                  {message && (
                    <div
                      className={`p-6 rounded-3xl text-center text-sm font-bold ${status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
                    >
                      {message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Secondary CTA */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="accent-statement mb-6">Not ready to volunteer?</h2>
            <p className="story-copy mx-auto mb-10 text-espresso/60">
              You can still support our sessions by contributing to our resource drives or making a
              donation.
            </p>
            <Button variant="outline" size="lg" className="border-espresso text-espresso">
              <Link href="/donate">View Donation Drives</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
