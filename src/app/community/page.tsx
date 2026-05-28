"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MessageSquare, ArrowUp, ArrowDown, Clock, Hash } from "lucide-react";

// Safe import for your custom cursor
const RadarGrid = dynamic(() => import("@/components/RadarGrid"), { ssr: false });

export default function CommunityHub() {
  return (
    <main className="min-h-screen relative bg-[#040508] text-white px-6 py-8 md:px-16 md:py-12 tech-grid font-sans selection:bg-blue-500 selection:text-white">
      <RadarGrid />

      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent z-50"></div>
      
      {/* Navigation Header */}
      <header className="relative z-10 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 pb-6 mb-12">
        <div className="font-mono text-xs tracking-[0.4em] text-blue-500 font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          SYS.INIT // HUB_COMMUNITY
        </div>
        
        <nav className="flex items-center space-x-8 font-mono text-[11px] tracking-widest text-slate-400">
          <Link href="/" className="transition-colors hover:text-white">// OVERVIEW</Link>
          <Link href="/portfolio" className="transition-colors hover:text-white">// PORTFOLIO</Link>
          <Link href="/community" className="text-lime-400 transition-colors hover:text-white">// HUB_COMMUNITY</Link>
        </nav>
      </header>

      {/* Main Community Grid Layout */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Sub-forums & Topics */}
        <div className="lg:col-span-3 space-y-6">
          <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-5 rounded font-mono">
            <h2 className="text-[10px] uppercase tracking-widest text-slate-500 mb-4 pl-1">// DIRECTORIES</h2>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2 p-2 hover:bg-white/5 rounded cursor-pointer transition-colors text-lime-300">
                <Hash className="w-3 h-3" /> All_Telemetry
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white/5 rounded cursor-pointer transition-colors">
                <Hash className="w-3 h-3" /> Aerodynamics
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white/5 rounded cursor-pointer transition-colors">
                <Hash className="w-3 h-3" /> Carbon_Composites
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white/5 rounded cursor-pointer transition-colors">
                <Hash className="w-3 h-3" /> Kinematics
              </li>
            </ul>
          </div>
        </div>

        {/* Center Feed: Reddit-Style Posts */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <h1 className="text-2xl font-bold tracking-tight uppercase">Active Node Feed</h1>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold tracking-widest rounded transition-colors">
              + INIT_THREAD
            </button>
          </div>

          {/* Post Component 1 */}
          <ForumPost 
            votes={142} 
            title="Analysis of boundary layer separation at Mach 1.2" 
            author="AeroStruct_09" 
            time="2 hours ago" 
            tags={["Aerodynamics", "Data"]}
          />
          
          {/* Post Component 2 */}
          <ForumPost 
            votes={89} 
            title="Optimizing suspension kinematics for high-downforce cornering" 
            author="ApexDynamics" 
            time="5 hours ago" 
            tags={["Kinematics"]}
          />

          {/* Post Component 3 */}
          <ForumPost 
            votes={34} 
            title="Thermal degradation rates in military-grade carbon weaves" 
            author="MatSci_Lead" 
            time="12 hours ago" 
            tags={["Carbon_Composites"]}
          />
        </div>

      </div>
    </main>
  );
}

// Reusable component for the Reddit-style feed items
function ForumPost({ votes, title, author, time, tags }: { votes: number; title: string; author: string; time: string; tags: string[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-sm rounded cursor-pointer transition-colors"
    >
      {/* Upvote/Downvote Column */}
      <div className="flex flex-col items-center p-4 bg-white/[0.02] border-r border-white/5 min-w-[60px]">
        <ArrowUp className="w-5 h-5 text-slate-500 hover:text-lime-400 transition-colors" />
        <span className="text-sm font-mono font-bold my-2 text-slate-200">{votes}</span>
        <ArrowDown className="w-5 h-5 text-slate-500 hover:text-red-400 transition-colors" />
      </div>

      {/* Main Post Content */}
      <div className="p-4 flex-1">
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
          <span>Posted by {author}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {time}</span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-200 mb-3">{title}</h3>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[9px] font-mono uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-slate-300 transition-colors">
            <MessageSquare className="w-3 h-3" /> 12 Comments
          </div>
        </div>
      </div>
    </motion.div>
  );
}