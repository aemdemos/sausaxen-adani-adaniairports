/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const rows = [['Cards (cards31)']];

  // 2. Find the container holding the slides
  const slickTrack = element.querySelector('.slick-track');
  if (!slickTrack) return;

  // 3. Select all cards (immediate children with .slick-slide)
  const slides = slickTrack.querySelectorAll(':scope > .slick-slide');

  slides.forEach((slide) => {
    // Each slide, if not empty, should contain a .single_card > .cards > a
    const cardLink = slide.querySelector('.single_card .cards a');
    if (!cardLink) return;

    // First cell: image element
    const img = cardLink.querySelector('figure img');
    let imageCell = img || '';

    // Second cell: text content
    const cardContent = cardLink.querySelector('.card_content');
    const contentCell = [];
    if (cardContent) {
      // Title (h5)
      const title = cardContent.querySelector('h5');
      if (title) contentCell.push(title);
      // Description (p)
      const desc = cardContent.querySelector('p');
      if (desc) contentCell.push(desc);
      // CTA (strong.more_link)
      const cta = cardContent.querySelector('strong.more_link');
      if (cta && cardLink.href) {
        // Wrap the existing strong element in a link
        const ctaA = document.createElement('a');
        ctaA.href = cardLink.href;
        // Reference the strong element directly if it's not already in the DOM elsewhere
        // Remove it from cardContent if so, since reference is preferred
        ctaA.appendChild(cta);
        contentCell.push(ctaA);
      }
    }

    rows.push([
      imageCell,
      contentCell.length === 1 ? contentCell[0] : contentCell
    ]);
  });

  // 4. Create and replace with the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
