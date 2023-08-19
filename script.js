// Function to save the result in local storage
function saveResultToLocalStorage(ageData) {
  const ageDataJSON = JSON.stringify(ageData);
  localStorage.setItem('ageData', ageDataJSON);
}

// Function to load the result from local storage
function loadResultFromLocalStorage() {
  const ageDataJSON = localStorage.getItem('ageData');
  if (ageDataJSON) {
    return JSON.parse(ageDataJSON);
  }
  return null; // Return null if no data is found in local storage
}

document.addEventListener("DOMContentLoaded", () => {
    const inputDay = document.querySelector('.input-days');
    const inputMonth = document.querySelector('.input-months');
  const inputYear = document.querySelector('.input-years');
  
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

  const outputDay = document.querySelector('.output-days').querySelector('span');
  const outputMonth = document.querySelector('.output-months').querySelector('span');
  const outputYear = document.querySelector('.output-years').querySelector('span');

  OutputNumber(outputYear, age_year);
  OutputNumber(outputMonth, age_month);
  OutputNumber(outputDay, age_day);

});

function OutputNumber(el, num) {
  let step = 50;
  num > 25 && (step = 35);
  num > 50 && (step = 25);
  num > 75 && (step = 20);
  num > 100 && (step = 10);
  num > 200 && (step = 1);

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

// Load saved result from local storage
const savedAgeData = loadResultFromLocalStorage();

// Check if there is a saved result, and display it if found
if (savedAgeData) {
  OutputNumber(outputYear, savedAgeData.year);
  OutputNumber(outputMonth, savedAgeData.month);
  OutputNumber(outputDay, savedAgeData.day);
}
