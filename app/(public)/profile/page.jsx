"use client";
import React, { useState, useEffect } from "react";
import { useUpdateProfile, useUser } from "../../../queries/userqueries";
import { uploadImage } from "../../../utils/fetchapi";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { Heart, Activity, Calendar, Zap } from "lucide-react";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const { data: user, isLoading, isError } = useUser();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        role: "user",
        category: "Beginner",
        image: "",
        isApproved: false,
        rating: 0,
        enrolledPrograms: [],
        favorites: []
    });

    const updateProfileMutation = useUpdateProfile();

    useEffect(() => {
        if (user?.data) {
            setProfile(user.data);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const localPreview = URL.createObjectURL(file);
        setProfile((prev) => ({ ...prev, image: localPreview }));

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const uploadedImageUrl = await uploadImage(formData);
            setProfile((prev) => ({ ...prev, image: uploadedImageUrl }));
            toast.success("Identity image updated.");
        } catch (err) {
            toast.error("Cloudinary sync failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        updateProfileMutation.mutate(profile, {
            onSuccess: () => toast.success("Legacy Data Synchronized"),
        });
    };

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader /></div>;
    if (isError) return <div className="min-h-screen bg-black text-white flex items-center justify-center font-black uppercase italic">Access Denied / Error</div>;

    return (
        <div className="min-h-screen bg-black text-white py-16 px-4">
            <div className="max-w-5xl mx-auto border border-gray-900 rounded-[2rem] overflow-hidden bg-[#0a0a0a]">
                
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-[#fff200]/20 to-black border-b border-gray-900 flex items-center px-8">
                     <h1 className="text-white/10 text-6xl font-black italic uppercase tracking-tighter select-none">Legacy Member</h1>
                </div>

                {/* Profile Header */}
                <div className="relative px-8 pb-10">
                    <div className="-mt-16 flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-2xl border-4 border-black overflow-hidden bg-[#111] shadow-2xl relative">
                                <img
                                    src={profile.image || "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"}
                                    alt="User"
                                    className={`w-full h-full object-cover ${isUploading ? 'opacity-30' : ''}`}
                                />
                                {isUploading && <div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 border-2 border-[#fff200] border-t-transparent rounded-full animate-spin"></div></div>}
                            </div>
                            {isEditing && (
                                <label className="absolute -bottom-2 -right-2 bg-[#fff200] p-2 rounded-lg cursor-pointer hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2" /><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" /></svg>
                                    <input type="file" onChange={handleImageChange} className="hidden" />
                                </label>
                            )}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">{profile.name}</h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                                <span className={`px-3 py-1 text-[10px] font-black uppercase rounded ${profile.isApproved ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                    {profile.isApproved ? "Approved Member" : "Pending Verification"}
                                </span>
                                <span className="px-3 py-1 text-[10px] font-black uppercase rounded bg-yellow-500/10 text-[#fff200]">
                                    ★ {profile.rating} Rating
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                            className="bg-[#fff200] text-black font-black px-8 py-3 rounded-xl uppercase text-xs tracking-widest transition-all hover:bg-white"
                        >
                            {isEditing ? "Save Data" : "Modify Profile"}
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 border-t border-gray-900">
                    <Field label="Identity Name" name="name" value={profile.name} onChange={handleChange} editable={isEditing} />
                    <Field label="Account Email" name="email" value={profile.email} onChange={handleChange} editable={false} />
                    <Field label="Phone Contact" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} editable={isEditing} />
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Member Category</label>
                        {isEditing ? (
                            <select name="category" value={profile.category} onChange={handleChange} className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-[#fff200] outline-none">
                                <option value="Beginner">Beginner</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        ) : (
                            <div className="text-sm font-bold uppercase flex items-center gap-2"><Zap size={14} className="text-[#fff200]"/> {profile.category}</div>
                        )}
                    </div>
                </div>

                {/* DYNAMIC COLLECTIONS SECTION */}
                <div className="border-t border-gray-900">
                    
                    {/* Enrolled Programs Horizontal List */}
                    <div className="p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity size={18} className="text-[#fff200]" />
                            <h4 className="text-sm font-black uppercase tracking-widest">Active Training Programs</h4>
                        </div>
                        
                        {profile.enrolledPrograms?.length > 0 ? (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {profile.enrolledPrograms.map((prog) => (
                                    <div key={prog._id} className="min-w-[280px] bg-[#111] rounded-2xl p-4 border border-gray-800 flex items-center gap-4">
                                        <img src={prog.image} className="w-16 h-16 rounded-xl object-cover" />
                                        <div>
                                            <p className="text-xs font-black uppercase leading-tight">{prog.title}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{prog.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#111] p-6 rounded-2xl border border-dashed border-gray-800 text-center">
                                <p className="text-xs text-gray-600 uppercase font-bold">No Active Enrollments</p>
                            </div>
                        )}
                    </div>

                    {/* Favorites Horizontal List */}
                    <div className="p-8 bg-[#070707] border-t border-gray-900">
                        <div className="flex items-center gap-2 mb-6">
                            <Heart size={18} className="text-red-500" />
                            <h4 className="text-sm font-black uppercase tracking-widest">Saved Legacy Gear</h4>
                        </div>
                        
                        {profile.favorites?.length > 0 ? (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {profile.favorites.map((fav) => (
                                    <div key={fav._id} className="min-w-[200px] bg-[#111] rounded-2xl overflow-hidden border border-gray-800 group">
                                        <img src={fav.variants[0]?.images[0]} className="w-full h-32 object-cover grayscale group-hover:grayscale-0 transition-all" />
                                        <div className="p-3">
                                            <p className="text-[10px] font-black uppercase truncate">{fav.name}</p>
                                            <p className="text-[#fff200] text-[10px] font-bold mt-1">${fav.variants[0]?.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#111] p-6 rounded-2xl border border-dashed border-gray-800 text-center">
                                <p className="text-xs text-gray-600 uppercase font-bold">Your Wishlist is Empty</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

function Field({ label, name, value, editable, onChange }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</label>
            {editable ? (
                <input
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-[#fff200] outline-none transition-all"
                />
            ) : (
                <div className="text-sm font-bold uppercase text-gray-300 truncate">{value || "N/A"}</div>
            )}
        </div>
    );
}