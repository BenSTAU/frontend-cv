export default async function get(endPoint, set) {
  try {
    const response = await fetch(
      import.meta.env.VITE_URL_FRONT + "/api/" + endPoint,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    set(data);
  } catch (error) {
    console.error("Error fetching:", error);
  }
}
