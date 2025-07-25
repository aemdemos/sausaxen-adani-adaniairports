/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion items in the aside > ul.mission_list_item
  const aside = element.querySelector('aside');
  const ul = aside && aside.querySelector('ul.mission_list_item');
  if (!ul) return;
  const lis = Array.from(ul.children);

  // Header row for Accordion
  const rows = [['Accordion']];

  // Each li has a <span> for number and <p> for content
  lis.forEach(li => {
    const span = li.querySelector('span');
    const p = li.querySelector('p');
    // Defensive: skip if missing crucial data
    if (!span || !p) return;
    // Title: number (span) as heading, bold (semantically, use strong)
    const strong = document.createElement('strong');
    strong.textContent = span.textContent.trim();
    // Use <strong>number</strong> as title cell
    rows.push([
      strong,
      p
    ]);
  });

  // Create the Accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
