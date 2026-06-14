const GA_ID = import.meta.env.VITE_GA_ID;

export const initGA = () => {
  if (!GA_ID) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);

  console.log("✅ GA4 initialized:", GA_ID);
};

export const trackPageView = (path) => {
  if (typeof window.gtag === "undefined") return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });

  console.log("📄 GA4 page_view tracked:", path);
};

// ← NEW FUNCTION ADDED
export const trackCTAClick = (buttonName, location) => {
  if (typeof window.gtag === "undefined") return;

  window.gtag("event", "cta_click", {
    event_category: "engagement",
    event_label: buttonName,
    button_location: location,
    value: 1,
  });

  console.log("🖱️ GA4 cta_click:", buttonName, "at", location);
};
