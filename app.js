/**
 * Pension Alpenblick — Digitale Gästemappe (Demo)
 * Self-contained: copy, toast, sticky chips, email capture, QR
 */

(function () {
  "use strict";

  // —— Timestamp: „Aktualisiert heute“ ——
  const updatedEl = document.getElementById("updated-today");
  if (updatedEl) {
    const now = new Date();
    const opts = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const dateStr = now.toLocaleDateString("de-CH", opts);
    updatedEl.textContent = "Aktualisiert heute · " + dateStr;
  }

  // —— Toast ——
  let toastTimer;
  function showToast(msg) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  // —— WiFi one-tap copy ——
  const copyBtn = document.getElementById("copy-wifi");
  if (copyBtn) {
    copyBtn.addEventListener("click", async function () {
      const ssid = (document.getElementById("wifi-ssid") || {}).textContent || "Alpenblick_Guest";
      const pass = (document.getElementById("wifi-pass") || {}).textContent || "Bergluft2026";
      const text = "WLAN: " + ssid.trim() + "\nPasswort: " + pass.trim();

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        showToast("Kopiert");
        copyBtn.setAttribute("aria-label", "Kopiert");
      } catch (e) {
        showToast("Kopieren nicht möglich — bitte manuell notieren");
      }
    });
  }

  // —— Sticky chips: active state on scroll ——
  const chips = document.querySelectorAll(".chip");
  const sections = [];
  chips.forEach(function (chip) {
    const href = chip.getAttribute("href");
    if (href && href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) sections.push({ chip: chip, el: el });
    }
  });

  function updateActiveChip() {
    const y = window.scrollY + 90;
    let current = sections[0];
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= y) current = sections[i];
    }
    chips.forEach(function (c) {
      c.classList.remove("active");
    });
    if (current) current.chip.classList.add("active");
  }

  if (sections.length) {
    window.addEventListener("scroll", updateActiveChip, { passive: true });
    updateActiveChip();
  }

  // —— Email capture (demo: thank-you only) ——
  const form = document.getElementById("email-form");
  const thankYou = document.getElementById("thank-you");
  const gdpr = document.getElementById("gdpr-check");
  const submitBtn = document.getElementById("email-submit");

  if (form && gdpr && submitBtn) {
    function syncSubmit() {
      submitBtn.disabled = !gdpr.checked;
    }
    gdpr.addEventListener("change", syncSubmit);
    syncSubmit();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!gdpr.checked) return;
      const email = (document.getElementById("guest-email") || {}).value || "";
      if (!email.trim()) return;
      form.classList.add("hidden");
      if (thankYou) thankYou.classList.remove("hidden");
    });
  }

  // —— QR codes (CDN qrcodejs) ——
  // Points to relative demo URL. In production, replace DEMO_URL with your live guest-guide URL.
  const DEMO_URL = (function () {
    try {
      const u = new URL("index.html", window.location.href);
      return u.href;
    } catch (e) {
      return "https://example.com/gaesteguide/"; // placeholder for file://
    }
  })();

  function renderQR(containerId, size) {
    const el = document.getElementById(containerId);
    if (!el) return;
    // Prefer QRCode library if loaded
    if (typeof QRCode !== "undefined") {
      el.innerHTML = "";
      new QRCode(el, {
        text: DEMO_URL,
        width: size,
        height: size,
        colorDark: "#1e2a24",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M,
      });
      return;
    }
    // Fallback: public QR API (works offline-CDN fail / no lib)
    const img = document.createElement("img");
    img.alt = "QR-Code zur digitalen Gästemappe";
    img.width = size;
    img.height = size;
    img.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=" +
      size +
      "x" +
      size +
      "&data=" +
      encodeURIComponent(DEMO_URL) +
      "&color=1e2a24";
    el.appendChild(img);
  }

  renderQR("qr-banner", 64);
  renderQR("qr-large", 260);

  // Expose for debugging / README demos
  window.HausinfoDemo = { DEMO_URL: DEMO_URL, showToast: showToast };
})();
