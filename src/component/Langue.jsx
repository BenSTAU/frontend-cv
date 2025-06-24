import { useTranslation } from "react-i18next";

export default function langue() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      className="fixed p-2"
      onChange={changeLanguage}
      value={i18n.language}
    >
      <option value="en">En</option>
      <option value="fr">Fr</option>
    </select>
  );
}
