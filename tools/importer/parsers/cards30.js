/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header - must match exactly
  const headerRow = ['Cards (cards30)'];
  const cells = [headerRow];

  // 2. Select all card rows
  const cardRows = element.querySelectorAll('.section_row');
  cardRows.forEach(cardRow => {
    // Card image (first .col-md-6 with an <img>)
    const imgCol = cardRow.querySelector('.col-md-6 img');

    // Card text content
    const descCol = cardRow.querySelector('.col-md-6.desc .page_description');
    const textCell = [];
    if (descCol) {
      // Title (h2)
      const title = descCol.querySelector('.page_title .innerPageTitle');
      if (title) {
        // preserve heading level (h2)
        textCell.push(title);
      }
      // Description paragraphs
      const paraNodes = descCol.querySelectorAll('div > p');
      paraNodes.forEach(p => {
        textCell.push(p);
      });
      // CTA (link)
      const cta = descCol.querySelector('div > a.more_link');
      if (cta) {
        textCell.push(cta);
      }
    }
    // Only add card row if both image and text content are present
    if (imgCol && textCell.length > 0) {
      cells.push([imgCol, textCell]);
    }
  });
  
  // 3. Create and replace block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
