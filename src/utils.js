var truncate = function (fullStr, strLen = 26, separator = "...") {
    if (fullStr.length <= strLen) return fullStr;


    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return fullStr.substr(0, frontChars) + 
           separator + 
           fullStr.substr(fullStr.length - backChars);
};

export { truncate }