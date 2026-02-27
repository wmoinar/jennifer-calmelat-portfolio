(function () {
  "use strict";

  var FORMSPREE_URL = "https://formspree.io/f/maqdvvwv";
  var RATE_LIMIT_MS = 30000; // 30 seconds between submissions
  var lastSubmitTime = 0;

  function getLang() {
    return window.NAY && window.NAY.currentLang ? window.NAY.currentLang : "en";
  }

  function t(key) {
    var lang = getLang();
    if (window.translations && window.translations[lang] && window.translations[lang][key]) {
      return window.translations[lang][key];
    }
    return "";
  }

  function showMessage(type, text) {
    var success = document.getElementById("contact-success");
    var error = document.getElementById("contact-error");
    if (!success || !error) return;

    success.style.display = "none";
    error.style.display = "none";

    if (type === "success") {
      success.textContent = text;
      success.style.display = "block";
    } else {
      error.textContent = text;
      error.style.display = "block";
    }
  }

  function hideMessages() {
    var success = document.getElementById("contact-success");
    var error = document.getElementById("contact-error");
    if (success) success.style.display = "none";
    if (error) error.style.display = "none";
  }

  function setBtnLoading(btn) {
    var spinner = document.createElement("span");
    spinner.className = "contact-spinner";
    var label = document.createTextNode(" " + (t("contact_sending") || "Sending..."));
    btn.textContent = "";
    btn.appendChild(spinner);
    btn.appendChild(label);
    btn.disabled = true;
  }

  function resetBtn(btn, originalText) {
    btn.textContent = originalText;
    btn.disabled = false;
  }

  // Sanitize input: strip HTML tags and trim
  function sanitize(str) {
    return str.replace(/<[^>]*>/g, "").trim();
  }

  // Check for spam patterns (URLs, script tags, SQL keywords)
  function hasSpamPatterns(text) {
    var patterns = [
      /<script[\s>]/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\s+(FROM|INTO|TABLE|ALL)/i,
      /(https?:\/\/[^\s]+){3,}/i // 3+ URLs = likely spam
    ];
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i].test(text)) return true;
    }
    return false;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      hideMessages();

      // Honeypot check: if _gotcha is filled, silently reject (bot)
      var honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        showMessage("success", t("contact_success") || "Message sent! I'll get back to you soon.");
        form.reset();
        return;
      }

      // Rate limiting
      var now = Date.now();
      if (now - lastSubmitTime < RATE_LIMIT_MS) {
        var wait = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
        showMessage("error", "Please wait " + wait + " seconds before sending again.");
        return;
      }

      // Get and sanitize values
      var name = sanitize(form.querySelector("#name").value);
      var email = sanitize(form.querySelector("#email").value);
      var subject = sanitize(form.querySelector("#subject").value);
      var message = sanitize(form.querySelector("#message").value);

      // Validation
      if (name.length < 2 || email.length < 5 || message.length < 10) {
        showMessage("error", t("contact_error") || "Please fill in all fields correctly.");
        return;
      }

      // Spam check
      var allText = name + " " + subject + " " + message;
      if (hasSpamPatterns(allText)) {
        showMessage("error", t("contact_error") || "Something went wrong. Please try again.");
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn ? btn.textContent.trim() : "";

      if (btn) setBtnLoading(btn);

      try {
        // Build clean FormData with sanitized values
        var data = new FormData();
        data.append("Name", name);
        data.append("Email", email);
        data.append("Subject", subject);
        data.append("Message", message);

        var response = await fetch(FORMSPREE_URL, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          lastSubmitTime = Date.now();
          showMessage("success", t("contact_success") || "Message sent! I'll get back to you soon.");
          form.reset();
        } else {
          var resData = await response.json().catch(function () { return {}; });
          var errMsg =
            (resData.errors && resData.errors.map(function (x) { return x.message; }).join(", ")) ||
            t("contact_error") ||
            "Something went wrong. Please try again.";
          showMessage("error", errMsg);
        }
      } catch (err) {
        showMessage(
          "error",
          t("contact_error") || "Something went wrong. Please try again."
        );
      } finally {
        if (btn) resetBtn(btn, originalText);
      }
    });
  });
})();
