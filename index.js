const puppeteer = require("puppeteer");
const path = require("path");

class HTMLToPDF {
    constructor() {
        this.browser = null;
        this.defaultArgs = ["--no-sandbox", "--disable-setuid-sandbox"];
        this.autoCloseBrowser = true;
    }

    async initializeBrowser(options = {}) {
        if (!this.browser) {
            const args = options.args || this.defaultArgs;
            const headless = options.headless !== undefined ? options.headless : true;

            this.browser = await puppeteer.launch({
                headless,
                args,
                executablePath: options.executablePath,
            });

            this.browser.on("disconnected", () => {
                this.browser = null;
            });

            this.browser.on("error", (error) => {
                console.error("Browser error:", error);
            });
        }
    }

    async closeBrowserIfNeeded() {
        if (this.autoCloseBrowser && this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    setAutoCloseBrowser(flag) {
        this.autoCloseBrowser = flag;
    }

    async generatePDF(html, outputPath, options = {}) {
        if (!html || typeof html !== "string") {
            throw new Error("The 'html' parameter must be a valid non-empty string.");
        }

        if (!outputPath || typeof outputPath !== "string") {
            throw new Error("The 'outputPath' parameter must be a valid string.");
        }

        // Ensure outputPath is absolute
        const absoluteOutputPath = path.isAbsolute(outputPath)
            ? outputPath
            : path.resolve(outputPath);

        await this.initializeBrowser(options);

        const page = await this.browser.newPage();

        // Set custom timeouts
        if (options.timeout) {
            page.setDefaultTimeout(options.timeout);
            page.setDefaultNavigationTimeout(options.timeout);
        }

        // Set custom headers
        if (options.headers) {
            await page.setExtraHTTPHeaders(options.headers);
        }

        try {
            if (this.isUrl(html)) {
                // Navigate to the URL
                await page.goto(html, {
                    waitUntil: options.waitUntil || "networkidle0",
                    timeout: options.timeout || 30000,
                });
            } else {
                // Set content as HTML
                await page.setContent(html, {
                    waitUntil: options.waitUntil || "domcontentloaded",
                    timeout: options.timeout || 30000,
                });
            }

            // Generate PDF
            const pdfOptions = {
                path: absoluteOutputPath,
                printBackground: options.printBackground !== undefined ? options.printBackground : true,
                format: options.format || "A4",
                margin: options.margin || {},
                ...options.pdfOptions,
            };

            await page.pdf(pdfOptions);
            return absoluteOutputPath;
        } catch (error) {
            console.error("Error generating PDF:", error);
            throw error;
        } finally {
            await page.close();
            await this.closeBrowserIfNeeded();
        }
    }

    isUrl(string) {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    }

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

module.exports = HTMLToPDF;
