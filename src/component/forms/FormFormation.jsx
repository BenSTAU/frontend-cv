import { useTranslation } from "react-i18next";

export default function Form({
  title,
  date,
  location,
  option,
  titleChange,
  dateChange,
  locationChange,
  optionChange,
}) {
  const { t, i18n } = useTranslation();

  return (
    <form className="infosContainer">
      <div className="flex flex-col">
        <label htmlFor="">{t("panel.formation.formationTitre")}</label>
        <input
          className="inputPanel w-[400px]  h-[75%]"
          value={title}
          onChange={titleChange}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <label htmlFor="">{t("panel.formation.formationDate")}</label>
          <input className="inputPanel" value={date} onChange={dateChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">{t("panel.formation.formationLieu")}</label>
          <input
            className="inputPanel"
            value={location}
            onChange={locationChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="">{t("panel.formation.formationOption")}</label>
        <input className="inputPanel" value={option} onChange={optionChange} />
      </div>
    </form>
  );
}
