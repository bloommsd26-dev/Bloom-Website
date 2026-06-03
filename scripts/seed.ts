import { connectDB } from '../lib/db/connect';
import { Admin } from '../lib/models/Admin';
import { Program } from '../lib/models/Program';
import { Blog } from '../lib/models/Blog';
import { Impact } from '../lib/models/Impact';
import { Testimonial } from '../lib/models/Testimonial';
import { hashPassword } from '../lib/utils/auth';
import { calculateReadingTime } from '../lib/utils/helpers';

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Clear collections
    await Admin.deleteMany({});
    await Program.deleteMany({});
    await Blog.deleteMany({});
    await Impact.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD || 'ChangeMe123!');
    const admin = await Admin.create({
      name: 'Bloom Admin',
      email: process.env.ADMIN_EMAIL || 'admin@bloom.org',
      passwordHash: adminPassword,
      role: 'admin',
      permissions: [
        'manage_blogs',
        'manage_programs',
        'manage_donations',
        'manage_volunteers',
        'manage_impact',
        'manage_admins',
        'manage_settings',
      ],
    });
    console.log('Created admin user:', admin.email);

    // Create programs
    const programs = [
      {
        title: 'Educational Support & Academic Empowerment',
        slug: 'education',
        focusArea: 'education',
        description: 'Quality education and academic support for underprivileged children',
        longDescription: `We provide comprehensive tutoring, study support, and digital literacy programs to help children excel academically. Our goal is to bridge the educational gap and ensure every child has access to quality learning resources and mentorship.`,
        activities: [
          'One-on-one tutoring',
          'Group study sessions',
          'Study camps during holidays',
          'Digital literacy programs',
          'Academic resource library',
          'Homework support',
        ],
        goals: [
          'Help 500+ children improve academic performance',
          'Build digital literacy skills for the modern world',
          'Create accessible educational resources',
          'Support students in critical subjects',
          'Increase school enrollment and attendance',
        ],
        impact: 'Children gain confidence, improved grades, and better academic opportunities.',
        impactMetrics: {
          childrenReached: 500,
          sessionsConducetd: 150,
          volunteerHours: 450,
        },
        seoTitle: 'Educational Support Programs | Bloom',
        seoDescription: 'Tutoring, study support, and digital literacy for underprivileged children',
      },
      {
        title: 'Personality Development & Confidence Building',
        slug: 'personality',
        focusArea: 'personality',
        description: 'Build confidence, communication, and leadership skills',
        longDescription: `Through interactive workshops and mentorship, we help children develop the confidence and communication skills needed to succeed. We believe every child has unique talents and abilities waiting to be unlocked.`,
        activities: [
          'Public speaking workshops',
          'Debate clubs and competitions',
          'Leadership training programs',
          'Communication skills workshops',
          'Confidence-building exercises',
          'Motivation and goal-setting',
        ],
        goals: [
          'Train 200+ children in public speaking',
          'Develop young leaders in communities',
          'Build self-confidence and self-esteem',
          'Improve communication abilities',
          'Create support networks',
        ],
        impact: 'Confident, articulate young people ready to express themselves and take on leadership roles.',
        impactMetrics: {
          childrenReached: 200,
          sessionsConducetd: 100,
          volunteerHours: 300,
        },
        seoTitle: 'Personality Development Programs | Bloom',
        seoDescription: 'Public speaking, debate, and leadership training for confident young leaders',
      },
      {
        title: 'Creative Expression & Talent Development',
        slug: 'creative',
        focusArea: 'creative',
        description: 'Unlock creativity through art, writing, storytelling, and performance',
        longDescription: `We provide platforms for children to express themselves creatively and develop their artistic talents. Creativity is fundamental to learning, problem-solving, and personal growth.`,
        activities: [
          'Art and painting programs',
          'Writing and storytelling workshops',
          'Theatre and drama classes',
          'Music and performance training',
          'Talent showcase events',
          'Creative competitions',
        ],
        goals: [
          'Support 300+ children in creative pursuits',
          'Create platforms for talent showcase',
          'Build artistic skills and expression',
          'Nurture creative confidence',
          'Preserve cultural heritage',
        ],
        impact: 'Creative, expressive young people who can communicate their ideas and emotions through art.',
        impactMetrics: {
          childrenReached: 300,
          sessionsConducetd: 120,
          volunteerHours: 360,
        },
        seoTitle: 'Creative Expression Programs | Bloom',
        seoDescription: 'Art, writing, theatre, and talent development programs for young artists',
      },
      {
        title: 'Women Empowerment & Gender Equality',
        slug: 'women',
        focusArea: 'women',
        description: 'Empower girls through education, leadership, and awareness',
        longDescription: `We focus on creating equal opportunities for girls through awareness campaigns, leadership programs, and education initiatives. Gender equality is essential for community development.`,
        activities: [
          'Girl leadership programs',
          'Gender awareness campaigns',
          'Hygiene and health education',
          'Equal opportunity initiatives',
          'Mentorship for girls',
          'Safety and rights awareness',
        ],
        goals: [
          'Empower 400+ girls',
          'Raise awareness about gender equality',
          'Create leadership opportunities for girls',
          'Ensure access to quality education',
          'Build support networks for girls',
        ],
        impact: 'Empowered girls who understand their rights and have the confidence to pursue their dreams.',
        impactMetrics: {
          childrenReached: 400,
          sessionsConducetd: 110,
          volunteerHours: 330,
        },
        seoTitle: 'Women Empowerment Programs | Bloom',
        seoDescription: 'Girl leadership and gender equality awareness programs',
      },
      {
        title: 'Community Care & Awareness',
        slug: 'community',
        focusArea: 'community',
        description: 'Create community support through donation drives and awareness',
        longDescription: `We organize donation camps and awareness campaigns to address community needs and foster social responsibility. Strong communities are built on mutual care and support.`,
        activities: [
          'Donation camps and drives',
          'Community outreach programs',
          'Awareness campaigns',
          'Health and hygiene education',
          'Relief and support programs',
          'Community engagement events',
        ],
        goals: [
          'Reach 25+ communities',
          'Collect resources for 500+ families',
          'Raise awareness on key social issues',
          'Create culture of giving and sharing',
          'Build community connections',
        ],
        impact: 'Strong communities supported through sustainable giving and awareness about social issues.',
        impactMetrics: {
          childrenReached: 600,
          sessionsConducetd: 80,
          volunteerHours: 240,
        },
        seoTitle: 'Community Care Programs | Bloom',
        seoDescription: 'Donation camps and community awareness initiatives',
      },
    ];

    await Program.insertMany(programs);
    console.log('Created 5 programs');

    // Create blog posts
    const blogs = [
      {
        title: 'Introducing Bloom: A Movement of Young Leaders',
        slug: 'introducing-bloom',
        excerpt: 'Meet the student-led initiative transforming communities through education, mentorship, and creative opportunity.',
        content: `Bloom started with a simple belief: young people have the power to create positive change in their communities. 

Started by students from Maxfort School, Bloom is not just another NGO. It's a movement of young leaders who refuse to wait for graduation to make a difference. Every volunteer brings energy, commitment, and genuine passion to serve.

Our five focus areas address different aspects of child development:

1. Educational Support - Because every child deserves access to quality education
2. Personality Development - Because confidence is fundamental
3. Creative Expression - Because creativity unlocks potential
4. Women Empowerment - Because gender equality matters
5. Community Care - Because communities must care for their own

What makes Bloom special is not just what we do, but how we do it. We approach service with empathy, maintain transparency in all our work, and measure impact through real stories and numbers.

This year, we've already reached over 2500 children across our community. But we're just getting started. Join us in believing that every child deserves to bloom.`,
        author: 'Bloom Team',
        tags: ['introduction', 'mission', 'impact'],
        category: 'updates',
        seoTitle: 'Introducing Bloom - Student-Led Social Impact Initiative',
        seoDescription: 'Meet Bloom, a student-led movement empowering children through education and mentorship',
        status: 'published',
        readingTime: 5,
      },
      {
        title: 'From Classroom to Community: How Tutoring Changes Lives',
        slug: 'tutoring-changes-lives',
        excerpt: 'Beyond grades and test scores, our tutoring programs are building confidence and unlocking potential.',
        content: `Education is the foundation of opportunity. But not every child has equal access to quality education. That's why Bloom's tutoring program exists.

Last year, we conducted over 150 tutoring sessions, helping children improve in mathematics, English, science, and more. But the real impact goes beyond better grades.

Meet Ravi, a 7th-grader who struggled with math. When he joined our tutoring program, he was failing. Today, he's among the top students in his class. More importantly, he's confident. He volunteers to solve problems in class. He helps other students.

Or consider Priya, who missed school frequently due to household responsibilities. Our tutors helped her catch up, and now she's never missed a class in six months.

These are the stories that drive us. Education isn't about perfect test scores. It's about opening doors. It's about giving children the tools and confidence to believe in themselves.

Our tutoring approach:
- One-on-one sessions tailored to each child
- Focus on fundamentals and confidence-building
- Regular progress tracking and feedback
- Flexible scheduling to accommodate family needs
- Free resources and study materials

If you're interested in volunteering as a tutor, we'd love to have you. No teaching experience necessary - just genuine passion for helping children learn.`,
        author: 'Sarah Patel',
        tags: ['education', 'tutoring', 'impact'],
        category: 'inspiration',
        seoTitle: 'How Tutoring Changes Lives | Bloom Education',
        seoDescription: 'Real stories of how our tutoring programs help children unlock their potential',
        status: 'published',
        readingTime: 8,
      },
      {
        title: 'The Power of a Platform: Creative Expression in Action',
        slug: 'power-of-platform',
        excerpt: 'How giving children a stage changed everything - from shy students to confident performers.',
        content: `Not every child who draws wants to be an artist. Not every child who writes wants to be an author. But many children have talents they're afraid to share because they've never been given a safe platform.

Bloom's creative expression programs are about more than just developing artistic skills. They're about saying to each child: "Your voice matters. Your creativity matters. The world wants to see what you create."

Our talent showcases have become a highlight of the year. Watching a shy child take the stage for the first time - even if just to read a poem or display their artwork - is transformative. It says something about how we see them. It changes how they see themselves.

This year, we organized three talent showcases featuring over 80 children. We had dancers, singers, visual artists, writers, and performers. Parents came. Siblings came. The community saw these children shine.

One parent told us: "I didn't know my daughter could dance like that. This changed how I see her. It changed how she sees herself."

That's the power of a platform. It's not about being famous. It's about being seen. It's about knowing that your talents, however small, have value.

If you're interested in mentoring young artists or organizing creative workshops, Bloom needs volunteers who can help bring out the creativity in our communities.`,
        author: 'Arjun Kumar',
        tags: ['creativity', 'arts', 'confidence'],
        category: 'inspiration',
        seoTitle: 'Creative Expression and Talent Development | Bloom',
        seoDescription: 'How safe platforms help children express creativity and build confidence',
        status: 'published',
        readingTime: 6,
      },
    ];

    const blogsWithReadingTime = blogs.map((blog) => ({
      ...blog,
      readingTime: calculateReadingTime(blog.content),
    }));

    await Blog.insertMany(blogsWithReadingTime);
    console.log('Created 3 blog posts');

    // Create impact record
    await Impact.create({
      childrenReached: 2500,
      sessionsConducted: 500,
      volunteerHours: 1200,
      donationsCollected: 50000,
      communitiesReached: 25,
      stories: [
        {
          title: 'Ravi\'s Journey: From Failing to Thriving',
          content: 'A 7th grader who struggled with math found confidence through tutoring.',
          image: '/impact/ravi.jpg',
        },
        {
          title: 'Priya\'s Second Chance',
          content: 'An inconsistent student became a perfect attendee after joining our support program.',
          image: '/impact/priya.jpg',
        },
      ],
      reports: [
        {
          title: 'Bloom Impact Report 2025',
          date: new Date('2025-12-31'),
          url: '/reports/bloom-impact-2025.pdf',
        },
      ],
    });
    console.log('Created impact record');

    // Create testimonials
    const testimonials = [
      {
        name: 'Ravi Kumar',
        role: 'Student',
        quote: 'Bloom tutoring helped me believe in myself. Now I am among the top students in my class.',
        category: 'student',
        image: '/testimonials/ravi.jpg',
      },
      {
        name: 'Mrs. Sharma',
        role: 'Parent',
        quote: 'I see a change in my daughter. She is more confident, more engaged, and happier at school.',
        category: 'parent',
        image: '/testimonials/mother.jpg',
      },
      {
        name: 'Priya Singh',
        role: 'Volunteer',
        quote: 'Volunteering with Bloom has been the most rewarding experience. Watching children grow is incredible.',
        category: 'volunteer',
        image: '/testimonials/priya.jpg',
      },
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Created testimonials');

    console.log('\nDatabase seeding completed successfully!');
    console.log(`
Admin Credentials:
Email: ${process.env.ADMIN_EMAIL || 'admin@bloom.org'}
Password: ${process.env.ADMIN_PASSWORD || 'ChangeMe123!'}

Data Created:
- 1 Admin user
- 5 Programs
- 3 Blog posts
- 1 Impact record
- 3 Testimonials

Next steps:
1. Change admin password immediately
2. Update program images in admin panel
3. Publish more blog posts
4. Collect impact stories from community
    `);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
