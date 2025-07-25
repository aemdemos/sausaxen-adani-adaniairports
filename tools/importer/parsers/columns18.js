/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name (must be a single cell/column)
  const headerRow = ['Columns (columns18)'];

  // Find all immediate column containers with class 'col'
  const cols = Array.from(element.querySelectorAll(':scope > .col'));

  // For each column, extract the main content block (the .content inside .details)
  // Reference the actual .content elements from the DOM
  const contentCells = cols.map(col => {
    const details = col.querySelector(':scope > .details');
    if (details) {
      const content = details.querySelector(':scope > .content');
      if (content) return content;
      return details; // fallback: if .content missing, use .details
    }
    return col; // fallback: use whole column if structure unexpected
  });

  // The cells array: first row is header (1 column), second row is N columns (one for each col)
  const cells = [
    headerRow,
    contentCells
  ];

  // Create block table. WebImporter.DOMUtils.createTable will create the correct colspan for the header row.
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element in the DOM
  element.replaceWith(table);
}
