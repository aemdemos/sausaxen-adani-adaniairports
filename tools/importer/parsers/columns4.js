/* global WebImporter */
export default function parse(element, { document }) {
  // Get the direct column divs (e.g. col-md-6...)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the card content (image and content)
  const cells = columns.map(col => {
    // Each col has a .cards inside (with figure/img and card_content)
    const card = col.querySelector('.cards');
    return card || col;
  });
  // Build the block table where the header row is a single cell
  // containing the block name as in the markdown example.
  // The createTable implementation will handle the colspan automatically.
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns4)'],
    cells
  ], document);
  // After table creation, ensure that the header row has a single cell spanning all columns
  const th = table.querySelector('th');
  if (th && cells.length > 1) {
    th.setAttribute('colspan', cells.length);
  }
  element.replaceWith(table);
}