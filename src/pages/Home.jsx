import Carrossel from "../componentes/carrosselInicio/Carrossel.jsx";
import SectionJogos from "../componentes/componentesJogos/SectionJogos.jsx";
import Noticias from "../componentes/componentesNotícia/Noticias.jsx";
import SobreNos from "../componentes/componentesSobreNos/SobreNos.jsx";
import Footer from "../componentes/Footer.jsx";
import Patrocinadores from "../componentes/Patrocinadores.jsx";

export default function Home() {
  return (
    <>
        <Carrossel />
        <Noticias />
        <SectionJogos limite={false} />
        <SobreNos />
        <Patrocinadores />
      <Footer />
    </>
  );
}
