import Titulo from "../Titulo.jsx";
import jogo1 from "../../assets/TimeAxTimeB.png";
import jogo2 from "../../assets/TimeCxTimeD.png";
import jogo3 from "../../assets/TimeExTimeF.png";
import CardJogos from "./CardJogos.jsx";
import { FaFutbol } from "react-icons/fa";


export default function Jogos() {
    const jogos = [
        { image: jogo1, text: "Este sábado", status: "AO VIVO" },
        { image: jogo2, text: "Dia 24/09", status: "EM BREVE" },
        { image: jogo3, text: "Dia 30/09", status: "EM BREVE" },
    ];

    return (
        <section
            className="
        relative mt0 rounded-sm 
        bg-gradient-to-r from-[#2C086E] via-[#540FD4] to-[#300B74]
        text-white
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        overflow-hidden
      "
        >

            <div className="relative px-4 sm:px-6 lg:px-10 py-8">
                {/* título + subtítulo */}
                <div className="mb-4">
                    <Titulo title="Jogos" position="center" color="#f8f8f8" />
                    <p className="mt-1 text-center text-white/80 text-sm">
                        Acompanhe os próximos confrontos e não perca nada.
                    </p>
                </div>


                {/* grid/carrossel de jogos */}
                <div
                    className="mx-0 px-4 lg:mx-0 lg:px-0 "
                >
                    <div
                        className="
              grid gap-4
              sm:grid-cols-2 lg:grid-cols-3
              /* carrossel no mobile */
              sm:[grid-auto-flow:initial] 
              [grid-auto-flow:column] [grid-auto-columns:85%]
              overflow-x-auto snap-x snap-mandatory no-scrollbar
            "
                    >
                        {jogos.map((j, i) => (
                            <div
                                key={i}
                                className="
                  group relative snap-center
                  rounded-2xl p-[1px]
                  bg-gradient-to-b from-white/30 to-white/5
                  hover:from-white/60 hover:to-white/20 transition
                "
                            >
                                <div className="rounded-2xl bg-white/10 backdrop-blur-xl">
                                    {/* Status dos jogos*/}
                                    <div className="absolute left-3 top-3 z-10">
                                        <span className="rounded-full bg-black/60 px-2 py-1 text-[10px] tracking-wide ring-1 ring-white/20">
                                            {j.status}
                                        </span>
                                    </div>

                                    <div className="overflow-hidden rounded-2xl">
                                        <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                                            <CardJogos image={j.image} text={j.text} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between px-4 pb-4">
                                        <span className="text-xs text-white/70 flex items-center gap-1"><FaFutbol className="text-[#eeeeee]" /> Partida #{i + 1}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <a
                        href="/jogos"
                        className=" inline-flex items-center gap-2 rounded-full border border-white/25  bg-white/10 px-5 py-2 text-sm text-white/90 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" >
                        Ver todos os jogos
                    </a>
                </div>
            </div>

            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--marquee-w, 100%))); }
        }
      `}</style>
        </section>
    );
}
