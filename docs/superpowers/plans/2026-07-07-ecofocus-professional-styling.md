# EcoFocus Reports Professional Styling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform EcoFocus Executive and Operational reports into polished, corporate-grade PDFs with Roche branding, professional typography, cover pages, and headers/footers.

**Architecture:** CSS-only enhancement to existing Node.js + Playwright pipeline. Add metadata extraction, cover page HTML generation, and replace CSS with corporate styling system. No new dependencies.

**Tech Stack:** Node.js, Playwright, vanilla CSS with @page rules for print styling

## Global Constraints

- Roche Blue brand color: `#007AC2` (Pantone PMS 300)
- Font stack: `'Helvetica Neue', 'Segoe UI', Arial, sans-serif`
- Page size: A4 (210mm × 297mm)
- No new npm dependencies
- Maintain existing Playwright PDF generation pipeline
- Both reports receive identical styling

---

## Task 1: Remove Attribution Lines from Markdown Sources

**Files:**
- Modify: `docs/EcoFocus/02-analysing/executive-report.md:291`
- Modify: `docs/EcoFocus/02-analysing/operational-report.md:564`

**Interfaces:**
- Consumes: Existing markdown report files
- Produces: Clean markdown without AI attribution footer

---

- [ ] **Step 1: Verify attribution line location in executive report**

Run:
```bash
grep -n "Generated with Claude Code" docs/EcoFocus/02-analysing/executive-report.md
```

Expected output:
```
291:🤖 **Generated with Claude Code using neat-discovery-analysing skill**
```

- [ ] **Step 2: Remove attribution line from executive report**

Delete line 291 from `docs/EcoFocus/02-analysing/executive-report.md`:
```
🤖 **Generated with Claude Code using neat-discovery-analysing skill**
```

- [ ] **Step 3: Verify attribution line location in operational report**

Run:
```bash
grep -n "Generated with Claude Code" docs/EcoFocus/02-analysing/operational-report.md
```

Expected output:
```
564:🤖 **Generated with Claude Code using neat-discovery-analysing skill**
```

- [ ] **Step 4: Remove attribution line from operational report**

Delete line 564 from `docs/EcoFocus/02-analysing/operational-report.md`:
```
🤖 **Generated with Claude Code using neat-discovery-analysing skill**
```

- [ ] **Step 5: Verify attribution lines removed**

Run:
```bash
grep -r "Generated with Claude Code" docs/EcoFocus/02-analysing/
```

Expected: No output (no matches found)

- [ ] **Step 6: Commit the changes**

```bash
git add docs/EcoFocus/02-analysing/executive-report.md docs/EcoFocus/02-analysing/operational-report.md
git commit -m "docs: remove AI attribution lines from EcoFocus reports"
```

---

## Task 2: Add Metadata Extraction Function

**Files:**
- Modify: `docs/documents/EcoFocus/.assets/convert-reports.js:12-13` (after markdown read)

**Interfaces:**
- Consumes: Raw markdown string from file read
- Produces: `extractMetadata(markdown, filename)` function returning `{ title, date, organization, audience, preparedFor, purpose, type }`

---

- [ ] **Step 1: Add metadata extraction function**

Insert after line 13 in `docs/documents/EcoFocus/.assets/convert-reports.js`:

```javascript
// Extract metadata from markdown content
function extractMetadata(markdown, filename) {
  const lines = markdown.split('\n');
  const metadata = {
    title: '',
    date: '',
    organization: '',
    audience: '',
    preparedFor: '',
    purpose: '',
    type: filename.includes('executive') ? 'EXECUTIVE REPORT' : 'OPERATIONAL REPORT'
  };

  // Extract title from first H1
  const titleMatch = markdown.match(/^# (.+)$/m);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }

  // Extract metadata from bold key-value pairs
  const dateMatch = markdown.match(/\*\*Date:\*\*\s*(.+)/);
  if (dateMatch) metadata.date = dateMatch[1].trim();

  const orgMatch = markdown.match(/\*\*Organization:\*\*\s*(.+)/);
  if (orgMatch) metadata.organization = orgMatch[1].trim();

  const audienceMatch = markdown.match(/\*\*Audience:\*\*\s*(.+)/);
  if (audienceMatch) metadata.audience = audienceMatch[1].trim();

  const preparedForMatch = markdown.match(/\*\*Prepared For:\*\*\s*(.+)/);
  if (preparedForMatch) metadata.preparedFor = preparedForMatch[1].trim();

  const purposeMatch = markdown.match(/\*\*Purpose:\*\*\s*(.+)/);
  if (purposeMatch) metadata.purpose = purposeMatch[1].trim();

  const strategicGoalMatch = markdown.match(/\*\*Strategic Goal:\*\*\s*(.+)/);
  if (strategicGoalMatch) metadata.purpose = strategicGoalMatch[1].trim();

  return metadata;
}
```

