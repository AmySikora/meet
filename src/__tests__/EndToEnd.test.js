import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms,
      timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });

    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
      });
    
      test('User can expand an event to see details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
      });

      test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
      });
});

    describe('filter events by city', () => {
        let browser;
        let page;

        beforeAll(async() => {
            browser = await puppeteer.launch({
                headless: false,
                slowMo: 250,
                timeout: 0,
            });
            page = await browser.newPage();
            await page.goto('http://localhost:3000/');
        });

        afterAll(async () => {
            await browser.close();
        })

        test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
            await page.waitForSelector('#event-list');
            const events = await page.$$('#event-list li');
            expect(events.length).toBeGreaterThan(0);
        });

        test('User should see a list of suggestions when they search for a city.', async () => {
            await page.waitForSelector('#city-search input');
            await page.type('#city-search input', 'Berlin');
            await page.waitForSelector('#city-search .suggestions li');
            const suggestions = await page.$$('#city-search .suggestions li');
            expect(suggestions.length).toBeGreaterThan(0);
        });
    });