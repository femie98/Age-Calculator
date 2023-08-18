document.addEventListener("DOMContentLoaded", () => {
    const inputDay = document.querySelector('.input-days');
    const inputMonth = document.querySelector('.input-months');
    const inputYear = document.querySelector('.input-years');

    document.querySelector('p.input-text-error').innerHTML = "";
  
    const button = document.querySelector('.input-btn');
  
    inputDay.addEventListener('input', function () {
        console.log(inputDay.nextElementSibling.innerHTML);
      if (inputDay.nextElementSibling.innerHTML == "Invalid Day") {
        inputDay.parentElement.classList.remove("error");
        inputMonth.parentElement.classList.remove("error");
        inputYear.parentElement.classList.remove("error");
      }
      if (inputDay.value > 31) {
        inputDay.nextElementSibling.innerHTML = "Must be a valid day"
        inputDay.parentElement.classList.add("error");
      } else {
        inputDay.parentElement.classList.remove("error");
      }
    });
  
    inputMonth.addEventListener('input', function () {
      if (inputDay.nextElementSibling.innerHTML == "Must be a valid date") {
        inputDay.parentElement.classList.remove("error");
        inputMonth.parentElement.classList.remove("error");
        inputYear.parentElement.classList.remove("error");
      }
      if (inputMonth.value > 12) {
        inputMonth.nextElementSibling.innerHTML = "Must be a valid month"
        inputMonth.parentElement.classList.add("error");
      } else {
        inputMonth.parentElement.classList.remove("error");
      }
    });
  
    inputYear.addEventListener('input', function () {
      if (inputDay.nextElementSibling.innerHTML == "Must be a valid date") {
        inputDay.parentElement.classList.remove("error");
        inputMonth.parentElement.classList.remove("error");
        inputYear.parentElement.classList.remove("error");
      }
      let currentDate = new Date();
      if (inputYear.value > currentDate.getFullYear()) {
        inputYear.nextElementSibling.innerHTML = "Must be in the past"
        inputYear.parentElement.classList.add("error");
      } else {
        inputYear.parentElement.classList.remove("error");
      }
    });
  
    inputYear.addEventListener('change', function () {
      let currentDate = new Date();
      if (inputYear.value < 0) {
        inputYear.value = -inputYear.value;
        inputYear.value = currentDate.getFullYear() - inputYear.value;
      }
    });
  
    button.addEventListener('click', function () {
      let day = inputDay.value;
      let month = inputMonth.value;
      let year = inputYear.value;
  
      if (!day) {
        inputDay.parentElement.classList.add("error");
        inputDay.nextElementSibling.innerHTML = "This field is required"
      }
      if (!month) {
        inputMonth.parentElement.classList.add("error");
        inputMonth.nextElementSibling.innerHTML = "This field is required"
      }
      if (!year) {
        inputYear.parentElement.classList.add("error");
        inputYear.nextElementSibling.innerHTML = "This field is required"
      }
      if (!day || !month || !year) {
        return;
      }
  
      let date = new Date(year, month - 1, day);
      let currentDate = new Date();
  
      if (!(date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day) ||
          (document.getElementsByClassName('error').length) ||
          date > currentDate || year < 0) {
        inputDay.parentElement.classList.add("error");
        inputDay.nextElementSibling.innerHTML = "Must be a valid date"
        inputMonth.parentElement.classList.add("error");
        inputMonth.nextElementSibling.innerHTML = ""
        inputYear.parentElement.classList.add("error");
        inputYear.nextElementSibling.innerHTML = "";
        return;
      }
  
      let ageYears = currentDate.getFullYear() - date.getFullYear();
      let ageMonths = 0;
      let ageDays = 0;
  
      if (currentDate < new Date(currentDate.getFullYear(), month - 1, day)) {
        ageYears = ageYears - 1;
        ageMonths = currentDate.getMonth() + 1;
        ageDays = currentDate.getDate();
      } else {
        if (currentDate.getMonth() + 1 === month) {
          ageMonths = 0;
          ageDays = currentDate.getDate() - day;
        } else {
          ageMonths = currentDate.getMonth() + 1 - month;
          if (currentDate.getDate() < day) {
            ageMonths = ageMonths - 1;
            ageDays = currentDate.getDate() + new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() - day;
          } else {
            ageDays = currentDate.getDate() - day;
          }
        }
      }
  
      const outputYears = document.querySelector('.output-years').querySelector('span');
      const outputMonths = document.querySelector('.output-months').querySelector('span');
      const outputDays = document.querySelector('.output-days').querySelector('span');
  
      outputYears.textContent = ageYears;
      outputMonths.textContent = ageMonths;
      outputDays.textContent = ageDays;
    });
  
    function animateNumberOutput(element, number) {
      let step = 50;
      if (number > 25) step = 35;
      if (number > 50) step = 25;
      if (number > 75) step = 20;
      if (number > 100) step = 10;
      if (number > 200) step = 1;
  
      let n = 0;
  
      if (number === 0) {
        element.textContent = n;
      } else {
        let interval = setInterval(() => {
          n = n + 1;
          if (n === number) {
            clearInterval(interval);
          }
          element.textContent = n;
        }, step);
      }
    }
  });
  