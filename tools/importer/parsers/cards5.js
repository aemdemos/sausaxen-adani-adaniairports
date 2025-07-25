/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards5)'];
  const cardCols = element.querySelectorAll(':scope > div');
  const rows = [headerRow];

  cardCols.forEach(col => {
    // Card container
    const card = col.querySelector('.card_lists > .cards');
    if (!card) return;
    // Image extraction
    let imageEl = null;
    const figure = card.querySelector('figure');
    if (figure) {
      const img = figure.querySelector('img');
      if (img) imageEl = img;
    }
    // Text cell extraction (title, description, CTA if available)
    const content = card.querySelector('.card_content');
    let textFragments = [];
    if (content) {
      // Title as heading (h5)
      const heading = content.querySelector('h5');
      if (heading) textFragments.push(heading);
      // Possible description: all text nodes in .card_content not inside h5 or .more_link
      const nodes = Array.from(content.childNodes);
      nodes.forEach(node => {
        // Text node outside heading or .more_link
        if (
          node.nodeType === Node.TEXT_NODE &&
          node.textContent.trim()
        ) {
          textFragments.push(document.createTextNode(node.textContent));
        }
        // If element is not h5 or .more_link, append
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName !== 'H5' &&
          !node.classList.contains('more_link')
        ) {
          textFragments.push(node);
        }
      });
      // Call-to-action link (if .more_link contains a link)
      const moreLink = content.querySelector('.more_link a');
      if (moreLink) textFragments.push(moreLink);
    }
    // Ensure at least empty string if nothing found
    const textCell = textFragments.length ? textFragments : '';
    rows.push([
      imageEl || '',
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
