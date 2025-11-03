import { Link } from "react-router-dom";

export default function Acesso({ btn2, handle }) {

  return (
    <div className="font-Raleway flex flex-col items-center justify-center gap-6 mt-10 md:flex-row">
      <button
        onClick={handle}
        className="flex items-center justify-center bg-[#44159a] duration-200 cursor-pointer hover:bg-[#300B74] text-white font-Rambla w-[177px] h-[52px] text-[20px] rounded-full hover:shadow-xl transform hover:scale-105 transition"
      >
        {btn2}
      </button>
    
    </div>
  );
}
