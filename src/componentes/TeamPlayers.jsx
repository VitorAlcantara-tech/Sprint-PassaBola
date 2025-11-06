import { useState } from "react";
import Player from "./Player";

const TeamPlayers = ({ onPlayersChange }) => {
  const [players, setPlayers] = useState([{ id: 1 }]);

  // adiciona nova jogadora
  function handleNew() {
    setPlayers([...players, { id: Date.now() }]);
  }

  // atualiza dados da jogadora e envia para o pai
  function handlePlayerChange(index, field, value) {
    const updated = players.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setPlayers(updated);
    if (onPlayersChange) onPlayersChange(updated); // <- aqui validamos antes de chamar
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex justify-between items-center">
        <h3>Jogadoras</h3>
        <button
          onClick={handleNew}
          className="bg-purple-700 text-white rounded-xl px-4 py-2"
        >
          + Adicionar Jogadora
        </button>
      </div>

      {players.map((player, index) => (
        <Player
          key={player.id}
          index={index}
          onChange={(field, value) => handlePlayerChange(index, field, value)}
        />
      ))}
    </div>
  );
};

export default TeamPlayers;
