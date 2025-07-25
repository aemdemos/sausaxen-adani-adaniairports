/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab labels
  const tabButtons = element.querySelectorAll('.tabs > button.tab');
  const tabLabels = Array.from(tabButtons).map(btn => {
    const span = btn.querySelector('span');
    return span ? span.textContent.trim() : btn.textContent.trim();
  });

  // Find tab contents - in this HTML, only the first tab content is present/visible
  const tabContentContainer = element.querySelector('.tab-content');
  let tabContentDivs = [];
  if (tabContentContainer) {
    // Each direct child div may represent a content for a tab (in this example, only 1, the first tab)
    tabContentDivs = Array.from(tabContentContainer.children);
  }

  // Prepare table rows
  const rows = [ ['Tabs (tabs29)'] ];
  for (let i = 0; i < tabLabels.length; i++) {
    let contentCell = '';
    if (tabContentDivs[i]) {
      // Use the existing first-level tab content container for this tab (reference original element)
      contentCell = tabContentDivs[i];
    } else if (i === 0 && tabContentDivs.length === 1) {
      // If only one tab content is present, use it for the first tab
      contentCell = tabContentDivs[0];
    } else {
      // No content for this tab
      contentCell = '';
    }
    rows.push([tabLabels[i], contentCell]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
