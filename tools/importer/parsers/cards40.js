/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as per block spec
  const headerRow = ['Cards (cards40)'];
  const rows = [headerRow];

  // Select all direct card items
  const cardItems = element.querySelectorAll(':scope > .card-item');
  cardItems.forEach((card) => {
    // First cell: use the figure element directly (should contain the image)
    const figure = card.querySelector('figure');

    // Second cell: use all nodes of .card_body in a fragment for structure
    const cardBody = card.querySelector('.card_body');
    const cellElements = [];
    if (cardBody) {
      // Only add non-empty child nodes (skip whitespace)
      Array.from(cardBody.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')) {
          cellElements.push(node);
        }
      });
    }
    rows.push([figure, cellElements]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
