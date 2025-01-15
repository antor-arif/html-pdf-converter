# HTML to PDF Converter

A Node.js package to convert HTML to PDF using Puppeteer.

## Requirements
- Node.js >= 16
- Puppeteer >= v10.4.0

# html-pdf-converter

`html-pdf-converter` is a Node.js package that converts HTML content into PDF files using Puppeteer. This lightweight and easy-to-use package ensures high-quality PDF generation from any HTML input.

---

## Features
- Converts HTML strings into PDF files.
- Supports Puppeteer for reliable and stable performance.
- Compatible with Node.js 16 or higher.
- Fully customizable PDF options (e.g., page size, margins, background printing).
- Advanced configuration for Puppeteer instance (e.g., custom headers, authentication, or external browser endpoint).

---

## Requirements
- **Node.js**: v16 or higher.
- **Puppeteer**: v10.4.0 or higher (included in dependencies).

---

## Installation
Install the package using Yarn:
```bash
yarn add @antor-arif/html-pdf-converter
```

---

## Usage
Below is a simple example of how to use the package:

### Basic Example
```javascript
const HTMLToPDF = require("@antor-arif/html-pdf-converter");

(async () => {
    const htmlToPdf = new HTMLToPDF(); // Instantiate the class

    const html = `
    <html>
      <head>
        <title>PDF Test</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>This is a PDF generated using html-pdf-converter.</p>
      </body>
    </html>
  `;

    const outputPath = "output.pdf";

    try {
        const pdfPath = await htmlToPdf.generatePDF(html, outputPath);
        console.log(`PDF successfully created at: ${pdfPath}`);
    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        await htmlToPdf.closeBrowser();
    }
})();
```

---

## API Reference

### `create(html, outputPath, options)`

Converts an HTML string into a PDF file.

#### Parameters:
- **`html`** (string): The HTML content to convert. This must be a valid, non-empty string.
- **`outputPath`** (string): The file path where the PDF will be saved.
- **`options`** (object, optional): Puppeteer PDF configuration options (e.g., `format`, `margin`, `printBackground`).

#### Returns:
- A `Promise<string>` that resolves to the path of the generated PDF file.

#### Example with Custom Options:
```javascript
const HTMLToPDF = require("@antor-arif/html-pdf-converter");

(async () => {
    const htmlToPdf = new HTMLToPDF();

    const html = "<h1>Custom PDF</h1><p>This PDF has custom settings.</p>";
    const outputPath = "custom-output.pdf";

    const options = {
        format: "Letter",
        margin: {
            top: "1in",
            bottom: "1in",
            left: "1in",
            right: "1in",
        },
        printBackground: true,
    };

    try {
        const pdfPath = await htmlToPdf.generatePDF(html, outputPath, options);
        console.log(`Custom PDF created at: ${pdfPath}`);
    } catch (error) {
        console.error("Error generating custom PDF:", error);
    } finally {
        await htmlToPdf.closeBrowser();
    }
})();
```

---

## Advanced Features

### External Browser Endpoint
You can connect to an existing Puppeteer browser instance using the `browserWSEndpoint` option:
```javascript
const HTMLToPDF = require("@antor-arif/html-pdf-converter");

(async () => {
    const htmlToPdf = new HTMLToPDF();

    await htmlToPdf.setOptions({
        browserWSEndpoint: "ws://localhost:3000",
    });

    const html = "<h1>PDF from External Browser</h1>";
    const outputPath = "external-browser-output.pdf";

    try {
        const pdfPath = await htmlToPdf.generatePDF(html, outputPath);
        console.log(`PDF created using external browser at: ${pdfPath}`);
    } catch (error) {
        console.error("Error generating PDF with external browser:", error);
    }
})();
```

---

## License
This package is licensed under the MIT License. See the LICENSE file for more details.

---

## Author
Arifur Rahman

---

## Contribution
Contributions are welcome! If you find any issues or have feature requests, feel free to open an issue or submit a pull request on the GitHub repository.

---

## Troubleshooting
If you encounter issues:
1. Ensure that Puppeteer is correctly installed.
2. Check for Node.js version compatibility (Node.js 16 or higher).
3. Verify that your HTML content is valid.
4. Ensure Puppeteer dependencies (like Chromium) are accessible in production environments (e.g., Docker or CI/CD pipelines).

For additional help, consult the Puppeteer [Troubleshooting Guide](https://pptr.dev/troubleshooting).

---

## Feedback
We'd love to hear your thoughts! Submit feedback or questions by opening an issue on the repository.
