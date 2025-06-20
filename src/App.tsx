import Home from "./pages/Home/Home.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login.tsx"
import Panel from "./pages/Panel/Panel.tsx"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/panel" element={<Panel />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
