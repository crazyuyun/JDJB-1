var allShareCodes = [];
var removedShareCodes = [];

exports.setDefaultShareCodes = function(str) {
    if (!str) {
        return
    }
    var shareCodes = str.split("@")
    console.log(`您提供了${shareCodes.length}个账号的助力码\n`);
    if (shareCodes && shareCodes.length) {
        for (var shareCode of shareCodes) {
            if (shareCode && shareCode != "undefined" && allShareCodes.indexOf(shareCode) == -1) {
                allShareCodes.push(shareCode)
            }
        }
    }
}

exports.addShareCode = function(shareCode) {
    if (shareCode && allShareCodes.indexOf(shareCode) == -1) {
        allShareCodes.push(shareCode)
    }
}

exports.removeShareCode = function(shareCode) {
    removedShareCodes.push(shareCode)
}

exports.forEachShareCode = function(func) {
    for (var shareCode of allShareCodes) {
        if (removedShareCodes.indexOf(shareCode) == -1) {
            if (func(shareCode)) {
                break
            }
        }
    }
}

exports.getShareCodes = function() {
    var shareCodes = []
    for (var shareCode of allShareCodes) {
        if (removedShareCodes.indexOf(shareCode) == -1) {
            shareCodes.push(shareCode)
        }
    }
    return shareCodes
}

exports.getAllShareCodes = function() {
    return allShareCodes
}