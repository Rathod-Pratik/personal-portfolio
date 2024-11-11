"use client";
import { LoadingBarProvider } from '@/components/LoadingBarContext';
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { useState,useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useTheme } from "next-themes";

export default function RootLayout({ children }) {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  //  useEffect(() => {
  //    const handleContextMenu = (e) => {
  //      e.preventDefault();
  //    };
  //    document.addEventListener("contextmenu", handleContextMenu);

  //    // Cleanup listener when component unmounts
  //    return () => {
  //      document.removeEventListener("contextmenu", handleContextMenu);
  //    };
  //  }, [])
  return (
      <html lang="en">
        <head>
          <title>Rathod&apos;S Portfolio</title>
          <link rel="icon" type="image/x-icon" className='rounded-md' href="https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/public/Coding+Logo.jpg" />
        </head>
        <body>
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
  );
}

// k2zI4{e} console pass word