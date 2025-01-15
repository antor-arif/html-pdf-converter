const htmlToPdf = require("./index");

(async () => {
    const html = `
    <!DOCTYPE html>
<html>
  <head>
    <title>Stylish PDF</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #333;
        line-height: 1.6;
      }
      .container {
        padding: 20px;
        margin: 0 auto;
        max-width: 800px;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #f9f9f9;
      }
      h1 {
        text-align: center;
        font-size: 2.5em;
        color: #4CAF50;
        margin-bottom: 0.5em;
      }
      h2 {
        text-align: center;
        font-size: 1.5em;
        color: #555;
        margin-bottom: 1em;
      }
      p {
        font-size: 1em;
        margin: 10px 0;
      }
      ul {
        padding-left: 20px;
        list-style: disc;
      }
      .footer {
        text-align: center;
        font-size: 0.8em;
        color: #888;
        margin-top: 20px;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 1em;
        color: #fff;
        background-color: #4CAF50;
        text-decoration: none;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
      }
      .btn:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Stylish PDF Report</h1>
      <h2>Your Comprehensive Summary</h2>
      <p>
        This PDF was generated dynamically using Puppeteer. Below is an
        example of a beautiful design with modern aesthetics.
      </p>
      <ul>
        <li><strong>Point 1:</strong> Clean and minimalistic design.</li>
        <li><strong>Point 2:</strong> Uses inline CSS for portability.</li>
        <li><strong>Point 3:</strong> Supports cross-browser compatibility.</li>
      </ul>
      <p>
        With the flexibility of Puppeteer and the power of CSS, you can create
        documents that look just as professional as a printed report.
      </p>
      <a href="#" class="btn">Learn More</a>
      <div class="footer">
        <p>&copy; 2025 Stylish PDF. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>

  `;
    const outputPath = "test-output-2.pdf";

    try {
        const pdfGenerator = new htmlToPdf();
        const pdfPath = await pdfGenerator.generatePDF(html, outputPath);
        console.log(`PDF successfully created at: ${pdfPath}`);
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
})();
