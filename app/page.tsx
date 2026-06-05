import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { ImpactCounter } from '@/components/cards/ImpactCounter';

const programs = [
  {
    title: 'Homework Tables',
    slug: '01',
    description:
      'A volunteer sits with a few children, opens the notebook, and notices where the confusion begins.',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Voice Rooms',
    slug: '02',
    description:
      'Practice spaces where confidence is rehearsed: one sentence today, a debate next week.',
    image:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Blank Page Labs',
    slug: '03',
    description: 'A scene, a sketch, a poem. Children learn that their imagination deserves space.',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
  },
];

const ledgerItems = [
  { number: 100, label: 'Active student members', suffix: '+' },
  { number: 18, label: 'Average children per circle', suffix: '' },
  { number: 500, label: 'Logged session hours', suffix: '+' },
];

export default function Home() {
  return (
    <>
      {/* Hero: Editorial & Bold */}
      <section className="pt-24 pb-20 sm:pt-32 sm:pb-32 bg-white">
        <Container>
          <div className="max-w-5xl">
            <p className="eyebrow mb-8">Maxfort students, Delhi communities</p>
            <h1 className="font-heading text-6xl sm:text-8xl font-bold text-espresso mb-12 leading-[0.9] tracking-tighter">
              Not charity.
              <br />
              <span className="text-cinnamon italic font-accent font-normal">
                A weekly promise.
              </span>
            </h1>

            <div className="editorial-grid">
              <div className="lg:col-span-7">
                <p className="story-copy text-2xl sm:text-3xl mb-10 text-espresso">
                  Bloom is a student-run initiative that shows up for children through study
                  circles, confidence rooms, and creative labs. We do the small work repeatedly
                  until it becomes trust.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-none px-10">
                    <Link href="/volunteer">Join a Session</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-none px-10">
                    <Link href="/about">Read Our Story</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="field-note transform lg:rotate-2">
                  <p className="text-sm font-semibold mb-2 uppercase tracking-widest text-cinnamon">
                    Field note #24
                  </p>
                  <p className="text-lg leading-relaxed">
                    The best moment is usually quiet: a child asking for one more page, one more
                    sum, one more chance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Ledger: Minimalist Data */}
      <section className="section-padding bg-horchata/20 border-y border-espresso/5">
        <Container>
          <div className="mb-16">
            <p className="eyebrow">The Ledger</p>
            <h2 className="accent-statement">Numbers we stand behind.</h2>
          </div>
          <div className="divide-y divide-espresso/10">
            {ledgerItems.map((item, idx) => (
              <div key={idx} className="ledger-row group">
                <div className="w-32">
                  <ImpactCounter number={item.number} label="" suffix={item.suffix} />
                </div>
                <div className="flex-1">
                  <p className="font-heading text-2xl font-semibold group-hover:text-cinnamon transition-colors">
                    {item.label}
                  </p>
                  <p className="text-espresso/60 mt-1 max-w-lg">
                    Every session is recorded in our distribution logs and attendance sheets to
                    ensure continuity of care.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Programs: Asymmetrical Editorial Grid */}
      <section className="section-padding bg-white">
        <Container>
          <div className="mb-20 lg:flex items-end justify-between gap-10">
            <div className="max-w-2xl">
              <p className="eyebrow">What we run</p>
              <h2 className="accent-statement mb-6">Programs with fingerprints on them.</h2>
              <p className="story-copy">
                Each format is built for rooms full of real children, limited time, and volunteers
                who are learning to lead while serving.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <Link
                href="/programs"
                className="text-cinnamon font-bold hover:underline underline-offset-8 decoration-2"
              >
                View all formats &rarr;
              </Link>
            </div>
          </div>

          <div className="space-y-32">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className={`editorial-grid ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:col-span-6">
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 bg-espresso text-white px-4 py-2 font-heading font-bold text-xl">
                      {program.slug}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                  <h3 className="accent-statement text-4xl mb-6">{program.title}</h3>
                  <p className="story-copy mb-8">{program.description}</p>
                  <Button
                    variant="outline"
                    className="rounded-none border-espresso text-espresso hover:bg-espresso hover:text-white transition-all"
                  >
                    <Link href="/programs">Learn more</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quote: The Voice */}
      <section className="section-padding bg-espresso text-horchata">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <p className="eyebrow text-horchata opacity-60">Our Standard</p>
            <blockquote className="font-accent text-3xl sm:text-5xl leading-tight italic mb-10">
              "If a program cannot be repeated, recorded, and improved, it is not finished. Bloom is
              built for continuity, not just good photographs."
            </blockquote>
            <p className="font-heading font-bold uppercase tracking-widest">— The Bloom Method</p>
          </div>
        </Container>
      </section>

      {/* CTA: Handcrafted Feel */}
      <section className="section-padding bg-white">
        <Container>
          <div className="bg-horchata p-10 sm:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="accent-statement mb-8">Come with prepared hands.</h2>
              <p className="story-copy mx-auto mb-12">
                Volunteer for the work behind the photo: planning, listening, teaching, sorting,
                recording, and returning.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button
                  size="lg"
                  className="rounded-none bg-espresso text-white hover:bg-ink px-12"
                >
                  <Link href="/volunteer">Volunteer Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-none border-espresso text-espresso px-12"
                >
                  <Link href="/donate">Support Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
