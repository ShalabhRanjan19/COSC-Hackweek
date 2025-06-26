const form = document.getElementById('expense-form');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');

let categories = [];
let amounts = [];

const ctx = document.getElementById('expenseChart').getContext('2d');
let expenseChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: categories,
    datasets: [{
      label: 'Expenses',
      data: amounts,
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#BA68C8'
      ]
    }]
  },
  options: {
    responsive: true
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const category = categoryInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (category && !isNaN(amount)) {
    categories.push(category);
    amounts.push(amount);
    expenseChart.update();
    categoryInput.value = '';
    amountInput.value = '';
  }
});
