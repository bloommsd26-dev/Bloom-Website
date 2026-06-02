import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = generateMetadata(
  'About Bloom',
  'Learn about Bloom — a student-led social impact initiative started by Maxfort School students dedicated to empowering children through education, mentorship, and creative opportunities.'
);

const values = [
  {
    title: 'Empowerment',
    description: 'We believe in enabling every child to reach their full potential through education and opportunity.',
  },
  {
    title: 'Compassion',
    description: 'Serving with genuine care and empathy, understanding the challenges our communities face.',
  },
  {
    title: 'Creativity',
    description: 'Fostering creative thinking and innovative solutions to educational and social challenges.',
  },
  {
    title: 'Leadership',
    description: 'Developing young leaders who understand that true leadership means serving others.',
  },
  {
    title: 'Integrity',
    description: 'Operating with honesty, transparency, and accountability in everything we do.',
  },
  {
    title: 'Inclusion',
    description: 'Ensuring that opportunity is accessible to all, regardless of background or circumstance.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">About Us</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
              Student leaders creating real change
            </h1>
            <p className="text-xl text-neutral-600">
              Bloom started with a simple conversation among classmates about the inequality we see in our communities. Today, we're a structured movement of student volunteers dedicated to empowering children through education, mentorship, and creative opportunities.
            </p>
          </div>
        </Container>
      </section>

      {/* Origin Story Section */}
      <section className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              subtitle="Our Story"
              title="How Bloom Started"
              align="center"
            />
            <div className="prose prose-lg max-w-none text-neutral-600">
              <p>
                Bloom was born at Maxfort School when a group of students realized they couldn't wait until graduation to make a difference. We saw the inequality around us — children without access to quality education, mentorship, or platforms to express themselves. We asked ourselves: why wait to be "old enough" or "qualified enough"?
              </p>
              <p>
                With the skills, energy, and commitment we already had, we decided to act. We started small — with tutoring sessions, confidence-building workshops, and community outreach. What began as a conversation has grown into a structured initiative with clear goals, multiple programs, and a growing community of passionate volunteers.
              </p>
              <p>
                Today, Bloom is more than just service. It's leadership development. It's about becoming better versions of ourselves through the act of serving others. Every volunteer who joins Bloom is both giving and growing.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Mission</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                To reach underprivileged children in our community and provide them access to quality education, mentorship, and a platform to express themselves — empowering them to overcome barriers and reach their potential.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Vision</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                A world where every child, regardless of their background, has access to education, mentorship, and opportunities to develop their talents and express themselves freely — creating a community of empowered young leaders.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* BLOOM Meaning Section */}
      <section className="section-padding">
        <Container>
          <SectionHeader
            subtitle="The Name"
            title="What BLOOM Means"
            description="Each letter represents a core principle that guides everything we do."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-primary-50 rounded-lg border border-primary-200">
              <div className="text-4xl font-bold text-primary-600 mb-3">B</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Believe</h3>
              <p className="text-neutral-600">We believe in every child's potential, regardless of their circumstances or background.</p>
            </div>
            <div className="p-8 bg-primary-50 rounded-lg border border-primary-200">
              <div className="text-4xl font-bold text-primary-600 mb-3">L</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Lead</h3>
              <p className="text-neutral-600">We lead with purpose and empathy, showing that young people can drive meaningful change.</p>
            </div>
            <div className="p-8 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="text-4xl font-bold text-secondary-600 mb-3">O</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Overcome</h3>
              <p className="text-neutral-600">We help children overcome barriers of inequality and access the support they need.</p>
            </div>
            <div className="p-8 bg-secondary-50 rounded-lg border border-secondary-200">
              <div className="text-4xl font-bold text-secondary-600 mb-3">O</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Open</h3>
              <p className="text-neutral-600">We open doors of opportunity through education, mentorship, and creative platforms.</p>
            </div>
            <div className="p-8 bg-primary-50 rounded-lg border border-primary-200 md:col-span-2">
              <div className="text-4xl font-bold text-primary-600 mb-3">M</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Make</h3>
              <p className="text-neutral-600">We make every young life matter by recognizing their potential and investing in their future.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            subtitle="Principles"
            title="Our Core Values"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-lg border border-neutral-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <Container>
          <SectionHeader
            subtitle="Leadership"
            title="Led by Students"
            description="Bloom is entirely student-run. Our team of passionate young leaders brings energy, commitment, and purpose to every initiative."
            align="center"
          />
          <div className="bg-primary-50 rounded-lg p-12 border border-primary-200 text-center">
            <p className="text-xl text-neutral-700 mb-6">
              We're a diverse team of students from Maxfort School united by one belief: young people have the power to create positive change in their communities.
            </p>
            <Button size="lg">
              <Link href="/contact">Get to Know Our Team</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
            <p className="text-lg mb-8 opacity-90">
              Whether you want to volunteer, donate, or partner with us, there are many ways to support Bloom's mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                <Link href="/donate">Donate</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
