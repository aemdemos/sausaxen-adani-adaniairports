/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the cards block
  const rows = [['Cards (cards36)']];

  // 2. Select all immediate card columns
  const cardColumns = element.querySelectorAll(':scope .row > div');
  cardColumns.forEach((col) => {
    const routeInfo = col.querySelector('.route_info');
    if (!routeInfo) return;

    // 2.1 Icon (first cell) - reference the <i> element directly
    const icon = routeInfo.querySelector('i');

    // 2.2 Text content (second cell):
    // Use a single container so all content is in one cell
    const textContainer = document.createElement('div');

    // Title (h3): use <strong> as in the markdown example
    const title = routeInfo.querySelector('h3');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      textContainer.appendChild(strong);
      textContainer.appendChild(document.createElement('br'));
    }

    // Description (p):
    const desc = routeInfo.querySelector('p');
    if (desc) {
      // Use a <span> so we don't introduce new blocks or unnecessary <p>
      const span = document.createElement('span');
      span.textContent = desc.textContent.trim();
      textContainer.appendChild(span);
    }

    // 2.3 Add row to table
    rows.push([
      icon, // icon element
      textContainer // text cell with <strong> (title) and <span> (desc)
    ]);
  });

  // 3. Create the cards table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
