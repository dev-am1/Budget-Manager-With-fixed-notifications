//Context Menu
const contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

// Is number an integer
function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

// making Context menu
chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function(budget) {
                let newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({ 'total': newTotal }, function() {
                    if (newTotal >= budget.limit) {
                        const notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon48.png',
                            title: 'Limit reached',
                            message: 'Uh on! looks like you have reach your limit'
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                });
                chrome.notifications.clear('limitNotif');
            });
        }
    }
});

// adding badge to extension icon in toolbar in this case a number equilavent to spending
chrome.storage.onChanged.addListener(function(changes, StorageName) {
    chrome.browserAction.setBadgeText({ "text": changes.total.newValue.toString() })
})