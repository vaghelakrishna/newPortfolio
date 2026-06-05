import IntroScreen from "./pages/IntroScreen";
import VisitorPass from "./pages/VisitorPass";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import VisitorGallery from './pages/VisitorGallery'
import ProjectPage from "./pages/ProjectPage";
import ProjectDetail from "./pages/ProjectDetail";
// import FooterNavigation from "./components/WalkingRobot";

export default function App() {
  return (
    <>
      {/* <FooterNavigation /> */}
      <Routes>
      <Route path="/" element={<IntroScreen />} />

      <Route
        path="/visitor-pass"
        element={<VisitorPass />} />

      <Route
        path="/home"
        element={<HomePage />} />

      <Route
        path="visitor-gallery" element={<VisitorGallery />} />

      <Route path="/project" element={<ProjectPage />} />
      <Route path="/project-detail" element={<ProjectDetail />} />
    </Routes></>
  );
}

// {/* <svg width="44" height="56" viewBox="0 0 44 56" class="site-pet__svg" fill="none"> <!-- soft contact shadow so the pet reads as grounded --> <ellipse class="site-pet__shadow" cx="22" cy="53.5" rx="14" ry="1.8" fill="#242424" opacity="0.16"></ellipse> <!-- single slab body — a lean geometric monolith, ink-on-ink --> <rect x="4" y="6" width="36" height="38" rx="5" fill="#242424"></rect> <!-- subtle top highlight for depth --> <rect x="4" y="6" width="36" height="2" rx="1" fill="#f3e9d6" opacity="0.1"></rect> <!-- slit eyes — thin, evenly spaced. Group transforms for glance + blink. --> <g class="site-pet__eyes" style="--eye-x: 0; --eye-y: 0; transform: translate(1.18px, -0.54px);"> <rect class="site-pet__eye" x="14" y="22" width="4" height="5" rx="1" fill="#f3e9d6"></rect> <rect class="site-pet__eye" x="26" y="22" width="4" height="5" rx="1" fill="#f3e9d6"></rect> </g> <!-- legs — short blocky extrusions flush with the body --> <rect class="site-pet__leg site-pet__leg--left" x="10" y="42" width="8" height="10" rx="1.5" fill="#242424"></rect> <rect class="site-pet__leg site-pet__leg--right" x="26" y="42" width="8" height="10" rx="1.5" fill="#242424"></rect> <!--
//   Hats — every variant is drawn but only the one matching
//   .site-pet[data-hat="<key>"] is visible via CSS. Shapes kept blocky
//     and 1–2 color max to match the mascot's quiet ink aesthetic.
//         --> <g class="pet-hat" data-hat-variant="bucket"> <rect x="10" y="-7" width="24" height="10" rx="3" fill="#e8c84a"></rect> <rect x="-1" y="0" width="46" height="6" rx="3" fill="#e8c84a"></rect> </g> <g class="pet-hat" data-hat-variant="top"> <rect x="13" y="-11" width="18" height="14" rx="2.5" fill="#1a1a1a"></rect> <rect x="4" y="1" width="36" height="5" rx="2.5" fill="#1a1a1a"></rect> </g> <g class="pet-hat" data-hat-variant="cap"> <rect x="8" y="-4" width="28" height="10" rx="4" fill="#168b9d"></rect> <rect x="22" y="4" width="20" height="5" rx="2.5" fill="#168b9d"></rect> </g> <g class="pet-hat" data-hat-variant="sprout"> <!-- thin darker stem + two ellipse leaves pivoted so their
//                outer tips point upward like ^ --> <rect x="21.2" y="-6" width="1.6" height="12" fill="#2a8f50"></rect> <ellipse cx="17" cy="-7" rx="5" ry="2.8" fill="#3ca564" transform="rotate(28 17 -7)"></ellipse> <ellipse cx="27" cy="-7" rx="5" ry="2.8" fill="#3ca564" transform="rotate(-28 27 -7)"></ellipse> </g> <g class="pet-hat" data-hat-variant="party"> <!-- party cone + pom-pom — brim sits flush on the head top --> <polygon points="22.5,-8 14,4 31,4" fill="#bf5a7a"></polygon> <rect x="14" y="4" width="17" height="2" rx="1" fill="#bf5a7a"></rect> <circle cx="22.5" cy="-8" r="2" fill="#168b9d"></circle> </g> </svg> */}