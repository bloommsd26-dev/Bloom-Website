import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata(
  'Donate to Bloom',
  'Support Bloom\'s mission through donation camps, community giving, and sustainable resource collection. Reduce waste. Create opportunity.'
);

const donationItems = [
  {
    category: 'Educational Materials',
    items: ['Used notebooks', 'Books', 'Stationery', 'Art supplies', 'Educational posters'],
  },
  {
    category: 'Personal Essentials',
    items: ['School uniforms', 'Shoes', 'Socks', 'Hygiene kits', 'School bags'],
  },
  {
    category: 'Household Items',
    items: ['Clothes', 'Blankets', 'Bedding', 'Kitchen utensils', 'Storage boxes'],
  },
  {
    category: 'Technology',
    items: ['Old laptops', 'Tablets', 'Keyboards', 'Chargers', 'Accessories'],
  },
];

const benefits = [
  {
    title: 'Reduce Waste',
    description: 'Give items a second life instead of throwing them away. Sustainable giving that helps the environment.',
  },
  {
    title: 'Create Opportunity',
    description: 'Every donation directly enables programs that change children\'s lives.',
  },
  {
    title: 'Community Connection',
    description: 'Participate in donation camps and meet the communities you\'re supporting.',
  },
  {
    title: 'Transparency',
    description: 'Track where your donations go and see the direct impact they create.',
  },
];

export default function DonatePage() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">Support Bloom</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
              Reduce Waste. Create Opportunity.
            </h1>
            <p className="text-xl text-neutral-600">
              Bloom's donation model is about sustainable giving. We collect used but usable items and transform them into opportunities for underprivileged children.
            </p>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <Container>
          <SectionHeader
            title="How Bloom Donation Camps Work"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Donate',
                description: 'Bring your used but usable items to a Bloom donation camp.',
              },
              {
                step: '2',
                title: 'Collect',
                description: 'We collect, organize, and catalog all donations.',
              },
              {
                step: '3',
                title: 'Distribute',
                description: 'Items are given to children and families who need them most.',
              },
              {
                step: '4',
                title: 'Impact',
                description: 'See the difference your donation makes in our impact reports.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What We Accept */}
      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="What We Accept"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {donationItems.map((group, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-neutral-600">
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
              All items must be clean, in usable condition, and free from damage.
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <Container>
          <SectionHeader
            title="Why Donate to Bloom?"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Upcoming Camps */}
      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="Upcoming Donation Camps"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                date: 'March 15, 2026',
                location: 'Maxfort School',
                time: '4:00 PM - 7:00 PM',
              },
              {
                date: 'March 22, 2026',
                location: 'Community Center',
                time: '10:00 AM - 1:00 PM',
              },
            ].map((camp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">{camp.date}</h3>
                <p className="text-neutral-600 mb-1">
                  <span className="font-semibold">Location:</span> {camp.location}
                </p>
                <p className="text-neutral-600 mb-4">
                  <span className="font-semibold">Time:</span> {camp.time}
                </p>
                <Button size="sm" variant="outline">
                  <Link href="/contact">Register to Donate</Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join our next donation camp or contact us to arrange a pickup for larger donations.
            </p>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