- [ ] **Step 2: Test metadata extraction with executive report**

Add temporary test code after the function:

```javascript
// Temporary test
const execMetadata = extractMetadata(executiveMarkdown, 'executive-report');
console.log('Executive metadata:', execMetadata);
```

- [ ] **Step 3: Run script to verify extraction**

Run:
```bash
cd docs/documents/EcoFocus/.assets
node convert-reports.js
```

Expected console output should show:
```
Executive metadata: {
  title: 'EcoFocus Executive Report: Accelerating Global ESG Targets via AI Knowledge Extraction',
  date: 'July 7, 2026',
  organization: 'Roche (Global Operations & Sustainability)',
  ...
}
```

- [ ] **Step 4: Remove test code**

Delete the temporary console.log test code added in Step 2.

- [ ] **Step 5: Commit metadata extraction function**

```bash
git add docs/documents/EcoFocus/.assets/convert-reports.js
git commit -m "feat: add metadata extraction from markdown reports"
```

---

## Task 3: Add Cover Page Generation Function

**Files:**
- Modify: `docs/documents/EcoFocus/.assets/convert-reports.js` (after `extractMetadata` function)

**Interfaces:**
- Consumes: `metadata` object from `extractMetadata()` with shape `{ title, date, organization, audience, preparedFor, purpose, type }`
- Produces: `generateCoverPage(metadata)` function returning HTML string for cover page

---

- [ ] **Step 1: Add cover page generation function**

Insert after the `extractMetadata` function in `docs/documents/EcoFocus/.assets/convert-reports.js`:

```javascript
// Generate professional cover page HTML
function generateCoverPage(metadata) {
  return `
    <div class="cover-page">
      <div class="accent-bar"></div>
      <div class="cover-content">
        <div class="document-type-badge">${metadata.type}</div>
        <h1 class="cover-title">${metadata.title}</h1>
        <div class="metadata-section">
          <div class="metadata-divider"></div>
          <div class="metadata-grid">
            ${metadata.date ? `
            <div class="metadata-row">
              <span class="metadata-label">Date:</span>
              <span class="metadata-value">${metadata.date}</span>
            </div>` : ''}
            ${metadata.organization ? `
            <div class="metadata-row">
              <span class="metadata-label">Organization:</span>
              <span class="metadata-value">${metadata.organization}</span>
            </div>` : ''}
            ${metadata.audience ? `
            <div class="metadata-row">
              <span class="metadata-label">Audience:</span>
              <span class="metadata-value">${metadata.audience}</span>
            </div>` : ''}
            ${metadata.preparedFor ? `
            <div class="metadata-row">
              <span class="metadata-label">Prepared For:</span>
              <span class="metadata-value">${metadata.preparedFor}</span>
            </div>` : ''}
            ${metadata.purpose ? `
            <div class="metadata-row">
              <span class="metadata-label">Purpose:</span>
              <span class="metadata-value">${metadata.purpose}</span>
            </div>` : ''}
          </div>
          <div class="cover-footer">CONFIDENTIAL - INTERNAL USE ONLY</div>
        </div>
      </div>
    </div>
    <div class="page-break"></div>
  `;
}
```

- [ ] **Step 2: Test cover page generation**

Add temporary test code:

```javascript
// Temporary test
const execMetadata = extractMetadata(executiveMarkdown, 'executive-report');
const coverHtml = generateCoverPage(execMetadata);
console.log('Cover page HTML length:', coverHtml.length);
console.log('Contains accent-bar:', coverHtml.includes('accent-bar'));
console.log('Contains cover-title:', coverHtml.includes('cover-title'));
```

- [ ] **Step 3: Run script to verify generation**

Run:
```bash
cd docs/documents/EcoFocus/.assets
node convert-reports.js
```

Expected output:
```
Cover page HTML length: [some number > 500]
Contains accent-bar: true
Contains cover-title: true
```

- [ ] **Step 4: Remove test code**

Delete the temporary test code.

- [ ] **Step 5: Commit cover page generation function**

```bash
git add docs/documents/EcoFocus/.assets/convert-reports.js
git commit -m "feat: add cover page HTML generation with Roche branding"
```

---

## Task 4: Replace CSS with Corporate Styling System

**Files:**
- Modify: `docs/documents/EcoFocus/.assets/convert-reports.js:136-303` (entire `<style>` block in `createHtmlDocument` function)

**Interfaces:**
- Consumes: HTML document structure from `createHtmlDocument()` function
- Produces: Complete CSS with Roche branding, @page rules, cover page styles, typography, and content element styling

---

- [ ] **Step 1: Replace the entire style block**

Replace lines 136-303 in `docs/documents/EcoFocus/.assets/convert-reports.js` with:

