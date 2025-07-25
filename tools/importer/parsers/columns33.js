/* global WebImporter */
export default function parse(element, { document }) {
  // Get the .container inside the section
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the ul with the columns
  const ul = container.querySelector('ul');
  if (!ul) return;
  const lis = ul.querySelectorAll('li');
  if (!lis.length) return;

  // Build the cells array
  // The header row must have exactly one column
  const cells = [];
  cells.push(['Columns (columns33)']);
  // Second row: one cell per column/stat
  const columns = Array.from(lis);
  cells.push(columns);

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
