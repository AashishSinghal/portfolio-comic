import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { PowersSection } from "@/components/sections/powers";
import { MissionsSection } from "@/components/sections/missions";
import { ChroniclesSection } from "@/components/sections/chronicles";
import { SignalSection } from "@/components/sections/signal";
import { SectionDivider } from "@/components/comic/section-divider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider variant="zigzag" />
        <PowersSection />
        <SectionDivider variant="torn" />
        <MissionsSection />
        <SectionDivider variant="dots" />
        <ChroniclesSection />
        <SectionDivider variant="zigzag" />
        <SignalSection />
      </main>
    </>
  );
}
