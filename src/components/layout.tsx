import React from "react";
import TopNav from "./topnav";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <TopNav />
      <div className="flex w-full flex-1 h-[calc(100%-72px)] container mx-auto pt-8">
        {children}
      </div>
    </div>
  );
}
