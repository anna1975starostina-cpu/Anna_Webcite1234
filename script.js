const siteData = window.siteData;
const locales = siteData.locales;
const localeButtons = {
  en: document.getElementById("lang-en"),
  ru: document.getElementById("lang-ru"),
};

const contactEmail = "anna1975starostina@gmail.com";
let currentLocale = siteData.defaultLocale;

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

const renderLinkAttrs = (href) => {
  if (href.startsWith("http")) {
    return ' target="_blank" rel="noreferrer"';
  }

  return "";
};

const portraitFrame = document.getElementById("portrait-frame");
const portraitImage = document.getElementById("portrait-image");
if (siteData.hero.photo) {
  portraitImage.src = siteData.hero.photo;
  portraitFrame.classList.add("has-photo");
}

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

const clearFormFeedback = () => {
  setText("form-feedback", "");
};

const renderLocale = (locale) => {
  const content = locales[locale] || locales[siteData.defaultLocale];
  currentLocale = locale;

  document.documentElement.lang = locale;
  setMeta(content.meta);

  setText("nav-expertise", content.nav.expertise);
  setText("nav-career", content.nav.career);
  setText("nav-contact", content.nav.contact);

  setText("hero-location", content.hero.location);
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

  const primaryCta = document.getElementById("primary-cta");
  primaryCta.textContent = content.hero.primaryCta.label;
  primaryCta.href = content.hero.primaryCta.href;
  primaryCta.target = content.hero.primaryCta.href.startsWith("http") ? "_blank" : "";
  primaryCta.rel = content.hero.primaryCta.href.startsWith("http") ? "noreferrer" : "";

  const secondaryCta = document.getElementById("secondary-cta");
  secondaryCta.textContent = content.hero.secondaryCta.label;
  secondaryCta.href = content.hero.secondaryCta.href;

  setHtmlList(
    "snapshot-grid",
    content.hero.snapshot,
    ({ value, label }) =>
      `<div class="snapshot-item"><dt>${value}</dt><dd>${label}</dd></div>`
  );

  setText("profile-label", content.profile.label);
  setText("profile-title", content.profile.title);
  setText("profile-intro", content.profile.intro);

  setText("expertise-label", content.expertise.label);
  setText("expertise-title", content.expertise.title);
  setHtmlList(
    "expertise-grid",
    content.expertise.items,
    ({ number, title, text }) =>
      `<article class="expertise-card"><div class="expertise-number">${number}</div><h3>${title}</h3><p>${text}</p></article>`
  );

  setText("quote-label", content.quote.label);
  setText("quote-text", content.quote.text);

  setText("career-label", content.career.label);
  setText("career-title", content.career.title);
  setHtmlList(
    "career-list",
    content.career.items,
    ({ period, role, company }) =>
      `<li class="timeline-item"><time>${period}</time><div><h3>${role}</h3><p>${company}</p></div></li>`
  );

  setText("education-label", content.education.label);
  setText("education-title", content.education.title);
  setText("education-copy", content.education.copy);

  setText("contact-label", content.contact.label);
  setText("contact-title", content.contact.title);
  setHtmlList(
    "contact-links",
    content.contact.links,
    ({ label, href }) =>
      `<a class="contact-link" href="${href}"${renderLinkAttrs(href)}>${label}</a>`
  );

  setText("form-name-label", content.contact.form.nameLabel);
  setText("form-email-label", content.contact.form.emailLabel);
  setText("form-subject-label", content.contact.form.subjectLabel);
  setText("form-message-label", content.contact.form.messageLabel);
  setText("form-submit", content.contact.form.submitLabel);
  setText("form-note", content.contact.form.note);

  document.getElementById("form-name").placeholder = content.contact.form.placeholders.name;
  document.getElementById("form-email").placeholder = content.contact.form.placeholders.email;
  document.getElementById("form-subject").placeholder = content.contact.form.placeholders.subject;
  document.getElementById("form-message").placeholder = content.contact.form.placeholders.message;

  setText("footer-line", content.footer.line);
  setText("footer-credit", content.footer.credit);
  setActiveLocaleButton(locale);
  window.localStorage.setItem("site-locale", locale);
  clearFormFeedback();
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

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const buildMailtoLink = ({ name, email, subject, message }) => {
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  const query = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${contactEmail}?${query.toString()}`;
};

document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const content = locales[currentLocale] || locales[siteData.defaultLocale];
  const formContent = content.contact.form;
  const name = document.getElementById("form-name").value.trim();
  const email = document.getElementById("form-email").value.trim();
  const subject = document.getElementById("form-subject").value.trim();
  const message = document.getElementById("form-message").value.trim();

  if (!name || !email || !subject || !message) {
    setText("form-feedback", formContent.validation.missing);
    return;
  }

  if (!isValidEmail(email)) {
    setText("form-feedback", formContent.validation.invalidEmail);
    return;
  }

  window.location.href = buildMailtoLink({ name, email, subject, message });
  setText("form-feedback", formContent.validation.ready);
});

Object.entries(localeButtons).forEach(([locale, button]) => {
  button.addEventListener("click", () => renderLocale(locale));
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
    threshold: 0.18,
  }
);

document.querySelectorAll(".reveal").forEach((section) => {
  observer.observe(section);
});
