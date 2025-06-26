import { useTranslation } from "react-i18next";

export default function Form({ name, master, nameChange, masterChange }) {
  const { t } = useTranslation();

  return (
    <form className="infosContainer">
      <div className="flex flex-col">
        <label htmlFor="">{t("panel.experience.experienceTitre")}</label>
        <input
          className="inputPanel w-[400px]  h-[75%]"
          value={name}
          onChange={nameChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">{t("panel.competence.master")}</label>
        <select
          className="inputPanel w-[400px]  h-[75%]"
          value={master}
          onChange={masterChange}
        >
          <option value="beginner">{t("panel.competence.beginner")}</option>
          <option value="intermediate">
            {t("panel.competence.intermediate")}
          </option>
          <option value="advanced">{t("panel.competence.advanced")}</option>
        </select>
      </div>
    </form>
  );
}
