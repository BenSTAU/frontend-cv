export default async function checkAuth(navigate) {
  const response = await fetch("http://localhost:4444/api/checkAuth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    navigate("/login");
    return null;
  }
  const data = await response.json();
  const role = data.role;
  const username = data.username;
  return { role, username };
}
