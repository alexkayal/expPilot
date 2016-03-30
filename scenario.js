var x= getCookie("scenarioNumber")? parseInt(getCookie("scenarioNumber")) + 1 : 1;

//clear all cookies be we are loading the first scenario
if(x == 1){
	deleteCookie("sc1num");
	deleteCookie("sc2num");
	deleteCookie("sc3num");
	deleteCookie("sc4num");
}

var scenario_submitButton = false;
spinner1Selection = null;

$(document).ready(function() {
	$('#btnNext').prop('disabled', false);
	var selectBox = $("select").selectBoxIt({nativeMousedown: true });

	var maximum = 16;
	var minimum = 1;
	var randomnumber = null;

	var sc1num = getCookie("sc1num");
	var sc2num = getCookie("sc2num");
	var sc3num = getCookie("sc3num");
	var sc4num = getCookie("sc4num");

	do{
		randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}while(randomnumber == sc1num || randomnumber == sc2num || randomnumber == sc3num || randomnumber == sc4num);
	
	setCookie("sc" + x + "num", randomnumber, 5);

	updateTextFromFile("#container","scenario", randomnumber);

	readQualityControlText(randomnumber);

	//find the lead character
	var leadChar = null;
	for (var i = 0; i < leadCharacter.length; i++) {
		if(leadCharacter[i]['scenario'] == randomnumber){
			leadChar = leadCharacter[i]['lead'];
			break;
		}
	};
	//remove myself from the spinner1 and spinner3
	//removeLeadCharacterOption("#spinner1nump", "spinner1", leadChar);
	removeLeadCharacterOption("#spinner3nump", "spinner3", leadChar);

	var leadexcludeCharacters = [];
	for (var i = 0; i < excludeCharacters.length; i++) {
		if(excludeCharacters[i]['scenario'] == randomnumber){
			leadexcludeCharacters = excludeCharacters[i]['exclude'];
			break;
		}
	};

	leadexcludeCharacters.push(leadChar);
	removeLeadAndExludeCharacters("#spinner1nump", "spinner1", leadexcludeCharacters);

	changeText();
	chooseTimePlace();
});

function defaultOptions(){
	var spinner = document.getElementById("spinner4");
	var langArray = [
    {value: "val1", text: "text 1"},
    {value: "val2", text: "text 2"}
];

for (var i = 0; i < langArray.length; i++) {
	option = document.createElement('option');
    option.setAttribute('value', langArray[i].value);
    option.appendChild(document.createTextNode(langArray[i].text));
    spinner.appendChild(option);
};
}

function removeLeadCharacterOption(numpID, spinnerID, leadCharacter){
	
	var sp = document.getElementById(spinnerID);
	$(numpID).empty();

	for (var i = 0; i < sp.length; i++) {
		if(sp.options[i].value == leadCharacter){
			sp.remove(i);
		}
	};

	$(numpID).append(sp);

	var selectBox = $("select").selectBoxIt({nativeMousedown: true });
}

function removeLeadAndExludeCharacters(numpID, spinnerID, leadExcCharacter){

	var sp = document.getElementById(spinnerID);
	$(numpID).empty();

	for (var i = 0; i < sp.length; i++) {
		for (var j = 0; j < leadExcCharacter.length; j++) {
			if(sp.options[i].value == leadExcCharacter[j]){
				sp.remove(i);
				i = i-1;
				break;
			}
		};
		
	};

	$(numpID).append(sp);

	var selectBox = $("select").selectBoxIt({nativeMousedown: true });
}

//get scenario text from file and fill up the container with it 
//here we should replace x with a random number (accoring to algorithm) and store in cookie (not here, somewhere).

function updateTextFromFile(txtcontainer, txtFilePrefix, randomnumber){
		var txtFile = txtFilePrefix + randomnumber + ".txt";
	    $.get(txtFile, function(data) {
			$(txtcontainer).html(data.toString());
    }, "text" );
}

var text = null;
function readQualityControlText(randomnumber){
$.get("qc" +randomnumber+ ".txt", function(txtData){
	text = txtData;
}, "text");
}

