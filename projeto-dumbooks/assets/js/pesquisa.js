document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPesquisa");
  const campo = document.getElementById("campoPesquisa");
  const sugestoesBox = document.getElementById("sugestoesPesquisa");

  const produtos = [
    { nome: "Harry Potter" },
    { nome: "Percy Jackson" },
    { nome: "Turma da Mônica Jovem" },
    { nome: "Jogos Vorazes" },
    { nome: "Maze Runner" },
    { nome: " Verity" }
  ];

  console.log(produtos)

  function similaridade(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    let iguais = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] === b[i]) iguais++;
    }
    return iguais / b.length;
  }

  campo.addEventListener("input", () => {
    const termo = campo.value.trim().toLowerCase();
    sugestoesBox.innerHTML = "";

    if (termo.length < 1) {
      sugestoesBox.style.display = "none";
      return;
    }

    const listaSugestoes = produtos
      .filter(p => p.nome.toLowerCase().includes(termo) || similaridade(p.nome, termo) >= 0.4)
      .slice(0, 6);

    if (listaSugestoes.length === 0) {
      sugestoesBox.style.display = "none";
      return;
    }

    listaSugestoes.forEach(p => {
      const item = document.createElement("div");
      item.classList.add("sugestao-item");
      item.textContent = p.nome;
      item.addEventListener("click", () => {
        campo.value = p.nome;
        sugestoesBox.style.display = "none";
        form.dispatchEvent(new Event("submit"));
      });
      sugestoesBox.appendChild(item);
    });

    sugestoesBox.style.display = "block";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const termo = campo.value.trim();
    if (termo === "") return;
    localStorage.setItem("pesquisa", termo);
    window.location.href = "home.html?scroll=catalogoSecao";
  });

  document.addEventListener("click", (e) => {
    if (!form.contains(e.target)) {
      sugestoesBox.style.display = "none";
    }
  });
});
