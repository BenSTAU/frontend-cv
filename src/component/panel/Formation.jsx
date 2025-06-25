import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import Form from "../forms/FormFormation";

// Icons
import { IoAdd } from "react-icons/io5";
import { BsArrowBarDown } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";

// CRUD
import get from "../../utils/crud/Get";
import create from "../../utils/crud/Create";
import deleteCrud from "../../utils/crud/Delete";
import update from "../../utils/crud/Update";

export default function formation() {
  const [formations, setFormations] = useState([]);
  const [active, setActive] = useState(false);
  const [adding, setAdding] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [option, setOption] = useState("");

  const { t } = useTranslation();

  // CRUD
  useEffect(() => {
    get("formation", setFormations);
  }, []);

  // create
  const body = {
    title,
    date,
    location,
    option,
  };
  const handleNewFormation = () => {
    create("formation", body, setFormations, t("panel.toastCrud.create"));
    setTitle("");
    setDate("");
    setLocation("");
    setOption("");
    setAdding(false);
  };

  // delete
  const handleDelete = (id) => {
    deleteCrud("formation", id, setFormations, t("panel.toastCrud.delete"));
  };

  // update
  const handleUpdate = (id, formation) => {
    const bodyUpdate = {
      title: formation.title,
      date: formation.date,
      location: formation.location,
      option: formation.option,
    };
    update(
      "formation",
      id,
      bodyUpdate,
      setFormations,
      t("panel.toastCrud.update")
    );
  };

  const handleChange = (idx, field, value) => {
    const updated = [...formations];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormations(updated);
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
        <h1 className="cvH1">{t("panel.formation.titre")}</h1>
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
      {formations.map((formation, idx) => (
        <div className="flex justify-between" key={formation._id}>
          <Form
            title={formation.title}
            date={formation.date}
            location={formation.location}
            option={formation.option}
            titleChange={(e) => handleChange(idx, "title", e.target.value)}
            dateChange={(e) => handleChange(idx, "date", e.target.value)}
            locationChange={(e) =>
              handleChange(idx, "location", e.target.value)
            }
            optionChange={(e) => handleChange(idx, "option", e.target.value)}
            idx={idx}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
          <div className="flex flex-col gap-2">
            <button
              className="cursor-pointer"
              onClick={() => {
                handleUpdate(formation._id, formation);
              }}
            >
              <CiCircleCheck size={25} />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => handleDelete(formation._id)}
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
              title={title}
              date={date}
              location={location}
              option={option}
              titleChange={(e) => setTitle(e.target.value)}
              dateChange={(e) => setDate(e.target.value)}
              locationChange={(e) => setLocation(e.target.value)}
              optionChange={(e) => setOption(e.target.value)}
            />
          </div>
          <button className="cursor-pointer" onClick={handleNewFormation}>
            <CiCircleCheck size={25} />
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
