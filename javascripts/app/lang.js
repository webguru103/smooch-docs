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
!function(a){function t(){var a=window.location.pathname;return 0===a.indexOf("/ios")?"ios":0===a.indexOf("/android")?"android":0===a.indexOf("/javascript")?"javascript":0===a.indexOf("/rest")?"rest":"unknown"}function n(){var a=t();return"rest"===a?s:r}function o(a){if(a&&""!==a){$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+a+"']").addClass("active");for(var o=0;o<n().length;o++)$(".highlight."+n()[o]).hide();$(".highlight."+a).show(),localStorage.setItem("language_"+t(),a),window.location.hash&&$(window.location.hash).get(0)?$(window.location.hash).get(0).scrollIntoView(!0):history.pushState("",document.title,window.location.pathname)}}function e(a){if(history){var n=window.location.hash;n&&(n=n.replace(/^#+/,"")),history.pushState({},"","?"+a+"#"+n),localStorage.setItem("language_"+t(),a)}}function i(a){var e=(a[0],localStorage.getItem("language_"+t()));""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),n())?(o(location.search.substr(1)),localStorage.setItem("language_"+t(),location.search.substr(1))):o(null!==e&&-1!=jQuery.inArray(e,n())?e:n()[0])}var r=["java","swift","objective_c"],s=["shell","javascript"];a.setupLanguages=i,a.activateLanguage=o,$(function(){$(".lang-selector a").on("click",function(){var a=$(this).data("language-name");return e(a),o(a),!1}),window.onpopstate=function(){o(window.location.search.substr(1))}})}(window);