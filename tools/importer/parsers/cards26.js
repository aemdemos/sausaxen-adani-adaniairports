/* global WebImporter */
export default function parse(element, { document }) {
  // Build the cells array so that:
  // - The header row is a single cell (so table's first row has one column)
  // - Each card row is an array of two cells: [icon, text]

  const cells = [];

  // Header row: must be a single cell array
  cells.push(['Cards (cards26)']);

  // Find all card containers
  const cardContainers = Array.from(element.querySelectorAll('.cardContainer'));

  cardContainers.forEach((container) => {
    // Icon or image cell
    let iconCell = null;
    // Try img, svg, or i element as icon
    const iconOrImg = container.querySelector('img, svg, i');
    if (iconOrImg) {
      // Try to grab the parent div if that's the wrapper for the icon
      const possibleWrapper = iconOrImg.closest('div, span');
      if (possibleWrapper && possibleWrapper !== container) {
        iconCell = possibleWrapper;
      } else {
        iconCell = iconOrImg;
      }
    } else {
      // fallback (should not happen)
      iconCell = document.createElement('div');
    }

    // Text/CTA cell
    const mainLink = container.querySelector('a');
    let textCell;
    if (mainLink) {
      // Remove the icon from the link for text cell
      const textParts = [];
      mainLink.childNodes.forEach((node) => {
        if (
          !(iconOrImg && (node === iconOrImg || (iconOrImg.parentElement && node === iconOrImg.parentElement))) &&
          (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim()))
        ) {
          textParts.push(node);
        }
      });
      if (textParts.length > 0) {
        const a = document.createElement('a');
        a.href = mainLink.href;
        textParts.forEach(part => a.appendChild(part));
        textCell = a;
      } else {
        textCell = document.createTextNode(mainLink.textContent.trim());
      }
    } else {
      textCell = document.createTextNode(container.textContent.trim());
    }

    // Each card is a two-cell row
    cells.push([iconCell, textCell]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // The header cell must span both columns
  const headerTh = table.querySelector('tr th');
  if (headerTh) {
    headerTh.setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
