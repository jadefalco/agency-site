import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Problem from "../sections/Problem";
import HowItWorks from "../sections/HowItWorks";
import Benefits from "../sections/Benefits";
import Pricing from "../sections/Pricing";
import Faq from "../sections/Faq";
import FinalCta from "../sections/FinalCta";
import Footer from "../sections/Footer";
import StickyCta from "../components/StickyCta";

export default function MissedCallRecoveryPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
