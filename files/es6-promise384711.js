(function(){
"use strict";
function av(aw)
{
return typeof aw==='function'||(typeof aw==='object'&&aw!==null);
}
function at(aw)
{
return typeof aw==='function';
}
function au(aw)
{
return typeof aw==='object'&&aw!==null;
}
var aq;
if(!Array.isArray)
{
aq=function(aw){
return Object.prototype.toString.call(aw)==='[object Array]';
};
}
else{
aq=Array.isArray;
}
var ar=aq;
var L=0;
var V;
var H;
var D=function a(ax,aw){
M[L]=ax;
M[L+1]=aw;
L+=2;
if(L===2)
{
if(H)
{
H(I);
}
else{
N();
}
}
};
function P(aw)
{
H=aw;
}
function O(aw)
{
D=aw;
}
var G=(typeof window!=='undefined')?window:undefined;
var F=G||{};
var C=F.MutationObserver||F.WebKitMutationObserver;
var J=typeof self==='undefined'&&typeof process!=='undefined'&&{}.toString.call(process)==='[object process]';
var K=typeof Uint8ClampedArray!=='undefined'&&typeof importScripts!=='undefined'&&typeof MessageChannel!=='undefined';
function S()
{
return function(){
process.nextTick(I);
};
}
function U()
{
return function(){
V(I);
};
}
function R()
{
var aw=0;
var ay=new C(I);
var ax=document.createTextNode('');
ay.observe(ax,{characterData:true});
return function(){
ax.data=(aw=++aw%2);
};
}
function Q()
{
var aw=new MessageChannel();
aw.port1.onmessage=I;
return function(){
aw.port2.postMessage(0);
};
}
function T()
{
return function(){
setTimeout(I,1);
};
}
var M=new Array(1000);
function I()
{
for(var ay=0;ay<L;ay+=2)
{
var ax=M[ay];
var aw=M[ay+1];
ax(aw);
M[ay]=undefined;
M[ay+1]=undefined;
}
L=0;
}
function E()
{
try{
var ax=require;
var ay=ax('vertx');
V=ay.runOnLoop||ay.runOnContext;
return U();
}
catch(aw)
{
return T();
}
}
var N;
if(J)
{
N=S();
}
else if(C)
{
N=R();
}
else if(K)
{
N=Q();
}
else if(G===undefined&&typeof require==='function')
{
N=E();
}
else{
N=T();
}
function ao(ay,az)
{
var aA=this;
var ax=new this.constructor(t);
if(ax[f]===undefined)
{
r(ax);
}
var aB=aA._state;
if(aB)
{
var aw=arguments[aB-1];
D(function(){
q(aB,ax,aw,aA._result);
});
}
else{
z(aA,ax,ay,az);
}
return ax;
}
var an=ao;
function am(ax)
{
var aw=this;
if(ax&&typeof ax==='object'&&ax.constructor===aw)
{
return ax;
}
var ay=new aw(t);
x(ay,ax);
return ay;
}
var al=am;
var f=Math.random().toString(36).substring(16);
function t()
{
}
var e=void 0;
var c=1;
var g=2;
var d=new b();
function y()
{
return new TypeError("You cannot resolve a promise with itself");
}
function i()
{
return new TypeError('A promises callback cannot return that same promise.');
}
function k(ax)
{
try{
return ax.then;
}
catch(aw)
{
d.error=aw;
return d;
}
}
function B(az,aA,ax,ay)
{
try{
az.call(aA,ax,ay);
}
catch(aw)
{
return aw;
}
}
function l(aw,ay,ax)
{
D(function(aA){
var aB=false;
var az=B(ax,ay,function(aC){
if(aB)
{
return;
}
aB=true;
if(ay!==aC)
{
x(aA,aC);
}
else{
j(aA,aC);
}
},function(aC){
if(aB)
{
return;
}
aB=true;
w(aA,aC);
},'Settle: '+(aA._label||' unknown promise'));
if(!aB&&az)
{
aB=true;
w(aA,az);
}
},aw);
}
function n(aw,ax)
{
if(ax._state===c)
{
j(aw,ax._result);
}
else if(ax._state===g)
{
w(aw,ax._result);
}
else{
z(ax,undefined,function(ay){
x(aw,ay);
},function(ay){
w(aw,ay);
});
}
}
function m(ax,aw,ay)
{
if(aw.constructor===ax.constructor&&ay===an&&constructor.resolve===al)
{
n(ax,aw);
}
else{
if(ay===d)
{
w(ax,d.error);
}
else if(ay===undefined)
{
j(ax,aw);
}
else if(at(ay))
{
l(ax,aw,ay);
}
else{
j(ax,aw);
}
}
}
function x(aw,ax)
{
if(aw===ax)
{
w(aw,y());
}
else if(av(ax))
{
m(aw,ax,k(ax));
}
else{
j(aw,ax);
}
}
function v(aw)
{
if(aw._onerror)
{
aw._onerror(aw._result);
}
u(aw);
}
function j(aw,ax)
{
if(aw._state!==e)
{
return;
}
aw._result=ax;
aw._state=c;
if(aw._subscribers.length!==0)
{
D(u,aw);
}
}
function w(aw,ax)
{
if(aw._state!==e)
{
return;
}
aw._state=g;
aw._result=ax;
D(v,aw);
}
function z(aA,aw,ay,az)
{
var aB=aA._subscribers;
var ax=aB.length;
aA._onerror=null;
aB[ax]=aw;
aB[ax+c]=ay;
aB[ax+g]=az;
if(ax===0&&aA._state)
{
D(u,aA);
}
}
function u(aA)
{
var aC=aA._subscribers;
var aB=aA._state;
if(aC.length===0)
{
return;
}
var ax,aw,ay=aA._result;
for(var az=0;az<aC.length;az+=3)
{
ax=aC[az];
aw=aC[az+aB];
if(ax)
{
q(aB,ax,aw,ay);
}
else{
aw(ay);
}
}
aA._subscribers.length=0;
}
function b()
{
this.error=null;
}
var h=new b();
function A(aw,ax)
{
try{
return aw(ax);
}
catch(ay)
{
h.error=ay;
return h;
}
}
function q(aC,aB,aw,ax)
{
var aA=at(aw),aE,ay,aD,az;
if(aA)
{
aE=A(aw,ax);
if(aE===h)
{
az=true;
ay=aE.error;
aE=null;
}
else{
aD=true;
}
if(aB===aE)
{
w(aB,i());
return;
}
}
else{
aE=ax;
aD=true;
}
if(aB._state!==e)
{
}
else if(aA&&aD)
{
x(aB,aE);
}
else if(az)
{
w(aB,ay);
}
else if(aC===c)
{
j(aB,aE);
}
else if(aC===g)
{
w(aB,aE);
}
}
function p(ax,aA)
{
try{
aA(function az(aB){
x(ax,aB);
},function ay(aB){
w(ax,aB);
});
}
catch(aw)
{
w(ax,aw);
}
}
var o=0;
function s()
{
return o++;
}
function r(aw)
{
aw[f]=o++;
aw._state=undefined;
aw._result=undefined;
aw._subscribers=[];
}
function af(aw)
{
return new X(this,aw).promise;
}
var ag=af;
function ai(ax)
{
var aw=this;
if(!ar(ax))
{
return new aw(function(az,ay){
ay(new TypeError('You must pass an array to race.'));
});
}
else{
return new aw(function(aB,aA){
var az=ax.length;
for(var ay=0;ay<az;ay++)
{
aw.resolve(ax[ay]).then(aB,aA);
}
});
}
}
var ah=ai;
function ak(ay)
{
var aw=this;
var ax=new aw(t);
w(ax,ay);
return ax;
}
var aj=ak;
function ae()
{
throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}
function ad()
{
throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}
var ac=ab;
function ab(aw)
{
this[f]=s();
this._result=this._state=undefined;
this._subscribers=[];
if(t!==aw)
{
typeof aw!=='function'&&ae();
this instanceof ab?p(this,aw):ad();
}
}
ab.all=ag;
ab.race=ah;
ab.resolve=al;
ab.reject=aj;
ab._setScheduler=P;
ab._setAsap=O;
ab._asap=D;
ab.prototype={constructor:ab,then:an,'catch':function(aw){
return this.then(null,aw);
}};
var X=W;
function W(aw,ax)
{
this._instanceConstructor=aw;
this.promise=new aw(t);
if(!this.promise[f])
{
r(this.promise);
}
if(ar(ax))
{
this._input=ax;
this.length=ax.length;
this._remaining=ax.length;
this._result=new Array(this.length);
if(this.length===0)
{
j(this.promise,this._result);
}
else{
this.length=this.length||0;
this._enumerate();
if(this._remaining===0)
{
j(this.promise,this._result);
}
}
}
else{
w(this.promise,Y());
}
}
function Y()
{
return new Error('Array Methods must be provided an Array');
}
W.prototype._enumerate=function(){
var ay=this.length;
var ax=this._input;
for(var aw=0;this._state===e&&aw<ay;aw++)
{
this._eachEntry(ax[aw],aw);
}
};
W.prototype._eachEntry=function(ax,ay){
var aw=this._instanceConstructor;
var aA=aw.resolve;
if(aA===al)
{
var aB=k(ax);
if(aB===an&&ax._state!==e)
{
this._settledAt(ax._state,ay,ax._result);
}
else if(typeof aB!=='function')
{
this._remaining--;
this._result[ay]=ax;
}
else if(aw===ac)
{
var az=new aw(t);
m(az,ax,aB);
this._willSettleAt(az,ay);
}
else{
this._willSettleAt(new aw(function(aC){
aC(ax);
}),ay);
}
}
else{
this._willSettleAt(aA(ax),ay);
}
};
W.prototype._settledAt=function(ay,aw,az){
var ax=this.promise;
if(ax._state===e)
{
this._remaining--;
if(ay===g)
{
w(ax,az);
}
else{
this._result[aw]=az;
}
}
if(this._remaining===0)
{
j(ax,this._result);
}
};
W.prototype._willSettleAt=function(ay,ax){
var aw=this;
z(ay,undefined,function(az){
aw._settledAt(c,ax,az);
},function(az){
aw._settledAt(g,ax,az);
});
};
function aa()
{
var ay;
if(typeof global!=='undefined')
{
ay=global;
}
else if(typeof self!=='undefined')
{
ay=self;
}
else{
try{
ay=Function('return this')();
}
catch(ax)
{
throw new Error('polyfill failed because global object is unavailable in this environment');
}
}
var aw=ay.Promise;
if(aw&&Object.prototype.toString.call(aw.resolve())==='[object Promise]'&&!aw.cast)
{
return;
}
ay.Promise=ac;
}
var Z=aa;
var ap={'Promise':ac,'polyfill':Z};
if(typeof define==='function'&&define['amd'])
{
define(function(){
return ap;
});
}
else if(typeof module!=='undefined'&&module['exports'])
{
module['exports']=ap;
}
else if(typeof this!=='undefined')
{
this['ES6Promise']=ap;
}
Z();
}).call(this);
