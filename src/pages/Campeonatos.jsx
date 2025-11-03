import { useEffect, useState } from "react";
import DocumentosCopa from "@/componentes/componentesCampeonatos/DocumentosCopa.jsx";
import Titulo from "@/componentes/Titulo.jsx";
import CardNoticia from "@/componentes/componentesNotícia/CardNoticia.jsx";
import CampeonatosAtuais from "@/componentes/componentesCampeonatos/CampeonatosAtuais.jsx";

export default function Campeonatos() {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    fetch('https://68c98d52ceef5a150f654bb1.mockapi.io/passaBola/v1/news', {
      method: 'GET'
    })
      .then((r) => {
        if (!r.ok) throw new Error("Falha ao buscar notícias");
        return r.json();
      })
      .then((json) => { if (alive) setNews(json); })
      .catch((e) => { if (alive) setError(e); })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, [])

  return (
    <>
      <CampeonatosAtuais />
      <DocumentosCopa />
      <Titulo
        title="Notícias sobre campeonatos"
        position="start"
        color="#300B74"
      />
      <div
        className="flex overflow-x-auto gap-6 mb-2 px-10
             snap-x snap-mandatory
             [-ms-overflow-style:none] [scrollbar-width:none]
             [&::-webkit-scrollbar]:hidden"
      >
        {news.map((n) => (
          <div key={n.id} className="pl-10 shrink-0 snap-start">
            <CardNoticia
              image={n.image}
              title={n.title}
              subtitle={n.subtitle}
            />
          </div>
        ))}
      </div>
    </>
  );
}
