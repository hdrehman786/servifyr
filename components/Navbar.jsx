'use client';
import Link from "next/link";
import logo from "../media/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { useLogoutUser, useUser } from "../queries/userqueries";
import { toast } from "react-toastify";
import { useProduct } from "../queries/product";
import { useState } from "react";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const logoutUSer = useLogoutUser();
    const { data: user } = useUser();
    const router = useRouter();
    const { data } = useProduct();
    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Workout Programs", href: "/programs" },
        { name: "Recipes", href: "/recipes" },
        { name: "Store", href: "/store" },
        { name: "Profile", href: "/profile" },
        { name: "Cart", href: "/cart" }
    ];

    const path = usePathname();
    const currentPath = path || "/";

    const logout = async () => {
        try {
            const response = await logoutUSer.mutateAsync();
            toast.success(response?.message || "Logged out successfully");
            setIsOpen(false);
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    }

    return (
        <header className="w-full h-24 bg-black flex items-center relative z-50">
            <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <img src={logo.src} alt="Gold's Gym" className="h-16 md:h-20 w-auto" />
                </Link>

                {/* Mobile Hamburger Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Desktop Menu */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-8 text-white">
                        {navItems
                            .filter((item) => {
                                const isAuthRequired = item.name === "Profile" || item.name === "Cart";
                                return isAuthRequired ? !!user?.data : true;
                            })
                            .map((item) => (
                                <li key={item.name} className="relative group">
                                    <Link
                                        href={item.href}
                                        className="text-[15px] font-bold tracking-tight hover:text-gray-300 transition-colors"
                                    >
                                        {item.name}
                                        {item.name === "Cart" && user?.data?.favorites?.length > 0 && (
                                            <span className="ml-2 bg-[#fff200] text-black text-[10px] px-1.5 py-0.5 rounded-full">
                                                {user.data.favorites.length}
                                            </span>
                                        )}
                                    </Link>
                                    {item.href === currentPath && (
                                        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-white"></div>
                                    )}
                                </li>
                            ))}

                        {user?.data ? (
                            <li>
                                <button
                                    onClick={logout}
                                    className="text-[15px] font-bold tracking-tight text-[#fff200] hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    href="/login"
                                    className="text-[15px] font-bold tracking-tight hover:text-[#fff200] transition-colors"
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            <div className={`lg:hidden absolute top-24 left-0 w-full bg-black border-t border-gray-900 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
                <ul className="flex flex-col items-center gap-6 py-10 text-white">
                    {navItems.filter(item => item.name !== "Profile" || user?.data).map((item) => (
                        <li key={item.name} onClick={() => setIsOpen(false)}>
                            <Link href={item.href} className={`text-xl font-black uppercase tracking-tighter ${item.href === currentPath ? 'text-[#fff200]' : 'text-white'}`}>
                                {item.name}
                            </Link>
                        </li>
                    ))}

                    <hr className="w-1/2 border-gray-800 my-2" />

                    {user?.data ? (
                        <li>
                            <button onClick={logout} className="text-xl font-black uppercase tracking-tighter text-red-500">
                                Logout
                            </button>
                        </li>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <li><Link href="/login" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase tracking-tighter text-[#fff200]">Login</Link></li>
                            <li><Link href="/signup" onClick={() => setIsOpen(false)} className="text-xl font-black uppercase tracking-tighter text-white">Sign Up</Link></li>
                        </div>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;