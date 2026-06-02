import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
      <Container className="text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-neutral-600 mb-8">
            Looks like the page you're looking for doesn't exist or has moved. But don't worry, you can always find what you need below.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
