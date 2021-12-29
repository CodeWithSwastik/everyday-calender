function renderCalender(date) {
  const calenderBody = document.getElementById("body");
  calenderBody.innerHTML = "";
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const yearElement = document.getElementById("year");
  yearElement.innerText = year;
  const monthElement = document.getElementById("month");
  monthElement.innerText = month;

  for (let i = 1; i <= daysInMonth(date.getMonth() + 1, year); i++) {
    const button = document.createElement("button");
    button.classList.add("button");
    const node = document.createTextNode(`${i}`);
    button.appendChild(node);
    calenderBody.appendChild(button);
    button.addEventListener("click", () => {
      new Audio("success.mp3").play();
      button.classList.add("pressed");
      button.disabled = true;
      setDateData(i, month, year, true);
    });
    if (getDateData(i, month, year)) {
      button.classList.add("pressed");
      button.disabled = true;
    }
  }
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
function getDateData(date, month, year) {
  let obj = JSON.parse(localStorage.getItem("data"));
  if (!obj[year]) {
    obj[year] = {};
  }
  if (!obj[year][month]) {
    obj[year][month] = {};
  }

  if (!obj[year][month][date]) {
    obj[year][month][date] = false;
  }
  localStorage.setItem("data", JSON.stringify(obj));
  return obj[year][month][date];
}

function setDateData(date, month, year, value) {
  let obj = JSON.parse(localStorage.getItem("data"));
  obj[year][month][date] = value;
  localStorage.setItem("data", JSON.stringify(obj));
}

if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify({}));
}

let curDate = new Date();
renderCalender(curDate);
const back = document.getElementById("back");
back.addEventListener("click", () => {
  curDate = moment(curDate).add(-1, "month").toDate();
  renderCalender(curDate);
});

const forward = document.getElementById("forward");
forward.addEventListener("click", () => {
  curDate = moment(curDate).add(1, "month").toDate();
  renderCalender(curDate);
});