// @ts-nocheck
const endpointInput = document.getElementById("endpointUrl");
const uploadButton = document.getElementById("uploadButton");
const financialTimesButton = document.getElementById("financialTimes");

chrome.storage.local.get(["endpointUrl"], ({ endpointUrl }) => {
  if (typeof endpointUrl === "string" && endpointUrl) {
    endpointInput.value = endpointUrl;
  }
});

financialTimesButton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab?.url?.includes("ft.com/content/")) {
      sendFinancialTimesUrl(tab.url);
    }
  });
});

uploadButton.addEventListener("click", () => {
  const endpointUrl = endpointInput.value.trim();
  chrome.storage.local.set({ endpointUrl }, () => {
    if (chrome.runtime.lastError) {
      console.error("Failed to save endpoint URL", chrome.runtime.lastError);
      return;
    }
    console.log("Endpoint URL saved");
  });
});
