// // popup.js

// import { getCurrentTab } from "./util.js";

// document.addEventListener("DOMContentLoaded", async function () {
//   const currentTab = await getCurrentTab();
//   console.log(currentTab);
//   document.getElementById("extractButton").addEventListener("click", function () {
//     // Request the extracted text from the background script
//     console.log("CLICKED");
//     chrome.tabs.sendMessage(currentTab.id, {
//       type: "CHANGE TEXT"
//     });
//     // chrome.tabs.sendMessage()
//     // chrome.runtime.sendMessage({ action: "getText" }, function (response) {
//     //   document.getElementById("result").innerText = response.text;
//     // });
//   });
// });
