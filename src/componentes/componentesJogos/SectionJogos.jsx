import React, { useEffect, useState, useContext } from "react";
import Titulo from "../Titulo.jsx";
import jogo1 from "../../assets/TimeAxTimeB.png";
import jogo2 from "../../assets/TimeCxTimeD.png";
import jogo3 from "../../assets/TimeExTimeF.png";
import CardJogos from "./CardJogos.jsx";
import { FaFutbol } from "react-icons/fa";
import { LoginContext } from "../../contexts/LoginContext.jsx";


export default function SectionJogos({limite}) {
    const { user } = useContext(LoginContext);
    const defaultJogos = [
        { image: jogo1, text: "Este sábado", status: "AO VIVO" },
        { image: jogo2, text: "Dia 24/09", status: "EM BREVE" },
        { image: jogo3, text: "Dia 30/09", status: "EM BREVE" },
    ];

    const [customGames, setCustomGames] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingValues, setEditingValues] = useState({ date: "", time: "", teamA: "", teamB: "", round: "" });

    useEffect(() => {
        // ler jogos adicionados pelo Dashboard
        try {
            const stored = JSON.parse(localStorage.getItem("customGames") || "[]");
            // Ordenar por data se for mostrar jogos customizados (limite = true)
            const sortedGames = stored.sort((a, b) => new Date(b.date) - new Date(a.date));
            setCustomGames(sortedGames);
        } catch (e) {
            console.error("Falha ao ler customGames:", e);
            setCustomGames([]);
        }

        // atualizar se o localStorage mudar (outras abas)
        const onStorage = (e) => {
            if (e.key === "customGames") {
                setCustomGames(JSON.parse(e.newValue || "[]"));
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    // handlers: apagar, iniciar edição, salvar edição
    function deleteCustomGame(id) {
        try {
            const stored = JSON.parse(localStorage.getItem("customGames") || "[]");
            const next = stored.filter((g) => g.id !== id);
            localStorage.setItem("customGames", JSON.stringify(next));
            setCustomGames(next);
        } catch (e) {
            console.error("Erro ao apagar jogo:", e);
        }
    }

    function startEdit(id) {
        const g = customGames.find((c) => c.id === id);
        if (!g) return;
        setEditingId(id);
        setEditingValues({ date: g.date || "", time: g.time || "", teamA: g.teamA || "", teamB: g.teamB || "", round: g.round || "" });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditingValues({ date: "", time: "", teamA: "", teamB: "", round: "" });
    }

    function saveEdit(id) {
        try {
            const stored = JSON.parse(localStorage.getItem("customGames") || "[]");
            const next = stored.map((g) => (g.id === id ? { ...g, ...editingValues } : g));
            localStorage.setItem("customGames", JSON.stringify(next));
            setCustomGames(next);
            cancelEdit();
        } catch (e) {
            console.error("Erro ao salvar edição:", e);
        }
    }

    // transformar customGames no formato esperado pelo carrossel, mantendo ids
    const customCards = customGames.map((g) => ({
        id: g.id,
        image: jogo1, // imagem padrão para jogos criados pelo admin
        text: `${g.date} ${g.teamA} x ${g.teamB}`,
        status: g.round || "CADASTRADO",
        raw: g,
    }));

    // Se limite for false, mostra apenas os jogos padrão
    // Se limite for true, mostra todos os jogos customizados
    const jogos = limite ? customCards : defaultJogos.slice(0, 3);

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
                        {jogos.map((j, i) => {
                            const isCustom = !!j.id;
                            const key = isCustom ? `custom-${j.id}` : `def-${i}`;
                            return (
                                <div
                                    key={key}
                                    className={
                                        "group relative snap-center rounded-2xl p-[1px] bg-gradient-to-b from-white/30 to-white/5 hover:from-white/60 hover:to-white/20 transition"
                                    }
                                >
                                    <div className="rounded-2xl bg-white/10 backdrop-blur-xl relative">
                                        {/* Status dos jogos*/}
                                        <div className="absolute left-3 top-3 z-10">
                                            <span className="rounded-full bg-black/60 px-2 py-1 text-[10px] tracking-wide ring-1 ring-white/20">
                                                {j.status}
                                            </span>
                                        </div>

                                        <div className="overflow-hidden rounded-2xl">
                                            <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                                                {/* Se estivermos editando este custom, mostrar formulário */}
                                                {isCustom && user === null && editingId === j.id ? (
                                                    <div className="p-4 text-black bg-white rounded-md">
                                                        <div className="grid gap-2">
                                                            <input className="p-2 border rounded" value={editingValues.date} onChange={(e) => setEditingValues((v) => ({ ...v, date: e.target.value }))} placeholder="Data" />
                                                            <input className="p-2 border rounded" value={editingValues.time} onChange={(e) => setEditingValues((v) => ({ ...v, time: e.target.value }))} placeholder="Hora" />
                                                            <input className="p-2 border rounded" value={editingValues.teamA} onChange={(e) => setEditingValues((v) => ({ ...v, teamA: e.target.value }))} placeholder="Time A" />
                                                            <input className="p-2 border rounded" value={editingValues.teamB} onChange={(e) => setEditingValues((v) => ({ ...v, teamB: e.target.value }))} placeholder="Time B" />
                                                            <input className="p-2 border rounded" value={editingValues.round} onChange={(e) => setEditingValues((v) => ({ ...v, round: e.target.value }))} placeholder="Fase" />
                                                            <div className="flex gap-2 justify-end">
                                                                <button onClick={() => saveEdit(j.id)} className="bg-[#300B74] text-white px-3 py-1 rounded">Salvar</button>
                                                                <button onClick={cancelEdit} className="bg-white text-[#300B74] px-3 py-1 rounded">Cancelar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <CardJogos image={j.image} text={j.text} />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between px-4 pb-4">
                                            <span className="text-xs text-white/70 flex items-center gap-1"><FaFutbol className="text-[#eeeeee]" /> Partida #{i + 1}</span>

                                            {/* Mostrar botões apenas para jogos customizados e usuários admin */}
                                            {isCustom && user === null && (
                                                <div className="flex gap-2">
                                                    {editingId !== j.id && (
                                                        <>
                                                            <button onClick={() => startEdit(j.id)} className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20">Editar</button>
                                                            <button onClick={() => deleteCustomGame(j.id)} className="text-xs bg-red-600/80 px-2 py-1 rounded hover:brightness-90">Apagar</button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {!limite && (
                    <div className="mt-6 flex justify-center">
                        <a
                            href="/jogos"
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm text-white/90 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50">
                            Ver todos os jogos
                        </a>
                    </div>
                )}
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
