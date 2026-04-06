function greetingFunc() {
  var greeting = document.getElementById("greeting");

  if (!greeting) return;

  var hour = new Date().getHours();

  if (hour < 12) {
    greeting.innerHTML = "Good morning, welcome to MonoMuse!";
  } else if (hour < 18) {
    greeting.innerHTML = "Good afternoon, welcome to MonoMuse!";
  } else {
    greeting.innerHTML = "Good evening, welcome to MonoMuse!";
  }
}

function addYear() {
  var year = new Date().getFullYear();
  var copy = document.getElementById("copyYear");

  if (copy) {
    copy.innerHTML = "&copy; " + year + " MonoMuse. All rights reserved.";
  }
}