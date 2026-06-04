import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import type { Metadata } from 'next';
import Image from 'next/image';
import { generateMetadata } from '@/utils/seo';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata(
  'Donate to Bloom',
  'Support Bloom donation camps with clean, usable school materials, books, clothing, and essentials that can be sorted and shared responsibly.'
);

const donationItems = [
  {
    category: 'School Desk',
    items: ['Unused notebooks', 'Storybooks', 'Stationery', 'Art supplies', 'School bags'],
  },
  {
    category: 'Daily Essentials',
    items: ['Clean uniforms', 'Shoes', 'Socks', 'Hygiene kits', 'Water bottles'],
  },
  {
    category: 'Home Support',
    items: ['Clothes', 'Blankets', 'Bedding', 'Kitchen utensils', 'Storage boxes'],
  },
  {
    category: 'Digital Bridge',
    items: ['Working laptops', 'Tablets', 'Keyboards', 'Chargers', 'Headphones'],
  },
];

const campSteps = [
  ['Check', 'You bring items that are clean, working, and genuinely usable.'],
  ['Sort', 'Bloom volunteers separate, count, label, and record every useful donation.'],
  ['Match', 'Items are grouped by actual need instead of handed out randomly.'],
  ['Report', 'We note where material went so donors and volunteers can stay accountable.'],
];

export default function DonatePage() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-4">Donate</p>
              <h1 className="font-heading text-5xl sm:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
                Give things a second classroom.
              </h1>
              <p className="story-copy text-xl">
                Bloom donation camps turn clean, usable material into school support, care kits, and
                practical relief. The work is sorting before sharing.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden border border-neutral-200 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
                alt="Volunteers sorting donations"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <SectionHeader
            title="How a Bloom camp works"
            description="A donation is useful only when it reaches someone in usable condition, with enough care to match the need."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {campSteps.map(([title, description], index) => (
              <div key={title} className="text-center">
                <div className="font-heading w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-2">
                  {title}
                </h3>
                <p className="text-neutral-600 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader title="What we can actually use" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {donationItems.map((group) => (
              <div
                key={group.category}
                className="bg-white p-6 rounded-lg border border-neutral-200"
              >
                <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-neutral-600">
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
            <p className="text-neutral-700 font-medium">
              Please skip broken electronics, stained clothing, damaged books, expired products, and
              anything you would not give with dignity.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden border border-neutral-200 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
                alt="Students organizing materials"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow mb-4">Why it matters</p>
              <h2 className="font-heading text-4xl font-bold text-neutral-900 mb-6">
                The sorting table is part of the service.
              </h2>
              <p className="font-accent text-lg text-neutral-700 mb-6 leading-relaxed">
                Donation work can become messy fast. Bloom treats logistics as care: volunteers
                check condition, group items, record counts, and learn that respect lives in the
                details.
              </p>
              <Button>
                <Link href="/contact">Plan a Donation</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-4xl font-bold mb-4">Bring less. Bring better.</h2>
            <p className="text-lg mb-8 opacity-90">
              The best donation is clean, usable, and easy to place in a child's day.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
