
function displaySlider() {


  $(".slider").slider({
      min: 0,
      max: 10,
      step: 0.01
    }).slider("pips", {
      rest: "false",
      step: 50,
      labels: {"first":"very negatively", "last":"very positively"}
    }).each(function(){
      //set the label for center value
      var el = $('#slider')[0].getElementsByClassName("ui-slider-pip-5")[0].getElementsByClassName("ui-slider-label")[0];
      if(el.textContent){
        el.textContent = "no contribution";
      }else{
        el.innerText = "no contribution";
      }
    }).on('click', function(){
    });

$(".ui-slider-label").off("mouseenter mouseleave");

$("#slider").mousedown(function(){
  $('.ui-slider-handle').show();
})
$("#slider").slider({
/*     change: function(event, ui) {
         $('.ui-slider-handle').show();
     }*/
});
$('.ui-slider-handle').hide();

}