```css
    @page {
      size: A4;
      margin: 35mm 25mm 25mm 25mm;
    }

    @page :first {
      margin: 0;
    }

    h1 { string-set: doc-title content(); }
    h2 { string-set: section-name content(); }

    @page :not(:first) {
      @top-left { 
        content: string(doc-title); 
        font-size: 9pt;
        font-weight: 400;
        color: #4a4a4a;
        padding-bottom: 5mm;
        border-bottom: 0.5pt solid #e0e0e0;
      }
      @top-right { 
        content: string(section-name); 
        font-size: 9pt;
        font-weight: 400;
        color: #4a4a4a;
        padding-bottom: 5mm;
        border-bottom: 0.5pt solid #e0e0e0;
      }
      @bottom-left { 
        content: "July 7, 2026"; 
        font-size: 9pt;
        font-weight: 400;
        color: #4a4a4a;
        padding-top: 5mm;
        border-top: 0.5pt solid #e0e0e0;
      }
      @bottom-center { 
        content: "Page " counter(page); 
        font-size: 9pt;
        font-weight: 400;
        color: #4a4a4a;
        padding-top: 5mm;
        border-top: 0.5pt solid #e0e0e0;
      }
      @bottom-right { 
        content: "Internal Use Only"; 
        font-size: 9pt;
        font-weight: 400;
        color: #4a4a4a;
        padding-top: 5mm;
        border-top: 0.5pt solid #e0e0e0;
      }
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      font-family: 'Helvetica Neue', 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      margin: 0;
      padding: 0;
      font-size: 11pt;
    }

    /* Cover Page Styles */
    .cover-page {
      position: relative;
      width: 210mm;
      height: 297mm;
      background: white;
      page-break-after: always;
    }

    .accent-bar {
      position: absolute;
      left: 0;
      top: 0;
      width: 8mm;
      height: 100%;
      background: #007AC2;
    }

    .cover-content {
      padding: 60mm 40mm 40mm 40mm;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .document-type-badge {
      position: absolute;
      top: 30mm;
      right: 40mm;
      background: #f5f5f5;
      padding: 8pt 16pt;
      font-size: 10pt;
      font-weight: 400;
      color: #4a4a4a;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }

    .cover-title {
      font-size: 32pt;
      font-weight: 700;
      color: #007AC2;
      line-height: 1.3;
      margin: 0 0 30mm 0;
    }

    .metadata-section {
      margin-top: auto;
    }

    .metadata-divider {
      border-top: 1pt solid #e0e0e0;
      margin-bottom: 20pt;
    }

    .metadata-grid {
      display: grid;
      grid-template-columns: 140pt 1fr;
      gap: 10pt 20pt;
      margin-bottom: 30pt;
    }

    .metadata-row {
      display: contents;
    }

    .metadata-label {
      font-size: 10pt;
      font-weight: 600;
      color: #4a4a4a;
    }

    .metadata-value {
      font-size: 10pt;
      font-weight: 400;
      color: #1a1a1a;
    }

    .cover-footer {
      text-align: center;
      font-size: 9pt;
      color: #4a4a4a;
      margin-top: 20pt;
    }

    /* Typography - Headers */
    h1 {
      font-size: 24pt;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 20pt;
      color: #1a1a1a;
      page-break-after: avoid;
      line-height: 1.3;
    }

    h2 {
      font-size: 18pt;
      font-weight: 600;
      margin-top: 24pt;
      margin-bottom: 14pt;
      color: #007AC2;
      page-break-after: avoid;
      border-bottom: 3pt solid #007AC2;
      padding-bottom: 6pt;
      line-height: 1.3;
    }

    h3 {
      font-size: 14pt;
      font-weight: 600;
      margin-top: 18pt;
      margin-bottom: 12pt;
      color: #1a1a1a;
      page-break-after: avoid;
      line-height: 1.3;
    }

    h4 {
      font-size: 12pt;
      font-weight: 600;
      margin-top: 14pt;
      margin-bottom: 10pt;
      color: #4a4a4a;
      page-break-after: avoid;
      line-height: 1.3;
    }

    /* Typography - Body */
    p {
      margin-bottom: 12pt;
      text-align: left;
      orphans: 3;
      widows: 3;
    }

    strong {
      font-weight: 600;
      color: #1a1a1a;
    }

    em {
      font-style: italic;
    }

    a {
      color: #007AC2;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Lists */
    ul, ol {
      margin-bottom: 12pt;
      padding-left: 20pt;
    }

    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal;
    }

    li {
      margin-bottom: 8pt;
      page-break-inside: avoid;
    }

    /* Tables */
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 16pt 0;
      page-break-inside: avoid;
      font-size: 10pt;
      line-height: 1.4;
    }

    th, td {
      border: 1pt solid #e0e0e0;
      padding: 8pt 10pt;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #007AC2;
    }

    tr:nth-child(even) {
      background-color: #fafafa;
    }

    /* Blockquotes */
    blockquote {
      border-left: 4pt solid #007AC2;
      padding: 12pt 16pt;
      margin: 16pt 0;
      font-style: italic;
      color: #555;
      background-color: #f9f9f9;
      page-break-inside: avoid;
    }

    /* Horizontal Rules */
    hr {
      border: none;
      border-top: 1pt solid #e0e0e0;
      margin: 24pt 0;
    }

    /* Code */
    code {
      background-color: #f4f4f4;
      padding: 2pt 5pt;
      border-radius: 3pt;
      font-family: 'Courier New', Consolas, monospace;
      font-size: 9.5pt;
      color: #c7254e;
    }

    pre {
      background-color: #f4f4f4;
      padding: 12pt;
      border-radius: 4pt;
      overflow-x: auto;
      page-break-inside: avoid;
      border: 1pt solid #ddd;
    }

    pre code {
      background-color: transparent;
      padding: 0;
      color: #333;
    }

    /* Utilities */
    .page-break {
      page-break-after: always;
    }

    .avoid-break {
      page-break-inside: avoid;
    }
```

- [ ] **Step 2: Verify CSS replacement**

Check the file to ensure the style block was replaced:

```bash
grep -n "@page" docs/documents/EcoFocus/.assets/convert-reports.js | head -5
```

Expected: Should show line numbers with @page rules

- [ ] **Step 3: Verify Roche Blue color usage**

```bash
grep "#007AC2" docs/documents/EcoFocus/.assets/convert-reports.js | wc -l
```

Expected: Should show at least 5 occurrences (accent-bar, cover-title, h2, th, blockquote, links)

- [ ] **Step 4: Commit CSS styling system**

```bash
git add docs/documents/EcoFocus/.assets/convert-reports.js
git commit -m "feat: implement corporate styling with Roche branding

- Add @page rules for headers/footers
- Add cover page styling with accent bar
- Implement typography hierarchy
- Add professional table, list, and blockquote styles
- Use Roche Blue (#007AC2) brand color"
```

---

