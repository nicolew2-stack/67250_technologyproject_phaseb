function greetingFunc() {
  var greeting = document.getElementById("greeting");

  if (!greeting) {
    return;
  }

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

function updateTotal() {
  var quantity = document.getElementById("quantity");
  var totalCost = document.getElementById("totalCost");

  if (!quantity || !totalCost) {
    return;
  }

  var total = quantity.value * 18;
  totalCost.innerHTML = "Total: $" + total;
}

function showPurchaseForm(date) {
  var formSection = document.getElementById("purchaseFormSection");
  var selectedDate = document.getElementById("selectedDate");

  if (formSection) {
    formSection.style.display = "block";
  }

  if (selectedDate) {
    selectedDate.value = date;
  }
}

function submitPurchase() {
  alert("Redirecting to payment system.");
}

function checkoutForm() {
  var form = document.getElementById("checkoutForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var visitDate = document.getElementById("visitDate").value;
    var ticketType = document.getElementById("ticketType").value;
    var quantity = document.getElementById("quantity").value;
    var email = document.getElementById("email").value;
    var zip = document.getElementById("zip").value;
    var errorMessage = document.getElementById("formError");
    var confirmationMessage = document.getElementById("confirmationMessage");

    errorMessage.innerHTML = "";
    confirmationMessage.innerHTML = "";

    if (visitDate === "" || ticketType === "" || quantity === "" || email === "") {
      errorMessage.innerHTML = "Please fill in all required fields.";
      return;
    }

    if (quantity < 1 || quantity > 10) {
      errorMessage.innerHTML = "Ticket quantity must be between 1 and 10.";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      errorMessage.innerHTML = "Please enter a valid email address.";
      return;
    }

    if (zip !== "" && (zip.length !== 5 || isNaN(zip))) {
      errorMessage.innerHTML = "Zip code must be 5 digits.";
      return;
    }

    var total = quantity * 18;
    confirmationMessage.innerHTML = "Order placed successfully! Total: $" + total;
  });
}

function ActiveNav() {
  var navLinks = document.querySelectorAll("nav a");
  var currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(function(link) {
    var linkPage = link.getAttribute("href").split("/").pop();

    if (currentPage === linkPage) {
      link.classList.add("active");
    }
  });
}

if (typeof jQuery !== "undefined") {
  $(document).ready(function () {
    $("#readLess").click(function () {
      $("#longIntro").hide();
      $("#readLess").hide();
      $("#readMore").show();
    });

    $("#readMore").click(function () {
      $("#longIntro").show();
      $("#readLess").show();
      $("#readMore").hide();
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  updateTotal();
  checkoutForm();
  ActiveNav();

  var quantity = document.getElementById("quantity");
  if (quantity) {
    quantity.addEventListener("input", updateTotal);
  }
});