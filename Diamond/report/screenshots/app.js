var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "Should have correct page title, ID-1 BERMET|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655256528,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655257286,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot set property 'context' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:1689\\n    at r (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:12360)\\n    at o (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:9:21078)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:2825\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\"",
                "timestamp": 1540655257576,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot read property '$watch' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:10:5162\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\\n    at a (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:18050)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:19899\"",
                "timestamp": 1540655257587,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655260199,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655260505,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655260978,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot set property 'context' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:1689\\n    at r (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:12360)\\n    at o (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:9:21078)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:2825\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\"",
                "timestamp": 1540655261285,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot read property '$watch' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:10:5162\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\\n    at a (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:18050)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:19899\"",
                "timestamp": 1540655261290,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655261440,
                "type": ""
            }
        ],
        "screenShotFile": "images\\000100d8-00b7-00dd-0025-0011000e00f5.png",
        "timestamp": 1540655260156,
        "duration": 2318
    },
    {
        "description": "Should Login to Account, ID-6 ZHIBEK|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655263752,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655264174,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot set property 'context' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:1689\\n    at r (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:12360)\\n    at o (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:9:21078)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:2825\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\"",
                "timestamp": 1540655264412,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot read property '$watch' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:10:5162\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\\n    at a (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:18050)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:19899\"",
                "timestamp": 1540655264417,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655264629,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655265420,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655265807,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655266342,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655267373,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655267829,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655268246,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655269301,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655269725,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655270173,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655271141,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655271541,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655271918,
                "type": ""
            }
        ],
        "screenShotFile": "images\\0082004d-00dd-0002-001d-00f0006d0082.png",
        "timestamp": 1540655263463,
        "duration": 8431
    },
    {
        "description": "Should verify checkout functionality, ID-12 SHAHIDA|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655273389,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655273605,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot set property 'context' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:1689\\n    at r (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:12360)\\n    at o (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:9:21078)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:2825\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\"",
                "timestamp": 1540655273797,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot read property '$watch' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:10:5162\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\\n    at a (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:18050)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:19899\"",
                "timestamp": 1540655273801,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655274137,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655275165,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655275432,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655276453,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655277901,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655278164,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "javascript 0:89 Uncaught TypeError: Cannot read property '0' of undefined",
                "timestamp": 1540655278889,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655278937,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655280152,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655280582,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "javascript 0:0 Uncaught ReferenceError: pintrk is not defined",
                "timestamp": 1540655280658,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655282019,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00740032-0038-007f-00ec-00ac005c0010.png",
        "timestamp": 1540655273115,
        "duration": 8955
    },
    {
        "description": "Should verify \"flexible options payment\" link, ID-16 SHAHIDA|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655282620,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655283049,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot set property 'context' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:1689\\n    at r (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:12360)\\n    at o (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:9:21078)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:1:2825\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\"",
                "timestamp": 1540655283264,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 6:15314 \"TypeError: Cannot read property '$watch' of undefined\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:10:5162\\n    at l (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:20780)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:21437\\n    at l.$eval (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26687)\\n    at l.$digest (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:25212)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:7:26798\\n    at a (https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:18050)\\n    at https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2:6:19899\"",
                "timestamp": 1540655283270,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655283510,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655284910,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_bamAttributionPath: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655285283,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_email: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655285284,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_first_name: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655285284,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_last_name: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655285284,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 2 elements with non-unique id #input_message: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540655285284,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_phone: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655285284,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_send: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655285284,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #inputemail3: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655285285,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655285298,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655285678,
                "type": ""
            }
        ],
        "screenShotFile": "images\\006e0077-00c9-0021-0023-00be00f60092.png",
        "timestamp": 1540655282369,
        "duration": 6156
    },
    {
        "description": "Should create an account, ID-5 AZIZA|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655289360,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655289785,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655290161,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655290890,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655291283,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655291667,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655293160,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655293631,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655294251,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655295771,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655296189,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655297593,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655298349,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655298747,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655299284,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655300809,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655301233,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655301740,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655302530,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655302948,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655304337,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655305107,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655305516,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655305906,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655307550,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655307979,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655308376,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655309185,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655309406,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655310788,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655311490,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655311884,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655312463,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00d90032-007c-00db-00ff-007d00dc00df.png",
        "timestamp": 1540655288831,
        "duration": 23605
    },
    {
        "description": "Should display \"Browse Engagements Rings\" and click on it, ID-8 AZIZA|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655313110,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655313633,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655314174,
                "type": ""
            }
        ],
        "screenShotFile": "images\\004700ab-0078-003e-0068-00f0002000e6.png",
        "timestamp": 1540655312877,
        "duration": 1488
    },
    {
        "description": "Should accept text in search field and display result, ID-3 RAKHAT|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655315706,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655316111,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655316514,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655317968,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655318156,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655319626,
                "type": ""
            }
        ],
        "screenShotFile": "images\\000600b7-0089-005b-00bb-004800f50079.png",
        "timestamp": 1540655315474,
        "duration": 4266
    },
    {
        "description": "Should allow to pick appointment date, ID-14 RAKHAT|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655320330,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655320835,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655321340,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Failed to load javascript:void(0)?_=1540655320211: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.",
                "timestamp": 1540655321579,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.setster.com/widget/js/setster_over.js?v=2&_=1540655320212 586:15 Uncaught ReferenceError: setsHost is not defined",
                "timestamp": 1540655348585,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00960051-0099-008b-002f-00e8009f009b.png",
        "timestamp": 1540655320095,
        "duration": 28545
    },
    {
        "description": "Should make an appointment and check locations, ID-13 GULJAMAL|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655349477,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655349900,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655350480,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Failed to load javascript:void(0)?_=1540655349364: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.",
                "timestamp": 1540655350802,
                "type": ""
            }
        ],
        "screenShotFile": "images\\007000d5-0087-0064-0031-00ee008f00d5.png",
        "timestamp": 1540655349230,
        "duration": 1588
    },
    {
        "description": "Should verify flexible Payment Options, ID-17 GULJAMAL|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655352116,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655352540,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655352972,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655353937,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_bamAttributionPath: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655354122,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_email: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655354122,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_first_name: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655354123,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_last_name: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655354123,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 2 elements with non-unique id #input_message: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1540655354123,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_phone: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655354123,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #input_send: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655354123,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.brilliantearth.com/flexible-payment-options/ - [DOM] Found 3 elements with non-unique id #inputemail3: (More info: https://goo.gl/9p2vKq) %o %o %o",
                "timestamp": 1540655354124,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655354139,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655354564,
                "type": ""
            }
        ],
        "screenShotFile": "images\\007f006e-001b-00b3-0044-00bf002b0047.png",
        "timestamp": 1540655351882,
        "duration": 3081
    },
    {
        "description": "Should verify “email us” functionality, ID-15 ZHIBEK|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655355616,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655355940,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655356375,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Failed to load javascript:void(0);?_=1540655355424: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.",
                "timestamp": 1540655356906,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655362416,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://ads.bluelithium.com/pixel?id=1044715&t=1 - Failed to load resource: the server responded with a status of 502 (connect failed)",
                "timestamp": 1540655362416,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655362416,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655362417,
                "type": ""
            }
        ],
        "screenShotFile": "images\\003f0048-0048-0033-00e4-003e00be00f3.png",
        "timestamp": 1540655355312,
        "duration": 7133
    },
    {
        "description": "Should display \"Create account\" and be clickable, ID-4 AIPERI|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655362977,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655363306,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655363869,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655364597,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655365000,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655365411,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00e600d0-0079-00b6-0030-00e000130088.png",
        "timestamp": 1540655362736,
        "duration": 2788
    },
    {
        "description": "Should interact with an agent, ID-9, AIPERI|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655366104,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655366416,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655366974,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00ce0016-009f-0032-0078-0083002b007f.png",
        "timestamp": 1540655365868,
        "duration": 4280
    },
    {
        "description": "Should verify the link on top of the page, ID-2 SHEKERBEK|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655371340,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655371759,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655372184,
                "type": ""
            }
        ],
        "screenShotFile": "images\\003a00ca-00e2-0008-009f-006e00ce004a.png",
        "timestamp": 1540655371098,
        "duration": 2317
    },
    {
        "description": "Should verify (Brilliant Earth Reviews), ID-11 BERMET|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655374590,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655374996,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655377431,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655378211,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655378461,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655380838,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00cd001b-003f-00c2-00b3-00fe00e6008a.png",
        "timestamp": 1540655374344,
        "duration": 6555
    },
    {
        "description": "should inspect invalid email, ID-7 ALIIA|Diamond project",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655381437,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655381742,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655382546,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00400049-00a8-00bc-0069-009500f600df.png",
        "timestamp": 1540655381199,
        "duration": 2912
    },
    {
        "description": "Should verify invalid tracking number, ID-18 ALIIA|Diamond project",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13340,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Failed: Wait timed out after 10005ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 10005ms\n    at C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.it (C:\\Users\\binni\\Desktop\\DiamondProject\\Diamond\\Tests\\Project.spec.js:404:13)\n    at C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Should verify invalid tracking number, ID-18 ALIIA\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.describe (C:\\Users\\binni\\Desktop\\DiamondProject\\Diamond\\Tests\\Project.spec.js:398:1)\n    at addSpecsToSuite (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\binni\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\binni\\Desktop\\DiamondProject\\Diamond\\Tests\\Project.spec.js:10:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://script.brilliantearth.com/static/js/global-mini.js?_v=20181025 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1540655385203,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.searchspring.net/search/v3/js/searchspring.catalog.js?zqp8n2 0 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655385611,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googleadservices.com/pagead/conversion.js 44 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.",
                "timestamp": 1540655386043,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00610094-0094-0066-002a-000900cb00fa.png",
        "timestamp": 1540655384974,
        "duration": 11451
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
