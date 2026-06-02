import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata(
  'Impact',
  'See the real numbers behind Bloom\'s work — children reached, sessions conducted, volunteer hours contributed, and lives transformed.'
);

export default function ImpactPage() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">Our Work</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
              Measurable Impact, Real Change
            </h1>
            <p className="text-xl text-neutral-600">
              We believe in transparency. Here are the numbers behind our mission.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">2500+</div>
              <div className="text-neutral-700 font-medium">Children Reached</div>
              <p className="text-neutral-600 text-sm mt-3">Across five focus areas and our community programs.</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">150+</div>
              <div className="text-neutral-700 font-medium">Active Volunteers</div>
              <p className="text-neutral-600 text-sm mt-3">Student leaders dedicated to creating change.</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-neutral-700 font-medium">Sessions Conducted</div>
              <p className="text-neutral-600 text-sm mt-3">Educational, creative, and developmental programs.</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center">
              <div className="text-5xl font-bold text-secondary-600 mb-2">1200+</div>
              <div className="text-neutral-700 font-medium">Volunteer Hours</div>
              <p className="text-neutral-600 text-sm mt-3">Contributed by our passionate student leaders.</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center">
              <div className="text-5xl font-bold text-secondary-600 mb-2">25+</div>
              <div className="text-neutral-700 font-medium">Communities Served</div>
              <p className="text-neutral-600 text-sm mt-3">Across different neighborhoods and schools.</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-neutral-700 font-medium">Transparent</div>
              <p className="text-neutral-600 text-sm mt-3">All impact data shared openly with stakeholders.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <SectionHeader
            title="Impact Stories"
            description="Behind every number is a story of transformation and hope."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Academic Excellence</h3>
              <p className="text-neutral-600 leading-relaxed">
                Through our tutoring programs, 200+ children have improved their academic performance, with many moving from failing grades to passing marks.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl">🎤</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Confidence Building</h3>
              <p className="text-neutral-600 leading-relaxed">
                Our personality development programs have helped 150+ children overcome shyness and develop public speaking skills.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <div className="bg-secondary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Creative Expression</h3>
              <p className="text-neutral-600 leading-relaxed">
                Our creative programs have provided platforms for 300+ children to express themselves through art, writing, and performance.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <div className="bg-secondary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl">👧</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Women Empowerment</h3>
              <p className="text-neutral-600 leading-relaxed">
                Our women empowerment initiatives have reached 400+ girls, building their confidence and awareness about their rights.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="Our Commitment"
            description="We are committed to transparency and accountability in everything we do."
            align="center"
          />
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              Bloom maintains detailed records of all our programs and their outcomes. We believe in transparent reporting and welcome questions about our impact. All donations are used efficiently and ethically, with a focus on creating sustainable, long-term change.
            </p>
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Access Our Reports</h3>
              <p className="text-neutral-600 mb-6">
                Detailed impact reports, financial statements, and program outcomes are available upon request. Contact us to learn more.
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
