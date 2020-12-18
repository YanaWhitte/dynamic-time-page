// DOM Elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting");

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12hr Format
  hour = hour % 12 || 12;
  let timeHtml = `${hour}:${addZero(min)}:${addZero(sec)}`;
  timeHtml = timeHtml
    .split("")
    .map((x) =>
      x === ":"
        ? `<span class="time-colon">${x}</span>`
        : `<span class="time-digit">${x}</span>`
    )
    .reduce((a, b) => a + b);

  // Output Time
  time.innerHTML = `${timeHtml} ${showAmPm ? amPm : ""}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    // Night
    document.body.style.backgroundImage = "url('img/night.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    greeting.textContent = "Good Night";
    document.body.style.color = "white";
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('img/morning.jpg')";
    document.body.style.backgroundSize = "cover";
    greeting.textContent = "Good Morning";
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('img/afternoon.jpg')";
    document.body.style.backgroundSize = "cover";
    greeting.textContent = "Good Afternoon";
  } else if (hour <= 23) {
    // Evening
    document.body.style.backgroundImage = "url('img/evening.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    greeting.textContent = "Good Evening";
    document.body.style.color = "white";
  }
}

// Run
showTime();
setBgGreet();

function addEditingFeatureToElement(inputElement, placeholder, storageKey) {
  inputElement.contentEditable = true;

  // Load cached data from local storage
  const loadedFromCache = localStorage.getItem(storageKey);
  if (typeof loadedFromCache === "string") {
    if (loadedFromCache !== undefined) {
      setInputValue(loadedFromCache);
    } else if (loadedFromCache == "") {
      setInputValue(placeholder);
    }
  }

  // Accessors
  function getInputValue() {
    return inputElement.innerText;
  }

  function setInputValue(value) {
    inputElement.innerText = value;
  }

  inputElement.addEventListener("keypress", (e) => {
    if (e.which == 13 || e.keyCode == 13) {
      e.preventDefault();
      inputElement.blur();
    }
  });

  inputElement.addEventListener("keyup", (e) => {
    localStorage.setItem(storageKey, getInputValue());
  });

  inputElement.addEventListener("focus", (e) => {
    if (getInputValue() === placeholder) {
      setInputValue("");
    }
    inputElement.focus();
  });

  inputElement.addEventListener("blur", (e) => {
    if (getInputValue() === "") {
      setInputValue(placeholder);
    }
    localStorage.setItem(storageKey, getInputValue());
  });
}

addEditingFeatureToElement(
  document.getElementById("name_input"),
  "[Enter Name]",
  "key"
);

addEditingFeatureToElement(
  document.getElementById("focus_input"),
  "[Enter Focus]",
  "focus"
);

document.getElementById("dummy-elements").innerHTML = `
<p style="opacity:0">____________________</p>
<p style="opacity:0">____________________</p>`;
