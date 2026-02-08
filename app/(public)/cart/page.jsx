"use client";
import { useUser } from "../../../queries/userqueries";
import { Trash2, ShoppingBag, CreditCard } from "lucide-react";
import Loader from "../../../components/Loader";
import {useDeleteFromCart} from "../../../queries/product";

const CartCheckout = () => {
    const { data: user, isLoading } = useUser();
    const removeCart = useDeleteFromCart();
    const handleDeleteFromCart = (id)=>{
        const res = removeCart.mutate(id);
        console.log("response",res);
    }
    const cartItems = user?.data?.favorites || [];

    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + (item.variants[0]?.price || 0);
    }, 0);

    if (isLoading) return <div className="h-screen flex items-center justify-center bg-black"><Loader /></div>;

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                        <ShoppingBag className="text-[#fff200]" size={28} />
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                            Your <span className="text-[#fff200]">Gear Bag</span>
                        </h1>
                    </div>

                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item._id} className="bg-[#0a0a0a] border border-gray-900 p-4 rounded-2xl flex gap-6 items-center hover:border-gray-700 transition-colors">
                                <img
                                    src={item.variants[0]?.images[0]}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-xl bg-[#111]"
                                />
                                <div className="flex-1">
                                    <h3 className="text-sm font-black uppercase tracking-wide">{item.name}</h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{item.category} • {item.gender}</p>
                                    <p className="text-[#fff200] font-black mt-2">${item.variants[0]?.price.toFixed(2)}</p>
                                </div>
                                <button onClick={()=>handleDeleteFromCart(item._id)} className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 border border-dashed border-gray-800 rounded-3xl">
                            <p className="text-gray-500 uppercase font-black italic">Your bag is empty.</p>
                        </div>
                    )}
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-[#0a0a0a] border-2 border-[#fff200]/20 p-8 rounded-3xl sticky top-24">
                        <h2 className="text-xl font-black uppercase italic mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400 text-sm font-bold uppercase">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400 text-sm font-bold uppercase">
                                <span>Shipping</span>
                                <span className="text-green-500">Free</span>
                            </div>
                            <div className="h-[1px] bg-gray-900 my-4"></div>
                            <div className="flex justify-between text-white font-black text-xl uppercase">
                                <span>Total</span>
                                <span className="text-[#fff200]">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            disabled={cartItems.length === 0}
                            className="w-full bg-[#fff200] text-black font-black py-4 rounded-xl uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CreditCard size={18} />
                            Secure Checkout
                        </button>

                        <p className="text-[10px] text-gray-600 text-center mt-6 font-bold uppercase tracking-widest">
                            30-Day Legacy Money Back Guarantee
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartCheckout;