/* global WebImporter */
export default function parse(element, { document }) {
  // Set up table header as in example
  const headerRow = ['Hero (hero19)'];

  // Find the block image (as returned in the second div inside the .item_slider)
  let imgEl = element.querySelector('img');

  // Find the content container
  let contentWrapper = element.querySelector('.page_description');
  let contentElements = [];
  if (contentWrapper) {
    // Find heading(s)
    let heading = contentWrapper.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentElements.push(heading);
    // Find all paragraphs
    let paragraphs = contentWrapper.querySelectorAll('p');
    paragraphs.forEach(p => contentElements.push(p));
  }

  // Compose the block cells
  const cells = [
    headerRow,
    [imgEl],
    [contentElements]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
