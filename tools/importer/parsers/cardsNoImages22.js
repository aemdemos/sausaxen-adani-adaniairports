/* global WebImporter */
export default function parse(element, { document }) {
  // Header must exactly match the example
  const headerRow = ['Cards (cardsNoImages22)'];
  const rows = [headerRow];

  // Select all immediate child divs with class 'value_cards'
  const cards = element.querySelectorAll(':scope > .value_cards');
  cards.forEach((card) => {
    const cardContent = [];
    // Find heading (h3.title or fallback h3)
    const heading = card.querySelector('h3.title') || card.querySelector('h3');
    if (heading) cardContent.push(heading);
    // Description: first <p>
    const desc = card.querySelector('p');
    if (desc) cardContent.push(desc);
    // Only add row if there's content
    if (cardContent.length > 0) {
      rows.push([cardContent]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
