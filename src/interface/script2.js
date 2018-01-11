$("#pro-form input").keyup(function() {
  
var numValid = 0;
$("#pro-form input[required]").each(function() {
    if (this.validity.valid) {
        numValid++;
    }
});

var progress = $("#progress"),
    progressMessage = $("#progress-message");

if (numValid == 0) {
    progress.attr("value", "0");
    progressMessage.text("The form, it wants you.");
}
if (numValid == 1) {
    progress.attr("value", "20");
    progressMessage.text("There you go, great start!");
}
if (numValid == 2) {
    progress.attr("value", "40");
    progressMessage.text("Nothing can stop you now.");
}
if (numValid == 3) {
    progress.attr("value", "60");
    progressMessage.text("You're basically a hero, right?");
}
if (numValid == 4) {
    progress.attr("value", "80");
    progressMessage.text("They are going to write songs about you.");
}
if (numValid == 5) {
    progress.attr("value", "95");
    progressMessage.text("SO CLOSE. PRESS THE THING.");
}

  
});
function verif()
{
var val1   = document.getElementById("mp1").value,
    val2   = document.getElementById("mp2").value,
    result = document.getElementById("result");
 
if(val1!=val2){
  result.innerHTML="error";
}
else {
  result.innerHTML="Valide !";
}
 
}
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 
