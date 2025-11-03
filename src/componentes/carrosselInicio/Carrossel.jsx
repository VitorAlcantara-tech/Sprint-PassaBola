import Header from "./HeaderHome.jsx";
import { useEffect, useState } from "react";
import alexiaBg from "../../assets/imagemBackground2.png"
import chuteBg from "../../assets/imagemBackground3.png"
import campo from "../../assets/imagemCampoFutebolBackground.png";

export default function Carrossel() {
  const data = [
    {
      url: campo,
      titulo: "Notícias sobre futebol feminino e copas futuras do Passa a Bola.",
      subtitulo: "Tudo sobre o futebol!",
    },
    {
      url: alexiaBg,
      titulo: "PSG negocia com Alexia Putellas, duas vezes Bola do Ouro.",
      subtitulo: "Alexia Putellas recebe prêmio Bola de Ouro!",
    },
    {
      url: chuteBg,
      titulo: "Estádios lotados nas competições e maior cobertura da mídia.",
      subtitulo: "Futebol feminino bate recorde de público no Brasil",
    },
  ];

  const [currentState, setCurrentState] = useState(0);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentState === (data.length - 1)) {
        setCurrentState(0)
      }
      else {
        setCurrentState(currentState + 1)
      }
    }, 7500)
    return () => clearTimeout(timer)
  }, [currentState])



  const bgImageStyle = {
    backgroundImage: `url(${data[currentState].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const goToNext = (currentState) => {
    setCurrentState(currentState)
  }

  return (
    <div className="relative h-[600px] md:h-[700px] lg:h-screen">
      <div className="absolute inset-0" style={bgImageStyle} />

      <div className="relative z-10 h-full">
        <Header menuAberto={menuAberto} setMenuAberto={setMenuAberto} />

        {!menuAberto && (
          <div className="absolute left-6 right-6 bottom-10 md:left-10 md:right-auto max-w-3xl">
            <h2 className="font-Jockey text-white/90 text-[20px] sm:text-3xl md:mb-2">
              {data[currentState].subtitulo}
            </h2>
            <h1 className="font-Jockey text-white text-[32px] sm:text-5xl md:text-6xl leading-tight">
              {data[currentState].titulo}
            </h1>
          </div>
        )}

        <div
          aria-hidden={menuAberto}
          className={`absolute left-6 right-6 bottom-5 md:left-12 md:right-auto
              flex items-center justify-center gap-5 transition-opacity
              ${menuAberto ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          {data.map((item, idx) => {
            const isActive = idx === currentState;
            return (
              <span
                key={idx}
                onClick={() => setCurrentState(idx)}
                aria-label={`Ir para o slide ${idx + 1}`}
                className={`block h-2 w-20 cursor-pointer transition
          [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]
          ${isActive
                    ? "bg-[#5F1CDA] shadow-[0_0_0_2px_rgba(255,255,255,.35)]"
                    : "bg-[#a59eb0] hover:bg-[#7a718a]"}
        `}
              />
            );
          })}
        </div>



      </div>

    </div>
  );
}
