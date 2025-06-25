import { toast } from "react-toastify";
import get from "./Get";

export default async function deleteCrud(
  endPoint,
  id,
  setCategories,
  deleteSuccess
) {
  try {
    const response = await fetch(
      import.meta.env.VITE_URL_FRONT + "/api/" + endPoint + `/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      get(endPoint, setCategories);
      toast.success(deleteSuccess, {
        position: "top-right",
        autoClose: 500, // 0.5 seconde
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        closeOnClick: true,
      });
    }
  } catch (error) {
    console.error("Error deleting formation:", error);
  }
}
