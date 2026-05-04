const siteData = window.siteData;
const locales = siteData.locales;
const localeButtons = {
  en: document.getElementById("lang-en"),
  ru: document.getElementById("lang-ru"),
};

const setText = (id, value) => {
  const node = document.getElementById(id);
  if (node) {
    node.textContent = value;
  }
};

const setHtmlList = (id, items, renderer) => {
  const node = document.getElementById(id);
  if (!node) {
    return;
  }

  node.innerHTML = items.map(renderer).join("");
};

const portraitFrame = document.getElementById("portrait-frame");
const portraitImage = document.getElementById("portrait-image");
if (siteData.hero.photo) {
  portraitImage.src = siteData.hero.photo;
  portraitFrame.classList.add("has-photo");
}

const primaryCta = document.getElementById("primary-cta");
const secondaryCta = document.getElementById("secondary-cta");
setText("footer-year", String(new Date().getFullYear()));

const setMeta = ({ title, description, ogTitle, ogDescription }) => {
  document.title = title;
  document.getElementById("page-description").setAttribute("content", description);
  document.getElementById("og-title").setAttribute("content", ogTitle);
  document.getElementById("og-description").setAttribute("content", ogDescription);
};

const setActiveLocaleButton = (locale) => {
  Object.entries(localeButtons).forEach(([key, button]) => {
    button.classList.toggle("is-active", key === locale);
    button.setAttribute("aria-pressed", String(key === locale));
  });
};

const renderLocale = (locale) => {
  const content = locales[locale] || locales[siteData.defaultLocale];

  document.documentElement.lang = locale;
  setMeta(content.meta);

  setText("nav-story", content.nav.story);
  setText("nav-focus", content.nav.focus);
  setText("nav-contact", content.nav.contact);

  setText("eyebrow", content.hero.eyebrow);
  setText("headline", content.hero.headline);
  setText("summary", content.hero.summary);
  setText("visual-kicker", content.visual.kicker);
  setText("visual-name", content.visual.name);
  setText("visual-caption", content.visual.caption);

  if (siteData.hero.photo) {
    portraitImage.alt =
      locale === "ru"
        ? `Портрет ${content.hero.headline}`
        : `${content.hero.headline} portrait`;
  }

  primaryCta.textContent = content.hero.primaryCta.label;
  primaryCta.href = content.hero.primaryCta.href;

  secondaryCta.textContent = content.hero.secondaryCta.label;
  secondaryCta.href = content.hero.secondaryCta.href;

  setText("story-label", content.story.label);
  setText("story-title", content.story.title);
  setHtmlList(
    "story-body",
    content.story.paragraphs,
    (text) => `<p>${text}</p>`
  );
  setHtmlList(
    "metrics",
    content.story.metrics,
    ({ title, text }) =>
      `<article class="metric"><strong>${title}</strong><span>${text}</span></article>`
  );

  setText("focus-label", content.focus.label);
  setText("focus-title", content.focus.title);
  setText("focus-intro", content.focus.intro);
  setHtmlList(
    "focus-grid",
    content.focus.items,
    ({ title, text }) =>
      `<article class="focus-item"><h3>${title}</h3><p>${text}</p></article>`
  );

  setText("notes-label", content.notes.label);
  setText("notes-title", content.notes.title);
  setHtmlList(
    "notes-body",
    content.notes.paragraphs,
    (text) => `<p>${text}</p>`
  );

  setText("contact-label", content.contact.label);
  setText("contact-title", content.contact.title);
  setText("contact-copy", content.contact.copy);
  setHtmlList(
    "contact-links",
    content.contact.links,
    ({ label, href }) =>
      `<a class="contact-link" href="${href}" target="_blank" rel="noreferrer">${label}</a>`
  );

  setText("footer-line", content.footer.line);
  setActiveLocaleButton(locale);
  window.localStorage.setItem("site-locale", locale);
};

const getInitialLocale = () => {
  const savedLocale = window.localStorage.getItem("site-locale");
  if (savedLocale && locales[savedLocale]) {
    return savedLocale;
  }

  const browserLocale = (navigator.language || "").toLowerCase();
  if (browserLocale.startsWith("ru")) {
    return "ru";
  }

  return siteData.defaultLocale;
};

Object.entries(localeButtons).forEach(([locale, button]) => {
  button.addEventListener("click", () => {
    renderLocale(locale);
  });
});

renderLocale(getInitialLocale());

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".reveal").forEach((section) => {
  observer.observe(section);
});
