import { getServerSession } from '@/utils/auth';
import { redirect } from 'next/navigation';


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      {/* Shared UI like navbar */}
      {children}
    </>
  );
}