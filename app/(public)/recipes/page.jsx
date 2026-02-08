"use client";
import React, { useState } from "react";
import { Timer, ChevronRight, Search } from "lucide-react";
import { useGetRecipe } from "../../../queries/recipe";
import Loader from "../../../components/Loader";
import Link from "next/link";

const RecipeList = () => {
    const { data: recipesData, isError, isLoading } = useGetRecipe();
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Muscle Gain", "Fat Loss", "Performance", "Maintenance"];

    
    const allRecipes = recipesData?.recipes || [];

    const filteredRecipes = filter === "All"
        ? allRecipes
        : allRecipes.filter(r => r.goal === filter);


    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader /></div>;
    
    if (isError) return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-black uppercase italic">
            Error Loading Legacy Nutrition Data
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white py-12 px-6">
            {/* Header & Filters */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                            Fuel Your <span className="text-[#fff200]">Legacy</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-4">
                            Precision nutrition for elite performance
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${
                                    filter === cat
                                        ? "bg-[#fff200] text-black border-[#fff200]"
                                        : "bg-transparent text-gray-600 border-gray-900 hover:border-gray-700"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recipe Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <div key={recipe._id} className="group bg-[#0a0a0a] border border-gray-900 rounded-[2rem] overflow-hidden hover:border-[#fff200]/30 transition-all duration-500">
                            
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                                />
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10">
                                    <Timer size={12} className="text-[#fff200]" />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{recipe.prepTime}</span>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest shadow-xl ${
                                        recipe.goal === "Fat Loss" ? "bg-red-600" : 
                                        recipe.goal === "Muscle Gain" ? "bg-green-600" : "bg-blue-600"
                                    }`}>
                                        {recipe.goal}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8">
                                <h3 className="text-xl font-black uppercase italic leading-tight mb-6 group-hover:text-[#fff200] transition-colors min-h-[3rem]">
                                    {recipe.title}
                                </h3>

                                {/* Macro Bar */}
                                <div className="grid grid-cols-4 gap-1 mb-8 bg-black/50 p-4 rounded-2xl border border-gray-900">
                                    <div className="text-center">
                                        <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Cals</p>
                                        <p className="text-xs font-black">{recipe.macros?.calories}</p>
                                    </div>
                                    <div className="text-center border-l border-gray-800">
                                        <p className="text-[8px] text-[#fff200] font-black uppercase mb-1">Prot</p>
                                        <p className="text-xs font-black">{recipe.macros?.protein}g</p>
                                    </div>
                                    <div className="text-center border-l border-gray-800">
                                        <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Carb</p>
                                        <p className="text-xs font-black">{recipe.macros?.carbs}g</p>
                                    </div>
                                    <div className="text-center border-l border-gray-800">
                                        <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Fat</p>
                                        <p className="text-xs font-black">{recipe.macros?.fats}g</p>
                                    </div>
                                </div>

                                {/* Ingredients List */}
                                <div className="space-y-3 mb-8">
                                    {recipe.ingredients?.slice(0, 3).map((ing, i) => (
                                        <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight text-gray-400">
                                            <span className="flex items-center gap-2">
                                                <div className="w-1 h-1 bg-[#fff200] rounded-full" /> {ing.item}
                                            </span>
                                            <span className="text-gray-600">{ing.amount}</span>
                                        </div>
                                    ))}
                                    {recipe.ingredients?.length > 3 && (
                                        <p className="text-[9px] text-[#fff200] font-black italic tracking-widest pt-1">
                                            + {recipe.ingredients.length - 3} MORE COMPONENTS
                                        </p>
                                    )}
                                </div>

                                <Link 
                                href={`/recipes/${recipe._id}`} 
                                 className="w-full bg-white text-black font-black py-4 rounded-xl uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#fff200] transition-all transform active:scale-95">
                                    Analyze Details <ChevronRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border border-dashed border-gray-800 rounded-3xl">
                        <p className="text-gray-600 font-black uppercase italic tracking-widest">No recipes found for this goal.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeList;