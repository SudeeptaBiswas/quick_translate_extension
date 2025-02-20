document.body.onmouseup = function() {mouseUp()};
var toggleTranslate;
if (toggleTranslate === undefined) {
	toggleTranslate = true;
} else (
	toggleTranslate = !toggleTranslate
)

//Start thesaurus transltion
if(document.getElementById("synonyms") === null){
	var div = document.createElement("div");
	div.setAttribute("id", "synonyms");
	div.style.display= "none";
	div.style.position= "fixed";
	div.style.cursor= "pointer";
	div.style.left= "10px";
	div.style.top= "50px";
	div.style.width = "350px";
	div.style.maxHeight = "550px";
	div.style.border= "solid 1px #eee";
	div.style.backgroundColor= "#ffffdd";
	div.style.padding= "10px";
	div.style.zIndex= "2147483640";
	div.style.overflowY= "auto";
	document.body.appendChild(div);

	document.getElementById("synonyms").addEventListener("click", myFunction);
}

function getThesaurusTranslation() {
	var selection = getSelectedText();
	if (selection === '') {
		return;
	}
	// Thesaurus can be turned off on the Options page (default on)
	chrome.storage.sync.get({thesaurusEnabled: true}, function(items) {
		items.thesaurusEnabled && translate(selection);
	});
}

function myFunction() {
    div.style.display = "none";
}

function translate(selection) {
	// background.js fetches the thesaurus (Manifest V3 blocks remote scripts)
	chrome.runtime.sendMessage({type: "thesaurus", word: selection}, process);
}

function process(result){
	  var box = document.getElementById("synonyms");
	  if (!chrome.runtime.lastError && result && result.error === "noKey") {
		box.textContent = "Set your thesaurus key: right-click the extension icon > Options.";
		box.style.display= "block";
		return;
	  }
	  if (chrome.runtime.lastError || !result || !result.response) {
		return;
	  }
	  box.textContent = "";
	  for (var key in result.response) {
		var list = result.response[key].list;
		box.appendChild(document.createTextNode(list.synonyms.split("|").join(", ")));
		box.appendChild(document.createElement("br"));
	  }
	  if (box.textContent) {
		box.style.display= "block";
	  }
	}
//End thesaurus transltion

function mouseUp() {
	getThesaurusTranslation();// This will show the Thesaurus translation
	if(toggleTranslate) {
		getGoogleTranslation();// This will show the translate icon
	} else {
		autoGoogleTranslation();// This will auto translate
	}
}

function getSelectedText() {
	var selection;
	//alert(window.getSelection().getRangeAt(0));
	if (window.getSelection) {
	  selection = window.getSelection();
	} else if (document.selection) {
	  selection = document.selection.createRange();
	}
	return selection.toString();
}

//Start Google transltion
if(document.getElementById("translationIcon") === null){
	var divGoogle = document.createElement("div");
	divGoogle.setAttribute("id", "translationIcon");
	divGoogle.style.display= "none";
	divGoogle.style.position= "absolute";
	divGoogle.style.cursor= "pointer";
	divGoogle.style.maxWidth = "25px";
	divGoogle.style.maxHeight = "25px";
	divGoogle.style.border= "none";
	divGoogle.style.zIndex= "2147483640";
	divGoogle.style.overflowX= "hidden";
	divGoogle.style.overflowY= "hidden";
	document.body.appendChild(divGoogle);
	
	var divIcon = document.createElement("img");
	divIcon.setAttribute("id", "translationImage");
	divIcon.setAttribute("src", "data:image/png;base64,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");
	divIcon.setAttribute("alt", "Translate");
	divGoogle.appendChild(divIcon);

	document.getElementById("translationIcon").addEventListener("click", function(event){
		var elem = document.getElementById("translationIcon");
		var word = elem.getAttribute("word");
		showGoogleTranslate(word);
		elem.style.display = 'none';
	});
}

function getGoogleTranslation() {
	selection = getSelectedText();
	if (selection !== '') {

		var elem = document.getElementById("translationIcon");
		var r=window.getSelection().getRangeAt(0).getBoundingClientRect();
		var relative=document.body.parentNode.getBoundingClientRect();
		elem.style.top =(r.bottom - relative.top + 5)+'px';//this will place ele below the selection
		elem.style.right=-(r.right-relative.right)+'px';//this will align the right edges together
		
		elem.style.display = 'block';
		setTimeout(() => { elem.style.display = 'none'; }, 5000);
		elem.setAttribute("word", selection);
	}
}

function autoGoogleTranslation() {
	selection = getSelectedText();
	if (selection !== '') {
		showGoogleTranslate(selection);
	}
}

function showGoogleTranslate(selection) {
	if (selection !== '') {
		// Target language is set on the Options page (default Bengali)
		chrome.storage.sync.get({targetLanguage: "bn"}, function(items) {
			window.open('https://translate.google.com/?sl=en&tl='+items.targetLanguage+'&text='+encodeURIComponent(selection)+'&op=translate','1459774153836','width=800,height=600,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
		});
	}
}


var selectedString = getSelectedText();
showGoogleTranslate(selectedString);
//End Google transltion