/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with the exact block name
  const headerRow = ['Tabs (tabs34)'];

  // Extract tab labels from the left nav
  const navCol = element.querySelector('.nav-col');
  let tabLabels = [];
  if (navCol) {
    const navLinks = navCol.querySelectorAll('.nav-link');
    tabLabels = Array.from(navLinks).map(link => {
      // Only the text before the span.tabArrow, ignore icons/arrows
      let label = '';
      for (const child of link.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          label += child.textContent;
        }
      }
      return label.trim();
    });
  }

  // Extract tab panes (content for each tab)
  const tabContentArea = element.querySelector('.tab-content');
  let tabPanes = [];
  if (tabContentArea) {
    tabPanes = Array.from(tabContentArea.querySelectorAll('[role="tabpanel"]'));
  }

  // Compose rows for each tab: [Tab Label, Tab Content]
  const rows = [];
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i] || '';
    // Defensive: in case the pane is missing
    let content = '';
    if (tabPanes[i]) {
      // Use the first child of the tab panel as the whole content block
      // (airport_stats_card)
      content = tabPanes[i].firstElementChild || '';
    }
    rows.push([label, content]);
  }

  // Build the table structure
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
