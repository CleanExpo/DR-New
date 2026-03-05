import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#050505' }}
    >
      <div className="text-center">
        <h1
          className="text-8xl font-bold tracking-tight"
          style={{ color: '#0d9488' }}
        >
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-white">
          Page not found
        </h2>
        <p className="mt-3 max-w-md text-base text-gray-400">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved. If you need assistance, please contact us at{' '}
          <a
            href="/contact"
            className="underline"
            style={{ color: '#0d9488' }}
          >
            our support team
          </a>
          .
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#0d9488' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
