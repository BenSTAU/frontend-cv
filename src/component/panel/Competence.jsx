import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import Form from "../forms/FormCompetence";

// Icons
import { IoAdd } from "react-icons/io5";
import { BsArrowBarDown } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";

// CRUD
import get from "../../utils/crud/Get.js";
import create from "../../utils/crud/Create.js";
import deleteCrud from "../../utils/crud/Delete.js";
import update from "../../utils/crud/Update.js";

export default function Competence() {
  const [competences, setCompetences] = useState([]);
  const [active, setActive] = useState(false);
  const [adding, setAdding] = useState(false);

  const [name, setName] = useState("");
  const [master, setMaster] = useState("beginner");

  const { t } = useTranslation();

  // CRUD
  useEffect(() => {
    get("competence", setCompetences);
  }, []);

  // create
  const body = {
    name,
    master,
  };
  const handleNewcompetence = () => {
    create("competence", body, setCompetences, t("panel.toastCrud.create"));
    setName("");
    setMaster("");
    setAdding(false);
  };

  // delete
  const handleDelete = (id) => {
    deleteCrud("competence", id, setCompetences, t("panel.toastCrud.delete"));
  };

  // update
  const handleUpdate = (id, competence) => {
    const bodyUpdate = {
      name: competence.name,
      master: competence.master,
    };
    update(
      "competence",
      id,
      bodyUpdate,
      setCompetences,
      t("panel.toastCrud.update")
    );
  };

  const handleChange = (idx, field, value) => {
    const updated = [...competences];
    updated[idx] = { ...updated[idx], [field]: value };
    setCompetences(updated);
  };

  return (
    <div
      className={
        !active
          ? "bg-[#E6CCFF]/50 p-5 cvContainer"
          : "bg-[#E6CCFF]/50 p-5 cvContainerOpen"
      }
    >
      <div className="flex justify-between">
        <h1 className="cvH1">{t("panel.competence.titre")}</h1>
        <button
          className="cursor-pointer self-start"
          onClick={() => setAdding(!adding)}
        >
          <IoAdd size={25} />
        </button>
      </div>
      <button
        onClick={() => {
          setActive(!active);
        }}
        className={!active ? "cvButton" : "cvButtonOpen"}
      >
        <BsArrowBarDown size={25} color="#2E2E2E" />
      </button>
      {competences.map((competence, idx) => (
        <div className="flex justify-between" key={competence._id}>
          <Form
            name={competence.name}
            master={competence.master}
            nameChange={(e) => handleChange(idx, "name", e.target.value)}
            masterChange={(e) => handleChange(idx, "master", e.target.value)}
            idx={idx}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
          <div className="flex flex-col gap-2">
            <button
              className="cursor-pointer"
              onClick={() => {
                handleUpdate(competence._id, competence);
              }}
            >
              <CiCircleCheck size={25} />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => handleDelete(competence._id)}
            >
              <AiFillDelete size={25} />
            </button>
          </div>
        </div>
      ))}
      {adding && (
        <div className="flex justify-between gap-5 mt-5">
          <div className="flex justify-between">
            <Form
              name={name}
              master={master}
              nameChange={(e) => setName(e.target.value)}
              masterChange={(e) => setMaster(e.target.value)}
            />
          </div>
          <button className="cursor-pointer" onClick={handleNewcompetence}>
            <CiCircleCheck size={25} />
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
