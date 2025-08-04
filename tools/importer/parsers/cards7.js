/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block header
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Find all .slick-slide (cards)
  const slides = element.querySelectorAll('.slick-slide');
  slides.forEach((slide) => {
    // The card content wrapper
    const cardContent = slide.querySelector('.business_content');
    if (!cardContent) return;

    // First cell (image)
    let imgEl = null;
    const figure = cardContent.querySelector('figure');
    if (figure) {
      imgEl = figure.querySelector('img');
    }

    // Second cell (text content)
    const aside = cardContent.querySelector('aside');
    const textContent = [];
    if (aside) {
      // Heading as <strong> (to mimic bold from <h2> in table cell)
      const h2 = aside.querySelector('h2');
      if (h2) {
        const strong = document.createElement('strong');
        strong.textContent = h2.textContent;
        textContent.push(strong);
        textContent.push(document.createElement('br'));
      }
      // Description <p>
      const p = aside.querySelector('p');
      if (p) {
        textContent.push(p);
      }
      // CTA (if present)
      const a = aside.querySelector('a');
      if (a) {
        textContent.push(document.createElement('br'));
        textContent.push(a);
      }
    }
    // Compose the row: [image, text cell]
    rows.push([
      imgEl || '',
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