function createDynamicHtml(){
	var dynamicHtml = "<nump1> <div id='txtqualitycontrol'>"+text+"<div/><nump1/>\
					<br><input type='text' id='frm2TextValue' style='font-size:20px' size='40'  placeholder='enter the answer here'/>\
					<br><br>\
					<nump3>How did the agreement menu and its options contribute towards solving the problem in the scenario?</nump3>\
					<br><br>\
					<div id='slider' class='slider'></div>\
					<br><br><input type='submit' id='submitbutton' onClick='return submitScenario()' value='Submit' style='float: right;'  />"
					return dynamicHtml;
}

function nextScenario(){

	sp1 = document.getElementById("spinner1");
	sp2 = document.getElementById("spinner2");
	sp3 = document.getElementById("spinner3");
	sp4 = document.getElementById("spinner4");

	if(sp1.value === "select" || sp2.value === "select" || sp3.value === "select" || (sp4 && sp4.value === "select")){
		alert("Please select a value in all menus.");
		return false;
	}

	var dynamicHtml =  createDynamicHtml();
		
		$("#target").submit(function(event){
			$('#btnNext').prop('disabled', true);
			event.preventDefault();
			$('#table2').css('background-color',"#FFFFEE");
			$('#dynmaicform').append(dynamicHtml);
		 	$('.slider').on('input', function(){
		 		$('#sliderValue').prop('value', this.value);
		 	});
			displaySlider();
		});

		//deleteCookie("scenarioNumber");
	//}
}

function submitScenario(){
	var expiryDays = 5; // number of days after which the cookie will be expired
	var frm2TextValue = document.getElementById("frm2TextValue").value;

	if(!frm2TextValue){
		alert("Please answer the question.");
		return false;
	}

	var sliderValue = $('#slider').slider("option", "value"); /*$("#slider").data().uiSlider.options.value;*/

	// if there is no handle, it means the slider have not been clicked.
	var handle =  $('.ui-slider-handle')[0];
	if (handle.style.display == "none"){
		alert("Please choose slider value");
		return false;
	}
	// store form values in cookies

	var sp1 = document.getElementById("spinner1").selectedOptions.item(0).text;
	var sp2 = document.getElementById("spinner2").selectedOptions.item(0).text;
	var sp3 = document.getElementById("spinner3").selectedOptions.item(0).text;
	var sp4 = null;
	var tp1 = null;
	var tp2 = null;

	if(document.getElementById("spinner4")){
		sp4 = document.getElementById("spinner4").selectedOptions.item(0).text;	
	}	
	else if(document.getElementById("tp1") && document.getElementById("tp2")){
		tp1 = document.getElementById("tp1").value;
		tp2 = document.getElementById("tp2").value;
	}
	setCookie("sp1_scenario"+x, sp1, expiryDays );
	setCookie("sp2_scenario"+x, sp2, expiryDays );
	setCookie("sp3_scenario"+x, sp3, expiryDays );
	setCookie("sp4_scenario"+x, sp4, expiryDays );

	setCookie("tp1_scenario"+x, tp1, expiryDays );
	setCookie("tp2_scenario"+x, tp2, expiryDays );
	
	setCookie("qc_scenario"+x, frm2TextValue, expiryDays);
	setCookie("qc_slider_scenario"+x, sliderValue, expiryDays);

	scenario_submitButton = true;

	if(x < 4){
		setCookie("scenarioNumber", x);
	}

	if(x == 4){ //should be made 4 here.
		deleteCookie("scenarioNumber");
		$('#dynmaicform').prop('action', 'lastpage.html');
		$('#dynmaicform').submit();
	}
}

//switch the text depending on if it is share or receive event

function setSpinnerValues(){

cloneObj = $("#spinnerTimePicker").clone();
	$("#spinnerTimePicker").empty();

	var sp = document.createElement("select");
	sp.setAttribute("name", "spinner4");
	sp.setAttribute("id", "spinner4");
	sp.setAttribute("class", "placepicker");

	var placesArray = [
		{value: "select", text: "Select place..."},
	    {value: "school", text: "school"},
	    {value: "the park", text: "the park"},
	    {value: "day care", text: "day care"},
	    {value: "home", text: "home"}
	];

	for (var i = 0; i < placesArray.length; i += 1) {
		option = document.createElement('option');
		option.setAttribute('value', placesArray[i].value);
		option.appendChild(document.createTextNode(placesArray[i].text));
		sp.appendChild(option);
	}

	$("#spinnerTimePicker").append(sp);
	var selectBox = $("select").selectBoxIt({nativeMousedown: true });

}

