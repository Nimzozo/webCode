// 2017-12-01
// Copyright (c) 2017 Nimzozo

/**
 * Syntax highlighting for web languages.
 */
window.webCode = window.webCode || (function () {
    "use strict";

    var codes = {};

    /**
     * CSS class names and ids.
     */
    var css = {
        attribute: "webCode-html-attribute",
        string: "webCode-html-string",
        tag: "webCode-html-tag",
        webCode: "webCode"
    };

    /**
     * Regular expressions.
     */
    var regExp = {
        htmlCloser: />/,
        htmlOpener: /</,
        html: /^<[^<>]>$/,
        htmlAttribute: /(&lt;\S+?\s)(\S+?)(=)/gm,
        htmlString: /(\s\S+?=)('.+?'|".+?")(\s|&gt;)/gm,
        htmlTag: /(<\/?)(\S+?)(\s|>)/
    };

    var replacement = {
        htmlAttribute: "$1<pre class=\"" + css.attribute + "\">$2</pre>$3",
        htmlString: "$1<pre class=\"" + css.string + "\">$2</pre>$3",
        htmlTag: "$1<pre class=\"" + css.tag + "\">$2</pre>$3"
    };

    function parseFragment(str) {
        var fragment = "";
        var fragments = [];
        var startIndex = 0;
        var strArray = str.split("");
        
        if (regExp.html.test(str)) {
            var tags = regExp.htmlTag.exec(str);
            
        } else {
            return str;
        }
    }

    /**
     * Separate a string.
     * @param {string} str The string to separate.
     */
    function separate(str) {
        var fragment = "";
        var fragments = [];
        var startIndex = 0;
        var strArray = str.split("");
        strArray.forEach(function (char, charIndex) {
            if (regExp.htmlOpener.test(char)) {
                fragment = str.substring(startIndex, charIndex);
                fragments.push(fragment);
                startIndex = charIndex;
            } else if (regExp.htmlCloser.test(char)) {
                fragment = str.substring(startIndex, charIndex + 1);
                fragments.push(fragment);
                startIndex = charIndex + 1;
            } else if (charIndex === str.length - 1) {
                fragment = str.substring(startIndex, charIndex + 1);
                fragments.push(fragment);
            }
        });
        return fragments;
    }

    codes = document.getElementsByClassName(css.webCode);
    Object.keys(codes).forEach(function (key) {
        var code = codes[key];
        var text = "";
        var arr = separate(code.innerText);
        arr.forEach(function (str) {
            text += "[" + str + "]";
        });
        code.innerText = text;
    });

}());
