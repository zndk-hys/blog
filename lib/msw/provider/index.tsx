"use client";

import { ReactNode, Suspense, use } from "react"

type Props = {
  children: ReactNode;
}

const mockEnablePromise = generateMockEnablePromise();

async function generateMockEnablePromise() {
  if ( typeof window !== 'undefined' ) {
    const { worker } = await import('../setup/browser');
    return worker.start();
  }
  return Promise.resolve();
}

export default function MswProvider({ children }: Props) {
  return <Suspense fallback={null}><Inner>{children}</Inner></Suspense>;
}

function Inner({ children }: Props) {
  use(mockEnablePromise);
  return <>{children}</>;
}