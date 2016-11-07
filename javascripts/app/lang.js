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
!function(t){function e(){var t=window.location.pathname;return 0===t.indexOf("/ios")?"ios":0===t.indexOf("/android")?"android":0===t.indexOf("/javascript")?"javascript":0===t.indexOf("/rest")?"rest":"unknown"}function n(){var t=e();switch(t){case"ios":return s;case"android":return a;case"javascript":return l;case"rest":return c}return s}function o(t){if(t&&""!==t){$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+t+"']").addClass("active");for(var n=0;n<u.length;n++)$(".highlight."+u[n]).hide();$(".highlight."+t).show(),localStorage.setItem("language_"+e(),t),window.location.hash&&$(window.location.hash).get(0)?$(window.location.hash).get(0).scrollIntoView(!0):history.pushState("",document.title,window.location.pathname)}}function i(t){if(history){var n=window.location.hash;n&&(n=n.replace(/^#+/,"")),history.pushState({},"","?"+t+"#"+n),localStorage.setItem("language_"+e(),t)}}function r(t){var i=(t[0],localStorage.getItem("language_"+e()));""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),n())?(o(location.search.substr(1)),localStorage.setItem("language_"+e(),location.search.substr(1))):o(null!==i&&-1!=jQuery.inArray(i,n())?i:n()[0])}var s=["swift","objective_c"],a=["java"],l=["javascript"],c=["shell","javascript"],u=[].concat(s,a,l,c);t.setupLanguages=r,t.activateLanguage=o,t.getPlatform=e,t.getLanguages=n,$(function(){$(".lang-selector a").on("click",function(){var t=$(this).data("language-name");return i(t),o(t),!1}),window.onpopstate=function(){o(window.location.search.substr(1))}})}(window);