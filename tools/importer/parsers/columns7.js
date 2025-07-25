/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is a <ul class="footer_nav">
  if (!element || !element.matches('ul.footer_nav')) return;

  // Get all first-level <li> columns (top-level children of the ul)
  const columns = Array.from(element.children).filter(li => li.tagName === 'LI');

  // Build the header row as an array with a single cell (for correct spanning)
  const headerRow = ['Columns (columns7)'];

  // Build the content row: each column in its own cell
  const contentRow = columns.map((col) => {
    const heading = col.querySelector(':scope > h5');
    const list = col.querySelector(':scope > ul');
    const cellDiv = document.createElement('div');
    if (heading) cellDiv.appendChild(heading);
    if (list) cellDiv.appendChild(list);
    return cellDiv;
  });

  const cells = [headerRow, contentRow];

  // Use createTable as specified, it will handle the colspan on the header
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
