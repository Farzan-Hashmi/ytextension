// @ts-nocheck
const endpointInput = document.getElementById('endpointUrl');
const uploadButton = document.getElementById('uploadButton');

chrome.storage.local.get(['endpointUrl'], ({ endpointUrl }) => {
    if (typeof endpointUrl === 'string' && endpointUrl) {
        endpointInput.value = endpointUrl;
    }
});

uploadButton.addEventListener('click', () => {
    const endpointUrl = endpointInput.value.trim();
    chrome.storage.local.set({ endpointUrl }, () => {
        if (chrome.runtime.lastError) {
            console.error('Failed to save endpoint URL', chrome.runtime.lastError);
            return;
        }
        console.log('Endpoint URL saved');
    });
});