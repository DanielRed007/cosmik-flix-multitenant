import { getServerSession } from '@/utils/auth';
import { redirect } from 'next/navigation';


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      {/* Shared UI like navbar */}
      <h1>Dash!</h1>
      {children}
    </>
  );
}