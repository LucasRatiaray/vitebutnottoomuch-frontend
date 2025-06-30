'use client';

import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function SitesLayout({ children }: Props) {
  return <>{children}</>;
}
