/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cards28)'];
  const cells = [headerRow];

  // Each card is a column in the .row.custom_card_gap40
  const cardCols = element.querySelectorAll('.row.custom_card_gap40 > div');
  cardCols.forEach((col) => {
    const card = col.querySelector('.highlights_card');
    if (!card) return;

    // Get image (always required in this variant)
    let img = card.querySelector('.imgItem img');
    // If no image, we still want an empty cell
    let imgCell = img || '';

    // Gather text: title (h3) and optional description (p)
    const textCellContent = [];
    const title = card.querySelector('h3');
    if (title) textCellContent.push(title);
    const desc = card.querySelector('p');
    if (desc) textCellContent.push(desc);
    // If both missing, leave cell empty
    const textCell = textCellContent.length ? textCellContent : '';

    cells.push([imgCell, textCell]);
  });

  // Create block table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
