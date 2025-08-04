/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row - exactly as specified in the example
  const headerRow = ['Hero'];

  // 2. Background row: video as a link if present
  let backgroundCell = '';
  const video = element.querySelector('video');
  if (video) {
    const source = video.querySelector('source');
    if (source && source.getAttribute('src')) {
      const src = source.getAttribute('src');
      const a = document.createElement('a');
      a.href = src;
      a.textContent = src;
      backgroundCell = a;
    }
  }

  // 3. Text content row: gather any text content (semantically meaningful)
  // This block may contain text overlays, captions, etc. in the element tree.
  // We'll gather all text nodes outside of <video>/<source>
  const textElems = [];
  function collectText(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (['VIDEO', 'SOURCE', 'SCRIPT', 'STYLE'].includes(node.tagName)) return;
      // Preserve heading structure and paragraphs
      if (/^H[1-6]$/.test(node.tagName)) {
        textElems.push(node);
      } else if (node.tagName === 'P') {
        textElems.push(node);
      } else {
        // Traverse children
        node.childNodes.forEach(collectText);
      }
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      // Raw text not inside a heading or paragraph - wrap in <p>
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      textElems.push(p);
    }
  }
  collectText(element);
  // If no text was found, leave the cell blank
  const textRow = [textElems.length ? textElems : ''];

  const cells = [headerRow, [backgroundCell], textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
