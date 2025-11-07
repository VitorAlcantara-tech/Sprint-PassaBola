import copasVerde from "../assets/copas-verde.png";
import TabelaHead from "../componentes/TableGames/TabelaHead.jsx";
import TabelaBody from "../componentes/TableGames/TabelaBody.jsx";
import DocumentosCopa from "../componentes/componentesCampeonatos/DocumentosCopa.jsx";
import Patrocinadores from "../componentes/Patrocinadores.jsx";
import { useContext } from "react";
import { LoginContext } from "@/contexts/LoginContext.jsx";
import SectionJogos from "../componentes/componentesJogos/SectionJogos.jsx";


export default function Jogos() {
  const times = [
    { time: "Time A", v: 3, e: 1, d: 0, sg: 5, ca: 1, cv: 0 },
    { time: "Time B", v: 10, e: 2, d: 0, sg: 4, ca: 2, cv: 0 },
    { time: "Time C", v: 1, e: 1, d: 2, sg: 2, ca: 5, cv: 0 },
    { time: "Time A", v: 3, e: 1, d: 0, sg: 5, ca: 1, cv: 0 },
    { time: "Time B", v: 10, e: 2, d: 0, sg: 4, ca: 2, cv: 0 },
    { time: "Time C", v: 1, e: 1, d: 2, sg: 2, ca: 5, cv: 0 },
    { time: "Time A", v: 3, e: 1, d: 0, sg: 5, ca: 1, cv: 0 },
    { time: "Time B", v: 10, e: 2, d: 0, sg: 4, ca: 2, cv: 0 },
    { time: "Time C", v: 1, e: 1, d: 2, sg: 2, ca: 5, cv: 0 },
  ];
  const {user, login} = useContext(LoginContext)

  function jogosTotais(time) {
    return time.v + time.e + time.d;
  }

  function pntsTotais(time) {
    return time.v * 3 + time.e;
  }

  const timesOrdenados = times
    .map((time) => ({
      ...time,
      jogos: jogosTotais(time),
      pontos: pntsTotais(time),
    }))
    .sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      const saldoA = a.sg - a.ca;
      const saldoB = b.sg - b.ca;
      return saldoB - saldoA;
    });

  return (
    <div className="flex flex-col gap-4 mt-20">
      <div className="ml-4 md:ml-14">
        <img className="w-20 md:w-[100px]" src={copasVerde} alt="" />
        <h1 className="text-[#300B74] text-[50px] font-Jockey md:text-[100px]">
          COPA PASSA A BOLA
        </h1>
        <div className="mr-8 h-0.5 bg-[#300B74] flex md:h-0.5" />
        <h2 className="text-[#300B74] text-[30px] mt-5 font-Jockey md:mt-16 md:mb-4">
          Grupo
        </h2>
      </div>
      <div className="overflow-x-auto m-2 mb-8 md:w-[70%] md:ml-12">
        <table className="text-[16px] min-w-full border-collapse">
          <TabelaHead />
          <tbody className="font-Jockey text-[#19063C] text-sm text-[20px] ">
            {timesOrdenados.map((time, index) => (
              <TabelaBody
                key={index}
                cor={index % 2 === 0 ? "#D9D9D9" : "#FFFFFF"}
                posicao={index}
                time={time.time}
                v={time.v}
                e={time.e}
                d={time.d}
                sg={time.sg}
                ca={time.ca}
                cv={time.cv}
                pontos={time.pontos}
                jogos={time.jogos}
              />
            ))}
          </tbody>
        </table>
      </div>
      <SectionJogos limite={true} />
      <section className="my-10 mb-20">
        <DocumentosCopa />
      </section>
      <Patrocinadores />
    </div>
  );
}
