"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetRecipe } from "../../../../queries/recipe";
import { ArrowLeft, Timer, Gauge, Utensils, Zap, Activity } from "lucide-react";
import Loader from "../../../../components/Loader";

const SingleRecipe = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { data: recipesData, isLoading } = useGetRecipe();

  const recipe = recipesData?.recipes?.find((r) => r._id === slug);

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-black"><Loader /></div>;
  if (!recipe) return <div className="h-screen flex items-center justify-center text-white text-xs uppercase italic">Recipe Not Found</div>;

  return (
    <div className="min-h-screen bg-black text-white pb-10">
      {/* Compact Header */}
      <div className="relative h-[35vh] md:h-[40vh] w-full border-b border-gray-900">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 bg-black/50 p-2 rounded-lg border border-white/10 hover:text-[#fff200] transition-all"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="absolute bottom-6 left-6 right-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-[#fff200] text-black px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter">
              {recipe.goal}
            </span>
            <span className="text-gray-500 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Timer size={10} /> {recipe.prepTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight">
            {recipe.title}
          </h1>
        </div>
      </div>

      {/* Tighter Grid Content */}
      <div className="max-w-6xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Ingredients (Lg: 4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0a0a0a] border border-gray-900 p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-900 pb-3">
              <Utensils className="text-[#fff200]" size={14} />
              <h2 className="text-xs font-black uppercase italic tracking-widest text-gray-300">Components</h2>
            </div>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex justify-between items-center text-[10px] font-bold uppercase">
                  <span className="text-gray-500 tracking-wide">{ing.item}</span>
                  <span className="text-white border-l border-gray-800 pl-3">{ing.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#111] border border-gray-900 p-4 rounded-xl flex items-center justify-between">
             <div className="flex items-center gap-2">
               <Activity size={14} className="text-[#fff200]" />
               <span className="text-[9px] font-black uppercase text-gray-400">Complexity</span>
             </div>
             <span className="text-[10px] font-black italic uppercase">{recipe.difficulty || "Easy"}</span>
          </div>
        </div>

        {/* Right Side: Dashboard (Lg: 8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Condensed Macro Bar */}
          <div className="bg-white text-black p-4 md:p-6 rounded-2xl grid grid-cols-4 gap-2">
            <div className="border-r border-black/10">
              <p className="text-[8px] font-black uppercase opacity-60">Energy</p>
              <p className="text-xl font-black italic">{recipe.macros.calories}<span className="text-[8px] ml-0.5">kcal</span></p>
            </div>
            <div className="text-center border-r border-black/10">
              <p className="text-[8px] font-black uppercase opacity-60">Prot</p>
              <p className="text-xl font-black italic">{recipe.macros.protein}g</p>
            </div>
            <div className="text-center border-r border-black/10">
              <p className="text-[8px] font-black uppercase opacity-60">Carbs</p>
              <p className="text-xl font-black italic">{recipe.macros.carbs}g</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-black uppercase opacity-60">Fats</p>
              <p className="text-xl font-black italic">{recipe.macros.fats}g</p>
            </div>
          </div>

          {/* Clean Strategy Box */}
          <div className="bg-[#0a0a0a] border border-gray-900 p-6 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <Zap size={80} />
             </div>
             <h2 className="text-xs font-black uppercase italic mb-4 flex items-center gap-2 text-[#fff200]">
               <Zap size={14} /> Nutrition Strategy
             </h2>
             <p className="text-gray-400 leading-relaxed font-medium uppercase text-[10px] tracking-wider italic">
               Fuel for {recipe.goal}. High nutrient bioavailability. Consume post-training for optimal recovery. 
               This profile supports sustained energy levels and metabolic health.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleRecipe;