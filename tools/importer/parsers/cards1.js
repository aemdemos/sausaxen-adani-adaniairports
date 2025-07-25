/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards1)'];
  const rows = [headerRow];

  // Get all card columns
  const cardCols = element.querySelectorAll(':scope .col-md-6');

  cardCols.forEach((col) => {
    // Find the .cards container within the column
    const card = col.querySelector('.cards');
    if (!card) return;

    // LEFT CELL: The image (first <img> in <figure>)
    let cardImg = null;
    const figure = card.querySelector('figure');
    if (figure) {
      const img = figure.querySelector('img');
      if (img) cardImg = img;
    }

    // RIGHT CELL: All text content (title, description, etc) from .card_content
    let textContentCell = '';
    const cardContent = card.querySelector('.card_content');
    if (cardContent) {
      // Use the existing .card_content element as is, no cloning
      textContentCell = cardContent;
    }

    // Only push row if there's any content
    if (cardImg || textContentCell) {
      rows.push([
        cardImg || '',
        textContentCell || ''
      ]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
