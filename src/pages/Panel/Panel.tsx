// Composant du panneau d'administration avec vérification des rôles
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../../utils/logout";
import checkAuth from "../../utils/checkAuth";
import "./panel.css"
import Formation from "../../component/panel/Formation.tsx"
import Experience from "../../component/panel/Experience.tsx";
import Loisir from "../../component/panel/Loisir.tsx";
import Competences from "../../component/panel/Competences.tsx";
import Benevolat from "../../component/panel/Benevolat.tsx";

export default function Panel() {
    const navigate = useNavigate();
    // État pour stocker le rôle et nom de l'utilisateur
    const [role, setRole] = useState('');
    const [name, setName] = useState('')

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
    async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await logout();
        navigate("/login");
    }



    // Interface du panneau avec bouton de déconnexion
    return (
        <div
            className="flex justify-center h-screen">
            <section>
                <article
                    className="flex justify-center items-center h-[10vh]">
                    <nav
                        className="nav">
                        <h1>Bienvenue {name} {role}</h1>
                        <button
                            className="buttonLogout"
                            onClick={handleLogout}
                        // disabled={role !== "admin"} // Désactive pour le visiteur
                        >
                            Logout
                        </button>
                    </nav>
                </article>
                <h2>CV</h2>
                <article
                    className="flex flex-col gap-15 justify-center items-center pt-20">
                    <Formation />
                    <Experience />
                    <Competences />
                    <Loisir />
                    <Benevolat />
                </article>
            </section>
        </div>
    );
}
