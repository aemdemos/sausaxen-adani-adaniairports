/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all PDF cards from Annual Reports, Annual Return, and Downloads sections
  const allCards = [];
  // Find all download card lists on the page
  const cardSections = element.querySelectorAll('.card_collections');
  cardSections.forEach(section => {
    const cards = section.querySelectorAll('.cardContainer');
    cards.forEach(card => {
      const link = card.querySelector('a.pdf_info');
      if (!link) return;
      // Icon cell: the <i> inside the link
      let iconCell = null;
      const icon = link.querySelector('i');
      if (icon) {
        const span = document.createElement('span');
        span.appendChild(icon);
        iconCell = span;
      }
      // Text cell: <p> inside the link as CTA/title, wrapped as <strong><a></a></strong>
      let textCell = '';
      const p = link.querySelector('p');
      if (p && link.href) {
        const strong = document.createElement('strong');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = p.textContent.trim();
        strong.appendChild(a);
        textCell = strong;
      } else if (p) {
        const strong = document.createElement('strong');
        strong.textContent = p.textContent.trim();
        textCell = strong;
      }
      allCards.push([iconCell, textCell]);
    });
  });
  if (!allCards.length) return;
  const cells = [['Cards (cards3)',], ...allCards];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
