export function preencherDataAtual() {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const dataFormatada = `${ano}-${mes}-${dia}`;

  // Preencher os campos no formulário
  document.getElementById("data").value = dataFormatada;
}

export function preencherHoraAtual() {
  // Obter hora no formato HH:MM:SS
  const data = new Date();
  const hora = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  const segundos = String(data.getSeconds()).padStart(2, "0");
  const horaFormatada = `${hora}:${minutos}:${segundos}`;
  
  return horaFormatada;
  // document.getElementById("hora").value = horaFormatada;
}
