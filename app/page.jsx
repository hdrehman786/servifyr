import Hero from "@/components/Hero";
import WorkoutPrograms from "@/components/WorkoutPrograms";
import MerchStore from "@/components/MerchStore";
import Gallery from "@/components/Gallery";
import Recipes from "@/components/Recipes";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen font-sans">
      <Hero />
      <WorkoutPrograms />
      <MerchStore />
      <Gallery />
      <Recipes />
      <Contact />
      <Footer />
    </main>
  );
}