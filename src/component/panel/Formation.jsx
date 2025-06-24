import { useEffect, useState } from "react";
import { BsArrowBarDown } from "react-icons/bs";

export default function formation() {
  const [formations, setFormations] = useState([]);
  const [active, setActive] = useState(false);

  const fetchFormations = async () => {
    setActive(!active);
    try {
      const response = await fetch(
        import.meta.env.VITE_URL_FRONT + "/api/formation",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFormations(data);
    } catch (error) {
      console.error("Error fetching formations:", error);
    }
  };

  return (
    <div
      className={
        !active
          ? "bg-[#E6CCFF]/50 p-5 cvContainer"
          : "bg-[#E6CCFF]/50 p-5 cvContainerOpen"
      }
    >
      <h1 className="cvH1">Formations</h1>
      <button
        className={!active ? "cvButton" : "cvButtonOpen"}
        onClick={fetchFormations}
      >
        <BsArrowBarDown size={25} color="#2E2E2E" />
      </button>
      {formations.map((formation) => (
        <div key={formation._id} className="formation-card">
          <h3>{formation.title}</h3>
          <p>{formation.date}</p>
        </div>
      ))}
    </div>
  );
}
