/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the main visual content (prefer <figure>, else all children)
  const columns = columnDivs.map(col => {
    const figure = col.querySelector(':scope > figure');
    if (figure) return figure;
    return Array.from(col.childNodes).filter(n => n.nodeType !== 3 || n.textContent.trim());
  });
  // Header row: single cell with exact block name (spanning all columns automatically)
  const rows = [
    ['Columns (columns14)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
