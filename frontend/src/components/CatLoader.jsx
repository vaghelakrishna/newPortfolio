import thinkingDots from "../assets/dot.svg";
import pixelCat from "../assets/think-cat.svg";

export default function CatLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img
        src={thinkingDots}
        alt="Loading"
        className="w-12 h-auto"
      />

      <img
        src={pixelCat}
        alt="Pixel Cat"
        className="w-24 h-auto"
      />
    </div>
  );
}