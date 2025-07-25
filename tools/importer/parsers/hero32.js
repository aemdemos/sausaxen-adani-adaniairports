/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (block name)
  const headerRow = ['Hero (hero32)'];
  
  // 2nd row: background asset (prefer video, fallback to image if present)
  let backgroundAsset = '';
  // Search for <video> or <img> in descendants
  const video = element.querySelector('video');
  if (video) {
    backgroundAsset = video;
  } else {
    const img = element.querySelector('img');
    if (img) {
      backgroundAsset = img;
    }
  }
  const backgroundRow = [backgroundAsset];

  // 3rd row: title, subheading, CTA (scan descendants for headings/buttons/links)
  // This source HTML doesn't contain any, but be resilient to variations
  let title = '', subheading = '', cta = '';
  // Try h1/h2/h3 for title/subheading
  const h1 = element.querySelector('h1');
  if (h1) {
    title = h1;
  } else {
    const h2 = element.querySelector('h2');
    if (h2) title = h2;
  }
  const h3 = element.querySelector('h3');
  if (h3) subheading = h3;
  // Look for a link/button as CTA
  const ctaEl = element.querySelector('a, button');
  if (ctaEl) cta = ctaEl;
  // Compose the content cell (include all if present)
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose cells for table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow
  ];

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
