import IntroScreen from "./pages/IntroScreen";
import VisitorPass from "./pages/VisitorPass";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import VisitorGallery from './pages/VisitorGallery'
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroScreen />} />

      <Route
        path="/visitor-pass"
        element={<VisitorPass />}
      />

      <Route
        path="/home"
        element={<HomePage />}
      />

      <Route
       path="visitor-gallery" element={<VisitorGallery/>} />
    </Routes>
  );
}