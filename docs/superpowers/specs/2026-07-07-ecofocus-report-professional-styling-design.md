# EcoFocus Reports Professional Styling - Design Specification

**Date:** July 7, 2026  
**Project:** Apply corporate executive styling to EcoFocus PDF reports  
**Reports:** Executive Report & Operational Report  
**Aesthetic:** Corporate Executive (McKinsey/BCG style)  
**Approach:** CSS-only enhancement to existing Playwright pipeline

---

## Executive Summary

Transform two EcoFocus reports (Executive and Operational) from basic formatted documents into polished, corporate-grade PDFs suitable for C-suite presentation. Implementation uses the existing Node.js + Playwright pipeline with enhanced CSS styling, cover page generation, and professional typography. Both reports will have identical styling using official Roche brand colors.

**Scope:**
- Remove AI attribution lines from markdown source files
- Replace CSS with sophisticated corporate styling system
- Generate professional cover pages with Roche branding
- Add headers/footers with page numbers and metadata
- Implement refined typography and spacing
- Maintain existing build pipeline (no new dependencies)

---

## Visual Design System

### Brand Colors (Official Roche Palette)

**Primary:**
- **Roche Blue:** `#007AC2` (Pantone PMS 300)
  - Used for: Headers (H2), cover page accents, borders, blockquote accents
- **White:** `#FFFFFF`
  - Used for: Primary backgrounds, negative space

**Supporting Palette:**
- **Charcoal:** `#1a1a1a` - Body text, H1/H3/strong elements
- **Medium Gray:** `#4a4a4a` - H4 headers, secondary text
- **Light Gray:** `#f5f5f5` - Table headers, subtle backgrounds
- **Very Light Gray:** `#fafafa` - Alternating table rows, blockquote backgrounds
- **Border Gray:** `#e0e0e0` - Dividers, table borders, horizontal rules

### Typography System

**Font Stack:**
```
'Helvetica Neue', 'Segoe UI', Arial, sans-serif
```
Corporate-grade system fonts ensuring consistent cross-platform rendering.

**Type Scale:**

| Element | Size | Weight | Color | Use Case |
|---------|------|--------|-------|----------|
| Cover Title | 32pt | Bold (700) | Roche Blue | Cover page main title |
| H1 | 24pt | Bold (700) | Charcoal | Document title (content pages) |
| H2 | 18pt | Semi-bold (600) | Roche Blue | Major sections |
| H3 | 14pt | Semi-bold (600) | Charcoal | Subsections |
| H4 | 12pt | Semi-bold (600) | Medium Gray | Minor headings |
| Body | 11pt | Regular (400) | Charcoal | Paragraph text |
| Metadata | 10pt | Regular (400) | Medium Gray | Cover page info, captions |
| Table | 10pt | Regular (400) | Charcoal | Table content |
| Footer | 9pt | Regular (400) | Medium Gray | Page numbers, notices |

**Line Heights:**
- Body text: 1.6 (optimal readability)
- Headers: 1.3 (tighter, cleaner)
- Tables: 1.4 (balanced density)

---

## Page Layout & Structure

### Page Geometry

**Standard Pages (Content):**
- Size: A4 (210mm × 297mm)
- Top margin: 35mm (includes 15mm header space)
- Bottom margin: 25mm (includes footer space)
- Left/Right margins: 25mm (generous executive-friendly spacing)
- Content area: 160mm × 237mm

**Cover Page:**
- Size: A4
- Margins: 0 (full-bleed design)
- Internal content margins: 40mm left, 60mm top

### Cover Page Design

**Structure (Three Sections):**

**1. Top Section (Upper 40% of page)**
- Clean white background
- Roche Blue vertical accent bar (8mm wide, full height, left edge)
- Document type badge in upper-right area
  - Badge: Light gray box, 10pt uppercase text
  - Content: "EXECUTIVE REPORT" or "OPERATIONAL REPORT"

**2. Middle Section (40% of page)**
- Main title: 32pt Bold, Roche Blue, left-aligned (40mm from left edge)
- Subtitle/tagline: 18pt Regular, Charcoal
- Generous vertical spacing (30mm between title and subtitle)
- Left-aligned with 40mm left margin

