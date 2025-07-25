/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the banner image (should be the only <img> under .banner_ads)
  const img = element.querySelector('img');

  // 2. Find the main content container
  const bannerContent = element.querySelector('.banner_content');
  const contentParts = [];

  if (bannerContent) {
    // 2.1. Add label if present
    const label = bannerContent.querySelector('label');
    if (label) contentParts.push(label);

    // 2.2. Add all children of the div (should be headings & paragraph)
    const contentDiv = bannerContent.querySelector('div');
    if (contentDiv) {
      Array.from(contentDiv.children).forEach((child) => {
        contentParts.push(child);
      });
    }

    // 2.3. Add CTA as a link if present
    const moreLink = bannerContent.querySelector('.more_link');
    // CTA link should come from the closest <a> ancestor
    if (moreLink) {
      // Find the closest parent anchor
      let parentA = moreLink.closest('a');
      // If not found (unlikely), fallback to any anchor under .banner_ads
      if (!parentA) parentA = element.querySelector('a[href]');
      if (parentA) {
        const cta = document.createElement('a');
        cta.href = parentA.href;
        cta.textContent = moreLink.textContent;
        if (parentA.hasAttribute('target')) {
          cta.setAttribute('target', parentA.getAttribute('target'));
        }
        contentParts.push(cta);
      }
    }
  }

  // Defensive: If no image, leave cell empty for image row
  const imageCell = img || '';
  // Defensive: If no content, leave cell empty for text
  const contentCell = contentParts.length ? contentParts : '';

  const cells = [
    ['Hero (hero9)'],
    [imageCell],
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
