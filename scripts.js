// Seleciona os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2 ");
const expensesQuantity = document.querySelector("aside header p span");

// Captura o evento de input para formatar o valor.
amount.oninput = () => {
  // Obtém o valor atual do input e remove os caracteres não numéricos.
  let value = amount.value.replace(/\D/g, "");

  // Transforma o valor em centavos (exemplo: 150/100 = 1.50).
  value = Number(value) / 100;

  // Atualiza o valor do input.
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Formata o valor como moeda brasileira.
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Retorna o valor formatado.
  return value;
}

// Captura o evento de submit do formulário para obter os dados do formulário.
form.onsubmit = (event) => {
  // Previne o comportamento padrão do formulário.
  event.preventDefault();

  // Cria um novo objeto de despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expenses.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
  };

  // chama a  função para adicionar o item na lista.
  expenseAdd(newExpense);
};

// Adiciona um novo item na lista.
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o ícone da categoria.
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria a info da despesa.
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o título da despesa.
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa.
    const expenseCategory = document.createElement("small");
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona nome e categoria na div das innformações da despesa.
    expenseInfo.append(expenseName, expenseCategory);

    // Cria o valor da despesa.
    const expenseAmount = document.createElement("small");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // Cria o icone de remover.
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "Remover");

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adiciona o item na lista.
    expenseList.append(expenseItem);

    // Limpa o formulário.
    formClear();

    // Atualiza os totais.
    updateTotals();
  } catch (error) {
    alert("Não foi possível adicionar a despesa!");
    console.log(error);
  }
}

// Atualiza os totais das despesas.
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul).
    const items = expenseList.children;

    // Atualiza a quantidade de itens da lista.
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    // Variável para incrementar o total.
    let total = 0;

    // Percorre cada item (li) da lista (ul).
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      // Remove caracteres não numéricos e substitui a vírgula por ponto.
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // Converte o valor para float.
      value = parseFloat(value);

      // Verifica se o valor é um número válido.
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total!. O valor não parece ser um número."
        );
      }

      // Incrementa o valor total.
      total += Number(value);
    }

    // Cria a span para adicionar o R$ formatado.
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    // Formata o valor e remove o R$ que será exibo pela small com um estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    // Limpa o conteúdo do elemento.
    expensesTotal.innerHTML = "";

    // Adiciona o simbolo e o valor formatado.
    expensesTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais!");
  }
}

// Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", (event) => {
  // Verifica se o elemento clicado é o icone de remover.
  if (event.target.classList.contains("remove-icon")) {
    // Obtém a li pai do elemento clicado.
    const item = event.target.closest(".expense");

    // Remove o item da lista.
    item.remove();
  }

  // Atualiza os totais.
  updateTotals();
});

function formClear() {
  // Limpa os formulários.
  expense.value = "";
  category.value = "";
  amount.value = "";

  // Coloca o foco no input de amount.
  expense.focus();
}
