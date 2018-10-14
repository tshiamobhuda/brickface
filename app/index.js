import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import userActivity from "user-activity";
import { battery } from "power";

let hours1 = document.getElementById("imgHours1");
let hours2 = document.getElementById("imgHours2");
let mins1 = document.getElementById("imgMins1");
let mins2 = document.getElementById("imgMins2");

let day = document.getElementById("imgDays");

let distance = document.getElementById("txtDistance");
let steps = document.getElementById("txtSteps");
let cals = document.getElementById("txtCals");
let lvl = document.getElementById("txtLvl");

let powerLvl = document.getElementById("txtPowerLvl");

let gSteps = document.getElementById("gSteps");
let gDistance = document.getElementById("gDistance");

clock.granularity = "minutes";

clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let mins = util.zeroPad(today.getMinutes());
  
  steps.text = userActivity.today.adjusted.steps;
  cals.text = userActivity.today.adjusted.calories;
  lvl.text = userActivity.today.adjusted.elevationGain;
  powerLvl.text = Math.floor(battery.chargeLevel);  

  distance.text = userActivity.today.adjusted.distance;

  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  setDay(today.getDay());
  setHours(hours);
  setMins(mins);
};

gSteps.onclick = () => {
    util.toggleElements(gSteps, gDistance);
};

gDistance.onclick = (e) => {
    util.toggleElements(gDistance, gSteps);
};

function setHours(val) {
  if (val > 9) {
    drawDigit(Math.floor(val / 10), hours1);
  } else {
    drawDigit("0", hours1);
  }
  drawDigit(Math.floor(val % 10), hours2);
}

function setMins(val) {
  drawDigit(Math.floor(val / 10), mins1);
  drawDigit(Math.floor(val % 10), mins2);
}

function setDay(val) {
  day.image = `day${val}.png`;
}

function drawDigit(val, place) {
  place.image = `${val}.png`;
}