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
      const token = data.token;
      console.log(token)

      if (!token) {
        console.log("Acesso negado!");
        // return response.status(401).json({ msg: "Acesso negado!" });
      }

      try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);
      } catch (error) {
        res.status(400).json({ msg: "Token inválido!" });
      }

      // localStorage.setItem("token", data.token);

      // window.location.href = "/chamados";
    } else {
      document.getElementById("error-container").textContent = data.msg;
    }
  } catch (error) {
    console.error(error);
  }
}

btnLogin.addEventListener("click", login);