**3. Bottom Section (Lower 20% of page)**
- Thin horizontal divider line (1pt, Border Gray)
- Metadata grid (2-column layout):
  - **Left column:** Labels (Date, Organization, Audience)
  - **Right column:** Values
  - **Styling:** 10pt, Medium Gray labels, Charcoal values
- Footer notice: "CONFIDENTIAL - INTERNAL USE ONLY" (9pt, centered, Medium Gray)

**Visual Elements:**
- Roche Blue accent bar: `position: absolute; left: 0; top: 0; width: 8mm; height: 100%; background: #007AC2;`
- Page break after cover to ensure content starts on page 2

---

## Headers & Footers (Running Elements)

### Page Headers (Pages 2+)

**Layout:**
- **Left side:** Document title (e.g., "EcoFocus Executive Report")
- **Right side:** Current section name (most recent H2 heading)
- **Separator:** Thin border-bottom (0.5pt, Border Gray)

**Styling:**
- Font: 9pt Regular, Medium Gray
- Height: 15mm from physical page top
- Padding: 5mm bottom (above border)

**Implementation:**
Using CSS running headers via `@page` margin boxes with named strings:
```css
h1 { string-set: doc-title content(); }
h2 { string-set: section-name content(); }

@page :not(:first) {
  @top-left { content: string(doc-title); }
  @top-right { content: string(section-name); }
}
```
The `string-set` property captures header content, and `string()` retrieves the most recent value on each page.

### Page Footers (All Pages)

**Layout:**
- **Left side:** Date (e.g., "July 7, 2026")
- **Center:** Page numbering (e.g., "Page 3" or "3")
- **Right side:** Confidentiality notice (e.g., "Internal Use Only")
- **Separator:** Thin border-top (0.5pt, Border Gray)

**Styling:**
- Font: 9pt Regular, Medium Gray
- Height: 20mm from physical page bottom
- Padding: 5mm top (below border)

**Cover Page Exception:**
- No header on cover page
- Minimal footer: only confidentiality notice, no page number

**Implementation:**
```css
@page :not(:first) {
  @bottom-left { content: "July 7, 2026"; }
  @bottom-center { content: "Page " counter(page); }
  @bottom-right { content: "Internal Use Only"; }
}
```
Note: Date is hardcoded in CSS for simplicity. Can be made dynamic via JavaScript-injected `<meta>` tag if needed.

---

## Content Styling Specifications

### Paragraph & Text

**Paragraphs:**
- Font: 11pt Regular, Charcoal
- Line-height: 1.6
- Text-align: left (not justified - cleaner for executive reading)
- Margin-bottom: 12pt
- Orphans: 3 (minimum lines at bottom of page)
- Widows: 3 (minimum lines at top of page)

