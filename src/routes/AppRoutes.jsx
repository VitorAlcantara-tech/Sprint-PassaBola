import Home from "../pages/Home";
import Jogos from "../pages/Jogos";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Campeonatos from "../pages/Campeonatos";
import Atletas from "../pages/Atletas";
import Layout from "../componentes/Layout";
import InscricaoTime from "../pages/inscricao/InscricaoTime";
import InscricaoIndividual from "../pages/inscricao/IncricaoIndividual";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    element: <Layout />,
    children: [
      { path: "/jogos", element: <Jogos /> },
      { path: "/campeonatos", element: <Campeonatos /> },
      { path: "/atletas", element: <Atletas /> },
      { path:"/dashboard", element: <Dashboard />}
    ],
  },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/individual", element: <InscricaoIndividual/>},
  { path: "/time", element: <InscricaoTime/>}
]);
