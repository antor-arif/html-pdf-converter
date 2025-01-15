const puppeteer = require("puppeteer");
const path = require("path");

/**
 * Converts HTML content to a PDF file.
 * @param {string} html - The HTML content to convert.
 * @param {string} outputPath - The file path where the PDF will be saved.
 * @param {object} options - Puppeteer PDF options (optional).
 * @returns {Promise<string>} - The path to the generated PDF file.
 */
async function htmlToPdf(html, outputPath, options = {}) {
    if (!html || typeof html !== "string") {
        throw new Error("The 'html' parameter must be a valid non-empty string.");
    }

    if (!outputPath || typeof outputPath !== "string") {
        throw new Error("The 'outputPath' parameter must be a valid string.");
    }

    // Ensure that the outputPath is absolute
    const absoluteOutputPath = path.isAbsolute(outputPath)
        ? outputPath
        : path.resolve(outputPath);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Set the HTML content
        await page.setContent(html, { waitUntil: "networkidle0" });

        // Generate the PDF
        await page.pdf({
            path: absoluteOutputPath, // Save the PDF to the resolved dynamic path
            format: "A4",
            printBackground: true,
            ...options,
        });

        return absoluteOutputPath; // Return the absolute path of the generated PDF
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
    } finally {
        await browser.close();
    }
}

module.exports = htmlToPdf;
