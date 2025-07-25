/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow];

  // Get the page description section if present
  const pageDesc = element.querySelector('.page_description');
  let introRowAdded = false;
  if (pageDesc) {
    // Use header (h2) and subtitle (p in .section_row) if present
    const fragments = [];
    const h2 = pageDesc.querySelector('h2');
    if (h2) fragments.push(h2);
    const sectionRow = pageDesc.querySelector('.section_row p');
    if (sectionRow) fragments.push(sectionRow);
    if (fragments.length > 0) {
      // Add empty cell for icon, and content cell for intro
      cells.push(['', fragments]);
      introRowAdded = true;
    }
  }

  // Parse each card row
  const cardEls = element.querySelectorAll('.horizontal_card');
  cardEls.forEach(card => {
    // 1st cell: icon (reference the .card_icon div)
    let iconCell = '';
    const cardIcon = card.querySelector('.card_icon');
    if (cardIcon) iconCell = cardIcon;

    // 2nd cell: text (label as bold, description as <p>)
    const content = [];
    const label = card.querySelector('label');
    if (label) {
      const strong = document.createElement('strong');
      strong.innerHTML = label.innerHTML;
      content.push(strong);
    }
    const desc = card.querySelector('p');
    if (desc) content.push(desc);

    cells.push([iconCell, content]);
  });

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
