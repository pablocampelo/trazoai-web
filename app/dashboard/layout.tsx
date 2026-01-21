import type React from 'react';
import type { Metadata } from 'next';
import DashboardLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Demo mode: sin auth real, siempre accesible
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
