/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row exactly as in the example
  const headerRow = ['Cards (cards39)'];

  // 2. Find all real cards (exclude 'View All' and any non-card slides)
  const cardSlides = Array.from(element.querySelectorAll('.slick-slide'))
    .filter(slide => !!slide.querySelector('a.card_info'));

  // 3. For each card, create a row: [icon, text block] (reference original elements)
  const rows = cardSlides.map(slide => {
    const a = slide.querySelector('a.card_info');
    // First cell: the icon block (the first <div> inside <a>)
    const iconDiv = a.querySelector('div');

    // Second cell: text block with all text content
    // We'll reference the <span> and <p> directly if possible, wrap with <div> for structure
    const textDiv = document.createElement('div');
    // Date as <strong> if present
    const date = a.querySelector('span');
    if (date && date.textContent && date.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = date.textContent.trim();
      textDiv.appendChild(strong);
      textDiv.appendChild(document.createElement('br'));
    }
    // Description as <p> (reference original element, not clone)
    const desc = a.querySelector('p');
    if (desc && desc.textContent && desc.textContent.trim()) {
      textDiv.appendChild(desc);
    }
    // CTA: If the link is a PDF, add a cta link
    if (a.href && a.href.match(/\.pdf$/i)) {
      textDiv.appendChild(document.createElement('br'));
      const cta = document.createElement('a');
      cta.href = a.href;
      cta.target = '_blank';
      cta.textContent = 'Read More';
      textDiv.appendChild(cta);
    }
    return [iconDiv, textDiv];
  });

  // 4. Compose the final table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // 5. Replace the original element with the new table
  element.replaceWith(table);
}
