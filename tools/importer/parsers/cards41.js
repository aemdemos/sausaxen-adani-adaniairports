/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards41)'];
  const cells = [headerRow];

  // Find all card columns
  const cardCols = element.querySelectorAll(':scope > div.row > div');
  cardCols.forEach((col) => {
    const card = col.querySelector('.cards a');
    if (!card) return;

    // Left cell: the image (use the whole figure element if possible)
    let imageCell = null;
    const figure = card.querySelector('figure');
    if (figure) {
      imageCell = figure;
    }

    // Right cell: text content as per block guidelines
    const contentDiv = card.querySelector('.card_content');
    const rightCellEls = [];
    if (contentDiv) {
      // Title (h5)
      const h5 = contentDiv.querySelector('h5');
      if (h5) rightCellEls.push(h5);
      // Description (p)
      const p = contentDiv.querySelector('p');
      if (p) rightCellEls.push(p);
      // CTA (strong.more_link), convert to <a> if card href exists
      const strong = contentDiv.querySelector('strong.more_link');
      if (strong && card.getAttribute('href')) {
        const a = document.createElement('a');
        a.href = card.getAttribute('href');
        a.textContent = strong.textContent.trim();
        rightCellEls.push(a);
      } else if (strong) {
        rightCellEls.push(strong);
      }
    }
    cells.push([imageCell, rightCellEls]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
