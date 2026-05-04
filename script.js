const siteData = window.siteData;

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

setText("eyebrow", siteData.hero.eyebrow);
setText("headline", siteData.hero.headline);
setText("summary", siteData.hero.summary);

const portraitFrame = document.getElementById("portrait-frame");
const portraitImage = document.getElementById("portrait-image");
if (siteData.hero.photo) {
  portraitImage.src = siteData.hero.photo;
  portraitImage.alt = `${siteData.hero.headline} portrait`;
  portraitFrame.classList.add("has-photo");
}

const primaryCta = document.getElementById("primary-cta");
primaryCta.textContent = siteData.hero.primaryCta.label;
primaryCta.href = siteData.hero.primaryCta.href;

const secondaryCta = document.getElementById("secondary-cta");
secondaryCta.textContent = siteData.hero.secondaryCta.label;
secondaryCta.href = siteData.hero.secondaryCta.href;

setText("story-title", siteData.story.title);
setHtmlList(
  "story-body",
  siteData.story.paragraphs,
  (text) => `<p>${text}</p>`
);

setHtmlList(
  "metrics",
  siteData.story.metrics,
  ({ title, text }) =>
    `<article class="metric"><strong>${title}</strong><span>${text}</span></article>`
);

setText("focus-title", siteData.focus.title);
setText("focus-intro", siteData.focus.intro);
setHtmlList(
  "focus-grid",
  siteData.focus.items,
  ({ title, text }) =>
    `<article class="focus-item"><h3>${title}</h3><p>${text}</p></article>`
);

setText("notes-title", siteData.notes.title);
setHtmlList(
  "notes-body",
  siteData.notes.paragraphs,
  (text) => `<p>${text}</p>`
);

setText("contact-title", siteData.contact.title);
setText("contact-copy", siteData.contact.copy);
setHtmlList(
  "contact-links",
  siteData.contact.links,
  ({ label, href }) =>
    `<a class="contact-link" href="${href}" target="_blank" rel="noreferrer">${label}</a>`
);

setText("footer-line", siteData.footer.line);
setText("footer-year", String(new Date().getFullYear()));

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
