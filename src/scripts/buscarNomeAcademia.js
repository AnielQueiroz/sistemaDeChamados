const inputIdAcademia = document.getElementById("id-academia");

export function buscarNomeAcademia() {
  const idAcademia = document.getElementById("id-academia").value;

  // Fazer uma requisição AJAX para buscar o nome da academia
  fetch(`/academias/${idAcademia}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.nome) {
        document.getElementById("academia").value = data.nome;
      } else {
        document.getElementById("academia").value = "Academia não encontrada";
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar o nome da academia:", error);
    });
}

inputIdAcademia.addEventListener("change", buscarNomeAcademia);