## Task 5: Update HTML Generation to Include Cover Pages

**Files:**
- Modify: `docs/documents/EcoFocus/.assets/convert-reports.js:334-367` (main function)

**Interfaces:**
- Consumes: `extractMetadata()`, `generateCoverPage()`, `markdownToHtml()`, `createHtmlDocument()` functions
- Produces: Complete HTML with cover page prepended to content for both reports

---

- [ ] **Step 1: Update executive report generation**

Replace the executive report generation section (around line 338-347) in the `main()` function:

```javascript
  // Executive Report
  console.log('1. Executive Report');
  
  // Extract metadata
  const executiveMetadata = extractMetadata(executiveMarkdown, 'executive-report');
  
  // Generate cover page and content
  const executiveCover = generateCoverPage(executiveMetadata);
  const executiveContent = markdownToHtml(executiveMarkdown);
  
  // Combine cover + content
  const executiveHtml = createHtmlDocument(
    'EcoFocus Executive Report: Accelerating Global ESG Targets via AI Knowledge Extraction',
    executiveCover + executiveContent
  );
  
  await generatePdf(
    executiveHtml,
    path.join(assetsDir, 'executive-report.html'),
    path.join(outputDir, 'executive-report.pdf')
  );
```

- [ ] **Step 2: Update operational report generation**

Replace the operational report generation section (around line 351-360) in the `main()` function:

```javascript
  // Operational Report
  console.log('2. Operational Report');
  
  // Extract metadata
  const operationalMetadata = extractMetadata(operationalMarkdown, 'operational-report');
  
  // Generate cover page and content
  const operationalCover = generateCoverPage(operationalMetadata);
  const operationalContent = markdownToHtml(operationalMarkdown);
  
  // Combine cover + content
  const operationalHtml = createHtmlDocument(
    'EcoFocus Operational Report: Implementation Impact & Departmental Benefits',
    operationalCover + operationalContent
  );
  
  await generatePdf(
    operationalHtml,
    path.join(assetsDir, 'operational-report.html'),
    path.join(outputDir, 'operational-report.pdf')
  );
```

- [ ] **Step 3: Verify the updated generation logic**

Check that both report sections now extract metadata and generate cover pages:

```bash
grep -A 15 "Executive Report" docs/documents/EcoFocus/.assets/convert-reports.js | grep "extractMetadata"
```

Expected: Should show extractMetadata call

- [ ] **Step 4: Commit HTML generation updates**

```bash
git add docs/documents/EcoFocus/.assets/convert-reports.js
git commit -m "feat: integrate cover page generation into report pipeline

- Extract metadata from markdown for each report
- Generate cover pages with metadata
- Prepend cover to content in HTML output"
```

---

## Task 6: Generate and Validate Professional PDFs

**Files:**
- Output: `docs/documents/EcoFocus/executive-report.pdf`
- Output: `docs/documents/EcoFocus/operational-report.pdf`
- Output: `docs/documents/EcoFocus/.assets/executive-report.html`
- Output: `docs/documents/EcoFocus/.assets/operational-report.html`

**Interfaces:**
- Consumes: Complete convert-reports.js script with all enhancements
- Produces: Professional PDFs with cover pages, headers, footers, and corporate styling

---

- [ ] **Step 1: Install dependencies (if not already installed)**

```bash
cd docs/documents/EcoFocus/.assets
npm install
```

Expected: playwright and dependencies installed

- [ ] **Step 2: Generate both PDFs**

```bash
cd docs/documents/EcoFocus/.assets
node convert-reports.js
```

Expected output:
```
Converting EcoFocus reports to PDF...

1. Executive Report
✓ HTML generated: executive-report.html
✓ PDF generated: executive-report.pdf ([size] KB)

2. Operational Report
✓ HTML generated: operational-report.html
✓ PDF generated: operational-report.pdf ([size] KB)

✓ All PDFs generated successfully

Output:
  PDFs: [path]/
  HTML: [path]/
```

- [ ] **Step 3: Verify PDF file sizes**

```bash
ls -lh docs/documents/EcoFocus/*.pdf
```

Expected: Both PDFs should be under 500KB each

