$(document).ready(function() {
	setCookie("scenarioNumber", 0, 5);
	getIntroductionText();
});

//get introduction text from file and fill up the container with it 
function getIntroductionText(){
		var introText = "introduction.txt";
	    $.get(introText, function(data) {
			$("#containerintro").html(data);
    }, "text" );
}

function storeValues(){
	var expiryDays = 5; // number of days after which the cookie will be expired
	
	// we don't store user's name anymore. we need to store microworkers id or something like that.
	var givenName = document.getElementById("txtName").value;
	if(!givenName){
		alert("please Enter the name");
		return false;
	}

	setCookie("givenName", givenName, expiryDays);
}