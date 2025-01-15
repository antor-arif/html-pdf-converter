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

    const absoluteOutputPath = path.isAbsolute(outputPath)
        ? outputPath
        : path.resolve(outputPath);

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--disable-gpu",
        ],
    });
    const page = await browser.newPage();

    try {

        await page.setDefaultNavigationTimeout(60000);
        await page.setDefaultTimeout(60000);


        console.log("HTML content length:", html.length);


        await page.setContent(html, { waitUntil: "domcontentloaded" });


        await page.pdf({
            path: absoluteOutputPath,
            format: "A4",
            printBackground: true,
            ...options,
        });

        console.log(`PDF successfully generated at: ${absoluteOutputPath}`);
        return absoluteOutputPath;
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
    } finally {
        await browser.close();
    }
}

module.exports = htmlToPdf;
