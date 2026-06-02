'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">Get In Touch</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
              Let's Connect
            </h1>
            <p className="text-xl text-neutral-600">
              Have questions? Want to partner with us? Reach out. We'd love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Email</h3>
                <a href="mailto:hello@bloom.org" className="text-primary-600 hover:text-primary-700">
                  hello@bloom.org
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Location</h3>
                <p className="text-neutral-600">
                  Maxfort School
                  <br />
                  New Delhi, India
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-neutral-600 hover:text-primary-600">
                    Twitter
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-primary-600">
                    Instagram
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-primary-600">
                    Facebook
                  </a>
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Office Hours</h3>
                <p className="text-neutral-600 text-sm">
                  Monday - Friday: 4 PM - 6 PM
                  <br />
                  Saturday: 10 AM - 2 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                <div className="space-y-6">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />

                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                  />

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your message..."
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={5}
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium">
                        Thank you for your message! We'll be in touch soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 font-medium">
                        Something went wrong. Please try again.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={submitStatus === 'loading'}
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="Frequently Asked Questions"
            align="center"
          />
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'How can I volunteer with Bloom?',
                a: 'Visit our Volunteer page and fill out the application form. We\'ll review your information and get in touch to discuss opportunities that match your interests and skills.',
              },
              {
                q: 'How are donations used?',
                a: 'We are committed to transparency. All donations go directly to our programs — tutoring, workshops, materials, and operational costs. We maintain detailed financial records.',
              },
              {
                q: 'Can organizations partner with Bloom?',
                a: 'Yes! We welcome partnerships. Contact us to discuss collaboration opportunities that align with our mission.',
              },
              {
                q: 'How often are programs conducted?',
                a: 'Program frequency varies. Most programs run weekly or bi-weekly. Specific schedules are shared with volunteers and participants.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
