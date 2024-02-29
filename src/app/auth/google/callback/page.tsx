import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CallBackClientSide = dynamic(() => import('./CallBackClientSide'), { ssr: false });

export const metadata: Metadata = {
  title: 'CallBack | SeaTheMoss',
};

export default function CallBackPage() {

  return (
    <div>
      <CallBackClientSide />
    </div>
  );
}