function switchTimePlaceValue(element){

	if(element.value === "Time")
	{
		$("#spinnerTimePicker").empty();
		setTimePicker("#timepicker1",1);
    	$("#timePlace").text("if it is between");
    	$("#and").text("and");
    	setTimePicker("#timepicker2",2);
    	element.value = "Place";
    	element.style.float= "right";
	}
	else if(element.value === "Place")
	{
		setSpinnerValues();
		changeHeShe(spinner1Selection);
		$("#and").empty();
		$("#timepicker1").empty();
		$("#timepicker2").empty();
		element.value = "Time";
		element.style.float= "";
	}

}


function setTimePicker(elmHolder, idN){

	var n =2;
	var cloneTimePicker = $(elmHolder).clone();
	$(elmHolder).empty();
	$(elmHolder).append("<input id=\"tp"+idN+"\" class=\"timepicker\" name=\"timepicker\" \/>");

	    $('input.timepicker').timepicker({
        interval: 10,
		scrollbar: true
    });
    // change select time in timepicker-1.
    $('#tp'+idN).timepicker('setTime', '12:00p');
    
    $('input.change-format').click(function() {
        var input = $(this),
            timepicker = input.closest('div').find('.timepicker2'),
            instance = timepicker.timepicker();
        instance.option('timeFormat', $(this).data('format'));
    });
}

function changeText(){
		cloneWith= $("#with").clone();
	$('select[name=spinner2]').on('change', function() {
		var selectedValue=($("option:selected", this).text());
		switch(selectedValue){
			case "receive":
			case "not receive":
				$("#with").replaceWith(cloneWith.clone());
				$("#with").text("from");
				break;
			default:
				$("#with").replaceWith(cloneWith.clone());
				$("#with").text("with");
				break;
			}
	});

	$('select[name=spinner1]').on('change', function() {
		spinner1Selection=($("option:selected", this).text());
		var timePlaceButton = document.getElementById("switchTimePlace");
		if(timePlaceButton.value == "Time" && timePlaceButton.hidden == false){
			changeHeShe(spinner1Selection);	
		}
	});	
}

function chooseTimePlace(){
	$('select[name=spinner4]').on('change', function() {
		var timePlaceButton = document.getElementById("switchTimePlace");
		timePlaceButton.hidden = false;
		var selectedValue=($("option:selected", this).text());
		switch(selectedValue){
			case "Time":
				timePlaceButton.value = "Time";
				switchTimePlaceValue(timePlaceButton);
				break;
			case "Place":
				timePlaceButton.value = "Place";
				switchTimePlaceValue(timePlaceButton);
				break;
			default:
				break;
		}
	});
}

function changeHeShe(selectedOption){
cloneTimePlace= $("#timePlace").clone();
				switch(selectedOption){
				case "Mary":
				case "Lisa":
				case "Claire":
				case "Jane":
					$("#timePlace").replaceWith(cloneTimePlace.clone());
					$("#timePlace").text("if she is at");
					break;
				case "Jason":
				case "Paul":
				case "Peter":
				case "Mike":
					$("#timePlace").replaceWith(cloneTimePlace.clone());
					$("#timePlace").text("if he is at");
					break;
				default:
					$("#timePlace").replaceWith(cloneTimePlace.clone());
					$("#timePlace").text("if he/she is at");
					break;
				}
}

window.onbeforeunload = function (e) {
	if(scenario_submitButton == true){
		//e.preventDefault();
		return;
	}

    var e = e || window.event;
    var msg = "if you go back you will invalidate your participation in this experiment";

    // For IE and Firefox
    if (e) {
        e.returnValue = msg;
    }

    // For Safari / chrome
    return msg;
};



