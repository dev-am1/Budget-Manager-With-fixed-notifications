$(function() {
    chrome.storage.sync.get('limit', function(budget) {
        $('#limit').val(budget.limit);
    })
    $('#saveLimit').click(function() {
        let limit = $('#limit').val();
        if (limit) {
            chrome.storage.sync.set({ 'limit': limit }, function() {
                close();
            });
        }
    });
    $('#resetTotal').click(function() {
        chrome.storage.sync.set({ 'total': 0 }, function() {
            const notifOptions = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Total Reset',
                message: 'Totla has been reset to 0!'
            };
            chrome.notifications.create('limitNotif', notifOptions);
        })
    });
    chrome.notifications.clear('limitNotif')
});