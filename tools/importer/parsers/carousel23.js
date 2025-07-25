/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to collect slide data
  function getSlides() {
    // Find the carousel wrapper: look for .slick-slider or .slider_wrapper
    let slider = element.querySelector('.slick-slider');
    if (!slider) slider = element.querySelector('.slider_wrapper');
    if (!slider) return [];
    // slides are children of .slick-track
    const slickTrack = slider.querySelector('.slick-track');
    if (!slickTrack) return [];
    // All slides
    const slides = Array.from(slickTrack.children);
    return slides.map((slide) => {
      // Each slide contains a div > div > .leadership_item
      const item = slide.querySelector('.leadership_item');
      if (!item) return null;
      const aside = item.querySelector('aside');
      const figure = item.querySelector('figure');
      // Reference the existing <img>, don't clone
      let img = figure ? figure.querySelector('img') : null;
      // Compose the text cell: h6, h5, strong, label, and link in order
      const textContent = document.createElement('div');
      if (aside) {
        // h6 (optional)
        const h6 = aside.querySelector('h6');
        if (h6) {
          textContent.appendChild(h6);
        }
        // h5 (quote/title)
        const h5 = aside.querySelector('h5');
        if (h5) {
          // Use h2 for semantic heading as in the example
          const h2 = document.createElement('h2');
          h2.textContent = h5.textContent.replace(/^"|"$/g, '').replace(/^“|”$/g, '');
          textContent.appendChild(h2);
        }
        // strong (name)
        const strong = aside.querySelector('strong');
        if (strong) {
          // Wrap in div for display, keep bold
          const strongDiv = document.createElement('div');
          strongDiv.style.fontWeight = 'bold';
          strongDiv.textContent = strong.textContent;
          textContent.appendChild(strongDiv);
        }
        // label (title)
        const label = aside.querySelector('label');
        if (label) {
          const labelDiv = document.createElement('div');
          labelDiv.textContent = label.textContent;
          textContent.appendChild(labelDiv);
        }
        // link (CTA)
        const cta = aside.querySelector('a');
        if (cta) {
          textContent.appendChild(cta);
        }
      }
      // If textContent is empty, leave as ''
      let textCell = textContent.childNodes.length ? textContent : '';
      return [img, textCell];
    }).filter(Boolean);
  }

  const headerRow = ['Carousel (carousel23)'];
  // Get all slides as [img, text] per row
  const slideRows = getSlides();
  // Build cells array
  const cells = [headerRow, ...slideRows];
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
