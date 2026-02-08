"use client";
import React from "react";
import Link from "next/link";
import { useGetRecipe } from "../queries/recipe";
import { ChevronRight, Flame, Clock } from "lucide-react";
import Loader from "../components/Loader";

const Recipes = () => {
  const { data: recipesData, isError, isLoading } = useGetRecipe();

  // Safely extract recipes
  const allRecipes = recipesData?.recipes || [];
  
  // Feature the first recipe as the "Hero"
  const heroRecipe = allRecipes[0];
  // The rest go into the side list (limiting to 4 for homepage cleanliness)
  const sideRecipes = allRecipes.slice(1, 5);

  if (isLoading) return <div className="py-20 flex justify-center"><Loader /></div>;
  if (isError || allRecipes.length === 0) return null; // Hide section if error

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-black text-white">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
            // Nutrition <span className="text-[#fff200]">Lab</span>
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-2">
            Fuel for the elite
          </p>
        </div>
        <Link 
            href="/recipes" 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#fff200] transition-colors"
        >
          View All Recipes <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* HERO RECIPE (Left Side) */}
        <div className="lg:col-span-2 relative group overflow-hidden bg-[#0a0a0a] rounded-[2.5rem] border border-gray-900 flex flex-col md:flex-row items-center p-8 gap-8 hover:border-[#fff200]/30 transition-all duration-500">
          <div className="relative">
            <img 
              src={heroRecipe?.image} 
              className="w-72 h-72 rounded-[2rem] object-cover shadow-2xl group-hover:scale-105 transition-transform duration-700" 
              alt="Feature Recipe"
            />
            <div className="absolute -top-3 -right-3 bg-[#fff200] text-black p-3 rounded-2xl rotate-12 font-black text-xs">
              TOP PICK
            </div>
          </div>

          <div className="flex-1">
            <div className="flex gap-4 mb-4">
               <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase">
                 <Clock size={12} className="text-[#fff200]" /> {heroRecipe?.prepTime}
               </span>
               <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase">
                 <Flame size={12} className="text-[#fff200]" /> {heroRecipe?.macros?.calories} KCAL
               </span>
            </div>
            
            <h3 className="text-3xl font-black uppercase italic mb-4 leading-tight">
              {heroRecipe?.title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-8 leading-relaxed line-clamp-2 uppercase font-medium tracking-wide">
              Optimized for {heroRecipe?.goal}. High protein density and essential micronutrients to accelerate recovery.
            </p>

            <Link href={`/recipes/${heroRecipe?._id}`}>
                <button className="bg-[#fff200] text-black px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors shadow-lg shadow-[#fff200]/10">
                  Analyze Macro-Data →
                </button>
            </Link>
          </div>
        </div>

        {/* SIDE LIST (Right Side) */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">Upcoming Meals</h4>
          {sideRecipes.map((recipe) => (
            <Link 
              key={recipe._id} 
              href={`/recipes/${recipe._id}`}
              className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-2xl border border-gray-900 hover:border-gray-700 hover:bg-[#111] transition-all group"
            >
              <div className="relative w-16 h-16 shrink-0">
                <img 
                    src={recipe.image} 
                    className="w-full h-full rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" 
                    alt={recipe.title}
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <h5 className="text-[11px] font-black uppercase truncate group-hover:text-[#fff200] transition-colors">
                    {recipe.title}
                </h5>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-[9px] text-gray-500 font-bold uppercase">{recipe.goal}</span>
                    <span className="text-[9px] text-[#fff200] font-black">{recipe.macros?.protein}G PRO</span>
                </div>
              </div>
            </Link>
          ))}
          
          {/* Subtle CTA for the rest */}
          <div className="mt-2 p-4 border border-dashed border-gray-900 rounded-2xl flex items-center justify-center">
             <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Explore {allRecipes.length}+ Performance Meals</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Recipes;