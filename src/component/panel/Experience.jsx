import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import Form from "../forms/FormExperience";

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

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [active, setActive] = useState(false);
  const [adding, setAdding] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [explanation, setExplanation] = useState("");

  const { t } = useTranslation();

  // CRUD
  useEffect(() => {
    get("experience", setExperiences);
  }, []);

  // create
  const body = {
    title,
    date,
    location,
    explanation,
  };
  const handleNewexperience = () => {
    create("experience", body, setExperiences, t("panel.toastCrud.create"));
    setTitle("");
    setDate("");
    setLocation("");
    setExplanation("");
    setAdding(false);
  };

  // delete
  const handleDelete = (id) => {
    deleteCrud("experience", id, setExperiences, t("panel.toastCrud.delete"));
  };

  // update
  const handleUpdate = (id, experience) => {
    const bodyUpdate = {
      title: experience.title,
      date: experience.date,
      location: experience.location,
      explanation: experience.explanation,
    };
    update(
      "experience",
      id,
      bodyUpdate,
      setExperiences,
      t("panel.toastCrud.update")
    );
  };

  const handleChange = (idx, field, value) => {
    const updated = [...experiences];
    updated[idx] = { ...updated[idx], [field]: value };
    setExperiences(updated);
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
        <h1 className="cvH1">{t("panel.experience.titre")}</h1>
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
      {experiences.map((experience, idx) => (
        <div className="flex justify-between" key={experience._id}>
          <Form
            title={experience.title}
            date={experience.date}
            location={experience.location}
            explanation={experience.explanation}
            titleChange={(e) => handleChange(idx, "title", e.target.value)}
            dateChange={(e) => handleChange(idx, "date", e.target.value)}
            locationChange={(e) =>
              handleChange(idx, "location", e.target.value)
            }
            explanationChange={(e) =>
              handleChange(idx, "explanation", e.target.value)
            }
            idx={idx}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
          <div className="flex flex-col gap-2">
            <button
              className="cursor-pointer"
              onClick={() => {
                handleUpdate(experience._id, experience);
              }}
            >
              <CiCircleCheck size={25} />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => handleDelete(experience._id)}
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
              explanation={explanation}
              titleChange={(e) => setTitle(e.target.value)}
              dateChange={(e) => setDate(e.target.value)}
              locationChange={(e) => setLocation(e.target.value)}
              explanationChange={(e) => setExplanation(e.target.value)}
            />
          </div>
          <button className="cursor-pointer" onClick={handleNewexperience}>
            <CiCircleCheck size={25} />
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
