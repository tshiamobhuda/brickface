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

let steps = document.getElementById("txtSteps");
let cals = document.getElementById("txtCals");
let lvl = document.getElementById("txtLvl");

let powerLvl = document.getElementById("txtPowerLvl");

clock.granularity = "minutes";

clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  
  steps.text = userActivity.today.adjusted.steps;
  cals.text = userActivity.today.adjusted.calories;
  lvl.text = userActivity.today.adjusted.elevationGain;
  powerLvl.text = Math.floor(battery.chargeLevel);  
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  let mins = util.zeroPad(today.getMinutes());
  
  setDay(today.getDay());
  setHours(hours);
  setMins(mins);
}

//taken from fitbit lcd clockface
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

function setDate(val) {
  drawDigit(Math.floor(val / 10), date1);
  drawDigit(Math.floor(val % 10), date2);
}

function setDay(val) {
  day.image = `day${val}.png`;
}

function drawDigit(val, place) {
  place.image = `${val}.png`;
}