- [ ] **Step 4: Open and visually inspect executive report PDF**

```bash
open docs/documents/EcoFocus/executive-report.pdf
```

Visual checklist:
- ✅ Cover page displays with Roche Blue accent bar on left
- ✅ Document type badge shows "EXECUTIVE REPORT"
- ✅ Title is 32pt, Roche Blue, properly formatted
- ✅ Metadata grid shows Date, Organization, Audience, Prepared For
- ✅ Footer shows "CONFIDENTIAL - INTERNAL USE ONLY"
- ✅ Page 2 starts content with header showing document title
- ✅ Headers on top of each page (left: doc title, right: section name)
- ✅ Footers on each page (left: date, center: page number, right: "Internal Use Only")
- ✅ H2 headers have Roche Blue color with bottom border
- ✅ Tables have light gray headers with Roche Blue text
- ✅ No attribution lines visible

- [ ] **Step 5: Open and visually inspect operational report PDF**

```bash
open docs/documents/EcoFocus/operational-report.pdf
```

Visual checklist:
- ✅ Cover page displays with Roche Blue accent bar on left
- ✅ Document type badge shows "OPERATIONAL REPORT"
- ✅ Title is 32pt, Roche Blue, properly formatted
- ✅ Metadata grid shows Date, Audience, Purpose
- ✅ Footer shows "CONFIDENTIAL - INTERNAL USE ONLY"
- ✅ Page 2 starts content with header
- ✅ Headers and footers consistent with executive report
- ✅ Styling identical to executive report
- ✅ No attribution lines visible

- [ ] **Step 6: Verify no attribution lines in PDFs**

```bash
pdftotext docs/documents/EcoFocus/executive-report.pdf - | grep -i "generated with claude"
pdftotext docs/documents/EcoFocus/operational-report.pdf - | grep -i "generated with claude"
```

Expected: No output (attribution lines not found)

If `pdftotext` is not installed, skip this automated check and rely on visual inspection.

- [ ] **Step 7: Check intermediate HTML files**

```bash
grep "cover-page" docs/documents/EcoFocus/.assets/executive-report.html
grep "accent-bar" docs/documents/EcoFocus/.assets/operational-report.html
```

Expected: Both should show matches (cover page HTML present)

- [ ] **Step 8: Commit generated outputs**

```bash
git add docs/documents/EcoFocus/*.pdf docs/documents/EcoFocus/.assets/*.html
git commit -m "docs: generate professional EcoFocus reports with corporate styling

- Executive report PDF with Roche branding
- Operational report PDF with Roche branding
- Cover pages, headers, footers implemented
- Attribution lines removed
- Professional typography and spacing"
```

---

## Task 7: Final Validation and Documentation

**Files:**
- Create: `docs/documents/EcoFocus/.assets/README.md`

**Interfaces:**
- Consumes: Complete implementation
- Produces: Documentation for regenerating reports in the future

---

- [ ] **Step 1: Create README for report generation**

Create `docs/documents/EcoFocus/.assets/README.md`:

```markdown
# EcoFocus Report Generation

This directory contains the conversion script for generating professional PDF reports from markdown sources.

## Prerequisites

- Node.js (v14 or higher)
- npm packages: `playwright`

## Installation

```bash
npm install
```

## Generating Reports

```bash
node convert-reports.js
```

This will generate:
- `../executive-report.pdf` - Professional executive report with Roche branding
- `../operational-report.pdf` - Professional operational report with Roche branding
- `executive-report.html` - Intermediate HTML (for debugging)
- `operational-report.html` - Intermediate HTML (for debugging)

## Report Styling

Reports use corporate executive styling with:
- **Brand Colors:** Roche Blue (#007AC2), professional grays
- **Typography:** Helvetica Neue, Segoe UI, Arial
- **Cover Pages:** Full-bleed design with accent bar, metadata grid
- **Headers/Footers:** Document title, section names, page numbers
- **Page Size:** A4 (210mm × 297mm)

## Modifying Reports

1. Edit the markdown source files in `docs/EcoFocus/02-analysing/`
2. Run the conversion script
3. Review generated PDFs

## Markdown Metadata Format

The script extracts metadata from these patterns in the markdown:

```markdown
# Report Title

