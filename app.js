const coinmarketcap		= new (require('coinmarketcap-api'))(),
      asleep					= require('asleep'),
			puppeteer				= require('puppeteer'),
			credentials			= require('./credentials.json');

/* global variables */
const subreddit = 'navcoin';
let btc, usd;

/* fetch Nav Coin BTC and USD values */
function getNav() {
  return coinmarketcap.getTicker({limit: 1, currency: 'nav-coin'}).then((res) => {
    btc = res[0].price_btc;
    usd = res[0].price_usd;
    usd = usd.substr(0,5);
  }).catch(console.error);
}

async function updateCSS() {
  const browser = await puppeteer.launch().catch(console.error),
				page 	  = await browser.newPage().catch(console.error);

	// Start asynchronous currency fetching
	let waitForCurrencies = getNav();

	await page.goto(`https://www.reddit.com/r/${subreddit}/about/stylesheet/`).catch(console.error);

	// LOGIN BRAH
	await page.evaluate((user) => {
		$('#login_login-main input[name="user"]').val(user.username);
		$('#login_login-main input[name="passwd"]').val(user.password);
		$('#login_login-main button[type="submit"]').click();
  }, credentials).catch(console.error);

	await asleep(2000); // change to 5 later, brah

	// GET CSS, BRAH
	let css = await page.evaluate(() => $('#stylesheet_contents').val()).catch(console.error);

	// make sure the Currency has finished fetching
	await waitForCurrencies;

	if (!usd || !btc) { browser.close(); return; }

	css = css.replace(/(content: ")(.*)(";\/\*custom-header-price-node\*\/)/, '$1' + 'USD: ' + usd + ' BTC: ' + btc + '$3');

	// UPDATE CSS, YO
	await page.evaluate((style) => {
		$('#stylesheet_contents').val(style);
		$('input[name="reason"]').val('BOT: auto-update price in header.');
		$('.sheets button[name="save"]').click();
	}, css).catch(console.error);

  await browser.close().catch(console.error);
};

/* Update the CSS at startup */
updateCSS();
/* update prices every 10 minutes */
setInterval(updateCSS, 1000 * 60 * 10);