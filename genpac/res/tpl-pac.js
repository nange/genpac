/**
 * genpac __VERSION__ https://github.com/nange/genpac
 * Generated: __GENERATED__
 * GFWList Last-Modified: __MODIFIED__
 * GFWList From: __GFWLIST_FROM__
 */

var global = {{.Global}}
var proxy = '__PROXY__';
var rules = __RULES__;

var lastRule = '';

function FindProxyForURL(url, host) {
    if (host.indexOf('localhost') != -1 || host.indexOf('127.0.0.1') != -1) {
        return  'DIRECT';
    }
    if (isPrivateIP(host)) {
        return  'DIRECT';
    }
    if (global) {
        return proxy;
    }
    for (var i = 0; i < rules.length; i++) {
        ret = testHost(host, i);
        if (ret != undefined)
            return ret;
    }
    return 'DIRECT';
}

function testHost(host, index) {
    for (var i = 0; i < rules[index].length; i++) {
        for (var j = 0; j < rules[index][i].length; j++) {
            lastRule = rules[index][i][j]
            if (host == lastRule || host.endsWith('.' + lastRule))
                return i % 2 == 0 ? 'DIRECT' : proxy;
        }
    }
    lastRule = '';
}

// REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
  };
}

function isPrivateIP(ip) {
	if (!isIP(ip)) {
		return false;
	}
	if (isAIP(ip) || isBIP(ip) || isCIP(ip)) {
		return true;
	}
	return false;
}

function isIP(ip) {
	var ipreg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
	if (ipreg.test(ip)) {
		return true;
	}
	return false;
}

function isAIP(ip) {
	// A类ip：10.0.0.0-10.255.255.255
	var ipitems = ip.split('.');
	if (parseInt(ipitems[0]) != 10) {
		return false;
	}
	return true;
}

function isBIP(ip) {
	// B类ip：172.16.0.0-172.31.255.255
	var ipitems = ip.split('.');
	if (parseInt(ipitems[0]) != 172) {
		return false;
	}
	var second = parseInt(ipitems[1]);
	if (second < 16 || second > 31) {
		return false;
	}
	return true;
}

function isCIP(ip) {
	// C类ip：192.168.0.0-192.168.255.255
	var ipitems = ip.split('.');
	if (parseInt(ipitems[0]) != 192) {
		return false;
	}
	if (parseInt(ipitems[1]) != 168) {
		return false;
	}
	return true;
}

