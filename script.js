document.addEventListener("DOMContentLoaded", () => {
    const inputDay = document.querySelector('.input-days');
    const inputMonth = document.querySelector('.input-months');
  const inputYear = document.querySelector('.input-years');

  const outputDay = document.querySelector('.output-days').querySelector('span');
  const outputMonth = document.querySelector('.output-months').querySelector('span');
  const outputYear = document.querySelector('.output-years').querySelector('span');

  OutputNumber(outputYear, parseInt(localStorage.getItem("outputYears")));
  OutputNumber(outputMonth, parseInt(localStorage.getItem("outputMonths")));
  OutputNumber(outputDay, parseInt(localStorage.getItem("outputDays")));
  
  const button = document.querySelector('.calculate_user_input');


  inputDay.addEventListener('input', function () {
    if (inputDay.nextElementSibling.innerHTML == "Must be a valid date") {
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
  let Data = new Date();
  if (inputYear.value > Data.getFullYear()) {
    inputYear.nextElementSibling.innerHTML = "Must be in the past"
    inputYear.parentElement.classList.add("error");
  } else {
    inputYear.parentElement.classList.remove("error");
  }
});
inputYear.addEventListener('change', function () {
  let Data = new Date();
  if (inputYear.value < 0) {
    inputYear.value = -inputYear.value;
    inputYear.value = Data.getFullYear() - inputYear.value;
  }
});

button.addEventListener('click', function () {

  day = inputDay.value;
  month = inputMonth.value;
  year = inputYear.value;

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
  let currentData = new Date();
  if (!(date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day) || (document.getElementsByClassName('error').length) || date > currentData || year < 0) {
    inputDay.parentElement.classList.add("error");
    inputDay.nextElementSibling.innerHTML = "Must be a valid date"
    inputMonth.parentElement.classList.add("error");
    inputMonth.nextElementSibling.innerHTML = ""
    inputYear.parentElement.classList.add("error");
    inputYear.nextElementSibling.innerHTML = "";
    return;
  }

  let age_year = currentData.getFullYear() - date.getFullYear();
  let age_month = 0;
  let age_day = 0;
  if (currentData < new Date(currentData.getFullYear(), month - 1, day)) {
    age_year = age_year - 1;
    age_month = currentData.getMonth() + 1;
    age_day = currentData.getDate();
  } else {
    if (currentData.getMonth() + 1 === month) {
      age_month = 0;
      age_day = currentData.getDate() - day;
      console.log(age_day);
    } else {
      age_month = currentData.getMonth() + 1 - month;
      if (currentData.getDate() < day) {
        age_month = age_month - 1;
        age_day = currentData.getDate() + new Date(currentData.getFullYear(), currentData.getMonth(), 0).getDate() - day;
      } else {
        age_day = currentData.getDate() - day;
      }
    }

  }

  //set data into localStorage
  localStorage.setItem("outputDays", age_day);
  localStorage.setItem("outputMonths", age_month);
  localStorage.setItem("outputYears", age_year);

  const outputDay = document.querySelector('.output-days').querySelector('span');
  const outputMonth = document.querySelector('.output-months').querySelector('span');
  const outputYear = document.querySelector('.output-years').querySelector('span');

  OutputNumber(outputYear, parseInt(localStorage.getItem("outputYears")));
  OutputNumber(outputMonth, parseInt(localStorage.getItem("outputMonths")));
  OutputNumber(outputDay, parseInt(localStorage.getItem("outputDays")));

});

function OutputNumber(el, num) {
  let step = 50;
  if (num > 200) {
    step = 1;
  } else if (num > 100) {
    step = 10;
  } else if (num > 75) {
    step = 20;
  } else if (num > 50) {
    step = 25;
  } else if (num > 25) {
    step = 35;
  }

  let n = 0;
  if (num === 0) {
    el.innerHTML = n;
  } else {
    let inteval = setInterval(() => {
      n = n + 1;
      if (n === num) {
        clearInterval(inteval);
      }
      el.innerHTML = n;
    }, step);
  }

}

});

