// Composant de connexion avec gestion des états et des requêtes API
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function login() {
  // États pour gérer le formulaire et les messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fonction pour gérer la connexion via l'API
  async function loginUser(username, password) {
    const response = await fetch("http://localhost:4444/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      navigate("/Panel");
    } else {
      setMessage(data.message);
    }
  }

  // Gestionnaire de soumission du formulaire
  async function handleSubmit(e) {
    e.preventDefault();
    await loginUser(username, password);
  }

  // Gestionnaire pour le mode visiteur
  async function handleVisitor(e) {
    e.preventDefault();
    await loginUser("Visitor", "kdfsku");
  }

  // Interface utilisateur du formulaire de connexion
  return (
    <section className="flex justify-center items-center h-screen w-screen bg-[#fff0f5]">
      <article className="w-[500px] h-[650px] bg-[#a3b8ff1f] rounded-md border-[1px] border-[#2E2E2E30] shadow flex flex-col justify-center items-center text-5xl gap-15 pb-[50px]">
        <h1>Login</h1>
        <form
          className="flex flex-col justify-around items-center gap-15"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center gap-5">
            <input
              className="inputLogin"
              type="name"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="inputLogin "
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center gap-5">
            <button className="buttonLogin" type="submit">
              Connexion
            </button>
            <button className="visitorLogin" onClick={handleVisitor}>
              Cliquez pour visiter
            </button>
          </div>
        </form>

        <p className="text-[18px]  min-h-[24px]">{message}</p>
      </article>
    </section>
  );
}
