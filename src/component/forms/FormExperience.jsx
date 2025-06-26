import { useTranslation } from "react-i18next";

export default function Form({
  title,
  date,
  location,
  explanation,
  titleChange,
  dateChange,
  locationChange,
  explanationChange,
}) {
  const { t, i18n } = useTranslation();

  return (
    <form className="infosContainer">
      <div className="flex flex-col">
        <label htmlFor="">{t("panel.experience.experienceTitre")}</label>
        <input
          className="inputPanel w-[400px]  h-[75%]"
          value={title}
          onChange={titleChange}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <label htmlFor="">{t("panel.experience.experienceDate")}</label>
          <input className="inputPanel" value={date} onChange={dateChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">{t("panel.experience.experienceLieu")}</label>
          <input
            className="inputPanel"
            value={location}
            onChange={locationChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="">{t("panel.experience.experienceExplanation")}</label>
        <input
          className="inputPanel w-[500px]  h-[75%]"
          value={explanation}
          onChange={explanationChange}
        />
      </div>
    </form>
  );
}
