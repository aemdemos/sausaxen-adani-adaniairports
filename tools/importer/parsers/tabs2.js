/* global WebImporter */
export default function parse(element, { document }) {
  // Find all main nav menu items (these will be the tabs)
  const mainNavItems = element.querySelectorAll('ul.navbar-menu > li.main-mav');
  const rows = [];
  mainNavItems.forEach((navItem) => {
    // Tab Label: text content of the main link
    const link = navItem.querySelector(':scope > a.link_item');
    let tabLabel = '';
    if (link) tabLabel = link.textContent.trim();
    // Tab Content: everything in the submenu if present
    let tabContent;
    const submenu = navItem.querySelector(':scope > .submenu');
    tabContent = submenu || '';
    rows.push([tabLabel, tabContent]);
  });

  // Create data rows (no header row for createTable)
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Create thead and header row manually with colspan=2
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Tabs';
  th.setAttribute('colspan', '2');
  headerRow.appendChild(th);
  thead.appendChild(headerRow);

  // Insert thead as the first child of the table
  table.insertBefore(thead, table.firstChild);
  element.replaceWith(table);
}
