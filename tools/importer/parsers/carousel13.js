/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row per requirements
  const headerRow = ['Carousel (carousel13)'];
  const cells = [headerRow];

  // Find all slides (role="tabpanel")
  const tabPanes = element.querySelectorAll('[role="tabpanel"]');
  tabPanes.forEach((pane) => {
    // First column: the image (required). Use the <img> element directly.
    const img = pane.querySelector('figure img');

    // Second column: text content
    const textContent = [];
    const desc = pane.querySelector('.page_description');
    if (desc) {
      // Title
      const title = desc.querySelector('h3');
      if (title) {
        // Use h2 to match the example heading level (markdown ## becomes h2)
        // To preserve semantics, use original tag if provided (here h3 -> h2)
        const h2 = document.createElement('h2');
        h2.innerHTML = title.innerHTML;
        textContent.push(h2);
      }
      // Description/content: includes list(s) and any other content under .richContent
      const richContent = desc.querySelector('.richContent');
      if (richContent) {
        // Append all direct children (could be e.g. <ul>, <p> etc.)
        Array.from(richContent.children).forEach((child) => {
          textContent.push(child);
        });
      }
    }
    // If there's no textContent, just provide empty string
    cells.push([
      img,
      textContent.length ? textContent : ''
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
