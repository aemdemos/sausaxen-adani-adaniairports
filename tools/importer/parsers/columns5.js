/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column with block name
  const headerRow = ['Columns (columns5)'];

  // Find content columns: <li> under ul.scrollbar_x
  const container = element.querySelector('.container');
  const ul = container && container.querySelector('ul.scrollbar_x');
  const lis = ul ? Array.from(ul.children) : [];
  // The second row: one cell per column, each referencing the full <li> for semantic value
  const columnsRow = lis;

  // Table rows: header (single column), then one row of columns
  const rows = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}