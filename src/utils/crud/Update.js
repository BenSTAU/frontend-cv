import { toast } from "react-toastify";
import get from "./Get";

export default async function update(
  endPoint,
  id,
  body,
  setCategories,
  updateSuccess
) {
  try {
    const response = await fetch(
      import.meta.env.VITE_URL_FRONT + "/api/" + endPoint + `/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );
    if (response.ok) {
      get(endPoint, setCategories);
      toast.success(updateSuccess, {
        position: "top-right",
        autoClose: 500, // 0.5 seconde
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        closeOnClick: true,
      });
    }
  } catch (error) {
    console.error("Error updating formation:", error);
  }
}
