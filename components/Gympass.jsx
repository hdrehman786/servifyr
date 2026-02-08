"use client";
import React from "react";
import { useUser } from "../queries/userqueries";

const GymPass = () => {
  const { data: user } = useUser();
  const userData = user?.data;

  const downloadPass = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Width for both sides side-by-side
    canvas.width = 800; 
    canvas.height = 700;

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null); // Fallback if image fails
        img.src = src;
      });
    };

    const drawSide = async (xOffset, isBack) => {
      // 1. Black Background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(xOffset, 0, 350, 600);

      // 2. Yellow Geometric Bottom (The "V" shape from your image)
      ctx.fillStyle = "#fff200";
      ctx.beginPath();
      ctx.moveTo(xOffset, 500);
      ctx.lineTo(xOffset + 175, 600); // Center point
      ctx.lineTo(xOffset + 350, 500);
      ctx.lineTo(xOffset + 350, 700);
      ctx.lineTo(xOffset, 700);
      ctx.fill();

      if (!isBack) {
        // --- FRONT SIDE ---
        const profileImg = await loadImage(userData?.image || "https://via.placeholder.com/150");
        if (profileImg) {
          // Profile Picture with Yellow Border
          ctx.strokeStyle = "#fff200";
          ctx.lineWidth = 4;
          ctx.strokeRect(xOffset + 100, 50, 150, 150);
          ctx.drawImage(profileImg, xOffset + 100, 50, 150, 150);
        }

        // Name & Title
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "bold 28px Arial";
        ctx.fillText(userData?.name?.toUpperCase() || "NAME HERE", xOffset + 175, 260);
        
        ctx.fillStyle = "#fff200";
        ctx.font = "bold 14px Arial";
        ctx.fillText("MEMBER", xOffset + 175, 290);

        // ID Info
        ctx.fillStyle = "#fff200";
        ctx.font = "bold 12px Arial";
        ctx.fillText(`ID: ${userData?._id?.substring(0, 8) || "000000"}`, xOffset + 175, 340);

        // Logo Icon (Dumbbell)
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px Arial";
        ctx.fillText("▬▬ ✊ ▬▬", xOffset + 175, 420);
        ctx.font = "bold 16px Arial";
        ctx.fillText("GYMLOGO", xOffset + 175, 450);

      } else {
        // --- BACK SIDE ---
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.font = "12px Arial";
        
        // Contact Info
        ctx.fillText("✉ info@legacygym.com", xOffset + 50, 60);
        ctx.fillText("📞 +92 300 1234567", xOffset + 50, 100);
        ctx.fillText("📍 5th Avenue, Legacy City", xOffset + 50, 140);

        // Dates
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff200";
        ctx.fillText(`JOIN: ${new Date(userData?.subscription?.startDate).toLocaleDateString()}`, xOffset + 175, 250);
        ctx.fillText(`EXPIRE: ${new Date(userData?.subscription?.endDate).toLocaleDateString()}`, xOffset + 175, 280);

        // QR Code
        const qrImg = await loadImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userData?._id}`);
        if (qrImg) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(xOffset + 110, 350, 130, 130);
          ctx.drawImage(qrImg, xOffset + 110, 350, 130, 130);
        }

        ctx.fillStyle = "#000000";
        ctx.font = "bold 12px Arial";
        ctx.fillText("WWW.LEGACYGYM.COM", xOffset + 175, 550);
      }
    };

    await drawSide(0, false); // Draw Front
    await drawSide(400, true); // Draw Back

    // Trigger Download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "Legacy_Pass_Full.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center py-10 bg-[#111] min-h-screen">
      <h2 className="text-white font-black italic text-3xl mb-10 uppercase tracking-tighter">
        Your Digital <span className="text-[#fff200]">Access Pass</span>
      </h2>
      
      {/* Visual Preview Container */}
      <div className="flex flex-wrap justify-center gap-10 mb-12">
        {/* Front Side UI */}
        <div className="w-[300px] h-[500px] bg-black relative border border-gray-800 rounded-lg overflow-hidden flex flex-col items-center pt-10">
            <div className="w-32 h-32 border-2 border-[#fff200] p-1">
                <img src={userData?.image} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-white font-black text-xl mt-6 uppercase tracking-tight">{userData?.name}</h3>
            <p className="text-[#fff200] font-bold text-xs uppercase">Official Member</p>
            <div className="absolute bottom-0 w-full h-32 bg-[#fff200] [clip-path:polygon(0_40%,50%_100%,100%_40%,100%_100%,0_100%)]" />
        </div>
      </div>

      <button
        onClick={downloadPass}
        className="bg-[#fff200] text-black px-12 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#fff200]/20"
      >
        Download Identity Pass
      </button>
    </div>
  );
};

export default GymPass;