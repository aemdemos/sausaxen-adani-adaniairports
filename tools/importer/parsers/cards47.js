/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as in the example
  const headerRow = ['Cards (cards47)'];
  const rows = [headerRow];

  // Each card is a direct child <div> of the main element
  const cardWrappers = element.querySelectorAll(':scope > div');

  cardWrappers.forEach(cardWrapper => {
    // Each card is structured as .cards inside the cardWrapper
    const card = cardWrapper.querySelector('.cards');
    if (!card) return;
    
    // Image: <figure><img></figure> (mandatory)
    const img = card.querySelector('figure > img');
    // Reference the existing <img> element directly
    const imageCell = img;

    // Text cell
    const cardContent = card.querySelector('.card_content');
    const contentCell = document.createElement('div');
    if (cardContent) {
      // Title (h5)
      const h5 = cardContent.querySelector('h5');
      if (h5) {
        const strong = document.createElement('strong');
        strong.textContent = h5.textContent;
        contentCell.appendChild(strong);
        contentCell.appendChild(document.createElement('br'));
      }
      // Description (p.minHeight)
      const p = cardContent.querySelector('p');
      if (p) {
        const desc = document.createElement('span');
        desc.textContent = p.textContent;
        contentCell.appendChild(desc);
        contentCell.appendChild(document.createElement('br'));
      }
      // CTA (strong.more_link) as a link (if link exists)
      const cta = cardContent.querySelector('strong.more_link');
      const cardLink = card.querySelector('a');
      if (cta && cardLink && cardLink.getAttribute('href')) {
        const a = document.createElement('a');
        a.href = cardLink.getAttribute('href');
        a.textContent = cta.textContent;
        contentCell.appendChild(a);
      }
    }
    rows.push([imageCell, contentCell]);
  });

  // Create final table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
