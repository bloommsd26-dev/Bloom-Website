import { Container } from '@/components/layout/Container';
import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export const metadata: Metadata = generateMetadata(
  'Support the Work | Bloom',
  'Contribute to Bloom’s recurring sessions through resource donations or financial support. Every contribution is logged and matched to community needs.'
);

const needs = [
  { item: 'Notebooks & Stationery', purpose: 'For Homework Tables and Creative Labs.' },
  { item: 'Storybooks (Ages 5-15)', purpose: 'To build community reading circles.' },
  { item: 'Art Supplies', purpose: 'Paints, brushes, and paper for Blank Page Labs.' },
  { item: 'Educational Kits', purpose: 'Science and math tools for practical learning.' },
];

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20 bg-white">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">Support Us</p>
            <h1 className="accent-statement mb-8 text-5xl sm:text-7xl">
              Fuel the <br />
              <span className="italic font-accent font-normal text-cinnamon">weekly promise.</span>
            </h1>
            <p className="story-copy">
              Your contributions directly support the preparation and execution of our sessions. We prioritize practical resources that children can use immediately.
            </p>
          </div>
        </Container>
      </section>

      {/* Resource Needs: Editorial Grid */}
      <section className="section-padding bg-horchata/10 border-y border-espresso/5">
        <Container>
          <div className="editorial-grid">
            <div className="lg:col-span-6">
              <h2 className="accent-statement mb-10 text-3xl">Current resource needs.</h2>
              <div className="space-y-6">
                {needs.map((need, idx) => (
                  <div key={idx} className="flex gap-6 items-start p-6 bg-white border border-espresso/5">
                    <span className="font-heading text-cinnamon font-bold">0{idx + 1}</span>
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">{need.item}</h3>
                      <p className="text-espresso/60 text-sm">{need.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 relative">
              <div className="relative aspect-square overflow-hidden transform lg:rotate-2">
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80"
                  alt="Creative supplies"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="field-note mt-10">
                <p className="text-sm italic">"We collect what can actually be used, sort it carefully, and record it in our distribution logs."</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Financial Support */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="accent-statement mb-12">Financial Contributions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { amount: '₹500', use: 'Support one child for a month of circles.' },
                { amount: '₹2000', use: 'Provide a complete kit for a Creative Lab.' },
                { amount: '₹5000', use: 'Fund an entire week of community sessions.' },
              ].map((tier, idx) => (
                <div key={idx} className="p-10 border border-espresso/10 hover:border-cinnamon transition-colors group">
                  <p className="text-4xl font-black text-espresso mb-4 tabular-nums group-hover:text-cinnamon">{tier.amount}</p>
                  <p className="text-espresso/60 text-sm">{tier.use}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-espresso text-horchata p-10 sm:p-16">
              <h3 className="font-heading text-2xl font-bold mb-6">Bank Transfer Details</h3>
              <div className="space-y-2 font-mono text-sm opacity-80 mb-10">
                <p>Account Name: Bloom Social Initiative</p>
                <p>Account Number: 0000 0000 0000</p>
                <p>IFSC Code: BLOOM000123</p>
                <p>Bank: HDFC Bank, Delhi</p>
              </div>
              <Button size="lg" className="rounded-none bg-cinnamon text-white hover:bg-cinnamon/90 border-none">
                <Link href="/contact">Confirm Contribution</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Transparency Note */}
      <section className="section-padding bg-horchata border-t border-espresso/5">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-espresso/40 mb-6">Transparency</p>
            <p className="story-copy text-espresso/80 italic">
              "Bloom is a student-led organization. Every rupee received is logged and accounted for in our monthly ledger. Donors receive a summary of how their contribution was utilized."
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
