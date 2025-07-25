/* global WebImporter */
export default function parse(element, { document }) {
  // The block name and variant, exactly as required
  const headerRow = ['Columns (columns10)'];

  // Find immediate child columns
  const columns = element.querySelectorAll(':scope > div');

  // First column: get the figure (image block)
  let col1 = null;
  if (columns[0]) {
    const fig = columns[0].querySelector('figure');
    col1 = fig || columns[0];
  }

  // Second column: get the stats cards collection or the right column div
  let col2 = null;
  if (columns[1]) {
    const stats = columns[1].querySelector('.stats-card-collection');
    col2 = stats || columns[1];
  }

  // Create the cells array as per the example markdown: header as single cell row, content as one row with two columns
  const cells = [
    headerRow,
    [col1, col2]
  ];

  // Build the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
