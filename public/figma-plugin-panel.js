!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){"use strict";var n=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")};var t=function(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e};"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var e,s=(function(e,n){var u,c,t,s;e.exports=(u=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],c=function(e){return String(e).replace(/[&<>"']/g,function(e){return"&"+t[e]+";"})},t={"&":"amp","<":"lt",">":"gt",'"':"quot","'":"apos"},s={},function(e,n){for(var t=[],i=arguments.length;2<i--;)t.push(arguments[i]);if("function"==typeof e)return(n||(n={})).children=t.reverse(),e(n);var a="<"+e;if(n)for(var o in n)!1!==n[o]&&null!=n[o]&&(a+=" "+c(o)+'="'+c(n[o])+'"');if(-1===u.indexOf(e)){for(a+=">";t.length;){var r=t.pop();if(r)if(r.pop)for(var l=r.length;l--;)t.push(r[l]);else a+=!0===s[r]?r:c(r)}a+="</"+e+">"}else a+=">";return s[a]=!0,a})}(e={exports:{}},e.exports),e.exports);window.figmaPlugin=new function e(){var c=this;n(this,e),t(this,"showUI",function(e,n,t,i){var a,o=s("div",{class:"figma-plugin-panel"},s("header",null,s("span",null,e),s("button",{class:"close"},s("span",{class:"g0126e402"}))),s("div",{class:"figma-plugin-ui"})),r=(a=o,document.createRange().createContextualFragment(a));document.body.appendChild(r),c.panel=document.querySelector(".figma-plugin-panel");var l=document.documentElement.clientWidth,u=document.documentElement.clientHeight;c.panel.style.left=l/2-t/2+"px",c.panel.style.top=u/2-i/2+"px",c.panel.style.width=t+"px",c.panel.style.height=i+"px",c.header=c.panel.querySelector("header"),c.draggable(c.panel,c.header),c.panel.querySelector("button.close").addEventListener("click",c.hideUI),n(document.querySelector(".figma-plugin-panel > .figma-plugin-ui"))}),t(this,"hideUI",function(){c.panel.remove()}),t(this,"draggable",function(i,e){var a,o,r=!1,l=parseInt(i.style.left)||0,u=parseInt(i.style.top)||0;e.addEventListener("mousedown",function(e){a=e.clientX,o=e.clientY,r=!0}),e.addEventListener("mouseup",function(e){r=!1,l=parseInt(i.style.left)||0,u=parseInt(i.style.top)||0}),document.addEventListener("mousemove",function(e){if(r){var n=e.clientX-a,t=e.clientY-o;i.style.left=l+n+"px",i.style.top=u+t+"px"}})}),t(this,"createPluginsMenuItem",function(){}),t(this,"createKeyboardShortcut",function(){}),t(this,"createContextMenuItem",{Canvas:function(){},ObjectsPanel:function(){},Selection:function(){}}),t(this,"currentPage",function(){return 1}),t(this,"scene",{selection:function(){return[]}})}});