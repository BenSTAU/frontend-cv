export default async function logout() {
  await fetch("http://localhost:4444/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
