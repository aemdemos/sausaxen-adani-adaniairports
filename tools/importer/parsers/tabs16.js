/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be exactly one cell as in the example
  const headerRow = ['Tabs (tabs16)'];

  // Gather tab names from the li > button elements directly under the ul
  const tabButtons = Array.from(element.querySelectorAll(':scope > li > button'));

  // Create a row for each tab: [Tab Label, '']
  const rows = tabButtons.map((btn) => [btn.textContent.trim(), '']);

  // Final table structure: header row (one column), then each tab row (two columns)
  const cells = [headerRow, ...rows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
