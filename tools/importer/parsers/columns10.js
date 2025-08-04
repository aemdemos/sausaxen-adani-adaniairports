/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all li children of the top-level ul (these represent columns)
  const columns = Array.from(element.children);

  // For each column, extract the heading and the list, referencing the existing elements
  const colCells = columns.map((li) => {
    // Find the heading (h5) and the list (ul)
    const heading = li.querySelector('h5');
    const list = li.querySelector('ul');
    // Remove any <i> icon from the heading, but do not clone to preserve referential integrity
    if (heading) {
      const icons = heading.querySelectorAll('i');
      icons.forEach(i => i.remove());
    }
    // Compose the cell content as an array of existing elements
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (list) cellContent.push(list);
    return cellContent;
  });

  // The header row should be a single cell (one-column row)
  // The content row should have as many cells as there are columns
  const cells = [
    ['Columns (columns10)'], // header row: a single cell
    colCells                // content row: as many cells as columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the created table
  element.replaceWith(table);
}
