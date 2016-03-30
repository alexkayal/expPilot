x=1;
spinner1Selection = null;

$(document).ready(function() {
	$('#btnNext').prop('disabled', false);
	var selectBox = $("select").selectBoxIt({nativeMousedown: true });
	updateTextFromFile("#container");

	//find the lead character
	var leadChar = null;
	for (var i = 0; i < leadCharacter.length; i++) {
		if(leadCharacter[i]['scenario'] == x){
			leadChar = leadCharacter[i]['lead'];
		}
	};
	//remove myself from the spinner1 and spinner3
	removeLeadCharacterOption("#spinner1nump", "spinner1", leadChar);
	removeLeadCharacterOption("#spinner3nump", "spinner3", leadChar);

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


//get scenario text from file and fill up the container with it 
//here we should replace x with a random number (accoring to algorithm) and store in cookie (not here, somewhere).

function updateTextFromFile(txtcontainer){
		var txtFile = "examplescenario.txt";
	    $.get(txtFile, function(data) {
			$(txtcontainer).html(data.toString());
    }, "text" );
}

var text = null;
$.get("qc" +x+ ".txt", function(txtData){
	text = txtData;
}, "text");

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
}

function submitScenario(){
		$('#dynmaicform').prop('action', 'scenario.html');
		$('#dynmaicform').submit();
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
	    {value: "share", text: "the park"},
	    {value: "not share", text: "school"},
	    {value: "receive", text: "the theater"},
	    {value: "not receive", text: "Joe's place"}
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
		//$("#timePlace").text("if he/she is at");
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

function changeHeShe(selectedOption){
cloneTimePlace= $("#timePlace").clone();
				switch(selectedOption){
				case "Mary":
				case "Lisa":
					$("#timePlace").replaceWith(cloneTimePlace.clone());
					$("#timePlace").text("if she is at");
					break;
				case "Jason":
				case "Paul":
					$("#timePlace").replaceWith(cloneTimePlace.clone());
					$("#timePlace").text("if he is at");
					break;
				default:
					$("#timePlace").replaceWith(cloneTimePlace.clone());
					$("#timePlace").text("if he/she is at");
					break;
				}
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


