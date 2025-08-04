/* global WebImporter */
export default function parse(element, { document }) {
  // Header Row
  const cells = [['Cards (cards6)']];

  // Get all slides (one per card)
  const slides = element.querySelectorAll('.slick-track > .slick-slide');

  slides.forEach((slide) => {
    // Most slides: <div><a.card_info>...</a></div>
    const cardLink = slide.querySelector('a.card_info');
    if (cardLink) {
      // First cell: icon or image (use the existing <div><i></i></div> from .card_info)
      let iconElem = cardLink.querySelector('div');
      // If for some reason missing, fallback to an <i> child
      if (!iconElem) {
        iconElem = cardLink.querySelector('i');
      }
      // Second cell: text content (date and description)
      const cellText = document.createDocumentFragment();
      // Date as heading (h3)
      const dateSpan = cardLink.querySelector('span');
      if (dateSpan) {
        // Use h3, but create it new (not clone) to avoid referencing <span>
        const heading = document.createElement('h3');
        heading.textContent = dateSpan.textContent;
        cellText.appendChild(heading);
      }
      // Description as paragraph
      const descP = cardLink.querySelector('p');
      if (descP) {
        cellText.appendChild(descP);
      }
      // Wrap the fragment in a link (to PDF) if present
      let contentCell;
      if (cardLink.href) {
        // Reference the existing cardLink, but only with its content
        const link = document.createElement('a');
        link.href = cardLink.href;
        link.target = cardLink.target || '_blank';
        link.appendChild(cellText);
        contentCell = link;
      } else {
        contentCell = cellText;
      }
      cells.push([
        iconElem,
        contentCell
      ]);
    }
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
