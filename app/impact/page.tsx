import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata(
  'Impact',
  'See how Bloom records children reached, sessions conducted, volunteer hours, and field notes from its student-led work.'
);

const proofPoints = [
  ['2500+', 'Children Reached', 'Across study circles, creative labs, voice rooms, and care drives.'],
  ['150+', 'Active Volunteers', 'Students who prepare, visit, record, and return.'],
  ['500+', 'Sessions Conducted', 'A growing archive of repeated, practical work.'],
  ['1200+', 'Volunteer Hours', 'Time spent planning, teaching, sorting, listening, and documenting.'],
  ['25+', 'Communities Served', 'Different neighborhoods, schools, and partner spaces.'],
  ['100%', 'Logged', 'Every useful number is treated as a planning tool, not a trophy.'],
];

const stories = [
  {
    title: 'The notebook that finally opened',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    text: 'A child who avoided math began bringing the same notebook back each week because one volunteer slowed the problem down enough.',
  },
  {
    title: 'The first debate line',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    text: 'In a Voice Room, one sentence became a full argument. The win was not the speech. It was choosing to stand up.',
  },
  {
    title: 'A drawing with a name on it',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    text: 'Creative sessions help children put their names on work they are proud to show, not just submit.',
  },
  {
    title: 'Sorted before shared',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    text: 'Care drives now include sorting logs, condition checks, and distribution notes so usefulness comes before volume.',
  },
];

export default function ImpactPage() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">Impact</p>
              <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
                We count so we can return better.
              </h1>
              <p className="text-xl text-neutral-600">
                Bloom tracks the practical things: who came, what happened, what was missing, and what should change next time.
              </p>
            </div>
            <div className="h-96 rounded-lg overflow-hidden border border-neutral-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80"
                alt="People working together around a table"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proofPoints.map(([number, label, description]) => (
              <div key={label} className="bg-white p-8 rounded-lg border border-neutral-200 text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">{number}</div>
                <div className="text-neutral-700 font-medium">{label}</div>
                <p className="text-neutral-600 text-sm mt-3">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <SectionHeader
            title="Impact stories without polish"
            description="The moments we remember are usually small enough to fit in a notebook margin."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story) => (
              <div key={story.title} className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <img src={story.image} alt={story.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{story.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{story.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="The report is a working document"
              description="We use reporting to improve the next session, not just summarize the last one."
              align="center"
            />
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Ask for the ledger</h3>
              <p className="text-neutral-600 mb-6">
                We can share session summaries, donation logs, volunteer hour records, and program notes with partners and supporters.
              </p>
              <Button>
                <Link href="/contact">Request a Report</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
