window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

function setupIntialValues() {
  document.getElementById("loan-amount").value = 25000;
  document.getElementById("loan-years").value = 2;
  document.getElementById("loan-rate").value = 8;
  update();
}

function update() {
  let values = getCurrentUIValues();
  let monthlyPayment = calculateMonthlyPayment(values);
  updateMonthly(monthlyPayment);
}

function calculateMonthlyPayment(values) {
  let amount = values.amount;
  let years = values.years;
  let rate = values.rate / 100 / 12;
  let n = years * 12;

  if (rate === 0) {
    return (amount / n).toFixed(2);
  } else {
    let monthlyPayment = (amount * rate) / (1 - Math.pow(1 + rate, - n));
    return monthlyPayment.toFixed(2);
  }
}


function updateMonthly(monthly) {
  let element = document.getElementById("monthly-payment");
  element.textContent = monthly;
}
