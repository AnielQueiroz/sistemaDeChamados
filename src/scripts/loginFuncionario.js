const btnLogin = document.getElementById("btn-login");

export async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Envia a requisição de login
    const response = await fetch("/funcionarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", data.token);

      // document.getElementById("username") = textContent = " ";

      window.location.href = "/chamados";
    } else {
      document.getElementById("error-container").textContent = data.msg;
    }
  } catch (error) {
    console.error(error);
  }
}

btnLogin.addEventListener("click", login);
