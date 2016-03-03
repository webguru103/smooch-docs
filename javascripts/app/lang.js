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
!function(a){function t(){var a=window.location.pathname;return 0===a.indexOf("/ios")?"ios":0===a.indexOf("/android")?"android":0===a.indexOf("/javascript")?"javascript":0===a.indexOf("/rest")?"rest":"unknown"}function n(){var a=t();switch(a){case"ios":return r;case"android":return s;case"javascript":return c;case"rest":return l}return r}function e(a){if(a&&""!==a){$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+a+"']").addClass("active");for(var n=0;n<u.length;n++)$(".highlight."+u[n]).hide();$(".highlight."+a).show(),localStorage.setItem("language_"+t(),a),window.location.hash&&$(window.location.hash).get(0)?$(window.location.hash).get(0).scrollIntoView(!0):history.pushState("",document.title,window.location.pathname)}}function o(a){if(history){var n=window.location.hash;n&&(n=n.replace(/^#+/,"")),history.pushState({},"","?"+a+"#"+n),localStorage.setItem("language_"+t(),a)}}function i(a){var o=(a[0],localStorage.getItem("language_"+t()));""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),n())?(e(location.search.substr(1)),localStorage.setItem("language_"+t(),location.search.substr(1))):e(null!==o&&-1!=jQuery.inArray(o,n())?o:n()[0])}var r=["swift","objective_c"],s=["java"],c=["javascript"],l=["shell","javascript"],u=[].concat(r,s,c,l);a.setupLanguages=i,a.activateLanguage=e,a.getPlatform=t,a.getLanguages=n,$(function(){$(".lang-selector a").on("click",function(){var a=$(this).data("language-name");return o(a),e(a),!1}),window.onpopstate=function(){e(window.location.search.substr(1))}})}(window);