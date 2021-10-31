$(function() {
    chrome.storage.sync.get(['total', 'limit'], function(budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
    $('#spendAmount').click(function() {
        chrome.storage.sync.get(['total', 'limit'], function(budget) {
            let newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }
            let amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({ 'total': newTotal }, function() {
                if (newTotal && newTotal >= budget.limit) {
                    const notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit reached',
                        message: 'Uh on! looks like you have reach your limit'
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
                chrome.notifications.clear('limitNotif')
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});