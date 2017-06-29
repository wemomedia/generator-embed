var myPage = document.getElementById('mypage');
var iframe = document.createElement('iframe');

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

var generator = {}

generator.init = function(config) {
  document.body.appendChild(iframe);

  // iframe.src = 'http://gen.wevr.com/';
  iframe.src = 'generator.html'
  iframe.width = '800';
  iframe.height = '800';

  if (config) {
    // send config to generator
    return setTimeout(() => {iframe.contentWindow.postMessage({ call: 'configPage', config: config }, '*')}, 1000);
  }

  // Listen to messages from child window
  eventer(messageEvent,function(e) {
    if (e.data.html) {
      // here is our html and data
      return e.data;
    }
  },false);
}

generator.getData = function(config) {
  var instId = "gen-get-data" + Math.random();
  var messageConfig = config;
  messageConfig.id = instId;
  messageConfig.call = 'getData';

  iframe.contentWindow.postMessage(messageConfig, '*')

  return new Promise(function(resolve, reject) {

    var timer = setTimeout(function() {
        return reject(new Error("Post message timed out"));
    }, 2000);

    eventer(messageEvent,function(e) {
      if (e.data.id && e.data.id == instId) {
        console.log('resolving', e.data.id, instId)
        return resolve({ html: e.data.html, data: e.data.data });
      }
    },false);
  });
}
