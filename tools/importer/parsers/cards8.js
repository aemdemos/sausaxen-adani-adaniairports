/* global WebImporter */
export default function parse(element, { document }) {
  // Assemble header row for the Cards block
  const rows = [
    ['Cards (cards8)']
  ];

  // Get all slides (cards) within the slider
  const slides = element.querySelectorAll('.slick-slide');
  slides.forEach((slide) => {
    const cardContainer = slide.querySelector('.single_card .cards a');
    if (!cardContainer) return;

    // Extract image (first <img> in <figure>)
    const figure = cardContainer.querySelector('figure');
    const img = figure ? figure.querySelector('img') : null;

    // Extract text content
    const content = cardContainer.querySelector('.card_content');
    if (!content) return;

    // Title (h5) as a <strong> for block styling
    const title = content.querySelector('h5');
    // Description (p.minHeight)
    const desc = content.querySelector('p.minHeight');
    // CTA (strong.more_link)
    const cta = content.querySelector('strong.more_link');
    
    // Only use references to EXISTING elements
    const textCellParts = [];
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      textCellParts.push(strong);
    }
    if (desc) {
      if (textCellParts.length) textCellParts.push(document.createElement('br'));
      textCellParts.push(desc);
    }
    if (cta && cardContainer.href) {
      if (textCellParts.length) textCellParts.push(document.createElement('br'));
      const a = document.createElement('a');
      a.href = cardContainer.href;
      a.textContent = cta.textContent;
      textCellParts.push(a);
    }

    rows.push([
      img || '',
      textCellParts.length === 1 ? textCellParts[0] : textCellParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
