import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const LoginClientSide = dynamic(() => import('./LoginClientSide'), { ssr: false });

export const metadata: Metadata = {
  title: 'Login | SeaTheMoss',
};

export default function LoginPage() {
  return (
    <div>
      <LoginClientSide />
    </div>
  );
}