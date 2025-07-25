/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .banner_section that holds the hero image and heading
  const bannerSection = element.querySelector('.banner_section');
  let bgImageEl = null;
  let headingEl = null;

  if (bannerSection) {
    // The background image is set as a background-image style on .bg_banner
    const bgBanner = bannerSection.querySelector('.bg_banner');
    if (bgBanner) {
      const style = bgBanner.getAttribute('style') || '';
      const match = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
      if (match) {
        const url = match[1];
        bgImageEl = document.createElement('img');
        bgImageEl.src = url;
        bgImageEl.alt = '';
      }
      // Find the heading (usually .banner_text h1)
      const textContainer = bgBanner.querySelector('.banner_text');
      if (textContainer) {
        const h1 = textContainer.querySelector('h1');
        if (h1) headingEl = h1;
      }
    }
  }

  // Compose rows for the table
  const rows = [];
  rows.push(['Hero (hero46)']); // header row as per example
  rows.push([bgImageEl ? bgImageEl : '']);
  rows.push([headingEl ? headingEl : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
