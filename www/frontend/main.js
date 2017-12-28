let navInfo;

$(document).ready(() => {
  getInfo();

  setInterval(getInfo, 1000 * 60 * 15);
});

function getInfo() {
  get('/nav', (data) => {
    navInfo = data;
    render();
  });
}

function get(url, callback) {
  $.ajax({
    url: url,
    type: 'get',
    cache: false,
    processData: false,
    success: callback
  });
}

function del(url, callback) {
  $.ajax({
    url: url,
    type: 'delete',
    cache: false,
    processData: false,
    success: callback
  });
}

function post(url, properties, callback) {
  $.ajax({
    url: url,
    type: 'post',
    beforeSend: function(xhr) {
      // Fix a bug (console error) in some versions of firefox
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType('application/json');
      }
    },
    dataType: 'json',
    processData: false,
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(properties),
    // callback functions
    success: callback,
    error: function(error) {
      callback({_error:error.responseJSON});
    }
  });
}

function render() {
  $('#main-div').empty();

  for (let key in navInfo) {
    let dollarValue = navInfo[key].price_usd;
    let btcValue = navInfo[key].price_btc;

    let mainDiv = $('#main-div');
    let dollarDiv = $('<div class="col-8 col-sm-6 offset-sm-2 div-style">');
    let btcDiv = $('<div class="col-4 col-sm-4 div-style">');

    dollarDiv.text('Coin Market Price: $' + dollarValue);
    btcDiv.text('(BTC): ' + btcValue);

    mainDiv.append(dollarDiv);
    mainDiv.append(btcDiv);
  }
}