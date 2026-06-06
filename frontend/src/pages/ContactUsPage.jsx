import React from 'react';
import { HiMail } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { RiFileTextFill } from "react-icons/ri";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen bg-[#F9F6F0] py-20 px-6 md:px-12 relative select-none font-sans-clean">

        <div className="absolute inset-0 pointer-events-none opacity-60"
          style={{ backgroundImage: 'radial-gradient(#E5E0D8 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto mt-16">
          <h2 className="text-4xl md:text-[56px] font-black text-[#2D2D2D] leading-[1.1] mb-12">
            Let's build something <span className="font-cursive text-[#E25C1D] italic">extraordinary</span> together.
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

            {/* CONTACT FORM */}
            <form className="bg-[#FFFDF9] border-2 border-[#2D2D2D] rounded-[30px] p-8 shadow-[8px_8px_0px_0px_#2D2D2D] rotate-[-1deg] hover:rotate-0 transition-transform">
              <input
                type="text"
                placeholder="What's your name?"
                className="w-full bg-transparent border-b-2 border-[#2D2D2D] py-3 outline-none font-['Caveat'] text-xl placeholder-[#7D7870]"
              />
              <textarea
                placeholder="Tell me about your idea..."
                rows={3}
                className="w-full bg-transparent border-b-2 border-[#2D2D2D] py-3 mt-4 outline-none font-['Caveat'] text-xl placeholder-[#7D7870]"
              ></textarea>

              <button className="mt-8 bg-[#E25C1D] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform border-2 border-[#2D2D2D]">
                Send Message ✈️
              </button>
            </form>

            {/* SIDE PANEL */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#FFFDF9] border border-[#DBD6C9] rounded-[28px] p-8">
                <h3 className="text-xl font-bold mb-4">Direct Contact</h3>
                <a href="mailto:hello@example.com" className="flex items-center gap-3 text-[#2B2A27] font-bold hover:text-[#E25C1D]">
                  <HiMail size={22} /> hello@example.com
                </a>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "GitHub", icon: FaGithub, color: "hover:bg-[#24292e]" },
                  { name: "LinkedIn", icon: FaLinkedin, color: "hover:bg-[#0077b5]" },
                  { name: "Twitter", icon: FaTwitter, color: "hover:bg-[#1DA1F2]" },
                  { name: "Resume", icon: RiFileTextFill, color: "hover:bg-[#E25C1D]" }
                ].map((social) => (
                  <a key={social.name} href="#" className={`bg-[#FFFDF9] border border-[#DBD6C9] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition-all group ${social.color} hover:text-white`}>
                    <social.icon size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}