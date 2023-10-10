import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./componente/telas/Home"
import Categoria from "./componente/telas/categoria/Categoria";
import MenuPrivado from "./componente/telas/MenuPrivado";
import Login from "./componente/telas/login/Login";
import MenuPublico from "./componente/telas/MenuPublico";
import Produtos from "./componente/telas/produto/Produtos";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "categorias",
        element: <Categoria />
      }
      ,
      {
        path: "produtos",
        element: <Produtos />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  }
])
function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
