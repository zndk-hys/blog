import '../globals.css'
import { ReactNode } from "react";
import Link from 'next/link';
import { jetBrainsMono } from '@/lib/fonts';
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="ja" className={jetBrainsMono.variable}>
      <body className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <NextTopLoader height={1}/>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <h1 className="text-xl font-bold">
                  <Link href="/blog/" className={`hover:text-blue-500`}>
                    Blog
                  </Link>
                </h1>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl mx-auto">
              {children}
            </div>
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} zndk-hys. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
