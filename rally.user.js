// ==UserScript==
// @name          Rally Usability tweaks
// @namespace     
// @description	  Give Rally.com a little usability help.
// @include       https://*.rallydev.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)
function makeItSo() {

    if (document.location.href.indexOf('history.html')!==-1) {
        return;
    }

    var titleUpdateFunction = function(containerNode) {
        var containerNode = containerNode || document;
            titleNode = containerNode.querySelector(".titlebar"),
            titleText = 'Rally',
            selNodes = [];

        if (!titleNode) {
            selNodes = document.querySelectorAll('li.selected');
            if (selNodes.length > 0) {
                document.title = selNodes[0].innerHTML + ' > ' + selNodes[1].innerHTML;
            }
            else {
                document.title = titleText;                
            }
            return;
        }
        if (titleNode.nodeName == 'TD') {
            titleText = titleNode.querySelector('img[alt^="Link to"]').alt.replace('Link to ', '');
        }
        else if (titleNode.nodeName == 'DIV') {
            titleText = titleNode.querySelector('span').innerHTML;
        }
        document.title = titleText;
    }


    titleUpdateFunction(document);        
    document.addEventListener('DOMSubtreeModified', function(e) {
        if (e.target.id == "main") {
            titleUpdateFunction(e.target);
        }
    }, false);

    //remove target _blank links
    function removeTargetAttributeFromLinks() {
        var iframes = document.querySelectorAll('iframe');
        if (iframes.length > 1) {
            if (iframes.length > 1) {
                    var targetBlankLinks = iframes[1].contentDocument.querySelectorAll('a[target="_blank"]')
                    for (var i = 0, ilen = targetBlankLinks.length; i < ilen; i++) {
                        targetBlankLinks[i].setAttribute('target', "_parent");
                    }
            }
        }   
    }
    //Urgh, find a better way.
    setInterval(removeTargetAttributeFromLinks, 1000);
}
if (!document.xmlVersion)
{
     var srcString = makeItSo.toString();
     var script = document.createElement('script');
     script.appendChild(document.createTextNode(srcString+';makeItSo();'));
     document.documentElement.appendChild(script);       
}