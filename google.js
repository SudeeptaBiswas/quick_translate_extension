document.body.onmouseup = function() {mouseUp()};
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
	div.style.fontSize= "15px";
	div.style.zIndex= "2147483640";
	//div.style.whiteSpace= "wrap"
	div.style.overflowY= "auto";
	document.body.appendChild(div);

	var scri = document.createElement("script");
	scri.innerHTML = 'function process(result){output = "";for (key in result.response) {list = result.response[key].list;output += list.synonyms+"<br>";}if (output) {output=output.split("|").join(", ");div = document.getElementById("synonyms");div.innerHTML = output;div.style.display= "block";}}';
	document.body.appendChild(scri);
	
	document.getElementById("synonyms").addEventListener("click", myFunction);
}

function mouseUp() {
	var selection;
	document.execCommand('Copy');
	//alert(window.getSelection().getRangeAt(0));
	if (window.getSelection) {
	  selection = window.getSelection();
	} else if (document.selection) {
	  selection = document.selection.createRange();
	}
	selection.toString() !== '' && translate(selection);  
//	selection.toString() !== '' && alert('"' + selection.toString() + '"');
}

function myFunction() {
    div.style.display= "none";
}

function translate(selection) {
	var s = document.createElement("script"); 
	//s.src = "http://thesaurus.altervista.org/service.php?word="+selection+"&language=en_US&output=json&key=YOUR_API_KEY&callback=process";
	s.src = "http://thesaurus.altervista.org/service.php?word="+selection+"&language=en_US&output=json&key=YOUR_API_KEY&callback=process"; // NOTE: replace test_only with your own KEY 
	document.getElementsByTagName("head")[0].appendChild(s);
}

function process(result){
	  output = ""; 
	  for (key in result.response) { 
		list = result.response[key].list; 
		output += list.synonyms+"<br>"; 
	  } 
	  if (output) {
		output.replace('|', ', ');
		div.innerHTML = output;
		div.style.display= "block";
	  }
	}
if (window.getSelection || document.selection) {
	var selection;
	//alert(window.getSelection().getRangeAt(0));
	if (window.getSelection) {
	  selection = window.getSelection();
	} else if (document.selection) {
	  selection = document.selection.createRange();
	}
	if (selection.toString() !== '') {
		window.open('https://translate.google.com.bd/?hl=en&tab=wT#en/bn/'+selection,'1459774153836','width=850,height=600,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
	}
}