**Date:** July 7, 2026
**Organization:** Organization Name
**Audience:** Target Audience
**Prepared For:** Stakeholders
**Purpose:** Report purpose
```

## Troubleshooting

**PDFs not generating:**
- Ensure Playwright is installed: `npm install`
- Check console for error messages

**Styling issues:**
- Review intermediate HTML files
- Verify CSS in `convert-reports.js`

**Missing metadata on cover page:**
- Check markdown source for `**Key:** Value` patterns
- Verify `extractMetadata()` function logic
```

- [ ] **Step 2: Verify README creation**

```bash
cat docs/documents/EcoFocus/.assets/README.md | head -20
```

Expected: Should show README content

- [ ] **Step 3: Test report regeneration from scratch**

```bash
cd docs/documents/EcoFocus/.assets
rm -f ../executive-report.pdf ../operational-report.pdf
node convert-reports.js
ls -lh ../*.pdf
```

Expected: Both PDFs regenerated successfully

- [ ] **Step 4: Create final validation checklist**

Run through complete validation:

```bash
echo "=== Final Validation Checklist ==="
echo ""
echo "PDF Files:"
ls -lh docs/documents/EcoFocus/*.pdf
echo ""
echo "File sizes under 500KB:"
du -h docs/documents/EcoFocus/*.pdf | awk '{if ($1 ~ /K$/ && $1+0 < 500) print "✓", $2; else if ($1 ~ /M$/) print "✗", $2, "(too large)"; else print "✓", $2}'
echo ""
echo "Attribution lines removed:"
grep -r "Generated with Claude Code" docs/EcoFocus/02-analysing/ || echo "✓ No attribution lines found"
echo ""
echo "Roche Blue color in CSS:"
grep -c "#007AC2" docs/documents/EcoFocus/.assets/convert-reports.js
echo ""
echo "Cover page function exists:"
grep -c "generateCoverPage" docs/documents/EcoFocus/.assets/convert-reports.js
echo ""
echo "Metadata extraction exists:"
grep -c "extractMetadata" docs/documents/EcoFocus/.assets/convert-reports.js
```

- [ ] **Step 5: Commit README and validation**

```bash
git add docs/documents/EcoFocus/.assets/README.md
git commit -m "docs: add README for EcoFocus report generation

- Document generation process
- List prerequisites and installation
- Explain markdown metadata format
- Add troubleshooting guide"
```

- [ ] **Step 6: Final commit with summary**

```bash
git add -A
git commit -m "feat: complete professional styling for EcoFocus reports

Summary of changes:
- Removed AI attribution lines from markdown sources
- Added metadata extraction from markdown
- Implemented cover page generation with Roche branding
- Replaced CSS with corporate executive styling
- Added headers/footers with page numbers and metadata
- Generated professional PDFs (< 500KB each)
- Added documentation for future regeneration

Professional features:
- Roche Blue (#007AC2) brand color throughout
- Corporate typography hierarchy
- Full-bleed cover pages with accent bars
- Running headers showing document and section titles
- Professional table styling with alternating rows
- Proper page breaks and widow/orphan control

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Remove attribution lines: Task 1
- ✅ Metadata extraction: Task 2
- ✅ Cover page generation: Task 3
- ✅ Corporate CSS styling: Task 4
- ✅ Roche Blue (#007AC2): Task 4
- ✅ Typography system: Task 4
- ✅ Headers/footers with @page rules: Task 4
- ✅ HTML generation with cover: Task 5
- ✅ PDF generation and validation: Task 6
- ✅ Documentation: Task 7

**Placeholder scan:**
- ✅ No TBD, TODO, or "implement later" found
- ✅ All code blocks contain actual implementation
- ✅ All file paths are exact
- ✅ All commands include expected output

**Type consistency:**
- ✅ `extractMetadata()` returns same shape in Task 2 and Task 3 usage
- ✅ `generateCoverPage()` consumes metadata object consistently
- ✅ CSS class names match between Task 3 (HTML) and Task 4 (CSS)
- ✅ Function names consistent across all tasks

---

**End of Implementation Plan**
