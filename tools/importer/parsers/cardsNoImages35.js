/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the block name as shown in example
  const cells = [['Cards (cardsNoImages35)']];
  // Each card is .route_details
  const cardDivs = element.querySelectorAll('.route_details');
  cardDivs.forEach(cardDiv => {
    const content = [];
    // Heading is h3 (optional)
    const heading = cardDiv.querySelector('h3');
    if (heading) content.push(heading);
    // Description is <ul> (optional)
    const ul = cardDiv.querySelector('ul');
    if (ul) content.push(ul);
    // CTA link (optional)
    // Must only include non-empty links
    const link = cardDiv.querySelector('a[href]');
    if (link && link.textContent.trim().length > 0) {
      content.push(link);
    }
    cells.push([content]);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
