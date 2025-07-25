/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for block table
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Each card is inside a direct child div (col-12 col-md-6 col)
  const cardWrappers = element.querySelectorAll(':scope > div');
  cardWrappers.forEach((colDiv) => {
    // Find the .cards container within the colDiv
    const card = colDiv.querySelector('.cards');
    if (!card) return;
    // Find the image (always in <figure><img>)
    let img = null;
    const figure = card.querySelector('figure');
    if (figure) {
      img = figure.querySelector('img');
    }
    // Find title and description
    const content = card.querySelector('.card_content');
    const textCell = [];
    if (content) {
      const title = content.querySelector('h5');
      if (title) textCell.push(title);
      const desc = content.querySelector('p');
      if (desc) textCell.push(desc);
      // Potential CTA: check for <a> inside card_content
      let cta = content.querySelector('a');
      if (cta) textCell.push(cta);
    }
    rows.push([
      img,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
