/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: use the exact block name
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  // Get all direct or indirect .slick-slide within the element
  const slides = element.querySelectorAll('.slick-slide');
  slides.forEach((slide) => {
    // Defensive: skip .slick-slide elements that have no relevant card content
    const businessContent = slide.querySelector('.business_content');
    if (!businessContent) return;

    // First cell: use the <figure> directly if it exists (image)
    let imageCell = '';
    const figure = businessContent.querySelector('figure');
    if (figure) imageCell = figure;

    // Second cell: gather text content (title, desc, CTA)
    const textCellParts = [];
    const aside = businessContent.querySelector('aside');
    if (aside) {
      // Title (h2)
      const h2 = aside.querySelector('h2');
      if (h2) textCellParts.push(h2);
      // Description (p)
      const p = aside.querySelector('p');
      if (p) textCellParts.push(p);
      // CTA (a)
      const a = aside.querySelector('a');
      if (a) textCellParts.push(a);
    }
    // If there is no aside, but some paragraph or h2 is present, fall back as needed
    if (!aside) {
      const h2 = businessContent.querySelector('h2');
      if (h2) textCellParts.push(h2);
      const p = businessContent.querySelector('p');
      if (p) textCellParts.push(p);
      const a = businessContent.querySelector('a');
      if (a) textCellParts.push(a);
    }

    rows.push([imageCell, textCellParts]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
