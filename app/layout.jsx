import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Providers } from "../lib/providers";
import Navbar from "@/components/Navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-black">
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
