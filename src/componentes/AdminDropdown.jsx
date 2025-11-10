import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export function AdminDropdown({ name, onLogout }) {
  const navigate = useNavigate()

  const handleDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="text-white bg-gray-500/80 hover:bg-gray-600/80 border-0 border-gray-40 rounded-md text-sm px-3 py-2 transition-colors"
        >
          Olá, {name}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-40 bg-[#561EBD] text-white shadow-lg"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {name === "Adm" ? (
          <>
            <DropdownMenuItem onClick={handleDashboard}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              Sair
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={onLogout}>
            Sair
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
