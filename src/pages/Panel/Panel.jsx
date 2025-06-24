// Composant du panneau d'administration avec vérification des rôles
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../../utils/logout";
import checkAuth from "../../utils/checkAuth";
import "./panel.css";
import Formation from "../../component/panel/Formation.jsx";
import Experience from "../../component/panel/Experience.jsx";
import Loisir from "../../component/panel/Loisir.jsx";
import Competence from "../../component/panel/Competence.jsx";
import Benevolat from "../../component/panel/Benevolat.jsx";
import Langue from "../../component/Langue.jsx";

import { useTranslation } from "react-i18next";

export default function Panel() {
  const navigate = useNavigate();
  // État pour stocker le rôle et nom de l'utilisateur
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const { t, i18n } = useTranslation();

  // Vérification de l'authentification au chargement
  useEffect(() => {
    async function fetchRole() {
      const result = await checkAuth(navigate);
      if (result) {
        setRole(result.role);
        setName(result.username);
      }
    }
    fetchRole();
  }, [navigate]);

  // Gestionnaire de déconnexion
  async function handleLogout(e) {
    e.preventDefault();
    await logout();
    navigate("/login");
  }

  // Interface du panneau avec bouton de déconnexion
  return (
    <>
      <Langue />
      <div className="flex justify-center h-screen p-6">
        <section>
          <article className="flex justify-center items-center h-[10vh]">
            <nav className="nav">
              <h1>
                {t("panel.bienvenue")} {name}
              </h1>
              <button
                className="buttonLogout"
                onClick={handleLogout}
                // disabled={role !== "admin"} // Désactive pour le visiteur
              >
                {t("panel.buttonLogout")}
              </button>
            </nav>
          </article>
          <h2>{t("panel.cv")}</h2>
          <article className="flex flex-col gap-15 justify-center items-center pt-10">
            <Competence />
            <Formation />
            <Experience />
            <Loisir />
            <Benevolat />
          </article>
        </section>
      </div>
    </>
  );
}
