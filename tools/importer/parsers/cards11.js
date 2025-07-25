/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table rows. The header row must be a single cell, and each content row must have two cells
  const rows = [];
  // Header: single cell, but must align with two-column content (will be colspan=2 by importer)
  rows.push(['Cards (cards11)']);
  // Locate the active tab-pane (or fallback to first tab-pane)
  let tabPane = element.querySelector('.tab-pane.active.show');
  if (!tabPane) tabPane = element.querySelector('.tab-pane');
  if (!tabPane) return;
  const cardCollection = tabPane.querySelector('.stats-card-collection');
  if (!cardCollection) return;
  // For each .stats-card, build the two-column content row
  Array.from(cardCollection.children).forEach(card => {
    if (!card.classList.contains('stats-card')) return;
    // First cell: icon element or empty string if not found
    const icon = card.querySelector('i') || '';
    // Second cell: h5 (value) and span (desc), both referenced directly
    const cellContent = [];
    const h5 = card.querySelector('h5');
    if (h5) cellContent.push(h5);
    const span = card.querySelector('span');
    if (h5 && span) cellContent.push(document.createElement('br'));
    if (span) cellContent.push(span);
    // Fallback if both h5 and span are missing
    if (cellContent.length === 0) {
      const txt = card.textContent.trim();
      if (txt) cellContent.push(txt);
    }
    rows.push([icon, cellContent.length === 1 ? cellContent[0] : cellContent]);
  });
  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
