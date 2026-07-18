import CoreListing from "@/components/CoreListing";

import Hero from "@/components/Hero";
import HiringMetrics from "@/components/HiringMetrics";
import HowItWorks from "@/components/HowItWorks";
import InteractiveFAQ from "@/components/InteractiveFAQ";
import PlatformStats from "@/components/PlatformStats";
import TalentCategories from "@/components/TalentCategories";
import TalentReviews from "@/components/TalentReviews";

export default function Home() {
  return (
    <div>
      <Hero />
      <CoreListing />
      <TalentCategories />
      <HowItWorks />
      <PlatformStats />
      <InteractiveFAQ />
      <HiringMetrics />
      <TalentReviews />
    </div>
  );
}