**Strong/Bold:**
- Font-weight: 600 (semi-bold)
- Color: Charcoal (#1a1a1a)

**Emphasis/Italic:**
- Font-style: italic
- Color: inherit

**Links:**
- Color: Roche Blue (#007AC2)
- Text-decoration: none
- Hover: underline

### Headings

**H1 (Document Title - Content Pages):**
- Font: 24pt Bold, Charcoal
- Margin: 0 top, 20pt bottom
- Page-break-after: avoid

**H2 (Major Sections):**
- Font: 18pt Semi-bold, Roche Blue
- Margin: 24pt top, 14pt bottom
- Border-bottom: 3pt solid Roche Blue
- Padding-bottom: 6pt
- Page-break-after: avoid

**H3 (Subsections):**
- Font: 14pt Semi-bold, Charcoal
- Margin: 18pt top, 12pt bottom
- Page-break-after: avoid

**H4 (Minor Headings):**
- Font: 12pt Semi-bold, Medium Gray
- Margin: 14pt top, 10pt bottom
- Page-break-after: avoid

### Tables

**Table Container:**
- Border-collapse: collapse
- Width: 100%
- Margin: 16pt top/bottom
- Page-break-inside: avoid (keeps tables together)

**Table Headers (th):**
- Background: Light Gray (#f5f5f5)
- Font: 10pt Semi-bold, Roche Blue
- Text-align: left
- Vertical-align: top
- Padding: 8pt vertical, 10pt horizontal
- Border: 1pt solid Border Gray (#e0e0e0)

**Table Cells (td):**
- Font: 10pt Regular, Charcoal
- Text-align: left
- Vertical-align: top
- Padding: 8pt vertical, 10pt horizontal
- Border: 1pt solid Border Gray (#e0e0e0)

**Alternating Rows:**
- Even rows: Very Light Gray background (#fafafa)
- Odd rows: White background

### Lists

**Unordered Lists (ul):**
- Margin: 12pt bottom
- Padding-left: 20pt
- List-style: disc (default bullets)

**Ordered Lists (ol):**
- Margin: 12pt bottom
- Padding-left: 20pt
- List-style: decimal

**List Items (li):**
- Margin-bottom: 8pt
- Page-break-inside: avoid

**Emoji Bullets:**
- Preserved as-is (✅ ⏸️ 🔴 🟡 🟢)
- No additional styling needed

### Blockquotes

**Styling:**
- Border-left: 4pt solid Roche Blue
- Background: Very Light Gray (#f9f9f9)
- Padding: 12pt all sides, 16pt left (accounts for border)
- Margin: 16pt top/bottom
- Font-style: italic
- Color: Medium Gray (#555)
- Page-break-inside: avoid

### Code Elements

**Inline Code:**
- Background: Light Gray (#f4f4f4)
- Padding: 2pt vertical, 5pt horizontal
- Border-radius: 3pt
- Font: 9.5pt 'Courier New', Consolas, monospace
- Color: #c7254e (distinct code color)

**Code Blocks (pre):**
- Background: Light Gray (#f4f4f4)
- Padding: 12pt
- Border-radius: 4pt
- Border: 1pt solid Border Gray (#ddd)
- Overflow-x: auto (horizontal scroll if needed)
- Page-break-inside: avoid

**Code within pre:**
- Background: transparent
- Padding: 0
- Color: Charcoal

### Horizontal Rules

**Styling:**
- Border: none
- Border-top: 1pt solid Border Gray (#ddd)
- Margin: 24pt top/bottom

---

## Implementation Plan

### Phase 1: Remove Attribution Lines

**Files to modify:**
- `docs/EcoFocus/02-analysing/executive-report.md` (line 291)
- `docs/EcoFocus/02-analysing/operational-report.md` (line 564)

**Action:**
Delete the line: `🤖 **Generated with Claude Code using neat-discovery-analysing skill**`

### Phase 2: Enhance Convert Script

**File:** `docs/documents/EcoFocus/.assets/convert-reports.js`

**Modifications:**

1. **Add metadata extraction function**
   - Parse markdown frontmatter (title, date, audience, prepared for)
   - Extract document type from filename
   - Return structured metadata object

2. **Add cover page generation function**
   ```javascript
   function generateCoverPage(metadata) {
     return `
       <div class="cover-page">
         <div class="accent-bar"></div>
         <div class="cover-content">
           <div class="document-type">${metadata.type}</div>
           <h1 class="cover-title">${metadata.title}</h1>
           <div class="metadata-grid">
             <div class="metadata-row">
               <span class="label">Date:</span>
               <span class="value">${metadata.date}</span>
             </div>
             <!-- Additional metadata rows -->
           </div>
           <div class="cover-footer">CONFIDENTIAL - INTERNAL USE ONLY</div>
         </div>
       </div>
     `;
   }
   ```

3. **Replace CSS with corporate styling**
   - Remove existing `<style>` block
   - Insert new CSS with all specifications from this design doc
   - Include `@page` rules for headers/footers
   - Add cover page-specific styles

4. **Update HTML generation**
   - Extract metadata from markdown
   - Generate cover page HTML
   - Concatenate: cover page + content
   - Wrap in `createHtmlDocument()`

### Phase 3: CSS Implementation

**CSS Structure:**

```css
/* Page setup */
@page { /* Standard pages */ }
@page :first { /* Cover page */ }
@page :not(:first) { /* Content pages with headers/footers */ }

/* Cover page styles */
.cover-page { /* Container */ }
.accent-bar { /* Roche Blue vertical bar */ }
.cover-title { /* Main title */ }
.metadata-grid { /* Info layout */ }

/* Typography */
body { /* Base font */ }
h1, h2, h3, h4 { /* Headers */ }
p { /* Paragraphs */ }

/* Content elements */
table { /* Tables */ }
ul, ol, li { /* Lists */ }
blockquote { /* Quotes */ }
code, pre { /* Code */ }

/* Utilities */
.page-break { page-break-after: always; }
.avoid-break { page-break-inside: avoid; }
```

**Key CSS Features:**
- `-webkit-print-color-adjust: exact;` and `print-color-adjust: exact;` (ensures colors render in PDF)
- Orphans/widows control for professional pagination
- Page-break-after: avoid on headers (prevents orphaned headers)
- Page-break-inside: avoid on tables, blockquotes, code blocks

### Phase 4: Testing & Validation

**Test checklist:**
1. Generate both PDFs
2. Verify cover pages render correctly
3. Check headers/footers on all pages
4. Confirm page breaks don't orphan content
5. Validate table formatting across page boundaries
6. Review typography hierarchy
7. Ensure colors match Roche brand (#007AC2)
8. Confirm attribution lines removed
9. Check file sizes remain reasonable (< 500KB each)

**Validation criteria:**
- ✅ Cover page displays all metadata
- ✅ Headers show document title and section name
- ✅ Footers show date, page number, confidentiality notice
- ✅ Roche Blue (#007AC2) used consistently
- ✅ Tables don't break mid-row
- ✅ No orphaned headers (header without following content)
- ✅ Professional spacing and typography throughout
- ✅ No AI attribution lines in output

---

## File Structure

```
docs/
├── EcoFocus/
│   └── 02-analysing/
│       ├── executive-report.md          [EDIT: Remove line 291]
│       └── operational-report.md        [EDIT: Remove line 564]
└── documents/
    └── EcoFocus/
        ├── executive-report.pdf         [OUTPUT: Professional styled]
        ├── operational-report.pdf       [OUTPUT: Professional styled]
        └── .assets/
            ├── convert-reports.js       [EDIT: Major CSS/HTML updates]
            ├── executive-report.html    [OUTPUT: Intermediate HTML]
            └── operational-report.html  [OUTPUT: Intermediate HTML]
```

---

## Success Criteria

**Visual Quality:**
- Reports look indistinguishable from high-end consulting firm deliverables
- Consistent Roche brand application throughout
- Professional typography with no awkward breaks or spacing
- Tables and content elements properly formatted

**Technical Quality:**
- PDFs generate without errors
- File sizes remain under 500KB each
- No browser console warnings during generation
- HTML validates (no broken tags or structure issues)

**Content Quality:**
- All markdown content preserved accurately
- No attribution lines in final PDFs
- Metadata correctly extracted and displayed on cover pages
- Cross-references and links intact (if any)

---

## Maintenance & Future Considerations

**Reusability:**
This styling system can be reused for future EcoFocus reports by:
1. Creating new markdown files following the same frontmatter structure
2. Running the convert script (no modifications needed)
3. Cover page auto-generates from markdown metadata

**Customization Points:**
- Brand colors: Single variable change in CSS
- Typography: Font stack and scale centralized at top of CSS
- Cover page layout: Isolated in `generateCoverPage()` function
- Headers/footers: Controlled by `@page` rules

**Potential Enhancements (Future):**
- Table of contents generation
- PDF bookmarks for major sections
- Automated chart/graph styling
- Multi-language support
- Dynamic watermarks for draft vs. final versions

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| CSS @page browser compatibility | Headers/footers don't render | Playwright/Chromium has excellent @page support; tested widely |
| Page breaks split tables awkwardly | Poor readability | Use `page-break-inside: avoid` on all tables |
| File size bloat from styling | Slow downloads | CSS is minimal; no embedded fonts or large images |
| Metadata extraction fails | Cover page missing info | Fallback to filename-based defaults if parse fails |
| Color rendering in PDF | Roche Blue doesn't match | Use `print-color-adjust: exact` flag |

---

## Appendix: Roche Brand Colors Reference

**Primary Color:**
- **Roche Blue**
  - HEX: `#007AC2`
  - RGB: `rgb(0, 122, 194)`
  - CMYK: `100, 37, 0, 24`
  - Pantone: PMS 300C

**Supporting Colors (Corporate Use):**
- White
- Black
- Roche Grey (Cool Gray 5)

**Source:**
Official Roche Brand Center: https://brand.roche.com/our-identity/what-you-see/our-design/colours.htm

---

**End of Design Specification**
