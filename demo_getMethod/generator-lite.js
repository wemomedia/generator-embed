var myPage = document.getElementById('mypage');
var iframe = document.createElement('iframe');

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

var generator = {}

generator.init = function(config) {
  document.body.appendChild(iframe);

  iframe.src = 'http://gen.wevr.com/';
  iframe.width = '800';
  iframe.height = '800';

  if (config) {
    // send config to generator
    return setTimeout(() => {iframe.contentWindow.postMessage({ call: 'configPage', config: config }, '*')}, 1000);
  }
}

generator.getData = function() {
  return iframe.contentWindow.postMessage({ call: 'getData' }, '*')
}

// Listen to messages from child window
eventer(messageEvent,function(e) {
  if (e.data.html) {
    // here is our html and data
    console.log(e.data)
  }
},false);
