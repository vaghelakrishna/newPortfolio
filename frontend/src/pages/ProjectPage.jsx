import React, { useState } from "react";
import { Sparkles } from "lucide-react";

const ProjectPage = () => {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "Aora",
      category: "Development",
      year: "2024",
      img: "/projects/aora.webp",
      bg: "bg-purple-100",
    },
    {
      title: "Code Screenshot",
      category: "Development",
      year: "2024",
      img: "/projects/codescreenshot.webp",
      bg: "bg-purple-200",
    },
    {
      title: "iPhone 15 Pro",
      category: "Development",
      year: "2024",
      img: "/projects/iphone.webp",
      bg: "bg-purple-300",
    },
    {
      title: "Ochi Design",
      category: "Development & Design",
      year: "2024",
      img: "/projects/ochidesign.webp",
      bg: "bg-purple-400",
    },
    {
      title: "Snapalyzer",
      category: "Development & Design",
      year: "2024",
      img: "/projects/snapalyzer.webp",
      bg: "bg-purple-500",
    },
    {
      title: "Veni Labs",
      category: "Development",
      year: "2024",
      img: "/projects/veni-labs.webp",
      bg: "bg-purple-600",
    },
  ];

  // ⭐ FILTER FUNCTION
  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Development") return p.category.includes("Development");
    if (filter === "Design") return p.category.includes("Design");
  });

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <div className="mb-4 flex w-fit items-center gap-2 text-purple-500">
        <Sparkles className="w-5 h-5" />
        <p className="uppercase text-sm font-semibold tracking-wide shimmer">
          My Work
        </p>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white w-full md:w-2/3">
        Creating <span className="text-purple-400">next level</span> digital products
      </h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 mt-8 w-full overflow-x-auto no-scrollbar sm:justify-end">
        {["All", "Development", "Design"].map((label) => (
          <button
            key={label}
            onClick={() => setFilter(label)}
            className={`relative rounded-full px-6 py-2 text-sm border backdrop-blur-lg transition
              ${filter === label
                ? "bg-purple-500 text-white border-purple-400"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12">
        {filteredProjects.map((item, i) => (
          <div key={i} className="group cursor-pointer sm:even:mt-16">
            <div className={`aspect-[3/2] w-full overflow-hidden rounded-3xl ${item.bg}`}>
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="mt-4 space-y-2">
              <h5 className="text-xl font-semibold text-white">{item.title}</h5>
              <div className="flex justify-between text-purple-200 text-sm">
                <p>{item.category}</p>
                <p>{item.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectPage;
