"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect } from "react";
import Feature from "./_components/Feature";
import Footer from "./_components/Footer";

export default function Home() {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  return (
    <>
      <Header />
      <Hero />
      <Feature />
      <Footer />
    </>
  );
}
