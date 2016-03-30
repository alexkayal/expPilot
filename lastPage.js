var lastPage_submitButton = false;
var radioArr = [];
var expiryDays = 5;
function submitData(){
  var allChecked = radioButtonChecked();
  if(allChecked){
    storeDataOnServer();
  }else{
    return false;
  }
  
}

function radioButtonChecked(){
  var allchecked = false;
  var radioGroups = [];
  radioGroups[0] = document.getElementsByName("1");
  radioGroups[1] = document.getElementsByName("2");
  radioGroups[2] = document.getElementsByName("3");
  radioGroups[3] = document.getElementsByName("4");
  radioGroups[4] = document.getElementsByName("5");
  radioGroups[5] = document.getElementsByName("6");

  for (var i = 0; i < radioGroups.length; i++) {
    if(!radioGroupCheck(radioGroups[i])){
      alert("Please select a value for question " + (i + 1) + ".");
      return false;
    }
  };
  return true;
  
}


// this function checks if any button in a particular radio groupd is checked.
function radioGroupCheck(radioGroup){
  var checked = false;
  var index = null;
  
  for (var i = 0; i < radioGroup.length; i++) {
    if(checked = radioGroup[i].checked){
      index = i;
      setCookie(radioGroup[i].name+"radioQuestion", radioGroup[i].value, expiryDays);
      radioArr.push({"question": radioGroup[i].name, "answer":radioGroup[i].value});
      break;
    }
  }
  return checked;
}

function storeDataOnServer(){
  //getUser name
  var givenName = getCookie("givenName");

  //get all data from array
  for (var i = 0; i < radioArr.length; i++) {
    radioArr[i]
  };

lastPage_submitButton = true;
  //document.forms["questions"].submit();
  //store it on the php admin database server
}


window.onbeforeunload = function (e) {
  if(lastPage_submitButton == true){
    e.preventDefault();
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
