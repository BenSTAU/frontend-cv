export default async function logout() {
  await fetch(import.meta.env.VITE_URL_FRONT + "/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
