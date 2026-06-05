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
                <span className="italic font-accent font-normal text-cinnamon text-5xl sm:text-7xl">
                  week after week.
                </span>
              </h1>
              <p className="story-copy">
                Bloom is built on preparation. We are looking for students who want to turn their
                time into dependable community work.
              </p>
            </div>
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="field-note transform lg:-rotate-2">
                <p className="text-sm font-semibold mb-4 uppercase tracking-widest text-cinnamon">
                  Our Requirement
                </p>
                <p className="text-lg">
                  "Volunteer for the work behind the photo: planning, teaching, sorting, recording,
                  and returning."
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-horchata/10 border-y border-espresso/5">
        <Container>
          <div className="editorial-grid items-start">
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-4">The Commitment</h3>
                  <p className="text-espresso/70 leading-relaxed">
                    Most sessions require 2 hours of preparation and 2 hours of community work. We
                    value consistency over intensity.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-4">The Training</h3>
                  <p className="text-espresso/70 leading-relaxed">
                    New volunteers are paired with experienced leads to learn our documentation
                    standards and teaching methods.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="bg-white p-8 sm:p-12 border border-espresso/10">
                <h2 className="font-heading text-3xl font-bold mb-10">Application</h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
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
                        className="w-full border-b border-espresso/10 py-3 focus:border-cinnamon outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
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
                        className="w-full border-b border-espresso/10 py-3 focus:border-cinnamon outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
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
                      className="w-full border-b border-espresso/10 py-3 focus:border-cinnamon outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-espresso/40">
                      Focus Areas
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Education',
                        'Personality',
                        'Creative',
                        'Women Empowerment',
                        'Community',
                      ].map((area) => (
                        <label key={area} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="interests"
                            value={area.toLowerCase()}
                            className="w-4 h-4 accent-cinnamon"
                          />
                          <span className="text-espresso/70 group-hover:text-espresso transition-colors">
                            {area}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
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
                      className="w-full border border-espresso/10 p-4 focus:border-cinnamon outline-none transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 text-lg"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                  </Button>

                  {message && (
                    <p
                      className={`text-center text-sm font-bold ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {message}
                    </p>
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
            <Button
              variant="outline"
              size="lg"
              className="rounded-none border-espresso text-espresso"
            >
              <Link href="/donate">View Donation Drives</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
