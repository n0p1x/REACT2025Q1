import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f3ee] p-8 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mb-8 text-2xl text-gray-600">Page Not Found</h2>
      <p className="mb-8 text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded border border-blue-600 px-6 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
