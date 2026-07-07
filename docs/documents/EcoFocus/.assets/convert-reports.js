const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Paths
const sourceDir = path.join(__dirname, '../../../EcoFocus/02-analysing');
const outputDir = path.join(__dirname, '..');
const assetsDir = __dirname;
const imagesDir = path.join(assetsDir, 'images');

// Read markdown files
const executiveMarkdown = fs.readFileSync(path.join(sourceDir, 'executive-report.md'), 'utf-8');
const operationalMarkdown = fs.readFileSync(path.join(sourceDir, 'operational-report.md'), 'utf-8');

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

// Convert markdown to HTML with proper formatting
function markdownToHtml(markdown) {
  let html = markdown;

  // Code blocks (must be before inline code)
  html = html.replace(/```[\s\S]*?```/g, match => {
    const code = match.slice(3, -3);
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Lists with emoji bullets
  html = html.replace(/^(✅|⏸️|🔴|🟡|🟢) (.+)$/gm, '<li>$1 $2</li>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Wrap consecutive list items
  html = html.replace(/(<li>.*?<\/li>\n?)+/gs, '<ul>$&</ul>');

  // Tables
  const lines = html.split('\n');
  let inTable = false;
  let tableHtml = [];
  let processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHtml = ['<table>'];
      }

      // Skip separator lines
      if (line.includes('---')) continue;

      const cells = line.split('|').filter(cell => cell.trim());
      const isHeader = i === 0 || (tableHtml.length === 1);
      const tag = isHeader ? 'th' : 'td';

      tableHtml.push('<tr>');
      cells.forEach(cell => {
        tableHtml.push(`<${tag}>${cell.trim()}</${tag}>`);
      });
      tableHtml.push('</tr>');
    } else {
      if (inTable) {
        tableHtml.push('</table>');
        processedLines.push(tableHtml.join('\n'));
        tableHtml = [];
        inTable = false;
      }
      processedLines.push(line);
    }
  }

  if (inTable) {
    tableHtml.push('</table>');
    processedLines.push(tableHtml.join('\n'));
  }

  html = processedLines.join('\n');

  // Paragraphs
  html = html.split('\n\n').map(para => {
    para = para.trim();
    if (!para) return '';
    if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<ol') ||
        para.startsWith('<table') || para.startsWith('<hr') || para.startsWith('<pre') ||
        para.startsWith('<blockquote') || para.startsWith('<li>')) {
      return para;
    }
    return `<p>${para}</p>`;
  }).join('\n\n');

  return html;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Create full HTML document
function createHtmlDocument(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 20mm 25mm 20mm;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      font-size: 10.5pt;
    }

    h1 {
      font-size: 22pt;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 20px;
      color: #1a1a1a;
      page-break-after: avoid;
      line-height: 1.3;
    }

    h2 {
      font-size: 16pt;
      font-weight: 600;
      margin-top: 24px;
      margin-bottom: 12px;
      color: #2a2a2a;
      page-break-after: avoid;
      border-bottom: 2px solid #0066cc;
      padding-bottom: 6px;
    }

    h3 {
      font-size: 13pt;
      font-weight: 600;
      margin-top: 18px;
      margin-bottom: 10px;
      color: #3a3a3a;
      page-break-after: avoid;
    }

    h4 {
      font-size: 11.5pt;
      font-weight: 600;
      margin-top: 14px;
      margin-bottom: 8px;
      color: #4a4a4a;
      page-break-after: avoid;
    }

    p {
      margin-bottom: 10px;
      text-align: justify;
      orphans: 3;
      widows: 3;
    }

    ul, ol {
      margin-bottom: 12px;
      padding-left: 20px;
    }

    li {
      margin-bottom: 6px;
      page-break-inside: avoid;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 16px 0;
      page-break-inside: avoid;
      font-size: 9.5pt;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px 10px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #1a1a1a;
    }

    tr:nth-child(even) {
      background-color: #fafafa;
    }

    blockquote {
      border-left: 4px solid #0066cc;
      padding-left: 16px;
      margin: 16px 0;
      font-style: italic;
      color: #555;
      background-color: #f9f9f9;
      padding: 12px 16px;
      page-break-inside: avoid;
    }

    hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 24px 0;
    }

    code {
      background-color: #f4f4f4;
      padding: 2px 5px;
      border-radius: 3px;
      font-family: "Courier New", Consolas, monospace;
      font-size: 9.5pt;
      color: #c7254e;
    }

    pre {
      background-color: #f4f4f4;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
      page-break-inside: avoid;
      border: 1px solid #ddd;
    }

    pre code {
      background-color: transparent;
      padding: 0;
      color: #333;
    }

    a {
      color: #0066cc;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    strong {
      font-weight: 600;
      color: #1a1a1a;
    }

    /* Metadata section */
    p strong:first-child {
      display: inline-block;
      min-width: 140px;
    }

    /* Page break controls */
    .page-break {
      page-break-after: always;
    }

    .avoid-break {
      page-break-inside: avoid;
    }
  </style>
</head>
<body>
${content}
</body>
</html>`;
}

async function generatePdf(htmlContent, htmlPath, pdfPath) {
  // Write HTML file
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✓ HTML generated: ${path.basename(htmlPath)}`);

  // Generate PDF
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '20mm', right: '20mm', bottom: '25mm', left: '20mm' }
  });
  await browser.close();

  const stats = fs.statSync(pdfPath);
  const sizeKB = Math.round(stats.size / 1024);
  console.log(`✓ PDF generated: ${path.basename(pdfPath)} (${sizeKB} KB)`);
}

async function main() {
  console.log('Converting EcoFocus reports to PDF...\n');

  // Executive Report
  console.log('1. Executive Report');
  const executiveHtml = createHtmlDocument(
    'EcoFocus Executive Report: Accelerating Global ESG Targets via AI Knowledge Extraction',
    markdownToHtml(executiveMarkdown)
  );
  await generatePdf(
    executiveHtml,
    path.join(assetsDir, 'executive-report.html'),
    path.join(outputDir, 'executive-report.pdf')
  );

  console.log('');

  // Operational Report
  console.log('2. Operational Report');
  const operationalHtml = createHtmlDocument(
    'EcoFocus Operational Report: Implementation Impact & Departmental Benefits',
    markdownToHtml(operationalMarkdown)
  );
  await generatePdf(
    operationalHtml,
    path.join(assetsDir, 'operational-report.html'),
    path.join(outputDir, 'operational-report.pdf')
  );

  console.log('\n✓ All PDFs generated successfully');
  console.log(`\nOutput:`);
  console.log(`  PDFs: ${outputDir}/`);
  console.log(`  HTML: ${assetsDir}/`);
}

main().catch(console.error);
