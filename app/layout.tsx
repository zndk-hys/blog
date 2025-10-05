import { ReactNode } from "react";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="ja">
      <body>
        <main>
          <p>ブログ</p>
          {children}
        </main>
      </body>
    </html>
  )
}
