/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
(function(global) {
    var iosLanguages = ['swift', 'objective_c'];
    var androidLanguages = ['java'];
    var webLanguages = ['javascript'];
    var restLanguages = ['shell', 'javascript'];
    var languages = [].concat(iosLanguages, androidLanguages, webLanguages, restLanguages);

    global.setupLanguages = setupLanguages;
    global.activateLanguage = activateLanguage;
    global.getPlatform = getPlatform;
    global.getLanguages = getLanguages;

    function getPlatform() {
        var pathname = window.location.pathname;

        if (pathname.indexOf('/ios') === 0) {
            return 'ios'
        }

        if (pathname.indexOf('/android') === 0) {
            return 'android'
        }

        if (pathname.indexOf('/javascript') === 0) {
            return 'javascript'
        }

        if (pathname.indexOf('/rest') === 0) {
            return 'rest'
        }

        return 'unknown';
    }

    function getLanguages() {
        var platform = getPlatform();

        switch (platform) {
            case 'ios':
                return iosLanguages;
            case 'android':
                return androidLanguages;
            case 'javascript':
                return webLanguages;
            case 'rest':
                return restLanguages;
        }

        return iosLanguages;
    }

    function activateLanguage(language) {
        if (!language || language === '') {
            return;
        }
        $('.lang-selector a').removeClass('active');
        $('.lang-selector a[data-language-name=\'' + language + '\']').addClass('active');
        for (var i = 0; i < languages.length; i++) {
            $('.highlight.' + languages[i]).hide();
        }
        $('.highlight.' + language).show();

        localStorage.setItem('language_' + getPlatform(), language);

        if (window.location.hash && $(window.location.hash).get(0)) {
            // scroll to the new location of the position
            $(window.location.hash).get(0).scrollIntoView(true);
        } else {
            history.pushState('', document.title, window.location.pathname);
        }
    }

    // if a button is clicked, add the state to the history
    function pushURL(language) {
        if (!history) {
            return;
        }
        var hash = window.location.hash;
        if (hash) {
            hash = hash.replace(/^#+/, '');
        }
        history.pushState({}, '', '?' + language + '#' + hash);

        // save language as next default
        localStorage.setItem('language_' + getPlatform(), language);
    }

    function setupLanguages(l) {
        var currentLanguage = l[0];
        var defaultLanguage = localStorage.getItem('language_' + getPlatform());

        if ((location.search.substr(1) !== '') && (jQuery.inArray(location.search.substr(1), getLanguages())) != -1) {
            // the language is in the URL, so use that language!
            activateLanguage(location.search.substr(1));

            localStorage.setItem('language_' + getPlatform(), location.search.substr(1));
        } else if ((defaultLanguage !== null) && (jQuery.inArray(defaultLanguage, getLanguages()) != -1)) {
            // the language was the last selected one saved in localstorage, so use that language!
            activateLanguage(defaultLanguage);
        } else {
            // no language selected, so use the default
            activateLanguage(getLanguages()[0]);
        }
    }

    // if we click on a language tab, activate that language
    $(function() {
        $('.lang-selector a').on('click', function() {
            var language = $(this).data('language-name');
            pushURL(language);
            activateLanguage(language);
            return false;
        });
        window.onpopstate = function(event) {
            activateLanguage(window.location.search.substr(1));
        };
    });

})(window);
