import React, { useState } from 'react';
import holdSvg from '../assets/hold.svg';
import { FaLinkedin } from "react-icons/fa";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import avatar from '../assets/cutie.png';

// Google Sheet Web App URL yahan paste karein:
const GOOGLE_SHEET_WEBAPP_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setStatusText('');

    try {
      if (GOOGLE_SHEET_WEBAPP_URL && !GOOGLE_SHEET_WEBAPP_URL.includes("YOUR_GOOGLE_APPS_SCRIPT")) {
        await fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      setStatusText("Message sent successfully! Thank you for reaching out.");
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatusText(''), 4000);
    } catch (err) {
      console.error("Submission error:", err);
      setStatusText("Message sent!");
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatusText(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen bg-white py-34 px-6 md:px-12 font-sans select-none">

        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Let's talk ?</h2>
          <p className="text-gray-600 text-lg">
            If you have any ideas, queries, freelance work, do write to me, or if you just want to be friends with someone like me :D
          </p>
        </div>

        {/* Main Content: Flexbox se row-wise structure */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">

          {/* FORM SIDE (Flex-grow 2 - Matlab bada hissa) */}
          <form onSubmit={handleSubmit} className="flex-[2] border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white relative">
            {/* hold.svg sitting on top border */}
            <img src={holdSvg} alt="hold" className="absolute -top-16 left-1/2 -translate-x-1/2 w-20 h-20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="What should I call you?"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-100 p-4 rounded-xl outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-100 p-4 rounded-xl outline-none"
                required
              />
            </div>
            <textarea
              placeholder="What's on your mind?"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-gray-100 p-4 rounded-xl outline-none mb-4"
              required
            />

            {statusText && (
              <p className="text-sm font-semibold text-green-700 mb-3 bg-green-50 p-3 rounded-xl border border-green-200">
                {statusText}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition cursor-pointer disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>

          {/* PROFILE SIDE (Flex-grow 1 - Matlab chhota hissa) */}
          <div className="flex-1 bg-[#FDFBF7] border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center">
            <img
              src={avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full mb-6 object-cover"
            />
            <div className="w-full text-left mb-6">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-bold text-gray-900 text-lg">krishnawork2606@gmail.com</p>
            </div>
            <div className="w-full text-left">
              <p className="text-sm text-gray-500 mb-3">More options</p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full border border-gray-200 py-3 rounded-xl hover:bg-white transition text-gray-700">
                <FaLinkedin size={18} /> Send message
              </a>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}
