// @ts-nocheck
function sendYouTubeUrl(ytUrl) {
    chrome.storage.local.get(['endpointUrl'], async ({ endpointUrl }) => {
        if (typeof endpointUrl !== 'string' || !endpointUrl) {
            console.log('No endpoint URL found');
            return;
        }

        const endpoint = `${endpointUrl.replace(/\/+$/, '')}/embed`;
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ yt_url: ytUrl })
            });

            if (!response.ok) {
                const body = await response.json().catch(() => null);
                const detail = body?.detail || `Request failed with status ${response.status}`;
                console.log(detail);
                return;
            }

            console.log('Embed request sent successfully');
        } catch (error) {
            console.error('Failed to send embed request', error);
        }
    });
}

// Fires when a tab finishes loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab?.url?.includes('youtube')) {
        sendYouTubeUrl(tab.url);
    }
});

// Fires when the user switches to a different tab
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
    const tab = await chrome.tabs.get(tabId);
    if (tab?.url?.includes('youtube')) {
        sendYouTubeUrl(tab.url);
    }
});