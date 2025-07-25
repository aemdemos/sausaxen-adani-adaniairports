/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row exactly as required
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Get all direct children .col-md-6 (or .col-md-6.mobile-margin-hide)
  const cols = element.querySelectorAll(':scope > .col-md-6, :scope > .col-md-6.mobile-margin-hide');

  cols.forEach(col => {
    const card = col.querySelector('.cards');
    if (!card) return;

    // Get the image, use the existing element (not a clone)
    let imgEl = null;
    const figure = card.querySelector('figure');
    if (figure) {
      const img = figure.querySelector('img');
      if (img) imgEl = img;
    }

    // Get card content
    const cardContent = card.querySelector('.card_content');
    const contentArr = [];
    if (cardContent) {
      // Title (h5)
      const title = cardContent.querySelector('h5');
      if (title) contentArr.push(title);
      // Description (p)
      const desc = cardContent.querySelector('p');
      if (desc) contentArr.push(desc);
      // Call-to-action: look for a link inside .more_link, if present
      const moreLink = cardContent.querySelector('.more_link');
      if (moreLink) {
        const cta = moreLink.querySelector('a');
        if (cta) contentArr.push(cta);
      }
    }
    // Push this row: [image, [content...]] (handle missing img/content)
    rows.push([
      imgEl || '',
      contentArr.length === 1 ? contentArr[0] : contentArr
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
