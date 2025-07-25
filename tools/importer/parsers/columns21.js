/* global WebImporter */
export default function parse(element, { document }) {
  // Find left column (.address)
  const addressDiv = element.querySelector(':scope > .address');
  let leftColContent = addressDiv ? addressDiv : '';

  // Find right column (.map)
  const mapDiv = element.querySelector(':scope > .map');
  let rightColContent = mapDiv ? mapDiv : '';

  // Header row: must have two cells to match the columns: ['Columns (columns21)', '']
  const headerRow = ['Columns (columns21)', ''];

  // Content row: two columns
  const contentRow = [leftColContent, rightColContent];

  // Build table with matching header and content columns
  const tableRows = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with the new table
  element.replaceWith(block);
}
