/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name in the instructions
  const headerRow = ['Cards (cards42)'];
  const rows = [headerRow];

  // Get all direct child card columns
  const cardCols = element.querySelectorAll(':scope > div');

  cardCols.forEach((col) => {
    // Each column contains a .cards block
    const card = col.querySelector('.cards');
    if (!card) return;

    // Get image (first <img> inside <figure>)
    let img = null;
    const figure = card.querySelector('figure');
    if (figure) {
      img = figure.querySelector('img');
    }

    // Extract card content: <h5> (title), <p> (description), CTA if present
    const contentEls = [];
    const cardContent = card.querySelector('.card_content');
    if (cardContent) {
      // Use the first <h5> as title
      const title = cardContent.querySelector('h5');
      if (title) contentEls.push(title);
      // Use the first <p> as description
      const desc = cardContent.querySelector('p');
      if (desc) contentEls.push(desc);
      // Check for CTA: link inside .more_link
      const moreLink = cardContent.querySelector('.more_link a');
      if (moreLink) contentEls.push(moreLink);
    }
    // Add row: image in first cell, text content in second cell
    rows.push([img, contentEls]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
