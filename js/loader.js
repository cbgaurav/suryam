/* ══════════════════════════════════
   SURYAM GROUP — loader.js
   Fetches page partial HTML and injects
   each into its #page-{id} container.
══════════════════════════════════ */

const pages = ['home', 'about', 'team', 'projects', 'btw', 'sage'];

async function loadPages() {
  await Promise.all(pages.map(async (id) => {
    try {
      const res  = await fetch(`pages/${id}.html`);
      const html = await res.text();
      document.getElementById(`page-${id}`).innerHTML = html;
    } catch (e) {
      console.warn(`Could not load pages/${id}.html`, e);
    }
  }));

  // Re-initialise reveals after all content is injected
  initReveal();
}

loadPages();
