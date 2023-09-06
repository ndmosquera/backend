const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  console.log(obj);

  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
      //   'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
  });
  // {accessToken: '12321312qew     qww q'}
  const responseData = await response.json();
  console.log(responseData);
  if (responseData.error) {
    return alert("No se ha podido iniciar sesion");
  }
  localStorage.setItem("accessToken", responseData.accessToken);
});