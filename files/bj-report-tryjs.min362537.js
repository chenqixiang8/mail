var BJ_REPORT=function(s){
if(s.BJ_REPORT)
{
return s.BJ_REPORT;
}
var t=[],u={},v={id:0,uin:0,url:"",combo:1,ext:null,level:4,ignore:[],random:1,delay:1e3,submit:null,repeat:5},w=function(c,d){
return Object.prototype.toString.call(c)==="[object "+(d||"Object")+"]";
},x=function(c){
var d=typeof c;
return "object"===d&&!!c;
},y=function(b){
return null===b?!0:w(b,"Number")?!1:!b;
},z=s.onerror;
s.onerror=function(a,e,h,j,k){
var l=a;
k&&k.stack&&(l=B(k)),w(l,"Event")&&(l+=l.type?"--"+l.type+"--"+(l.target?l.target.tagName+"::"+l.target.src:""):""),J.push({msg:l,target:e,rowNum:h,colNum:j}),I(),z&&z.apply(s,arguments);
};
var A=function(f){
try{
if(f.stack)
{
var g=f.stack.match("https?://[^\n]+");
g=g?g[0]:"";
var h=g.match(":(\\d+):(\\d+)");
h||(h=[0,0,0]);
var i=B(f);
return {msg:i,rowNum:h[1],colNum:h[2],target:g.replace(h[0],"")};
}
return f.name&&f.message&&f.description?{msg:JSON.stringify(f)}:f;
}
catch(j)
{
return f;
}
},B=function(d){
var e=d.stack.replace(/\n/gi,"").split(/\bat\b/).slice(0,9).join("@").replace(/\?[^:]+/gi,""),f=d.toString();
return e.indexOf(f)<0&&(e=f+"@"+e),e;
},C=function(d,f){
var g=[],l=[],m=[];
if(x(d))
{
d.level=d.level||v.level;
for(var n in d)
{
var o=d[n];
if(!y(o))
{
if(x(o))
try{
o=JSON.stringify(o);
}
catch(p)
{
o="[BJ_REPORT detect value stringify error] "+p.toString();
}
m.push(n+":"+o),g.push(n+"="+encodeURIComponent(o)),l.push(n+"["+f+"]="+encodeURIComponent(o));
}
}
}
return [l.join("&"),m.join(","),g.join("&")];
},D=[],E=function(c){
if(v.submit)
v.submit(c);
else{
var d=new Image();
D.push(d),d.src=c;
}
},F=function(c){
if(!x(c))
{
return !0;
}
var d=c.msg,f=u[d]=(parseInt(u[d],10)||0)+1;
return f>v.repeat;
},G=[],H=0,I=function(b){
if(v.report)
{
for(;t.length;)
{
var d=!1,e=t.shift();
if(!F(e))
{
var k=C(e,G.length);
if(w(v.ignore,"Array"))
for(var m=0,n=v.ignore.length;n>m;m++)
{
var o=v.ignore[m];
if(w(o,"RegExp")&&o.test(k[1])||w(o,"Function")&&o(e,k[1]))
{
d=!0;
break;
}
}
d||(v.combo?G.push(k[0]):E(v.report+k[2]+"&_t="+(+new Date())),v.onReport&&v.onReport(v.id,e));
}
}
var p=G.length;
if(p)
{
var r=function(){
clearTimeout(H),E(v.report+G.join("&")+"&count="+G.length+"&_t="+(+new Date())),H=0,G=[];
};
b?r():H||(H=setTimeout(r,v.delay));
}
}
},J=s.BJ_REPORT={push:function(b){
if(Math.random()>=v.random)
{
return J;
}
var d=x(b)?A(b):{msg:b};
return v.ext&&!d.ext&&(d.ext=v.ext),d.from||(d.from=encodeURIComponent(location.href)),t.push(d),I(),J;
},report:function(b){
return b&&J.push(b),I(!0),J;
},info:function(b){
return b?(x(b)?b.level=2:b={msg:b,level:2},J.push(b),J):J;
},debug:function(b){
return b?(x(b)?b.level=1:b={msg:b,level:1},J.push(b),J):J;
},init:function(b){
if(x(b))
for(var d in b)
v[d]=b[d];
var f=parseInt(v.id,10);
return f&&(/qq\.com$/gi.test(location.hostname)&&(v.url||(v.url="//badjs2.qq.com/badjs"),v.uin||(v.uin=parseInt((document.cookie.match(/\buin=\D+(\d+)/)||[])[1],10))),v.report=(v.url||"/badjs")+"?id="+f+"&uin="+v.uin+"&"),t.length&&I(),J;
},__onerror__:s.onerror};
return "undefined"!=typeof console&&console.error&&setTimeout(function(){
var b=((location.hash||"").match(/([#&])BJ_ERROR=([^&$]+)/)||[])[2];
b&&console.error("BJ_ERROR",decodeURIComponent(b).replace(/(:\d+:\d+)\s*/g,"$1\n"));
},0),J;
}(window);
"undefined"!=typeof module&&(module.exports=BJ_REPORT),function(l){
if(!l.BJ_REPORT)
{
return void console.error("please load bg-report first");
}
var m=function(a){
l.BJ_REPORT.push(a);
},n={};
l.BJ_REPORT.tryJs=function(b){
return b&&(m=b),n;
};
var o,p=function(d,e){
for(var f in e)
d[f]=e[f];
},q=function(b){
return "function"==typeof b;
},r=function(a,b){
return function(){
try{
return a.apply(this,b||arguments);
}
catch(c)
{
if(m(c),c.stack&&console&&console.error&&console.error("[BJ-REPORT]",c.stack),!o)
{
var d=l.onerror;
l.onerror=function(){
},o=setTimeout(function(){
l.onerror=d,o=null;
},50);
}
throw c;
}
};
},s=function(b){
return function(){
for(var a,f=[],g=0,h=arguments.length;h>g;g++)
a=arguments[g],q(a)&&(a=r(a)),f.push(a);
return b.apply(this,f);
};
},t=function(b){
return function(a,f){
if("string"==typeof a)
try{
a=new Function(a);
}
catch(g)
{
throw g;
}
var h=[].slice.call(arguments,2);
return a=r(a,h.length&&h),b(a,f);
};
},u=function(c,d){
return function(){
for(var a,b,f=[],g=0,j=arguments.length;j>g;g++)
a=arguments[g],q(a)&&(b=r(a))&&(a.tryWrap=b)&&(a=b),f.push(a);
return c.apply(d||this,f);
};
},v=function(d){
var e,f;
for(e in d)
f=d[e],q(f)&&(d[e]=r(f));
return d;
};
n.spyJquery=function(){
var a=l.$;
if(!a||!a.event)
{
return n;
}
var c,f;
a.zepto?(c=a.fn.on,f=a.fn.off,a.fn.on=u(c),a.fn.off=function(){
for(var e,g=[],i=0,j=arguments.length;j>i;i++)
e=arguments[i],q(e)&&e.tryWrap&&(e=e.tryWrap),g.push(e);
return f.apply(this,g);
}):window.jQuery&&(c=a.event.add,f=a.event.remove,a.event.add=u(c),a.event.remove=function(){
for(var e,g=[],i=0,j=arguments.length;j>i;i++)
e=arguments[i],q(e)&&e.tryWrap&&(e=e.tryWrap),g.push(e);
return f.apply(this,g);
});
var h=a.ajax;
return h&&(a.ajax=function(b,d){
return d||(d=b,b=void 0),v(d),b?h.call(a,b,d):h.call(a,d);
}),n;
},n.spyModules=function(){
var a=l.require,c=l.define;
return c&&c.amd&&a&&(l.require=s(a),p(l.require,a),l.define=s(c),p(l.define,c)),l.seajs&&c&&(l.define=function(){
for(var d,f=[],g=0,h=arguments.length;h>g;g++)
d=arguments[g],q(d)&&(d=r(d),d.toString=function(b){
return function(){
return b.toString();
};
}(arguments[g])),f.push(d);
return c.apply(this,f);
},l.seajs.use=s(l.seajs.use),p(l.define,c)),n;
},n.spySystem=function(){
return l.setTimeout=t(l.setTimeout),l.setInterval=t(l.setInterval),n;
},n.spyCustom=function(b){
return q(b)?r(b):v(b);
},n.spyAll=function(){
return n.spyJquery().spyModules().spySystem(),n;
};
}(window);
