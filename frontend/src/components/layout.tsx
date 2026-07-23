import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
}
