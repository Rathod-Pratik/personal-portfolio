"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./Theme-btn";
import { useLoadingBar } from "@/components/LoadingBarContext"; // Import useLoadingBar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setProgress } = useLoadingBar();

  // Function to close the Sheet
  const closeSheet = () => setIsOpen(false);

  // Function to handle link click to show loading bar
  const handleLinkClick = () => {
    setProgress(40); // Start the loading bar at 40%
    setTimeout(() => setProgress(100), 500);
  };

  return (
    <nav className="bg-background/50 sticky top-0 backdrop-blur-lg p-4 border-b w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl">
          <Link href="/">Rathod</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="link" onClick={handleLinkClick}>
            Home
          </Link>
          <Link href="/notes" className="link" >
            Notes
          </Link>
          <Link href="/codes" className="link" >
            Codes
          </Link>
          <Link href="/project" className="link" >
            Project
          </Link>
          <Link href="/About" className="link" onClick={handleLinkClick}>
            About
          </Link>
        </div>

        <div className="items-center flex">
          <div className="md:hidden flex items-center">
            <span className="mx-2">
              <ModeToggle className="ml-5" />
            </span>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <div className="items-center space-x-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-bold my-4">Rathod</SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col gap-4">
                      <Link href="/" className="link w-[20%] m-auto" onClick={closeSheet}>
                        Home
                      </Link>
                      <Link href="/notes" className="link w-[20%] m-auto" onClick={closeSheet}>
                        Notes
                      </Link>
                      <Link href="/codes" className="link w-[20%] m-auto" onClick={closeSheet}>
                        Codes
                      </Link>
                      <Link href="/project" className="link w-[20%] m-auto" onClick={closeSheet}>
                        Project
                      </Link>
                      <Link href="/About" className="link w-[20%] m-auto" onClick={closeSheet}>
                        About
                      </Link>
                      <div className="flex space-x-4 m-auto">
                        <button className="bg-[#fca61f] text-white px-4 py-1 text-xl leading-7 rounded-full border-none hover:bg-[#6f34fe] transition-all duration-500">
                          Hire me
                        </button>
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex space-x-4">
            <ModeToggle/>
            <button className="bg-[#fca61f] text-white px-4 py-1 text-xl leading-7 rounded-full border-none hover:bg-[#6f34fe] transition-all duration-500">
              Hire me
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
