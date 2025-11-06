import InfoUsers from "./InfoUsers";

const Player = ({ index, onChange, onRemove }) => {
  if (!onChange) return null;

  return (
    <div className="flex flex-col border border-[#000000] rounded-lg p-8 gap-10 my-5 relative">
      <InfoUsers
        campo={`Nome da Jogadora ${index + 1}`}
        type="input"
        change={(e) => onChange("name", e.target.value)}
      />
      <InfoUsers
        campo="Documento (RG/CPF)"
        type="input"
        change={(e) => onChange("doc", e.target.value)}
      />
      <InfoUsers
        campo="Data de Nascimento"
        type="input"
        change={(e) => onChange("birth", e.target.value)}
      />
      <InfoUsers
        campo="Posição"
        type="input"
        change={(e) => onChange("position", e.target.value)}
      />
      <InfoUsers
        campo="Telefone"
        type="input"
        change={(e) => onChange("phone", e.target.value)}
      />

      <button
        onClick={() => onRemove(index)}
        className="self-end bg-[#C80606] text-white rounded-lg px-4 py-2 hover:opacity-90 transition"
      >
        Remover
      </button>
    </div>
  );
};

export default Player;
