import imagemAnuncioCopa from "../../assets/imagemAnuncioCopa.png";
import Titulo from "../Titulo.jsx";
import { ModalInscricao } from "@/componentes/ModalInscricao.jsx";

export default function CampeonatosAtuais() {
  return (
    <section>
      <Titulo title="Campeonatos Atuais" position="start" color="#300B74" />

      <div className="px-10 flex justify-center">
        <ModalInscricao>
          {/* usar um <button> por acessibilidade/teclado */}
          <button
            type="button"
            aria-label="Abrir inscrição da Copa Passa a Bola"
            className="m-10 md:w-[70%] rounded-sm focus:outline-none focus:ring-4 focus:ring-[#5F1CDA]/40"
          >
            <img
              src={imagemAnuncioCopa}
              alt="Anúncio Copa Passa a Bola"
              className="w-full rounded-sm cursor-pointer select-none"
              draggable="false"
            />
          </button>
        </ModalInscricao>
      </div>
    </section>
  );
}
