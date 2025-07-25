/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the block name
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each card is directly a child div of the incoming element
  const cards = element.querySelectorAll(':scope > div');

  cards.forEach((card) => {
    // Find the image element (should be only one per card)
    const img = card.querySelector('img');

    // Compose the right-hand cell for text
    const profileBody = card.querySelector('.profile_body');
    const cellContent = [];
    if (profileBody) {
      // Use strong element for the name/title
      const label = profileBody.querySelector('label');
      if (label && label.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = label.textContent.trim();
        cellContent.push(strong);
      }
      // Add description/role if present
      const descSpan = profileBody.querySelector('span');
      if (descSpan && descSpan.textContent.trim()) {
        // Add line break if there's a title
        if (cellContent.length > 0) {
          cellContent.push(document.createElement('br'));
        }
        // Use a span for description/role
        const role = document.createElement('span');
        role.textContent = descSpan.textContent.trim();
        cellContent.push(role);
      }
    }
    // Add the row only if we have at least one content (per semantic block)
    if (img || cellContent.length > 0) {
      rows.push([img, cellContent]);
    }
  });

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
