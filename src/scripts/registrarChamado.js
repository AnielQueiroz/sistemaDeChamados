import { preencherHoraAtual } from "./dataAtual.js";

export function registrarChamado() {
  document
    .getElementById("btn-registrar-chamado")
    .addEventListener("click", async function () {
      const hora = preencherHoraAtual();
      // Obtenha os valores dos campos do formulário
      const analista = document.getElementById("analista").value;
      const data = document.getElementById("data").value;
      const idAcademia = document.getElementById("id-academia").value;
      const nomeAcademia = document.getElementById("academia").value;
      const canal = document.getElementById("canal").value;
      const teamviewer = document.getElementById("teamviewer").value;
      const problema = document.getElementById("problema").value;

      const funcionario = JSON.parse(localStorage.getItem("funcionario"));
      const idAnalista = funcionario._id;

      const academia = idAcademia + " " + nomeAcademia;

      // Fazer uma requisição AJAX para buscar o nome da academia
      if (idAcademia !== null) {
        fetch(`/academias/${idAcademia}`)
          .then((response) => response.json())
          .then(async (dado) => {
            if (dado && dado.nome) {
              // Faça uma requisição POST para a rota desejada
              try {
                const response = await fetch("/chamados/registrar-chamado", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    idAnalista,
                    analista,
                    data,
                    hora,
                    academia,
                    canal,
                    teamviewer,
                    problema,
                  }),
                });

                const dataResponse = await response.json();
                console.log(dataResponse);

                if (response.ok) {
                  // A requisição foi bem-sucedida
                  alert(
                    "Chamado registrado com sucesso!",
                    dataResponse.message
                  );

                  window.location.reload(true);
                  // Faça o redirecionamento ou execute outras ações necessárias
                } else {
                  // A requisição falhou
                  alert(
                    "Erro ao registrar o chamado. Por favor, tente novamente."
                  );
                }
              } catch (error) {
                console.error(error);
              }
            } else {
              alert("Academia não encontrada");
              return;
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar o nome da academia:", error);
          });
      } else {
        alert("Preencha o id da academia!");
        return;
      }

      // const hora = document.getElementById("hora").value;
    });
}
