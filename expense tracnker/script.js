const expenseForm = document.getElementById('expense-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');

let expenses = [];

function addExpense(event) {
    event.preventDefault();

    const text = textInput.value.trim();
    const amount = +amountInput.value.trim();

    if (text === '' || amount === '' || isNaN(amount)) {
        alert('Please fill in valid expense name and amount.');
        return;
    }

    const expense = {
        id: generateID(),
        text,
        amount
    };

    expenses.push(expense);

    updateDOM();
    updateLocalStorage();

    textInput.value = '';
    amountInput.value = '';
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);

    updateDOM();
    updateLocalStorage();
}

function updateDOM() {
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const expenseItem = document.createElement('li');
        expenseItem.innerHTML = `
            ${expense.text} <span>$${expense.amount}</span>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">X</button>
        `;
        expenseList.appendChild(expenseItem);
    });
}

function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function init() {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
        expenses = storedExpenses;
        updateDOM();
    }
}

expenseForm.addEventListener('submit', addExpense);

init();
