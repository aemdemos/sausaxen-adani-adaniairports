/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as block name
  const headerRow = ['Hero (hero44)'];

  // Find the main image to use as background image (if available)
  const img = element.querySelector('img');

  // Find the content block: headline, paragraph(s), etc.
  // The content is inside .page_description
  let contentCell = [];
  const desc = element.querySelector('.page_description');
  if (desc) {
    // Get all content inside .page_description in order
    // The header (h2) is inside .page_title
    const header = desc.querySelector('.page_title h2');
    if (header) contentCell.push(header);
    // The paragraph(s) directly inside desc
    desc.querySelectorAll('p').forEach(p => contentCell.push(p));
  }

  // Defensive: if for some reason contentCell is empty, fallback to extracting all <h1>-<h4> and <p> inside element
  if (contentCell.length === 0) {
    element.querySelectorAll('h1,h2,h3,h4,p').forEach(node => contentCell.push(node));
  }

  // Build the block table
  const cells = [
    headerRow,
    [img],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
