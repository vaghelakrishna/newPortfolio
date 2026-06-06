import leftKey from "../assets/press-left.svg";
import rightKey from "../assets/press-right.svg";
import holdingCat from "../assets/hold.svg";

export default function PriceCatLoader() {
  return (
    <>
      <div className="relative w-14 h-14">
        <img
          src={leftKey}
          alt=""
          className="absolute inset-0 w-full h-full left-paw"
        />

        <img
          src={rightKey}
          alt=""
          className="absolute inset-0 w-full h-full right-paw"
        />
      </div>

      <img
        src={holdingCat}
        alt=""
        className="absolute inset-0 w-15 h-15"
      />

      <style>{`
        .left-paw {
          animation: leftPress 0.8s infinite steps(1);
        }

        .right-paw {
          animation: rightPress 0.8s infinite steps(1);
        }

        @keyframes leftPress {
          0%, 49% {
            opacity: 1;
          }

          50%, 100% {
            opacity: 0;
          }
        }

        @keyframes rightPress {
          0%, 49% {
            opacity: 0;
          }

          50%, 100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}