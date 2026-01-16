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

// make csv
// function makeCSV(){
// assignRecAutos()
// var csv = "Scouter,Match,Team,StartPos,NoShow,Moved,CoralL1,CoralL2,CoralL3,CoralL4,Barge,Processor,Pickup,Strategy,End,RobotDied,Unstable,Comments,RecommendedAuto\n"
// for(var i=0;i<entries.length;i++){
// var e = entries[i]
// csv += [
// e.scouterName,
// e.matchNumber,
// e.teamNumber,
// e.startPosition,
// e.noShow,
// e.movedAuto,
// e.coralL1,
// e.coralL2,
// e.coralL3,
// e.coralL4,
// e.bargeAuto,
// e.processorAuto,
// e.pickupLocation,
// e.strategy,
// e.endPosition,
// e.robotDied,
// e.unstable,
// '"'+e.comments+'"',
// e.recommendedAuto || ""
// ].join(",") + "\n"

// }
// return csv


// create the sheet
// document.getElementById("share").onclick = function(){
// var csvSheet = makeCSV()
// var blob = new Blob([csvSheet],{type:'text/csv'})
// var url = URL.createObjectURL(blob)
// var a = document.createElement("a")
// a.href = url
// a.download = "scouting_entries.csv"
// a.click()
// URL.revokeObjectURL(url)

document.getElementById("share").onclick = function() {
  assignRecAutos(); 
  if(entries.length === 0) {
      alert("No entries to share");
      return;
  }

  // Send each entry one by one
  entries.forEach(function(entry) {
      const data = {
          scouterName: entry.scouterName,
          matchNumber: entry.matchNumber,
          teamNumber: entry.teamNumber,
          startPosition: entry.startPosition,
          noShow: entry.noShow,
          movedAuto: entry.movedAuto,
          coralL1: entry.coralL1,
          coralL2: entry.coralL2,
          coralL3: entry.coralL3,
          coralL4: entry.coralL4,
          bargeAuto: entry.bargeAuto,
          processorAuto: entry.processorAuto,
          pickupLocation: entry.pickupLocation,
          strategy: entry.strategy,
          endPosition: entry.endPosition,
          robotDied: entry.robotDied,
          unstable: entry.unstable,
          comments: entry.comments,
          autoScore: entry.autoScore,
          recommendedAuto: entry.recommendedAuto
      };

      fetch("https://script.google.com/macros/s/AKfycbzKpvzgBSXacc4Rlchb8s4rgbL1qEqMir9dN5J4dSE09lTjOroO1rxYicG7u2CnHs0T/exec", {  
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      })
      .then(() => {
          console.log("Entry for match " + entry.matchNumber + "sent");
      })
      .catch((err) => {
          console.error("Failed to send entry:", err);
      });
  });

  alert("sent to Google Sheets");
  entries = []; // clear after sending to prevent duplicates
}
