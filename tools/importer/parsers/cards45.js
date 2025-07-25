/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Prepare header row as required in the example
  const headerRow = ['Cards (cards45)'];
  const cells = [headerRow];

  // 2. Locate the card containers (each card is inside a .col-md-6)
  const cardCols = element.querySelectorAll(':scope .col-md-6');
  cardCols.forEach(col => {
    // a. Get the image element (keep original element reference)
    const img = col.querySelector('figure img');

    // b. Get the card content container
    const cardContent = col.querySelector('.card_content');

    // If either image or content is missing, skip this card
    if (!img || !cardContent) {
      return;
    }

    // c. Push the card row: [image, content]
    cells.push([
      img,
      cardContent
    ]);
  });

  // 3. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
