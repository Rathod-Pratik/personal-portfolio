"use client";
import { LoadingBarProvider } from '@/components/LoadingBarContext';
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from 'react-redux';
import store from '@/components/Store/Store';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import 'nprogress/nprogress.css';
import { useTheme } from "next-themes";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>Rathod&apos;S Portfolio</title>
          <link rel="icon" type="image/x-icon" className='rounded-md' href="../public/Images/Coding Logo.jpg" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoadingBarProvider setProgress={setProgress}>
              <LoadingBar
              
                color={theme === "dark" ? "#fff" : "blue"} // Set your preferred color here
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
              />
              <Navbar />
              {children}
            </LoadingBarProvider>
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}
