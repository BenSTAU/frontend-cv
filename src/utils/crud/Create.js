import { toast } from "react-toastify";
import get from "./Get";

export default async function create(
  endPoint,
  body,
  setCategories,
  createSuccess
) {
  try {
    const response = await fetch(
      import.meta.env.VITE_URL_FRONT + "/api/" + endPoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );
    console.log("response", response, body);
    if (response.ok) {
      get(endPoint, setCategories);
      toast.success(createSuccess, {
        position: "top-right",
        autoClose: 500, // 0.5 seconde
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        closeOnClick: true,
      });
    }
  } catch (error) {
    console.error("Error creating formation:", error);
    toast.error("An error occurred while creating the formation.");
    return;
  }
}
