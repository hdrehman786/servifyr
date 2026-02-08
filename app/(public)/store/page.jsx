"use client";
import React, { useState } from "react";
import { ShoppingBag, Star, Zap } from "lucide-react";
import { useAddToCartProduct, useProduct } from "../../../queries/product";
const LegacyStore = ({ }) => {
    const { data, isLoading, isError } = useProduct();
    const products = data?.products || [];

    return (
        <div className="bg-[#0a0a0a] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-[#fff200] font-black italic text-4xl uppercase tracking-tighter">
                        Legacy <span className="text-white">Armor</span>
                    </h2>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">
                        Engineered for the Elite
                    </p>
                </div>
                <div className="flex gap-4 text-xs font-black uppercase text-white">
                    <span className="border-b-2 border-[#fff200] pb-1 cursor-pointer">All Gear</span>
                    <span className="text-gray-600 hover:text-white transition-colors cursor-pointer">Upper</span>
                    <span className="text-gray-600 hover:text-white transition-colors cursor-pointer">Lower</span>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => {

    const firstVariant = product.variants[0];
    const [activeImage, setActiveImage] = useState(firstVariant?.images[0]);
    const addToCartProduct = useAddToCartProduct();
    const handleAddCart = (id) => {
        const res = addToCartProduct.mutate(id);
    };
    return (
        <div className="group relative flex flex-col bg-[#111] border border-gray-900 rounded-2xl overflow-hidden hover:border-[#fff200]/50 transition-all duration-500">
 
            {product.isBestSeller && (
                <div className="absolute top-4 left-4 z-10 bg-[#fff200] text-black text-[10px] font-black px-2 py-1 rounded-sm flex items-center gap-1 uppercase italic">
                    <Zap size={10} fill="black" /> Best Seller
                </div>
            )}


            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <button onClick={() => handleAddCart(product._id)} className="w-full bg-[#fff200] text-black py-3 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <ShoppingBag size={16} /> Quick Add
                    </button>
                </div>
            </div>


            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[#fff200] text-[10px] font-bold uppercase tracking-widest">
                        {product.category}
                    </p>
                    <div className="flex text-[#fff200]">
                        <Star size={10} fill="#fff200" />
                        <Star size={10} fill="#fff200" />
                        <Star size={10} fill="#fff200" />
                    </div>
                </div>

                <h3 className="text-white font-black text-lg leading-tight uppercase italic mb-2">
                    {product.name}
                </h3>


                <div className="flex gap-2 mb-4">
                    {product.variants.map((variant, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(variant.images[0])}
                            className="w-4 h-4 rounded-full border border-gray-700 hover:scale-125 transition-transform"
                            style={{ backgroundColor: variant.colorCode }}
                            title={variant.color}
                        />
                    ))}
                </div>

                <div className="mt-auto flex justify-between items-end">
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold uppercase">Starting at</p>
                        <p className="text-white font-black text-xl">${firstVariant?.price.toFixed(2)}</p>
                    </div>
                    <span className="text-gray-700 text-[10px] font-bold uppercase tracking-tighter">
                        {product.gender}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LegacyStore;