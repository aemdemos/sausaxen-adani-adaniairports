/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the block name exactly
  const headerRow = ['Columns (columns27)'];

  // The layout is two columns: left (title/desc), right (dropdown)
  // Get left column: title (h2) + description (p)
  const left = document.createElement('div');
  const pageTitle = element.querySelector('.page_title');
  if (pageTitle) {
    left.appendChild(pageTitle);
  }
  const desc = element.querySelector('.section_row');
  if (desc) {
    left.appendChild(desc);
  }

  // Get right column: dropdown filter
  const right = element.querySelector('.filterCntr');

  // Table structure as per Columns block: header, content row (2 columns)
  const rows = [
    headerRow,
    [left, right]
  ];

  // Build table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
