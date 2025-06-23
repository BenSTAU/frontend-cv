import { useState } from "react";
import { BsArrowBarDown } from "react-icons/bs";




export default function formation() {
    const [formations, setFormations] = useState([]);
    const [active, setActive] = useState(false)

    const fetchFormations = async () => {
        setActive(!active)

    };


    return (
        <div
            className={!active ? " bg-[#B3E0FF]/50 p-5 cvContainer" : " bg-[#B3E0FF]/50 p-5 cvContainerOpen"}>
            <h1
                className="cvH1">
                Compétences</h1>
            <button
                className={!active ? "cvButton" : "cvButtonOpen"}
                onClick={fetchFormations}>
                <BsArrowBarDown size={25} color="#2E2E2E" />
            </button>
            {
                formations.map((formation) => (
                    <div key={formation._id} className="formation-card">
                        <h3>{formation.title}</h3>
                        <p>{formation.date}</p>
                    </div>
                ))
            }
        </div >
    )
}
