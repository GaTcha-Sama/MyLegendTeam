import { Suspense } from 'react';
import GoogleAuthCallback from '../../../components/GoogleAuthCallback';

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-lg font-[family-name:var(--font-title)]">Loading...</p>
        </div>
      </div>
    }>
      <GoogleAuthCallback />
    </Suspense>
  );
}