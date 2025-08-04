/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: returns a DocumentFragment with the text/cta content for a slide
  function createTextCell(bannerContent) {
    const frag = document.createDocumentFragment();
    if (!bannerContent) return frag;

    // <label> as small heading, wrap in <div> for proper line break
    const label = bannerContent.querySelector('label');
    if (label && label.textContent.trim()) {
      const div = document.createElement('div');
      div.textContent = label.textContent;
      frag.appendChild(div);
    }

    // <h3> as main heading, upgrade to <h2> for semantic structure
    const heading = bannerContent.querySelector('h3');
    if (heading && heading.textContent.trim()) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      frag.appendChild(h2);
    }

    // <p> as description, if present
    const desc = bannerContent.querySelector('p');
    if (desc && desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent;
      frag.appendChild(p);
    }

    // CTA: find .more_link (if present)
    const cta = bannerContent.querySelector('.more_link');
    if (cta && cta.textContent.trim()) {
      // parent <a> (the slide link)
      const parentA = bannerContent.closest('a');
      if (parentA && parentA.href) {
        const link = document.createElement('a');
        link.href = parentA.href;
        link.textContent = cta.textContent;
        if (parentA.hasAttribute('target')) link.target = parentA.target;
        frag.appendChild(link);
      } else {
        // fallback: just text if no <a>
        const span = document.createElement('span');
        span.textContent = cta.textContent;
        frag.appendChild(span);
      }
    }

    return frag;
  }

  // The table header row, per requirements
  const headerRow = ['Carousel'];
  const rows = [headerRow];

  // Get all .banner_ads slides in DOM order
  const banners = element.querySelectorAll('.banner_ads');
  banners.forEach(banner => {
    // Always reference the img directly (do not clone)
    const img = banner.querySelector('img');
    // Always reference .banner_content directly
    const bannerContent = banner.querySelector('.banner_content');
    // Compose the slide row: [image, text cell]
    rows.push([
      img,
      createTextCell(bannerContent)
    ]);
  });

  // Create the table and replace the old element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
