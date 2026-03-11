var entries = [];


// function fuelCount(targetId, amount, isReset = false) {
//   var element = document.getElementById(targetId);
//   if (isReset) {
//     element.value = 0;
//   } else {
//     var currentVal = parseInt(element.value) || 0;
//     element.value = currentVal + amount;
//   }
// }


// function calcAutoScore(entry){
//   var score = 0;
//   score += entry.autoFuel;
//   if(entry.moved === "yes") score += 2;
//   if(entry.climbedAuto === "L1") score += 15; 
//   return score;
// }


document.getElementById("saveEntry").onclick = function(){
  var entry = {};

  // Pre-match
  entry.scouterName = document.getElementById("scouterName").value;
  entry.matchNumber = Number(document.getElementById("matchNumber").value);
  entry.teamNumber = Number(document.getElementById("teamNumber").value);

  // Auto 
  entry.startPosition = document.getElementById("startPosition").value;
  entry.moved = document.getElementById("moved").value;
  entry.autoFuel = Number(document.getElementById("autoFuel").value);
  entry.climbedAuto = document.getElementById("climbed").value;
  entry.outpostPickup = document.getElementById("outpostPickup").value;
  entry.groundPickup = document.getElementById("groundPickup").value;

  // Teleop
  entry.teleFuel = Number(document.getElementById("teleFuel").value);
  entry.vision = document.getElementById("vision").value;
  entry.clearsTrench = document.getElementById("clearsTrench").value;

  // Endgame
  entry.endPosition = document.getElementById("endPosition").value;
  entry.comments = document.getElementById("comments").value;

  // entry.autoScore = calcAutoScore(entry);

  // Save to the list
  entries.push(entry);

  console.log("Database updated:", entries);
  alert("Saved match " + entry.matchNumber + " team " + entry.teamNumber);
  
  // Clean the counters for the next scout
  document.getElementById("autoFuel").value = 0;
  document.getElementById("teleFuel").value = 0;
};

document.getElementById("share").onclick = function() {
  var lastEntry = entries[entries.length - 1];
  var webAppUrl = "https://script.google.com/macros/s/AKfycbyUKpZYHoqBbKYGpaX9rV2MYbv2OmAXVOIk052r5rHcm1CBX4nFqWtz0m0CIsnvu8jihA/exec";
  // tweaking

  fetch(webAppUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lastEntry)
  })
  .then(() => alert("Sent to sheet!"))
  .catch(error => console.error("Error:", error));
  
};