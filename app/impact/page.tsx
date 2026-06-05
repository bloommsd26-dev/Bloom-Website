import { Container } from '@/components/layout/Container';
import Image from 'next/image';
import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ImpactCounter } from '@/components/cards/ImpactCounter';

export const metadata: Metadata = generateMetadata(
  'The Ledger | Bloom Impact',
  'A transparent record of Bloom’s work: sessions logged, children supported, and the student-led hours behind the initiative.'
);

const impactMetrics = [
  { number: 100, label: 'Active Volunteers', suffix: '+', detail: 'Maxfort School students committed to weekly visits.' },
  { number: 1200, label: 'Session Minutes', suffix: '', detail: 'Average preparation and teaching time per week.' },
  { number: 15, label: 'Community Circles', suffix: '', detail: 'Recurring safe spaces for learning and confidence.' },
  { number: 400, label: 'Resources Distributed', suffix: '+', detail: 'Notebooks, kits, and curated materials provided.' },
];

const stories = [
  {
    title: 'The silence that broke',
    text: 'A child in circle #04 didn’t speak for three weeks. In week four, he asked for the stage in the Voice Room. He didn’t give a speech; he just said his name clearly. That was the win of the month.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    meta: 'Field Note #12 | Personality Development'
  },
  {
    title: 'A dependable Saturday',
    text: 'At the Homework Tables, impact isn’t measured in grades alone. It’s measured in the fact that when we arrive at 10 AM, the children are already there, notebooks open, waiting for the person who promised to return.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    meta: 'Field Note #08 | Educational Support'
  }
];

export default function ImpactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20 bg-white">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">The Ledger</p>
            <h1 className="accent-statement mb-8 text-5xl sm:text-7xl">
              Numbers and notes.
            </h1>
            <p className="story-copy text-espresso/70">
              We only publish figures we can stand behind. Our impact is not found in one-time events, but in the slow, steady build of recurring sessions.
            </p>
          </div>
        </Container>
      </section>

      {/* Metrics: Records Style with Smooth Edges */}
      <section className="section-padding bg-ice-cube/10 border-y border-espresso/5">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactMetrics.map((metric, idx) => (
              <div key={idx} className="bg-white p-12 flex flex-col justify-between hover:bg-horchata/5 transition-all rounded-3xl shadow-sm hover:shadow-md border border-espresso/5">
                <div className="mb-10">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-espresso/30 mb-2">Record 0{idx + 1}</p>
                  <ImpactCounter number={metric.number} label="" suffix={metric.suffix} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-3 text-espresso">{metric.label}</h3>
                  <p className="text-espresso/60 text-lg leading-relaxed">{metric.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stories: Editorial Layout with Soft Images */}
      <section className="section-padding bg-white">
        <Container>
          <div className="mb-24">
            <p className="eyebrow">Qualitative Impact</p>
            <h2 className="accent-statement">The moments between the metrics.</h2>
          </div>
          
          <div className="space-y-40">
            {stories.map((story, idx) => (
              <div key={idx} className="editorial-grid">
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden group rounded-block shadow-2xl">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 rounded-block"
                    />
                    <div className="absolute inset-0 bg-espresso/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}>
                  <p className="text-sm font-bold text-cinnamon uppercase tracking-widest mb-6">{story.meta}</p>
                  <h3 className="font-heading text-3xl font-bold mb-6 italic text-espresso">"{story.title}"</h3>
                  <p className="story-copy text-lg mb-10 text-espresso/80">{story.text}</p>
                  <div className="h-1.5 w-20 bg-horchata rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Transparency with Soft Block */}
      <section className="section-padding bg-white px-4 sm:px-6">
        <Container className="max-w-5xl mx-auto bg-horchata/20 p-12 sm:p-24 rounded-block border border-horchata/50 shadow-inner">
          <div className="editorial-grid items-start">
            <div className="lg:col-span-6">
              <h2 className="accent-statement mb-8">Transparency by default.</h2>
              <p className="story-copy text-espresso/70">
                Every rupee donated and every hour volunteered is logged. We are a student-run organization held to professional standards of accountability.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-7 bg-white p-10 rounded-3xl shadow-sm border border-espresso/5">
              <p className="font-heading text-xs font-bold uppercase tracking-widest text-espresso/40 mb-6">Request Records</p>
              <p className="text-espresso/60 mb-8 leading-relaxed">
                Detailed impact reports, distribution logs, and attendance summaries are available to our donors and supporters upon request.
              </p>
              <Button variant="outline" className="w-full border-espresso text-espresso">
                <Link href="/contact">Request a Report</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
