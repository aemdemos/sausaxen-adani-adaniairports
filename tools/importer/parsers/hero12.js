/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the table for Hero (hero12)
  // 1. Extract background image (if any)
  let bgImgEl = null;
  const bgBanner = element.querySelector('.bg_banner');
  if (bgBanner) {
    const style = bgBanner.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\((['"]?)(.*?)\1\)/i);
    if (match && match[2]) {
      bgImgEl = document.createElement('img');
      bgImgEl.src = match[2];
    }
  }

  // 2. Find the text content (banner_text)
  // This may be empty, so handle gracefully
  const bannerText = element.querySelector('.banner_text');
  let textContent = '';
  if (bannerText && bannerText.childNodes.length > 0) {
    textContent = bannerText;
  } else {
    textContent = '';
  }

  // 3. Build block table: 1 column, 3 rows (header, image, text)
  const rows = [
    ['Hero (hero12)'],
    [bgImgEl ? bgImgEl : ''],
    [textContent]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
