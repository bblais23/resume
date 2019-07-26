const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

const resumePage = path.join(__dirname, '../index.html').replace(/\\/g, '/');
const outputPDF = path.join(__dirname, '../Benjamin_Blais.pdf').replace(/\\/g, '/');

async function main() {
	try {

		console.log('🌎 Launching browser...');
		const browser = await puppeteer.launch();
		
		console.log('📄 Opening page...');
		const page = await browser.newPage();
		
		// go to the page
		await page.goto(`file:///${resumePage}`, {waitUntil: 'networkidle0'});
		
		console.log('📑 Generating PDF...');
		const pdf = page.pdf({format: 'Letter'});
		// Now write the pdf to disk
		await fs.writeFile(outputPDF, await pdf);

		console.log('💤🛌 Shutting down....');
		browser.close();

	} catch(e) {
		console.error(e);
		process.exitCode = 1;
	}
}

main();