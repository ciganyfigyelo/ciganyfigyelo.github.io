// Debugging stuff
$(document).ready(function() {
    if (typeof jQuery !== 'undefined') {
        console.log("jQuery is loaded.");
        console.log("jQuery version:", jQuery.fn.jquery);
        if (jQuery.noConflict) {
            console.log("jQuery is in noConflict mode.");
        }
    } else {
        console.log("jQuery is not loaded.");
    }
});

// Jquery Include HTML
$(document).ready(function () {
    function includeHTML() {
        $('[include-html]').each(function () {
            var $this = $(this);
            var file = $this.attr('include-html');
            if (file) {
                $.ajax({
                    url: file,
                    method: 'GET',
                    success: function (data) {
                        $this.html(data);
                        console.log('Successfully included:', file);
                    },
                    error: function () {
                        console.warn('Failed to include:', file, 'Attempting fallback...');
                        // Attempt to load the fallback file
                        $.ajax({
                            url: '/incl/section_error.html',
                            method: 'GET',
                            success: function (fallbackData) {
                                $this.html(fallbackData);
                                console.log('Loaded fallback content from /incl/section_error.html');
                            },
                            error: function () {
                                $this.html('An error has occurred while loading this section and the fallback content.');
                                console.error('Failed to load fallback content from /incl/section_error.html');
                            }
                        });
                    },
                    complete: function () {
                        $this.removeAttr('include-html');
                        includeHTML();
                    }
                });
            }
        });
    }

    includeHTML();
});

// Function to handle screen width changes
function checkScreenWidth() {
    console.log("CheckScreenWidth");
}

// Use jQuery's resize event
$(window).on('resize', checkScreenWidth);


// Script to display device details
$(document).ready(function () {
    function getBrowserAndDeviceDetails() {
        var userAgent = navigator.userAgent;
        var browserName, deviceType;

        // Detect browser
        if (userAgent.indexOf("Firefox") > -1) {
            browserName = "Mozilla Firefox";
        } else if (userAgent.indexOf("SamsungBrowser") > -1) {
            browserName = "Samsung Internet";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            browserName = "Opera";
        } else if (userAgent.indexOf("Trident") > -1) {
            browserName = "Microsoft Internet Explorer";
        } else if (userAgent.indexOf("Edge") > -1) {
            browserName = "Microsoft Edge";
        } else if (userAgent.indexOf("Chrome") > -1) {
            browserName = "Google Chrome";
        } else if (userAgent.indexOf("Safari") > -1) {
            browserName = "Apple Safari";
        } else {
            browserName = "Unknown Browser";
        }

        // Detect device
        if (/Mobi|Android/i.test(userAgent)) {
            deviceType = "Mobile";
        } else if (/Tablet|iPad/i.test(userAgent)) {
            deviceType = "Tablet";
        } else {
            deviceType = "Desktop";
        }

        return `You are using ${browserName} on a ${deviceType} device.`;
    }
    
    $("#browserDetails").text(getBrowserAndDeviceDetails());
});