import React from "react";
import TopNav from "./topnav";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <TopNav />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full lg:max-w-96 mx-4">{children}</div>
      </div>
    </div>
  );
}
