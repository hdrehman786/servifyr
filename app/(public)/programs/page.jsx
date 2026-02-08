"use client";

import ProgramSlider from "../../../components/ProgramSlider";
import { useGetPrograms } from "../../../queries/programqueries";
import Loader from "../../../components/Loader";

const WorkoutPrograms = () => {
  const { data, isLoading, isError } = useGetPrograms(20);
  if (isLoading) return <div className="h-screen bg-black flex items-center justify-center"><Loader /></div>;
  if (isError) return <div className="text-white text-center py-20">Error loading programs.</div>;


  const allPrograms = data?.programs || [];

  const beginnerData = {
    category: "Beginner Friendly",
    subtitle: "Start your journey with the basics",
    programs: allPrograms.filter(p => p.difficulty === "Beginner")
  };

  const advancedData = {
    category: "Moderate to Advanced",
    subtitle: "Push your limits further",
    programs: allPrograms.filter(p => p.difficulty === "Moderate" || p.difficulty === "Advanced")
  };

  const weightLossData = {
    category: "Weight Loss",
    subtitle: "Burn fat and get lean",
    programs: allPrograms.filter(p => p.difficulty === "Weight Loss")
  };

  return (
    <div className="bg-black text-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-16 underline decoration-[#fff200] decoration-4 underline-offset-8">
          // PHYSICAL PROGRAMS WE OFFER
        </h1>

        <div className="space-y-24">
          {beginnerData.programs.length > 0 && <ProgramSlider data={beginnerData} />}
          {advancedData.programs.length > 0 && <ProgramSlider data={advancedData} />}
          {weightLossData.programs.length > 0 && <ProgramSlider data={weightLossData} />}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPrograms;