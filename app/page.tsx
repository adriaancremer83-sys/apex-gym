import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Programs from "@/components/Programs";
import Manifesto from "@/components/Manifesto";
import Coaches from "@/components/Coaches";
import Membership from "@/components/Membership";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="bg-apex-black">
      <Navbar />
      <Hero />
      <Stats />
      <Programs />
      <Manifesto />
      <Coaches />
      <Membership />
      <CTA />
    </main>
  );
}
