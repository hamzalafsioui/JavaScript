  // Get the current date
let currentDate = new Date();
function calculateAge() {
  // Get the user's input
  let day = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;

  // check if the input is valid
  if(checkInput(day, month, year)){
    // convert input to numbers
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    // calculate the exact age
    let birthDate = new Date(year, month - 1, day);
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

     // Adjust if the current day is less than the birth day
    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // Days in the previous month
    }

    // Adjust if the current month is less than the birth month
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    // Display the results
    document.querySelector(".js-day").textContent = ageDays.toString().padStart(2, "0");
    document.querySelector(".js-month").textContent = ageMonths.toString().padStart(2, "0");
    document.querySelector(".js-year").textContent = ageYears.toString().padStart(2, "0");
  }

}

function checkInput(day, month, year) {
  // convert the inputs to numbers
  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);

  // check for empty inputs
  if(!day || !month || !year) {
    alert("Please fill all fields");
    return false;
  }

  // validate the month
  if(month < 1 || month > 12) {
    alert("Invalid month. please enter a value between 1 and 12");
    return false;
  }

  // validate the year
  if(year < 0 || year > currentDate.getFullYear()) {
    alert("Invalid year. please enter a valid year between 0 and " + currentDate.getFullYear());
    return false;
  }

  // validate the day based on the month & year
  const dayInMonth = new Date(year,month,0).getDate();
  if(day < 1 || day > dayInMonth) {
    alert(`Invalid day. For ${month}/${year}, please enter a value between 1 and ${dayInMonth}`);
    return false;
  }

  // Invalid date
  return true;

}