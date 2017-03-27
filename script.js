document.body.onmouseup = function() {mouseUp()};

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
div.style.zIndex= "1000";
//div.style.whiteSpace= "wrap"
div.style.overflowY= "auto";
document.body.appendChild(div);

var scri = document.createElement("script");
scri.innerHTML = 'function process(result){output = "";for (key in result.response) {list = result.response[key].list;output += list.synonyms+"<br>";}if (output) {output=output.split("|").join(", ");div = document.getElementById("synonyms");div.innerHTML = output;div.style.display= "block";}}';
document.body.appendChild(scri);

function mouseUp() {
	var selection;
	//alert(window.getSelection().getRangeAt(0));
	if (window.getSelection) {
	  selection = window.getSelection();
	} else if (document.selection) {
	  selection = document.selection.createRange();
	}
	selection.toString() !== '' &&PopupCenter(selection);  
//	selection.toString() !== '' && alert('"' + selection.toString() + '"');
}

function PopupCenter(selection) {

//div.style.width = "100px";
//div.style.height = "100px";
//div.style.background = "red";
//div.style.color = "white";
translate(selection);


//div.innerHTML = translate();
}

document.getElementById("synonyms").addEventListener("click", myFunction);

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
//document.getElementById("synonyms");
	}
	
//function process(result){output = "";for (key in result.response) {list = result.response[key].list;output += list.synonyms+"<br>";}if (output) {div.innerHTML = output;div.style.display= "block";}}