/* global WebImporter */
export default function parse(element, { document }) {
  // Get all top-level nav items
  const mainNavs = Array.from(element.querySelectorAll('ul.navbar-menu > li.main-mav'));

  // Header row: block name, single cell
  const headerRow = ['Tabs (tabs15)'];

  // Build rows: [tab label, tab content]
  const tabRows = mainNavs.map((li) => {
    // Tab label: menu link text
    const link = li.querySelector(':scope > a.link_item');
    const tabLabel = link ? link.textContent.trim() : '';
    // Tab content: the submenu (prefer inner .container if present)
    let tabContent = '';
    const submenu = li.querySelector(':scope > .submenu');
    if (submenu) {
      const container = submenu.querySelector(':scope > .container.scrollbar_y');
      tabContent = container ? container : submenu;
    }
    return [tabLabel, tabContent];
  });

  // Compose table rows
  const cells = [headerRow, ...tabRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}