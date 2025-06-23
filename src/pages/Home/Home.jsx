// Page d'accueil principale avec présentation et animation de fond
import Bubbles from "../../component/Bubbles.jsx";
import Presentation from "../../component/Presentation.jsx";

import "./home.css";

function App() {
  // Rendu de la page d'accueil avec composants de présentation et d'animation
  return (
    <>
      <Presentation />
      <Bubbles />
    </>
  );
}

export default App;
