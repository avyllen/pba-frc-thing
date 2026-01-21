var entries = [];

// calculate auto score
function calcAutoScore(entry){
var score = 0
score += Number(entry.coralL1) * 1
score += Number(entry.coralL2) * 2
score += Number(entry.coralL3) * 3
score += Number(entry.coralL4) * 4
score += Number(entry.bargeAuto) * 4
score += Number(entry.processorAuto) * 3
if(entry.movedAuto==="Yes") score += 2
return score
}

// save 
document.getElementById("saveEntry").onclick = function(){
var entry = {}
entry.scouterName = document.getElementById("scouterName").value
entry.matchNumber = Number(document.getElementById("matchNumber").value)
entry.teamNumber = Number(document.getElementById("teamNumber").value)
entry.startPosition = document.getElementById("startPosition").value
entry.noShow = document.getElementById("noShow").value
entry.movedAuto = document.getElementById("Moved").value

// coral score
entry.coralL1 = Number(document.getElementById("coralL1").value || 0)
entry.coralL2 = Number(document.getElementById("coralL2").value || 0)
entry.coralL3 = Number(document.getElementById("coralL3").value || 0)
entry.coralL4 = Number(document.getElementById("coralL4").value || 0)
entry.bargeAuto = Number(document.getElementById("bargeAuto").value || 0)
entry.processorAuto = Number(document.getElementById("processorAuto").value || 0)

// logs teleop/endgame
entry.pickupLocation = document.getElementById("pickupLocation").value
entry.strategy = document.getElementById("strategy").value
entry.endPosition = document.getElementById("endPosition").value
entry.robotDied = document.getElementById("robotDied").value
entry.unstable = document.getElementById("unstable").value

// comments
entry.comments = document.getElementById("comments").value

entry.autoScore = calcAutoScore(entry)

entries.push(entry)

alert("Saved match "+entry.matchNumber+" team "+entry.teamNumber+" score "+entry.autoScore)
}

// assign recommended auto, figuring out the logic still so it will continue recommending 'auto 1'
function assignRecAutos() {
    // loop through all entries
    for(var i = 0; i < entries.length; i++){
      entries[i].recommendedAuto = "Auto 1"
}
}

document.getElementById("share").onclick = function() {
  if (entries.length === 0) {
      alert("Nothing to share! Save some matches first.");
      return;
  }

const scriptURL = 'https://script.google.com/macros/s/AKfycbwiH9thSDMCkujJonn444dm_-PF7mq3424wckn3fXhclRBFgrtRYn-WxjETd3S4HiORgQ/exec'; //linking apps script/sheet to app

    fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    .then(() => {
        // no cors to allow google sheets to connect w/ non-google app
        alert("Success! Match " + entry.matchNumber + " for Team " + entry.teamNumber + " sent to sheet.");
        
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("Error! Data was not sent.");
    })
  }
  ;