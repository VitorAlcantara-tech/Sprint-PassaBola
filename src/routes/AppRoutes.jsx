import Home from "../pages/Home";
import Jogos from "../pages/Jogos";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Campeonatos from "../pages/Campeonatos";
import Atletas from "../pages/Atletas";
import Layout from "../componentes/Layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    element: <Layout />,
    children: [
      { path: "/jogos", element: <Jogos /> },
      { path: "/campeonatos", element: <Campeonatos /> },
      { path: "/atletas", element: <Atletas /> },
    ],
  },
  { path: "/cadastro", element: <Cadastro /> },
]);
