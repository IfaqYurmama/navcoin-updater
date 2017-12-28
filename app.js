const express               = require('express'),
      app                   = express(),
      CoinMarketCap         = require('coinmarketcap-api'),
      client                = new CoinMarketCap();

/* global variables */
let nav;

/* REST */
app.get('/nav', (req,res) => {
  res.send(nav);
});

/* fetch top 100 coins from Coinmarketcap */
function getNav() {
  client.getTicker({limit: 1, currency: 'nav-coin'}).then((res) => {
    nav = res;
    console.log(nav);
  }).catch(console.error);
}

getNav();
setInterval(getNav, 1000 * 60 * 15);

app.use(express.static(__dirname + '/www', {extensions:['html']}));
app.listen(3020, () => console.log('UP AND RUNNING ON PORT 3020!'));