var GENERATOR_BASE_PATH;

(function(){//get relative path of this script
  var a=document.createElement("a");
  a.href=document.currentScript.src;
  var path = a.pathname.split("/");
  path.pop(); path=path.join("/")+"/";
  GENERATOR_BASE_PATH=a.origin+path;
})();


/**
 * instance of generator in iframe
 * config -
 * config.components: STRING containing json to be passed to generator
 * targetDiv - inject iframe into this element
 * @returns
 *          .basePath - baseURI being used
 *          .iframe - iframe element
 *          .init(config, targetDiv) -- this is run by default. don't call unless you want to re-init with new data
 *          .getData() - promise returning {html, data}
 *
*/
function generator(config, targetDiv){
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  var iframe = document.createElement("iframe");
  iframe.width=500;
  iframe.height=500;
  var inited = false;
  var ret = {
    basePath: GENERATOR_BASE_PATH,
    iframe: iframe,

    init: function(config, targetDiv){

      // generate parent id
      var parentId = "gen-init" + Math.random();
      // extend config with auto generated params
      var extendedConfig = Object.assign({}, config, { parentId: parentId, basePath: GENERATOR_BASE_PATH })

      targetDiv.appendChild(iframe);
      var load = function(){
        inited=true;
        iframe.contentWindow.postMessage({
          call: 'configPage',
          config: extendedConfig,
        }, "*");
      }
      if(inited){
        load();
      } else {
        iframe.contentWindow.addEventListener("load", load, {once: true});
      }
      iframe.src=GENERATOR_BASE_PATH+"generator.html?v"+Math.random();

      // set listener for updates
      eventer(messageEvent,function(e) {
        if (e.data.parentId && e.data.parentId == parentId) {
          return console.log('update from embed', { html: e.data.html, data: e.data.data });
        }
      },{once: false});
      // end listener
    },
    setData:function(config){
      // generate parent id
      var parentId = "gen-init" + Math.random();
      // extend config with auto generated params
      var extendedConfig = Object.assign({}, config, { parentId: parentId, basePath: GENERATOR_BASE_PATH })
      inited=true;
      iframe.contentWindow.postMessage({call:'configPage', config: extendedConfig, id: 'test'}, "*");
    },
    getData: function(){
      if(!inited){
        return Promise.reject(new Error("not inited yet"));
      }
      var instId = "gen-get-data" + Math.random();
      var config={
        call: "getData",
        id: instId,
        basePath: GENERATOR_BASE_PATH
      }

      iframe.contentWindow.postMessage(config, '*')

      return new Promise(function(resolve, reject) {
        var timer = setTimeout(function() {
            return reject(new Error("Post message timed out"));
        }, 2000);

        eventer(messageEvent,function(e) {
          if (e.data.id && e.data.id == instId) {
            return resolve({ html: e.data.html, data: e.data.data });
          }
        },{once: true});
      });
    }//getData

  }//init
  ret.init(config, targetDiv);
  return ret;
}//generator
