/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct slide divs
  const row = element.querySelector('.row');
  const slideDivs = row ? Array.from(row.children) : [];
  const rows = [];
  // Exact header row from example
  rows.push(['Carousel (carousel43)']);
  slideDivs.forEach((slide) => {
    // Find the a tag and inside it, the img
    const a = slide.querySelector('a');
    let img = null;
    if (a) {
      img = a.querySelector('img');
    }
    // Compose the text cell
    let textCell = '';
    if (a) {
      const bannerContent = a.querySelector('.banner_content');
      if (bannerContent) {
        const parts = [];
        // label as small heading (just text)
        const label = bannerContent.querySelector('label');
        if (label) {
          // Use a <div> for label, as in review
          const labelDiv = document.createElement('div');
          labelDiv.textContent = label.textContent;
          parts.push(labelDiv);
        }
        // h3 as heading (convert to h2)
        const h3 = bannerContent.querySelector('h3');
        if (h3) {
          const h2 = document.createElement('h2');
          h2.innerHTML = h3.innerHTML;
          parts.push(h2);
        }
        // p as paragraph
        const p = bannerContent.querySelector('p');
        if (p) {
          parts.push(p);
        }
        // CTA: look for .more_link span
        const cta = bannerContent.querySelector('.more_link');
        if (cta && a.href) {
          const link = document.createElement('a');
          link.href = a.href;
          link.textContent = cta.textContent;
          parts.push(link);
        }
        // Only set cell if there is anything
        if (parts.length > 0) {
          textCell = parts;
        }
      }
    }
    rows.push([
      img ? img : '',
      textCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
