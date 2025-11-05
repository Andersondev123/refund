
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2 ");
const expensesQuantity = document.querySelector("aside header p span");

amount.oninput = ()=>{
    let value = amount.value.replace(/\D/g, "");
    value = Number(value) / 100;
    amount.value = formatCurrencyBRL(value);}

function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
    })
    return value;
}

form.onsubmit = (event)=>{
    event.preventDefault();
    const newExpensee = {
        id: new Date().getTime(),
        expense: expense.value,
        categoryId: category.value,
        categoryName: category.options[category.selectedIndex].text,
        amount: amount.value,
        createdAt: new Date()
    }
    expenseAdd(newExpensee);
    
}

function expenseAdd(newExpense){
    try{
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.categoryId}.svg`)
        expenseIcon.setAttribute("alt", newExpense.categoryName);

        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");
        
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.categoryName;

        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", `/img/remove.svg`);
        expenseIcon.setAttribute("alt", "Remover");

        expenseInfo.append(expenseName, expenseCategory);
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
        expenseList.append(expenseItem);
        formClear();
        updateTotals();
    }catch(error){
        alert("Erro ao atualizar lista");
        console.log(error);
    }
}

function updateTotals(){
    try{
        const items = expenseList.children;
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

        let total = 0;
        
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount");
            
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");
            
            value = parseFloat(value);
           
            if(isNaN(value)){
               return alert("Preencha apenas com números")
            }
            total = total + Number(value);
            }
            
            const symbolBRL = document.createElement("small");
            symbolBRL.textContent = "R$";
            
            total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");
            
            expensesTotal.innerHTML = ""
            expensesTotal.append(symbolBRL, total)
        
    }catch(error){
        alert("Erro ao atualizar")
        console.log(error)
    }
}

expenseList.addEventListener("click", function(event){
    
    if(event.target.classList.contains("remove-icon")){
        const item = event.target.closest(".expense");
        item.remove();
        updateTotals();
    }
})
function formClear(){
    expense.value = "";
    category.value = "";
    amount.value = "";
    expense.focus()
}
