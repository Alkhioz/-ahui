var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  
    return function( obj, callback ){
      if( !obj || obj.nodeType !== 1 ) return; // validation
  
      if( MutationObserver ){
        // define a new observer
        var obs = new MutationObserver(function(mutations, observer){
            callback(mutations);
        })
        // have the observer observe foo for changes in children
        obs.observe( obj, { childList:true, subtree:true });
      }
      
      else if( window.addEventListener ){
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
      }
    }
  })();
  
  function eventFire(el, etype){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }
  

      observed_element = document.querySelector('body');
     
      observeDOM( observed_element, function(){

            chrome.storage.local.get( null , function (result) {
                if(result.status === 'on'){
                  if(!!document.getElementsByClassName("ytp-ad-skip-button ytp-button")[0]){
                    var adbutton = document.getElementsByClassName("ytp-ad-skip-button ytp-button")[0];
                    if(result.mode === 'normal'){
                      setTimeout(()=>{
                        eventFire(adbutton, 'click');
                      }, 5000); 
                    }else{
                      eventFire(adbutton, 'click');
                    }
                    
                  }
                }
              });
              
            
        });
       console.log('funciona aqui');
   // }
    