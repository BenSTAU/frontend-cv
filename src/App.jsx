import Home from "./pages/Home/Home.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login.jsx"
import Panel from "./pages/Panel/Panel.jsx"


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
