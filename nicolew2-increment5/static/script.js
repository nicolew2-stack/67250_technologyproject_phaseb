/* ============================================================
   script.js — MonoMuse Museum
   ============================================================ */

/* ── Copyright Year ───────────────────────────────────────── */
function addYear() {
  var yearEl = document.getElementById("copyYear");
  if (yearEl) {
    yearEl.textContent = "© " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
  }
}

/* ── Time-based Greeting ──────────────────────────────────── */
function greetingFunc() {
  var greetingEl = document.getElementById("greeting");
  if (!greetingEl) return;
  var hour = new Date().getHours();
  var message;
  if (hour < 12)      message = "Good morning! Welcome to MonoMuse.";
  else if (hour < 18) message = "Good afternoon! Welcome to MonoMuse.";
  else                message = "Good evening! Welcome to MonoMuse.";
  greetingEl.textContent = message;
}

/* ── Hamburger Toggle ─────────────────────────────────────── */
function toggleNav() {
  var nav = document.getElementById("mainNav");
  if (nav) nav.classList.toggle("responsive");
}

/* ── Show Purchase Form (Buy Tickets page) ────────────────── */
function showPurchaseForm(date) {
  var formSection = document.getElementById("purchaseFormSection");
  var dateInput   = document.getElementById("selectedDate");
  if (!formSection || !dateInput) return;

  dateInput.value = date;
  formSection.classList.add("visible");   /* triggers CSS animation */
  formSection.scrollIntoView({ behavior: "smooth" });
}

/* ── Submit Purchase (Buy Tickets page) ───────────────────── */
function submitPurchase() {
  var name    = document.getElementById("buyerName");
  var email   = document.getElementById("buyerEmail");
  var count   = document.getElementById("ticketCount");
  var date    = document.getElementById("selectedDate");
  if (!name || !email || !count || !date) return;

  if (!name.value.trim() || !email.value.trim() || !count.value) {
    alert("Please fill in all required fields.");
    return;
  }

  alert(
    "Purchase confirmed!\n" +
    "Name: "    + name.value.trim()  + "\n" +
    "Email: "   + email.value.trim() + "\n" +
    "Tickets: " + count.value        + "\n" +
    "Date: "    + date.value
  );

  /* Reset */
  document.getElementById("buyNowForm").reset();
  document.getElementById("purchaseFormSection").classList.remove("visible");
}

/* ────────────────────────────────────────────────────────────
   DOMContentLoaded — runs after HTML is ready
   ──────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {

  /* ── Highlight active nav link ──────────────────────────── */
  var navLinks = document.querySelectorAll(".nav_bar a");
  navLinks.forEach(function (link) {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  /* ── Read More / Less (index / explore page) ────────────── */
  var readMoreBtn = document.getElementById("readMore");
  var readLessBtn = document.getElementById("readLess");
  var longIntro   = document.getElementById("longIntro");

  if (readMoreBtn && readLessBtn && longIntro) {
    readMoreBtn.addEventListener("click", function () {
      longIntro.style.display   = "block";
      readMoreBtn.style.display = "none";
      readLessBtn.style.display = "inline-block";
    });
    readLessBtn.addEventListener("click", function () {
      longIntro.style.display   = "none";
      readMoreBtn.style.display = "inline-block";
      readLessBtn.style.display = "none";
    });
  }

  /* ── Checkout form — live total + validation ────────────── */
  var checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    var qtyInput    = document.getElementById("quantity");
    var typeInput   = document.getElementById("ticketType");
    var totalCostEl = document.getElementById("totalCost");
    var prices      = { general: 18, student: 10, member: 15 };

    function updateTotal() {
      var type = typeInput ? typeInput.value : "";
      var qty  = parseInt(qtyInput ? qtyInput.value : "0") || 0;
      var price = prices[type] || 0;
      if (totalCostEl) {
        totalCostEl.textContent = "Total: $" + (price * qty);
      }
    }

    if (qtyInput)  qtyInput.addEventListener("input",  updateTotal);
    if (typeInput) typeInput.addEventListener("change", updateTotal);

    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var errorEl   = document.getElementById("formError");
      var confirmEl = document.getElementById("confirmationMessage");
      if (errorEl)   errorEl.textContent   = "";
      if (confirmEl) confirmEl.textContent = "";

      var visitDate = document.getElementById("visitDate");
      var email     = document.getElementById("email");
      var qty       = document.getElementById("quantity");
      var type      = document.getElementById("ticketType");

      if (!visitDate.value || !email.value || !qty.value || !type.value) {
        if (errorEl) errorEl.textContent = "Please fill in all required fields.";
        return;
      }

      var price = prices[type.value] || 0;
      var total = price * parseInt(qty.value);
      if (confirmEl) {
        confirmEl.textContent =
          "Order placed! " + qty.value + " × " + type.value +
          " ticket(s) on " + visitDate.value +
          " — Total: $" + total + ". Confirmation sent to " + email.value;
      }
      checkoutForm.reset();
      if (totalCostEl) totalCostEl.textContent = "Total: $0";
    });
  }

  /* ── Leaflet Map ────────────────────────────────────────── */
  var mapEl = document.getElementById("map");
  if (mapEl && typeof L !== "undefined") {
    var lat  = 40.4432;
    var lng  = -79.9428;
    var zoom = 15;

    var map = L.map("map").setView([lat, lng], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup("<strong>MonoMuse Museum</strong><br>Pittsburgh, PA")
      .openPopup();
  }

});