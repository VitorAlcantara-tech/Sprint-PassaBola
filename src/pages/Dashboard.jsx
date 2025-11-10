import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext.jsx";
import { FaUserFriends, FaFutbol, FaStar, FaEdit, FaTrash } from "react-icons/fa";

export default function Dashboard() {
  // Mock inicial – depois você pode trocar por dados da API
  const [athletesCount, setAthletesCount] = useState(128);

  const [games, setGames] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingValues, setEditingValues] = useState({ date: "", time: "", teamA: "", teamB: "", round: "" });
  const { user } = useContext(LoginContext);

  // Load games from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("customGames") || "[]");
      setGames(stored);
    } catch (e) {
      setGames([]);
    }
    // Sync if localStorage changes in other tabs
    const onStorage = (e) => {
      if (e.key === "customGames") {
        setGames(JSON.parse(e.newValue || "[]"));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const [featuredAthletes, setFeaturedAthletes] = useState([]);
  const [editingAthleteId, setEditingAthleteId] = useState(null);
  const [editingAthleteValues, setEditingAthleteValues] = useState({ name: "", team: "", position: "", idade: "", gols: "", image: "" });

  // Load featuredAthletes from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("featuredAthletes") || "[]");
      setFeaturedAthletes(stored);
    } catch (e) {
      setFeaturedAthletes([]);
    }
    // Sync if localStorage changes in other tabs
    const onStorage = (e) => {
      if (e.key === "featuredAthletes") {
        setFeaturedAthletes(JSON.parse(e.newValue || "[]"));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const [newGame, setNewGame] = useState({
    date: "",
    time: "",
    teamA: "",
    teamB: "",
    round: "",
  });

  const [newAthlete, setNewAthlete] = useState({
    name: "",
    team: "",
    position: "",
    idade: "",
    gols: "",
    image: "",
  });

  function handleAddGame(e) {
    e.preventDefault();
    if (!newGame.date || !newGame.time || !newGame.teamA || !newGame.teamB) return;
    const newObj = { id: Date.now(), ...newGame };
    const next = [...games, newObj];
    setGames(next);
    localStorage.setItem("customGames", JSON.stringify(next));
    setNewGame({ date: "", time: "", teamA: "", teamB: "", round: "" });
  }

  function handleAddAthlete(e) {
    e.preventDefault();
    if (!newAthlete.name || !newAthlete.team) return;
    const newObj = { id: Date.now(), ...newAthlete };
    const next = [...featuredAthletes, newObj];
    setFeaturedAthletes(next);
    localStorage.setItem("featuredAthletes", JSON.stringify(next));
    setAthletesCount((prev) => prev + 1);
    setNewAthlete({ name: "", team: "", position: "", idade: "", gols: "", image: "" });
  }

  // Games edit/delete helpers (inside component scope)
  function handleDeleteGame(id) {
    const next = games.filter((g) => g.id !== id);
    setGames(next);
    localStorage.setItem("customGames", JSON.stringify(next));
  }

  function startEditGame(id) {
    const g = games.find((game) => game.id === id);
    if (!g) return;
    setEditingId(id);
    setEditingValues({ date: g.date, time: g.time, teamA: g.teamA, teamB: g.teamB, round: g.round });
  }

  function cancelEditGame() {
    setEditingId(null);
    setEditingValues({ date: "", time: "", teamA: "", teamB: "", round: "" });
  }

  function saveEditGame(id) {
    const next = games.map((g) => (g.id === id ? { ...g, ...editingValues } : g));
    setGames(next);
    localStorage.setItem("customGames", JSON.stringify(next));
    cancelEditGame();
  }

  function handleDeleteAthlete(id) {
    const next = featuredAthletes.filter((a) => a.id !== id);
    setFeaturedAthletes(next);
    localStorage.setItem("featuredAthletes", JSON.stringify(next));
  }

  function startEditAthlete(id) {
    const a = featuredAthletes.find((athlete) => athlete.id === id);
    if (!a) return;
    setEditingAthleteId(id);
    setEditingAthleteValues({ name: a.name || "", team: a.team || "", position: a.position || "", idade: a.idade || "", gols: a.gols || "", image: a.image || "" });
  }

  function cancelEditAthlete() {
    setEditingAthleteId(null);
    setEditingAthleteValues({ name: "", team: "", position: "", idade: "", gols: "", image: "" });
  }

  function saveEditAthlete(id) {
    const next = featuredAthletes.map((a) => (a.id === id ? { ...a, ...editingAthleteValues } : a));
    setFeaturedAthletes(next);
    localStorage.setItem("featuredAthletes", JSON.stringify(next));
    cancelEditAthlete();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#561EBD] to-[#240675] text-white px-6 py-10">
      {/* Título */}
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl md:text-5xl font-Jockey uppercase tracking-widest">
          Dashboard da Copa
        </h1>
        <p className="mt-2 text-sm md:text-base text-white/80">
          Área exclusiva para administração dos campeonatos, jogos e atletas em destaque.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        {/* Cards de métricas */}
        <section className="grid gap-5 md:grid-cols-3">
          <div className="bg-white/10 backdrop-blur rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-full bg-pink-500/80">
              <FaUserFriends size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Atletas inscritas na Copa
              </p>
              <p className="text-2xl font-bold">{athletesCount}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-full bg-green-500/80">
              <FaFutbol size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Jogos cadastrados
              </p>
              <p className="text-2xl font-bold">{games.length}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-full bg-yellow-400/80">
              <FaStar size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Atletas em destaque
              </p>
              <p className="text-2xl font-bold">{featuredAthletes.length}</p>
            </div>
          </div>
        </section>

        {/* Grid principal: jogos + atletas em destaque */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Jogos */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-Jockey uppercase tracking-widest mb-4">
              Jogos da Copa
            </h2>

            <div className="max-h-60 overflow-y-auto rounded-md border border-white/10 mb-4">
              <table className="w-full text-sm">
                <thead className="bg-white/10 text-left text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-3 py-2">Data</th>
                    <th className="px-3 py-2">Hora</th>
                    <th className="px-3 py-2">Times</th>
                    <th className="px-3 py-2">Fase</th>
                    {user === null && <th className="px-3 py-2">Ações</th>}
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr key={game.id} className="odd:bg-white/5 even:bg-white/0">
                      {editingId === game.id ? (
                        <>
                          <td className="px-3 py-2">
                            <input value={editingValues.date} onChange={e => setEditingValues(v => ({ ...v, date: e.target.value }))} className="bg-white/20 rounded px-2 py-1 w-16" />
                          </td>
                          <td className="px-3 py-2">
                            <input value={editingValues.time} onChange={e => setEditingValues(v => ({ ...v, time: e.target.value }))} className="bg-white/20 rounded px-2 py-1 w-16" />
                          </td>
                          <td className="px-3 py-2">
                            <input value={editingValues.teamA} onChange={e => setEditingValues(v => ({ ...v, teamA: e.target.value }))} className="bg-white/20 rounded px-2 py-1 w-16" />
                            <span className="mx-1">x</span>
                            <input value={editingValues.teamB} onChange={e => setEditingValues(v => ({ ...v, teamB: e.target.value }))} className="bg-white/20 rounded px-2 py-1 w-16" />
                          </td>
                          <td className="px-3 py-2">
                            <input value={editingValues.round} onChange={e => setEditingValues(v => ({ ...v, round: e.target.value }))} className="bg-white/20 rounded px-2 py-1 w-16" />
                          </td>
                          {user === null && (
                            <td className="px-3 py-2 flex gap-2">
                              <button onClick={() => saveEditGame(game.id)} title="Salvar" className="p-1 rounded hover:bg-green-100">
                                Salvar
                              </button>
                              <button onClick={cancelEditGame} title="Cancelar" className="p-1 rounded hover:bg-gray-100">
                                Cancelar
                              </button>
                            </td>
                          )}
                        </>
                      ) : (
                        <>
                          <td className="px-3 py-2">{game.date}</td>
                          <td className="px-3 py-2">{game.time}</td>
                          <td className="px-3 py-2">{game.teamA} x {game.teamB}</td>
                          <td className="px-3 py-2">{game.round || "-"}</td>
                          {user === null && (
                            <td className="px-3 py-2 flex gap-2">
                              <button onClick={() => startEditGame(game.id)} title="Editar" className="p-1 rounded hover:bg-blue-100">
                                <FaEdit className="text-blue-100 hover:text-[#561EBD]" size={18} />
                              </button>
                              <button onClick={() => handleDeleteGame(game.id)} title="Apagar" className="p-1 rounded hover:bg-red-100">
                                <FaTrash className="text-red-500" size={18} />
                              </button>
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                  {games.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-4 text-center text-white/70"
                      >
                        Nenhum jogo cadastrado ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Formulário para adicionar jogo */}
            <form
              onSubmit={handleAddGame}
              className="grid gap-3 md:grid-cols-2 mt-4"
            >
              <input
                type="text"
                placeholder="Data (ex: 10/08)"
                value={newGame.date}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, date: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Hora (ex: 19:00)"
                value={newGame.time}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, time: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Time A"
                value={newGame.teamA}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, teamA: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Time B"
                value={newGame.teamB}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, teamB: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Fase (ex: Quartas, Final...)"
                value={newGame.round}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, round: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white md:col-span-2"
              />
              <button
                type="submit"
                className="md:col-span-2 bg-white text-[#561EBD] font-semibold rounded-md py-2 text-sm hover:bg-gray-100 transition-colors"
              >
                Adicionar jogo
              </button>
            </form>
          </div>

          {/* Atletas em destaque */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-Jockey uppercase tracking-widest mb-4">
              Atletas em Destaque
            </h2>

            <ul className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {featuredAthletes.map((athlete) => (
                <li key={athlete.id} className="flex items-center gap-3 bg-white/5 rounded-md px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/80 flex items-center justify-center text-[#561EBD] font-bold text-sm">
                    <FaStar />
                  </div>
                  {editingAthleteId === athlete.id ? (
                    <div className="flex-1 flex flex-col gap-1">
                      <input value={editingAthleteValues.name} onChange={e => setEditingAthleteValues(v => ({ ...v, name: e.target.value }))} className="bg-white/20 rounded px-2 py-1 mb-1" placeholder="Nome" />
                      <input value={editingAthleteValues.team} onChange={e => setEditingAthleteValues(v => ({ ...v, team: e.target.value }))} className="bg-white/20 rounded px-2 py-1 mb-1" placeholder="Clube" />
                      <input value={editingAthleteValues.position} onChange={e => setEditingAthleteValues(v => ({ ...v, position: e.target.value }))} className="bg-white/20 rounded px-2 py-1 mb-1" placeholder="Posição" />
                      <div className="flex gap-2">
                        <input value={editingAthleteValues.idade} onChange={e => setEditingAthleteValues(v => ({ ...v, idade: e.target.value }))} className="bg-white/20 rounded px-2 py-1 w-20" placeholder="Idade" />
                        <input value={editingAthleteValues.gols} onChange={e => setEditingAthleteValues(v => ({ ...v, gols: e.target.value }))} className="bg-white/20 rounded px-2 py-1 w-20" placeholder="Gols" />
                        <input value={editingAthleteValues.image} onChange={e => setEditingAthleteValues(v => ({ ...v, image: e.target.value }))} className="bg-white/20 rounded px-2 py-1 flex-1" placeholder="URL da imagem" />
                      </div>
                      <div className="flex gap-2 mt-1">
                        <button onClick={() => saveEditAthlete(athlete.id)} className="bg-green-600 text-white px-2 py-1 rounded">Salvar</button>
                        <button onClick={cancelEditAthlete} className="bg-gray-400 text-white px-2 py-1 rounded">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{athlete.name}</p>
                        <p className="text-xs text-white/70">{athlete.team} • {athlete.position || "Posição não informada"}</p>
                      </div>
                      {user === null && (
                        <div className="flex gap-2">
                          <button onClick={() => startEditAthlete(athlete.id)} title="Editar" className="p-1 rounded hover:bg-blue-100 ">
                            <FaEdit className="text-blue-100 hover:text-[#561EBD]" size={18} />
                          </button>
                          <button onClick={() => handleDeleteAthlete(athlete.id)} title="Apagar" className="p-1 rounded hover:bg-red-100">
                            <FaTrash className="text-red-500" size={18} />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
              {featuredAthletes.length === 0 && (
                <p className="text-white/70 text-sm">Nenhuma atleta em destaque ainda.</p>
              )}
            </ul>

            {/* Formulário para adicionar atleta destaque */}
            <form onSubmit={handleAddAthlete} className="grid gap-3">
              <input
                type="text"
                placeholder="Nome da atleta"
                value={newAthlete.name}
                onChange={(e) =>
                  setNewAthlete((a) => ({ ...a, name: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Time"
                value={newAthlete.team}
                onChange={(e) =>
                  setNewAthlete((a) => ({ ...a, team: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Posição (ex: Atacante)"
                value={newAthlete.position}
                onChange={(e) =>
                  setNewAthlete((a) => ({ ...a, position: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Idade"
                value={newAthlete.idade}
                onChange={(e) => setNewAthlete((a) => ({ ...a, idade: e.target.value }))}
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Gols"
                value={newAthlete.gols}
                onChange={(e) => setNewAthlete((a) => ({ ...a, gols: e.target.value }))}
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="URL da imagem (opcional)"
                value={newAthlete.image}
                onChange={(e) => setNewAthlete((a) => ({ ...a, image: e.target.value }))}
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white md:col-span-2"
              />
              <button
                type="submit"
                className="bg-white text-[#561EBD] font-semibold rounded-md py-2 text-sm hover:bg-gray-100 transition-colors"
              >
                Adicionar atleta em destaque
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
