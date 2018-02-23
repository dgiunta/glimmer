(function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()})(0,function(){"use strict"
function t(t="unreachable"){return new Error(t)}function e(t,e){if(!t)throw new Error(e||"assertion failure")}const s=Object.keys
function i(t){for(let e=1;e<arguments.length;e++){let i=arguments[e]
if(null===i||"object"!=typeof i)continue
let n=s(i)
for(let e=0;e<n.length;e++){let s=n[e]
t[s]=i[s]}}return t}let n=0
function r(t){return t._guid=++n}function a(){return Object.create(null)}class l{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(t){this.current=t,this.stack.push(t)}pop(){let t=this.stack.pop(),e=this.stack.length
return this.current=0===e?null:this.stack[e-1],void 0===t?null:t}isEmpty(){return 0===this.stack.length}}class o{constructor(t){this.next=null,this.prev=null,this.value=t}}class h{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let t=[]
return this.forEachNode(e=>t.push(e)),t}nextNode(t){return t.next}forEachNode(t){let e=this._head
for(;null!==e;)t(e),e=e.next}insertBefore(t,e=null){return null===e?this.append(t):(e.prev?e.prev.next=t:this._head=t,t.prev=e.prev,t.next=e,e.prev=t,t)}append(t){let e=this._tail
return e?(e.next=t,t.prev=e,t.next=null):this._head=t,this._tail=t}remove(t){return t.prev?t.prev.next=t.next:this._head=t.next,t.next?t.next.prev=t.prev:this._tail=t.prev,t}}class u{constructor(t,e){this._head=t,this._tail=e}forEachNode(t){let e=this._head
for(;null!==e;)t(e),e=this.nextNode(e)}head(){return this._head}tail(){return this._tail}toArray(){let t=[]
return this.forEachNode(e=>t.push(e)),t}nextNode(t){return t===this._tail?null:t.next}}new u(null,null)
const c=Object.freeze([]),p=1
class d{validate(t){return this.value()===t}}d.id=0
const m=[],g=[]
class f{constructor(t,e){this.type=t,this.inner=e}value(){return(0,m[this.type])(this.inner)}validate(t){return(0,g[this.type])(this.inner,t)}}function b(t){let e=m.length
m.push(t=>t.value()),g.push((t,e)=>t.validate(e)),t.id=e}m.push(()=>0),g.push((t,e)=>0===e)
const y=new f(0,null)
m.push(()=>NaN),g.push((t,e)=>NaN===e)
const v=new f(1,null)
m.push(()=>w),g.push((t,e)=>e===w)
new f(2,null)
function k({tag:t}){return t===y}function S(t){return t===y}let w=p
class _ extends d{static create(t=w){return new f(this.id,new _(t))}constructor(t=w){super(),this.revision=t}value(){return this.revision}dirty(){this.revision=++w}}function E(t){let e=[]
for(let s=0,i=t.length;s<i;s++){let i=t[s].tag
if(i===v)return v
i!==y&&e.push(i)}return A(e)}function C(t){let e=[],s=t.head()
for(;null!==s;){let i=s.tag
if(i===v)return v
i!==y&&e.push(i),s=t.nextNode(s)}return A(e)}function x(t){let e=[]
for(let s=0,i=t.length;s<i;s++){let i=t[s]
if(i===v)return v
i!==y&&e.push(i)}return A(e)}function A(t){switch(t.length){case 0:return y
case 1:return t[0]
case 2:return O.create(t[0],t[1])
default:return T.create(t)}}b(_)
class N extends d{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let t=this.lastChecked,e=this.lastValue
return t!==w&&(this.lastChecked=w,this.lastValue=e=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class O extends N{static create(t,e){return new f(this.id,new O(t,e))}constructor(t,e){super(),this.first=t,this.second=e}compute(){return Math.max(this.first.value(),this.second.value())}}b(O)
class T extends N{static create(t){return new f(this.id,new T(t))}constructor(t){super(),this.tags=t}compute(){let t=this.tags,e=-1
for(let s=0;s<t.length;s++){let i=t[s].value()
e=Math.max(i,e)}return e}}b(T)
class D extends N{static create(t){return new f(this.id,new D(t))}constructor(t){super(),this.tag=t,this.lastUpdated=p}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(t){t!==this.tag&&(this.tag=t,this.lastUpdated=w,this.invalidate())}}b(D)
class L{constructor(){this.lastRevision=null,this.lastValue=null}value(){let t=this.tag,e=this.lastRevision,s=this.lastValue
return null!==e&&t.validate(e)||(s=this.lastValue=this.compute(),this.lastRevision=t.value()),s}invalidate(){this.lastRevision=null}}class B{constructor(t){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=t.tag,this.reference=t}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let t=this.reference,e=this.lastRevision,s=t.tag
if(s.validate(e))return M
this.lastRevision=s.value()
let i=this.lastValue,n=t.value()
return n===i?M:(this.lastValue=n,n)}initialize(){let t=this.reference,e=this.lastValue=t.value()
return this.lastRevision=t.tag.value(),this.initialized=!0,e}}const M="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
class R{constructor(t){this.inner=t,this.tag=y}value(){return this.inner}}class I extends o{constructor(t,e){super(t.valueReferenceFor(e)),this.retained=!1,this.seen=!1,this.key=e.key,this.iterable=t,this.memo=t.memoReferenceFor(e)}update(t){this.retained=!0,this.iterable.updateValueReference(this.value,t),this.iterable.updateMemoReference(this.memo,t)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class F{constructor(t){this.iterator=null,this.map=a(),this.list=new h,this.tag=t.tag,this.iterable=t}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let t
return t=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,t}has(t){return!!this.map[t]}get(t){return this.map[t]}wasSeen(t){let e=this.map[t]
return void 0!==e&&e.seen}append(t){let e=this.map,s=this.list,i=this.iterable,n=e[t.key]=new I(i,t)
return s.append(n),n}insertBefore(t,e){let s=this.map,i=this.list,n=this.iterable,r=s[t.key]=new I(n,t)
return r.retained=!0,i.insertBefore(r,e),r}move(t,e){let s=this.list
t.retained=!0,s.remove(t),s.insertBefore(t,e)}remove(t){this.list.remove(t),delete this.map[t.key]}nextNode(t){return this.list.nextNode(t)}head(){return this.list.head()}}var P;(function(t){t[t.Append=0]="Append",t[t.Prune=1]="Prune",t[t.Done=2]="Done"})(P||(P={}))
class j{constructor({target:t,artifacts:e}){this.target=t,this.artifacts=e,this.iterator=e.iterate(),this.current=e.head()}sync(){let t=P.Append
for(;;)switch(t){case P.Append:t=this.nextAppend()
break
case P.Prune:t=this.nextPrune()
break
case P.Done:return void this.nextDone()}}advanceToKey(t){let e=this.current,s=this.artifacts,i=e
for(;null!==i&&i.key!==t;)i.seen=!0,i=s.nextNode(i)
null!==i&&(this.current=s.nextNode(i))}nextAppend(){let t=this.iterator,e=this.current,s=this.artifacts,i=t.next()
if(null===i)return this.startPrune()
let n=i.key
return null!==e&&e.key===n?this.nextRetain(i):s.has(n)?this.nextMove(i):this.nextInsert(i),P.Append}nextRetain(t){let e=this.artifacts,s=this.current;(s=s).update(t),this.current=e.nextNode(s),this.target.retain(t.key,s.value,s.memo)}nextMove(t){let e=this.current,s=this.artifacts,i=this.target,n=t.key,r=s.get(t.key)
r.update(t),s.wasSeen(t.key)?(s.move(r,e),i.move(r.key,r.value,r.memo,e?e.key:null)):this.advanceToKey(n)}nextInsert(t){let e=this.artifacts,s=this.target,i=this.current,n=e.insertBefore(t,i)
s.insert(n.key,n.value,n.memo,i?i.key:null)}startPrune(){return this.current=this.artifacts.head(),P.Prune}nextPrune(){let t=this.artifacts,e=this.target,s=this.current
if(null===s)return P.Done
let i=s
return this.current=t.nextNode(i),i.shouldRemove()?(t.remove(i),e.delete(i.key)):i.reset(),P.Prune}nextDone(){this.target.done()}}class V{constructor(t){this.tags=a(),this.computedPropertyTags=a(),this.trackedProperties=t?Object.create(t.trackedProperties):a(),this.trackedPropertyDependencies=t?Object.create(t.trackedPropertyDependencies):a()}tagFor(t){let e,s=this.tags[t]
return s||((e=this.trackedPropertyDependencies[t])?this.tags[t]=function(t,e,s){let i=[t.dirtyableTagFor(e)]
if(s&&s.length)for(let n=0;n<s.length;n++)i.push(t.tagFor(s[n]))
return x(i)}(this,t,e):this.tags[t]=_.create())}dirtyableTagFor(t){let e
return this.trackedPropertyDependencies[t]?(e=this.computedPropertyTags[t])||(this.computedPropertyTags[t]=_.create()):(e=this.tags[t])||(this.tags[t]=_.create())}}let z=Symbol("ember-object")
function H(t){let e=t[z]
return e&&function(t,e){return U.call(t,e)}(t,z)?e:t[z]=new V(e)}let U=Object.prototype.hasOwnProperty
let $=function(){}
class Y extends Error{constructor(t,e,s){super(s),this.target=t,this.key=e}static for(t,e){return new Y(t,e,`The property '${e}' on ${t} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function G(t,e,s=function(t,e){throw Y.for(t,e)}){if("object"==typeof t&&t){return H(t).tagFor(e)}return y}class W{constructor(t){this.debugName=null,this.__args__=null,Object.assign(this,t)}get element(){let t=this.bounds
return e(t&&t.firstNode===t.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),t.firstNode}get args(){return this.__args__}set args(t){this.__args__=t,H(this).dirtyableTagFor("args").inner.dirty()}static create(t){return new this(t)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const X={dynamicLayout:!1,dynamicTag:!0,prepareArgs:!1,createArgs:!0,attributeHook:!0,elementHook:!0}
class K{constructor(t,e,s,i){this.name=t,this.manager=e,this.ComponentClass=s,this.handle=i,this.state={name:t,capabilities:X,ComponentClass:s,handle:i}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class J{constructor(t,e=null){this._registry=t,this._resolver=e,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(t){let e=this._factoryDefinitionLookups[t]
if(e||(this._resolver&&(e=this._resolver.retrieve(t)),e||(e=this._registry.registration(t)),e&&(this._factoryDefinitionLookups[t]=e)),e)return this.buildFactory(t,e)}lookup(t){let e=!1!==this._registry.registeredOption(t,"singleton")
if(e&&this._lookups[t])return this._lookups[t]
let s=this.factoryFor(t)
if(!s)return
if(!1===this._registry.registeredOption(t,"instantiate"))return s.class
let i=s.create()
return e&&i&&(this._lookups[t]=i),i}defaultInjections(t){return{}}buildInjections(t){let e,s=this.defaultInjections(t),i=this._registry.registeredInjections(t)
for(let n=0;n<i.length;n++)s[(e=i[n]).property]=this.lookup(e.source)
return s}buildFactory(t,e){let s=this.buildInjections(t)
return{class:e,create(t){let i=Object.assign({},s,t)
return e.create(i)}}}}class q{constructor(t){this._registrations={},this._registeredOptions={},this._registeredInjections={},t&&t.fallback&&(this._fallback=t.fallback)}register(t,e,s){this._registrations[t]=e,s&&(this._registeredOptions[t]=s)}registration(t){let e=this._registrations[t]
return void 0===e&&this._fallback&&(e=this._fallback.registration(t)),e}unregister(t){delete this._registrations[t],delete this._registeredOptions[t],delete this._registeredInjections[t]}registerOption(t,e,s){let i=this._registeredOptions[t]
i||(i={},this._registeredOptions[t]=i),i[e]=s}registeredOption(t,e){let s,i=this.registeredOptions(t)
return i&&(s=i[e]),void 0===s&&void 0!==this._fallback&&(s=this._fallback.registeredOption(t,e)),s}registeredOptions(t){let e=this._registeredOptions[t]
if(void 0===e){let s=t.split(":")[0]
e=this._registeredOptions[s]}return e}unregisterOption(t,e){let s=this._registeredOptions[t]
s&&delete s[e]}registerInjection(t,e,s){let i=this._registeredInjections[t]
void 0===i&&(this._registeredInjections[t]=i=[]),i.push({property:e,source:s})}registeredInjections(t){let e=t.split(":")[0],s=this._fallback?this._fallback.registeredInjections(t):[]
return Array.prototype.push.apply(s,this._registeredInjections[e]),Array.prototype.push.apply(s,this._registeredInjections[t]),s}}const Z="__owner__"
function Q(t){return t[Z]}function tt(t,e){t[Z]=e}class et{constructor(t){this._bounds=t}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const st=new class{constructor(){this.evaluateOpcode=function(t){let e=new Array(t)
for(let s=0;s<t;s++)e[s]=null
return e}(82).slice()}add(t,e,s="syscall"){this.evaluateOpcode[t]={syscall:"syscall"===s,evaluate:e}}debugBefore(t,e,s){return{sp:void 0,state:void 0}}debugAfter(t,e,s,i){i.sp
i.state,t.stack.sp}evaluate(t,e,s){let i=this.evaluateOpcode[s]
i.syscall?i.evaluate(t,e):i.evaluate(t.inner,e)}}
class it{constructor(){r(this)}}class nt extends it{constructor(){super(...arguments),this.next=null,this.prev=null}}var rt;(function(t){t[t.pc=0]="pc",t[t.ra=1]="ra",t[t.fp=2]="fp",t[t.sp=3]="sp",t[t.s0=4]="s0",t[t.s1=5]="s1",t[t.t0=6]="t0",t[t.t1=7]="t1",t[t.v0=8]="v0"})(rt||(rt={}))
class at extends R{constructor(t){super(t)}static create(t){return void 0===t?ht:null===t?ut:!0===t?ct:!1===t?pt:"number"==typeof t?new ot(t):new lt(t)}get(t){return ht}}class lt extends at{constructor(){super(...arguments),this.lengthReference=null}get(t){if("length"===t){let t=this.lengthReference
return null===t&&(t=this.lengthReference=new ot(this.inner.length)),t}return super.get(t)}}class ot extends at{constructor(t){super(t)}}const ht=new ot(void 0),ut=new ot(null),ct=new ot(!0),pt=new ot(!1)
class dt{constructor(t){this.inner=t,this.tag=t.tag}value(){return this.toBool(this.inner.value())}toBool(t){return!!t}}var mt
function gt(t){return function(e){return Array.isArray(e)&&e[0]===t}}st.add(1,(t,{op1:e})=>{let s=t.stack,i=t.constants.resolveHandle(e)(t,s.pop())
t.loadValue(rt.v0,i)}),st.add(4,(t,{op1:e})=>{let s=t.referenceForSymbol(e)
t.stack.push(s)}),st.add(2,(t,{op1:e})=>{let s=t.stack.pop()
t.scope().bindSymbol(e,s)}),st.add(3,(t,{op1:e})=>{let s=t.stack.pop(),i=t.stack.pop(),n=t.stack.pop(),r=n?[s,i,n]:null
t.scope().bindBlock(e,r)}),st.add(80,(t,{op1:e})=>{let s=t.constants.getString(e),i=t.scope().getPartialMap()[s]
void 0===i&&(i=t.getSelf().get(s)),t.stack.push(i)}),st.add(17,(t,{op1:e,op2:s})=>{t.pushRootScope(e,!!s)}),st.add(5,(t,{op1:e})=>{let s=t.constants.getString(e),i=t.stack.pop()
t.stack.push(i.get(s))}),st.add(6,(t,{op1:e})=>{let s=t.stack,i=t.scope().getBlock(e)
i?(s.push(i[2]),s.push(i[1]),s.push(i[0])):(s.push(null),s.push(null),s.push(null))}),st.add(7,(t,{op1:e})=>{let s=!!t.scope().getBlock(e)
t.stack.push(s?ct:pt)}),st.add(8,t=>{t.stack.pop(),t.stack.pop()
let e=t.stack.pop(),s=e&&e.parameters.length
t.stack.push(s?ct:pt)}),st.add(9,(t,{op1:e})=>{let s=new Array(e)
for(let i=e;i>0;i--){s[i-1]=t.stack.pop()}t.stack.push(new class extends L{constructor(t){super(),this.parts=t,this.tag=E(t)}compute(){let t=new Array
for(let s=0;s<this.parts.length;s++){let e=this.parts[s].value()
null!==e&&void 0!==e&&(t[s]="function"!=typeof(e=e).toString?"":String(e))}var e
return t.length>0?t.join(""):null}}(s))}),function(t){t[t.Text=0]="Text",t[t.Append=1]="Append",t[t.Comment=2]="Comment",t[t.Modifier=3]="Modifier",t[t.Block=4]="Block",t[t.Component=5]="Component",t[t.OpenElement=6]="OpenElement",t[t.OpenSplattedElement=7]="OpenSplattedElement",t[t.FlushElement=8]="FlushElement",t[t.CloseElement=9]="CloseElement",t[t.StaticAttr=10]="StaticAttr",t[t.DynamicAttr=11]="DynamicAttr",t[t.AttrSplat=12]="AttrSplat",t[t.Yield=13]="Yield",t[t.Partial=14]="Partial",t[t.DynamicArg=15]="DynamicArg",t[t.StaticArg=16]="StaticArg",t[t.TrustingAttr=17]="TrustingAttr",t[t.Debugger=18]="Debugger",t[t.ClientSideStatement=19]="ClientSideStatement",t[t.Unknown=20]="Unknown",t[t.Get=21]="Get",t[t.MaybeLocal=22]="MaybeLocal",t[t.HasBlock=23]="HasBlock",t[t.HasBlockParams=24]="HasBlockParams",t[t.Undefined=25]="Undefined",t[t.Helper=26]="Helper",t[t.Concat=27]="Concat",t[t.ClientSideExpression=28]="ClientSideExpression"}(mt||(mt={}))
const ft=gt(mt.Get),bt=gt(mt.MaybeLocal)
var yt,vt;(vt=yt||(yt={}))[vt.OpenComponentElement=0]="OpenComponentElement",vt[vt.DidCreateElement=1]="DidCreateElement",vt[vt.SetComponentAttrs=2]="SetComponentAttrs",vt[vt.DidRenderLayout=3]="DidRenderLayout",vt[vt.Debugger=4]="Debugger"
var kt=mt
const St="&attrs"
class wt{constructor(t=0){this.offset=t,this.names=a(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}compile(t,e){let s=t[this.offset],i=this.names[s],n=this.funcs[i]
n(t,e)}}let _t,Et
function Ct(t,e,s){let i=t[1],n=t[2],r=t[3]
s.expr(n),r?s.dynamicAttr(i,r,e):s.dynamicAttr(i,null,e)}class xt{constructor(){var t=function(t=new At,e=new Nt){return t.add("if",(t,e,s,i,n)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
n.startLabels(),n.pushFrame(),n.returnTo("END"),n.expr(t[0]),n.toBoolean(),n.enter(1),n.jumpUnless("ELSE"),n.invokeStaticBlock(s),i?(n.jump("EXIT"),n.label("ELSE"),n.invokeStaticBlock(i),n.label("EXIT"),n.exit(),n.return()):(n.label("ELSE"),n.exit(),n.return()),n.label("END"),n.popFrame(),n.stopLabels()}),t.add("unless",(t,e,s,i,n)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
n.startLabels(),n.pushFrame(),n.returnTo("END"),n.expr(t[0]),n.toBoolean(),n.enter(1),n.jumpIf("ELSE"),n.invokeStaticBlock(s),i?(n.jump("EXIT"),n.label("ELSE"),n.invokeStaticBlock(i),n.label("EXIT"),n.exit(),n.return()):(n.label("ELSE"),n.exit(),n.return()),n.label("END"),n.popFrame(),n.stopLabels()}),t.add("with",(t,e,s,i,n)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
n.startLabels(),n.pushFrame(),n.returnTo("END"),n.expr(t[0]),n.dup(),n.toBoolean(),n.enter(2),n.jumpUnless("ELSE"),n.invokeStaticBlock(s,1),i?(n.jump("EXIT"),n.label("ELSE"),n.invokeStaticBlock(i),n.label("EXIT"),n.exit(),n.return()):(n.label("ELSE"),n.exit(),n.return()),n.label("END"),n.popFrame(),n.stopLabels()}),t.add("each",(t,e,s,i,n)=>{n.startLabels(),n.pushFrame(),n.returnTo("END"),e&&"key"===e[0][0]?n.expr(e[1][0]):n.pushPrimitiveReference(null),n.expr(t[0]),n.enter(2),n.putIterator(),n.jumpUnless("ELSE"),n.pushFrame(),n.returnTo("ITER"),n.dup(rt.fp,1),n.enterList("BODY"),n.label("ITER"),n.iterate("BREAK"),n.label("BODY"),n.invokeStaticBlock(s,2),n.pop(2),n.exit(),n.return(),n.label("BREAK"),n.exitList(),n.popFrame(),i?(n.jump("EXIT"),n.label("ELSE"),n.invokeStaticBlock(i),n.label("EXIT"),n.exit(),n.return()):(n.label("ELSE"),n.exit(),n.return()),n.label("END"),n.popFrame(),n.stopLabels()}),t.add("in-element",(t,e,s,i,n)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
n.startLabels(),n.pushFrame(),n.returnTo("END")
let r=e[0],a=e[1]
for(let l=0;l<r.length;l++){let t=r[l]
if("nextSibling"!==t&&"guid"!==t)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${r[0]}\` option`)
n.expr(a[l])}n.expr(t[0]),n.dup(),n.enter(4),n.jumpUnless("ELSE"),n.pushRemoteElement(),n.invokeStaticBlock(s),n.popRemoteElement(),n.label("ELSE"),n.exit(),n.return(),n.label("END"),n.popFrame(),n.stopLabels()}),t.add("-with-dynamic-vars",(t,e,s,i,n)=>{if(e){let t=e[0],i=e[1]
n.compileParams(i),n.pushDynamicScope(),n.bindDynamicScope(t),n.invokeStaticBlock(s),n.popDynamicScope()}else n.invokeStaticBlock(s)}),t.add("component",(t,e,s,i,n)=>{if("string"==typeof t[0]&&n.staticComponentHelper(t[0],e,s))return
let r=t[0],a=t.slice(1)
n.dynamicComponent(r,a,e,!0,s,i)}),e.add("component",(t,e,s,i)=>{let n=e&&e[0]
if("string"==typeof n&&i.staticComponentHelper(n,s,null))return!0
let r=e[0],a=e.slice(1)
return i.dynamicComponent(r,a,s,!0,null,null),!0}),{blocks:t,inlines:e}}()
let e=t.blocks,s=t.inlines
this.blocks=e,this.inlines=s}}class At{constructor(){this.names=a(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}addMissing(t){this.missing=t}compile(t,e,s,i,n,r){let a=this.names[t]
if(void 0===a){(0,this.missing)(t,e,s,i,n,r)}else{(0,this.funcs[a])(e,s,i,n,r)}}}class Nt{constructor(){this.names=a(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}addMissing(t){this.missing=t}compile(t,e){let s,i,n,r=t[1]
if(!Array.isArray(r))return["expr",r]
if(r[0]===kt.Helper)s=r[1],i=r[2],n=r[3]
else{if(r[0]!==kt.Unknown)return["expr",r]
s=r[1],i=n=null}let a=this.names[s]
if(void 0===a&&this.missing){let t=(0,this.missing)(s,i,n,e)
return!1===t?["expr",r]:t}if(void 0!==a){let t=(0,this.funcs[a])(s,i,n,e)
return!1===t?["expr",r]:t}return["expr",r]}}const Ot=-1
class Tt{constructor(t,e,s,i){this.statements=t,this.containingLayout=e,this.options=s,this.symbolTable=i,this.compiled=null,this.statementCompiler=function(){if(_t)return _t
const t=_t=new wt
t.add(kt.Text,(t,e)=>{e.text(t[1])}),t.add(kt.Comment,(t,e)=>{e.comment(t[1])}),t.add(kt.CloseElement,(t,e)=>{e.closeElement()}),t.add(kt.FlushElement,(t,e)=>{e.flushElement()}),t.add(kt.Modifier,(t,e)=>{let s=e.resolver,i=e.referrer,n=t[1],r=t[2],a=t[3],l=s.lookupModifier(n,i)
if(!l)throw new Error(`Compile Error ${n} is not a modifier: Helpers may not be used in the element form.`)
e.modifier(l,r,a)}),t.add(kt.StaticAttr,(t,e)=>{let s=t[1],i=t[2],n=t[3]
e.staticAttr(s,n,i)}),t.add(kt.DynamicAttr,(t,e)=>{Ct(t,!1,e)}),t.add(kt.TrustingAttr,(t,e)=>{Ct(t,!0,e)}),t.add(kt.OpenElement,(t,e)=>{e.openPrimitiveElement(t[1])}),t.add(kt.OpenSplattedElement,(t,e)=>{e.setComponentAttrs(!0),e.putComponentOperations(),e.openPrimitiveElement(t[1])}),t.add(kt.Component,(t,e)=>{let s=t[1],i=t[2],n=t[3],r=t[4],a=e.resolver,l=e.referrer,o=a.lookupComponentDefinition(s,l)
if(null===o)throw new Error(`Compile Error: Cannot find component ${s}`)
{let t=a.getCapabilities(o),s=[[kt.ClientSideStatement,yt.SetComponentAttrs,!0],...i,[kt.ClientSideStatement,yt.SetComponentAttrs,!1]],l=e.inlineBlock({statements:s,parameters:c}),h=e.template(r)
if(!1===t.dynamicLayout){let s=a.getLayout(o)
e.pushComponentDefinition(o),e.invokeStaticComponent(t,s,l,null,n,!1,h&&h)}else e.pushComponentDefinition(o),e.invokeComponent(l,null,n,!1,h&&h)}}),t.add(kt.Partial,(t,e)=>{let s=t[1],i=t[2],n=e.referrer
e.startLabels(),e.pushFrame(),e.returnTo("END"),e.expr(s),e.dup(),e.enter(2),e.jumpUnless("ELSE"),e.invokePartial(n,e.evalSymbols(),i),e.popScope(),e.popFrame(),e.label("ELSE"),e.exit(),e.return(),e.label("END"),e.popFrame(),e.stopLabels()}),t.add(kt.Yield,(t,e)=>{let s=t[1],i=t[2]
e.yield(s,i)}),t.add(kt.AttrSplat,(t,e)=>{let s=t[1]
e.yield(s,[]),e.didCreateElement(rt.s0),e.setComponentAttrs(!1)}),t.add(kt.Debugger,(t,e)=>{let s=t[1]
e.debugger(e.evalSymbols(),s)}),t.add(kt.ClientSideStatement,(t,s)=>{e.compile(t,s)}),t.add(kt.Append,(t,e)=>{let s=t[1],i=t[2]
if(!0===(e.macros.inlines.compile(t,e)||s))return
let n=ft(s),r=bt(s)
i?e.guardedAppend(s,!0):n||r?e.guardedAppend(s,!1):(e.expr(s),e.primitive(!1),e.load(rt.t0),e.dynamicContent())}),t.add(kt.Block,(t,e)=>{let s=t[1],i=t[2],n=t[3],r=t[4],a=t[5],l=e.template(r),o=e.template(a),h=l&&l,u=o&&o
e.macros.blocks.compile(s,i,n,h,u,e)})
const e=new wt(1)
return e.add(yt.OpenComponentElement,(t,e)=>{e.putComponentOperations(),e.openPrimitiveElement(t[2])}),e.add(yt.DidCreateElement,(t,e)=>{e.didCreateElement(rt.s0)}),e.add(yt.SetComponentAttrs,(t,e)=>{e.setComponentAttrs(t[2])}),e.add(yt.Debugger,()=>{}),e.add(yt.DidRenderLayout,(t,e)=>{e.didRenderLayout(rt.s0)}),t}()}static topLevel(t,e){return new Tt(t.statements,{block:t,referrer:e.referrer},e,{referrer:e.referrer,hasEval:t.hasEval,symbols:t.symbols})}compile(t){let e=this.compiled
if(null!==e)return e
this.compiled=Ot
let s=this.options,i=this.statements,n=this.containingLayout,r=n.referrer,a=s.program,l=s.resolver,o=s.macros,h=s.asPartial,u=new(0,s.Builder)(a,l,r,o,n,h,t)
for(let p=0;p<i.length;p++)this.statementCompiler.compile(i[p],u)
let c=u.commit(a.heap,n.block.symbols.length)
return this.compiled=c}}class Dt{constructor(t){this.builder=t}static(t,e){let s=e[0],i=e[1],n=e[2],r=e[3],a=this.builder,l=a.resolver
if(null!==t){let e=l.getCapabilities(t)
if(!1===e.dynamicLayout){let o=l.getLayout(t)
a.pushComponentDefinition(t),a.invokeStaticComponent(e,o,null,s,i,!1,n,r)}else a.pushComponentDefinition(t),a.invokeComponent(null,s,i,!1,n,r)}}}class Lt{constructor(t){this.buffer=t,this.typePos=0,this.size=0}encode(t,e){if(t>255)throw new Error(`Opcode type over 8-bits. Got ${t}.`)
this.buffer.push(t|e|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let s=2;s<arguments.length;s++){let t=arguments[s]
if("number"==typeof t&&t>65535)throw new Error(`Operand over 16-bits. Got ${t}.`)
this.buffer.push(t)}this.size=this.buffer.length}patch(t,e){if(-1!==this.buffer[t+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[t+1]=e}}class Bt{constructor(){this.labels=a(),this.targets=[]}label(t,e){this.labels[t]=e}target(t,e){this.targets.push({at:t,target:e})}patch(t){let e=this.targets,s=this.labels
for(let n=0;n<e.length;n++){var i=e[n]
let r=i.at,a=s[i.target]-r
t.patch(r,a)}}}class Mt{constructor(){this.encoder=new Lt([])}push(t){switch(arguments.length){case 1:return this.encoder.encode(t,0)
case 2:return this.encoder.encode(t,0,arguments[1])
case 3:return this.encoder.encode(t,0,arguments[1],arguments[2])
default:return this.encoder.encode(t,0,arguments[1],arguments[2],arguments[3])}}pushMachine(t){switch(arguments.length){case 1:return this.encoder.encode(t,1024)
case 2:return this.encoder.encode(t,1024,arguments[1])
case 3:return this.encoder.encode(t,1024,arguments[1],arguments[2])
default:return this.encoder.encode(t,1024,arguments[1],arguments[2],arguments[3])}}commit(t,e){this.pushMachine(20)
let s=this.encoder.buffer,i=t.malloc()
for(let n=0;n<s.length;n++){let e=s[n]
"function"==typeof e?t.pushPlaceholder(e):t.push(e)}return t.finishMalloc(i,e),i}reserve(t){this.encoder.encode(t,0,-1)}reserveMachine(t){this.encoder.encode(t,1024,-1)}main(){this.push(56,rt.s0),this.invokePreparedComponent(!1)}dynamicContent(){this.push(24)}beginComponentTransaction(){this.push(75)}commitComponentTransaction(){this.push(76)}pushDynamicScope(){this.push(36)}popDynamicScope(){this.push(37)}pushRemoteElement(){this.push(33)}popRemoteElement(){this.push(34)}pushRootScope(t,e){this.push(17,t,e?1:0)}pushChildScope(){this.push(18)}popScope(){this.push(19)}prepareArgs(t){this.push(65,t)}createComponent(t,e){let s=0|e
this.push(67,s,t)}registerComponentDestructor(t){this.push(68,t)}putComponentOperations(){this.push(69)}getComponentSelf(t){this.push(70,t)}getComponentTagName(t){this.push(71,t)}getComponentLayout(t){this.push(72,t)}invokeComponentLayout(t){this.push(74,t)}didCreateElement(t){this.push(77,t)}didRenderLayout(t){this.push(78,t)}pushFrame(){this.pushMachine(47)}popFrame(){this.pushMachine(48)}invokeVirtual(){this.pushMachine(41)}invokeYield(){this.push(43)}toBoolean(){this.push(51)}invokePreparedComponent(t,e=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(rt.s0,t),e&&e(),this.registerComponentDestructor(rt.s0),this.getComponentSelf(rt.s0),this.invokeComponentLayout(rt.s0),this.didRenderLayout(rt.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}}class Rt extends Mt{constructor(t,e,s,i,n,r,a){super(),this.program=t,this.resolver=e,this.referrer=s,this.macros=i,this.containingLayout=n,this.asPartial=r,this.stdLib=a,this.component=new Dt(this),this.expressionCompiler=function(){if(Et)return Et
const t=Et=new wt
return t.add(kt.Unknown,(t,e)=>{let s=e.resolver,i=e.asPartial,n=e.referrer,r=t[1],a=s.lookupHelper(r,n)
null!==a?e.helper(a,null,null):i?e.resolveMaybeLocal(r):(e.getVariable(0),e.getProperty(r))}),t.add(kt.Concat,(t,e)=>{let s=t[1]
for(let i=0;i<s.length;i++)e.expr(s[i])
e.concat(s.length)}),t.add(kt.Helper,(t,e)=>{let s=e.resolver,i=e.referrer,n=t[1],r=t[2],a=t[3]
if("component"===n){let t=r[0],s=r.slice(1)
return void e.curryComponent(t,s,a,!0)}let l=s.lookupHelper(n,i)
if(null===l)throw new Error(`Compile Error: ${n} is not a helper`)
e.helper(l,r,a)}),t.add(kt.Get,(t,e)=>{let s=t[1],i=t[2]
e.getVariable(s)
for(let n=0;n<i.length;n++)e.getProperty(i[n])}),t.add(kt.MaybeLocal,(t,e)=>{let s=t[1]
if(e.asPartial){let t=s[0]
s=s.slice(1),e.resolveMaybeLocal(t)}else e.getVariable(0)
for(let i=0;i<s.length;i++)e.getProperty(s[i])}),t.add(kt.Undefined,(t,e)=>e.pushPrimitiveReference(void 0)),t.add(kt.HasBlock,(t,e)=>{e.hasBlock(t[1])}),t.add(kt.HasBlockParams,(t,e)=>{e.hasBlockParams(t[1])}),t}(),this.labelsStack=new l,this.isComponentAttrs=!1,this.constants=t.constants}label(t){this.labels.label(t,this.nextPos)}setComponentAttrs(t){this.isComponentAttrs=t}expr(t){Array.isArray(t)?this.expressionCompiler.compile(t,this):this.pushPrimitiveReference(t)}pushArgs(t,e){let s=this.constants.stringArray(t)
this.push(63,s,e)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new Bt)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushComponentDefinition(t){this.push(59,this.constants.handle(t))}pushCurriedComponent(){this.push(61)}pushDynamicComponentInstance(){this.push(60)}resolveDynamicComponent(t){this.push(62,this.constants.serializable(t))}staticComponentHelper(t,e,s){let i=this.resolver.lookupComponentDefinition(t,this.referrer)
if(i){let t=this.resolver.getCapabilities(i)
if(!1===t.dynamicLayout){if(e)for(let t=0;t<e.length;t+=2)e[t][0]=`@${e[t][0]}`
let n=this.resolver.getLayout(i)
return this.pushComponentDefinition(i),this.invokeStaticComponent(t,n,null,null,e,!1,s&&s),!0}}return!1}invokePartial(t,e,s){let i=this.constants.serializable(t),n=this.constants.stringArray(e),r=this.constants.array(s)
this.push(79,i,n,r)}resolveMaybeLocal(t){this.push(80,this.string(t))}debugger(t,e){this.push(81,this.constants.stringArray(t),this.constants.array(e))}text(t){this.push(22,this.constants.string(t))}openPrimitiveElement(t){this.push(25,this.constants.string(t))}openDynamicElement(){this.push(26)}flushElement(){this.push(30)}closeElement(){this.push(31)}staticAttr(t,e,s){let i=this.constants.string(t),n=e?this.constants.string(e):0
if(this.isComponentAttrs)this.pushPrimitiveReference(s),this.push(29,i,1,n)
else{let t=this.constants.string(s)
this.push(27,i,t,n)}}dynamicAttr(t,e,s){let i=this.constants.string(t),n=e?this.constants.string(e):0
this.isComponentAttrs?this.push(29,i,!0===s?1:0,n):this.push(28,i,!0===s?1:0,n)}comment(t){let e=this.constants.string(t)
this.push(23,e)}modifier(t,e,s){this.pushFrame(),this.compileArgs(e,s,null,!0),this.push(32,this.constants.handle(t)),this.popFrame()}putIterator(){this.push(54)}enterList(t){this.reserve(52),this.labels.target(this.pos,t)}exitList(){this.push(53)}iterate(t){this.reserve(55),this.labels.target(this.pos,t)}setVariable(t){this.push(2,t)}setBlock(t){this.push(3,t)}getVariable(t){this.push(4,t)}getProperty(t){this.push(5,this.string(t))}getBlock(t){this.push(6,t)}hasBlock(t){this.push(7,t)}hasBlockParams(t){this.getBlock(t),this.resolveBlock(),this.push(8)}concat(t){this.push(9,t)}load(t){this.push(15,t)}fetch(t){this.push(16,t)}dup(t=rt.sp,e=0){return this.push(13,t,e)}pop(t=1){return this.push(14,t)}returnTo(t){this.reserveMachine(21),this.labels.target(this.pos,t)}primitive(t){let e,s=0
switch(typeof t){case"number":t%1==0?t>-1?e=t:(e=this.negative(t),s=4):(e=this.float(t),s=1)
break
case"string":e=this.string(t),s=2
break
case"boolean":e=0|t,s=3
break
case"object":e=2,s=3
break
case"undefined":e=3,s=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}this.push(11,e<<3|s)}float(t){return this.constants.float(t)}negative(t){return this.constants.negative(t)}pushPrimitiveReference(t){this.primitive(t),this.primitiveReference()}primitiveReference(){this.push(12)}helper(t,e,s){this.pushFrame(),this.compileArgs(e,s,null,!0),this.push(1,this.constants.handle(t)),this.popFrame(),this.fetch(rt.v0)}bindDynamicScope(t){this.push(35,this.names(t))}enter(t){this.push(49,t)}exit(){this.push(50)}return(){this.pushMachine(20)}jump(t){this.reserveMachine(44),this.labels.target(this.pos,t)}jumpIf(t){this.reserve(45),this.labels.target(this.pos,t)}jumpUnless(t){this.reserve(46),this.labels.target(this.pos,t)}string(t){return this.constants.string(t)}names(t){let e=[]
for(let s=0;s<t.length;s++){let i=t[s]
e[s]=this.constants.string(i)}return this.constants.array(e)}symbols(t){return this.constants.array(t)}inlineBlock(t){let e=t.parameters,s=t.statements,i={parameters:e,referrer:this.containingLayout.referrer},n={program:this.program,macros:this.macros,Builder:this.constructor,resolver:this.resolver,asPartial:this.asPartial,referrer:this.referrer}
return new Tt(s,this.containingLayout,n,i)}evalSymbols(){let t=this.containingLayout.block
return t.hasEval?t.symbols:null}compileParams(t){if(!t)return 0
for(let e=0;e<t.length;e++)this.expr(t[e])
return t.length}compileArgs(t,e,s,i){s&&(this.pushYieldableBlock(s.main),this.pushYieldableBlock(s.else),this.pushYieldableBlock(s.attrs))
let n=this.compileParams(t)<<4
i&&(n|=8),s&&(n|=7)
let r=c
if(e){r=e[0]
let t=e[1]
for(let e=0;e<t.length;e++)this.expr(t[e])}this.pushArgs(r,n)}invokeStaticBlock(t,e=0){let s=t.symbolTable.parameters,i=s.length,n=Math.min(e,i)
if(this.pushFrame(),n){this.pushChildScope()
for(let t=0;t<n;t++)this.dup(rt.fp,e-t),this.setVariable(s[t])}this.pushBlock(t),this.resolveBlock(),this.invokeVirtual(),n&&this.popScope(),this.popFrame()}builtInGuardedAppend(){this.dup(),this.startLabels(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.dynamicContent(),this.exit(),this.return(),this.stopLabels()}guardedAppend(t,e){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.stdLib?(this.primitive(!!e),this.load(rt.t0),this.expr(t),this.primitive(this.stdLib.guardedAppend),this.invokeVirtual()):(this.expr(t),this.dup(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.primitive(!!e),this.load(rt.t0),this.dynamicContent(),this.exit(),this.return()),this.label("END"),this.popFrame(),this.stopLabels()}yield(t,e){this.compileArgs(e,null,null,!1),this.getBlock(t),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}populateLayout(t){this.push(73,t)}invokeComponent(t,e,s,i,n,r=null,a){this.fetch(rt.s0),this.dup(rt.sp,1),this.load(rt.s0),this.pushFrame()
let l={main:n,else:r,attrs:t}
this.compileArgs(e,s,l,i),this.prepareArgs(rt.s0),this.invokePreparedComponent(null!==n,()=>{a?(this.pushSymbolTable(a.symbolTable),this.pushLayout(a),this.resolveLayout()):this.getComponentLayout(rt.s0),this.populateLayout(rt.s0)}),this.load(rt.s0)}invokeStaticComponent(e,s,i,n,r,a,l,o=null){let h=s.symbolTable
if(h.hasEval||e.prepareArgs)return void this.invokeComponent(i,n,r,a,l,o,s)
this.fetch(rt.s0),this.dup(rt.sp,1),this.load(rt.s0)
let u=h.symbols
e.createArgs&&(this.pushFrame(),this.compileArgs(null,r,null,a)),this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(rt.s0,null!==l),e.createArgs&&this.popFrame(),this.registerComponentDestructor(rt.s0)
let c=[]
this.getComponentSelf(rt.s0),c.push({symbol:0,isBlock:!1})
for(let d=0;d<u.length;d++){let e=u[d]
switch(e.charAt(0)){case"&":let s=null
if("&default"===e)s=l
else if("&inverse"===e)s=o
else{if(e!==St)throw t()
s=i}s?(this.pushYieldableBlock(s),c.push({symbol:d+1,isBlock:!0})):(this.pushYieldableBlock(null),c.push({symbol:d+1,isBlock:!0}))
break
case"@":if(!r)break
let n=r[0],h=r[1],u=e
a&&(u=e.slice(1))
let p=n.indexOf(u);-1!==p&&(this.expr(h[p]),c.push({symbol:d+1,isBlock:!1}))}}this.pushRootScope(u.length+1,!!(l||o||i))
for(let t=c.length-1;t>=0;t--){var p=c[t]
let e=p.symbol
p.isBlock?this.setBlock(e):this.setVariable(e)}this.pushFrame(),this.invokeStatic(s),this.didRenderLayout(rt.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction(),this.load(rt.s0)}dynamicComponent(t,e,s,i,n,r=null){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.expr(t),this.dup(),this.enter(2),this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(null,e,s,i,n,r),this.label("ELSE"),this.exit(),this.return(),this.label("END"),this.popFrame(),this.stopLabels()}isComponent(){this.push(57)}curryComponent(t,e,s,i){let n=this.referrer
this.pushFrame(),this.compileArgs(e,s,null,i),this.push(66),this.expr(t),this.push(58,this.constants.serializable(n)),this.popFrame(),this.fetch(rt.v0)}pushSymbolTable(t){if(t){let e=this.constants.serializable(t)
this.push(40,e)}else this.primitive(null)}pushBlockScope(){this.push(39)}pushYieldableBlock(t){this.pushSymbolTable(t&&t.symbolTable),this.pushBlockScope(),this.pushBlock(t)}template(t){return t?this.inlineBlock(t):null}}class It extends Rt{pushBlock(t){t?this.pushOther(t):this.primitive(null)}resolveBlock(){this.push(38)}pushLayout(t){t?this.pushOther(t):this.primitive(null)}resolveLayout(){this.push(38)}invokeStatic(t){this.pushOther(t),this.push(38),this.pushMachine(41)}pushOther(t){this.push(10,this.other(t))}other(t){return this.constants.other(t)}}class Ft{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}setup(t,e,s){this.stack=t,this.base=e,this.length=s,0===s?(this._tag=y,this._references=c):(this._tag=null,this._references=null)}get tag(){let t=this._tag
return t||(t=this._tag=E(this.references)),t}at(t){let e=this.base,s=this.length,i=this.stack
return t<0||t>=s?ht:i.get(t,e)}capture(){return new Pt(this.tag,this.references)}prepend(t){let e=t.length
if(e>0){let s=this.base,i=this.length,n=this.stack
this.base=s-=e,this.length=i+e
for(let r=0;r<e;r++)n.set(t.at(r),r,s)
this._tag=null,this._references=null}}get references(){let t=this._references
if(!t){let e=this.stack,s=this.base,i=this.length
t=this._references=e.sliceArray(s,s+i)}return t}}class Pt{constructor(t,e,s=e.length){this.tag=t,this.references=e,this.length=s}static empty(){return new Pt(y,c,0)}at(t){return this.references[t]}value(){return this.references.map(this.valueOf)}get(t){let e=this.references,s=this.length
if("length"===t)return at.create(s)
{let i=parseInt(t,10)
return i<0||i>=s?ht:e[i]}}valueOf(t){return t.value()}}class jt{constructor(){this.base=0,this.length=0,this._references=null,this._names=c,this._atNames=c}setup(t,e,s,i,n){this.stack=t,this.base=e,this.length=s,0===s?(this._references=c,this._names=c,this._atNames=c):(this._references=null,n?(this._names=i,this._atNames=null):(this._names=null,this._atNames=i))}get tag(){return E(this.references)}get names(){let t=this._names
return t||(t=this._names=this._atNames.map(this.toSyntheticName)),t}get atNames(){let t=this._atNames
return t||(t=this._atNames=this._names.map(this.toAtName)),t}has(t){return-1!==this.names.indexOf(t)}get(t,e=!0){let s=this.base,i=this.stack,n=(e?this.names:this.atNames).indexOf(t)
return-1===n?ht:i.get(n,s)}capture(){return new Vt(this.tag,this.names,this.references)}merge(t){let e=t.length
if(e>0){let s=this.names,i=this.length,n=this.stack,r=t.names
Object.isFrozen(s)&&0===s.length&&(s=[])
for(let a=0;a<e;a++){let e=r[a];-1===s.indexOf(e)&&(i=s.push(e),n.push(t.references[a]))}this.length=i,this._references=null,this._names=s,this._atNames=null}}get references(){let t=this._references
if(!t){let e=this.base,s=this.length,i=this.stack
t=this._references=i.sliceArray(e,e+s)}return t}toSyntheticName(t){return t.slice(1)}toAtName(t){return`@${t}`}}class Vt{constructor(t,e,s){this.tag=t,this.names=e,this.references=s,this.length=e.length,this._map=null}get map(){let t=this._map
if(!t){let e=this.names,s=this.references
t=this._map=a()
for(let i=0;i<e.length;i++){t[e[i]]=s[i]}}return t}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.names,s=this.references,i=e.indexOf(t)
return-1===i?ht:s[i]}value(){let t=this.names,e=this.references,s=a()
for(let i=0;i<t.length;i++){s[t[i]]=e[i].value()}return s}}class zt{constructor(){this.internalValues=null,this.internalTag=null,this.names=c,this.length=0,this.base=0}setup(t,e,s,i){this.stack=t,this.names=i,this.base=e,this.length=s,0===s?(this.internalTag=y,this.internalValues=c):(this.internalTag=null,this.internalValues=null)}get values(){let t=this.internalValues
if(!t){let e=this.base,s=this.length,i=this.stack
t=this.internalValues=i.sliceArray(e,e+3*s)}return t}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.base,s=this.stack,i=this.names,n=i.indexOf(t)
if(-1===i.indexOf(t))return null
let r=s.get(3*n,e),a=s.get(3*n+1,e),l=s.get(3*n+2,e)
return null===l?null:[l,a,r]}capture(){return new Ht(this.names,this.values)}}class Ht{constructor(t,e){this.names=t,this.values=e,this.length=t.length}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.names.indexOf(t)
return-1===e?null:[this.values[3*e+2],this.values[3*e+1],this.values[3*e]]}}const Ut=new Vt(y,c,c),$t=new Pt(y,c),Yt={tag:y,length:0,positional:$t,named:Ut},Gt="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function Wt(t){return!(!t||!t[Gt])}class Xt{constructor(t,e){this.inner=t,this.args=e,this[Gt]=!0}unwrap(t){t.realloc(this.offset)
let e=this
for(;;){var s=e
let i=s.args,n=s.inner
if(i&&(t.positional.prepend(i.positional),t.named.merge(i.named)),!Wt(n))return n
e=n}}get offset(){let t=this.inner,e=this.args,s=e?e.positional.length:0
return Wt(t)?s+t.offset:s}}class Kt extends dt{static create(t){return new Kt(t)}toBool(t){return Wt(t)}}st.add(24,t=>{let e,s=t.stack.pop(),i=t.fetchValue(rt.t0),n=s.value()
e=i?t.elements().appendTrustingDynamicContent(n):t.elements().appendCautiousDynamicContent(n),k(s)||t.updateWith(new class extends nt{constructor(t,e){super(),this.reference=t,this.content=e,this.tag=t.tag}evaluate(t){let e=this.content,s=this.reference
e.update(t.env,s.value())}}(s,e)),t.loadValue(rt.t0,null)})
st.add(18,t=>t.pushChildScope()),st.add(19,t=>t.popScope()),st.add(36,t=>t.pushDynamicScope()),st.add(37,t=>t.popDynamicScope()),st.add(10,(t,{op1:e})=>{t.stack.push(t.constants.getOther(e))}),st.add(11,(t,{op1:e})=>{let s=t.stack,i=e>>3
switch(7&e){case 0:s.push(i)
break
case 1:s.push(t.constants.getFloat(i))
break
case 2:s.push(t.constants.getString(i))
break
case 3:s.pushEncodedImmediate(e)
break
case 4:s.push(t.constants.getNegative(i))}}),st.add(12,t=>{let e=t.stack
e.push(at.create(e.pop()))}),st.add(13,(t,{op1:e,op2:s})=>{let i=t.fetchValue(e)-s
t.stack.dup(i)}),st.add(14,(t,{op1:e})=>{t.stack.pop(e)}),st.add(15,(t,{op1:e})=>{t.load(e)}),st.add(16,(t,{op1:e})=>{t.fetch(e)}),st.add(35,(t,{op1:e})=>{let s=t.constants.getArray(e)
t.bindDynamicScope(s)}),st.add(49,(t,{op1:e})=>{t.enter(e)}),st.add(50,t=>{t.exit()}),st.add(40,(t,{op1:e})=>{t.stack.push(t.constants.getSerializable(e))}),st.add(39,t=>{t.stack.push(t.scope())}),st.add(38,t=>{let e=t.stack,s=e.pop()
s?e.pushSmi(s.compile()):e.pushNull()}),st.add(43,t=>{let e=t.stack,s=e.pop(),i=e.pop(),n=e.pop(),r=e.pop()
if(null===n)return t.pushFrame(),void t.pushScope(i)
let a=i
{let t=n.parameters,e=t.length
if(e>0){a=a.child()
for(let s=0;s<e;s++)a.bindSymbol(t[s],r.at(s))}}t.pushFrame(),t.pushScope(a),t.call(s)}),st.add(45,(t,{op1:e})=>{let s=t.stack.pop()
if(k(s))s.value()&&t.goto(e)
else{let i=new B(s)
i.peek()&&t.goto(e),t.updateWith(new Jt(i))}}),st.add(46,(t,{op1:e})=>{let s=t.stack.pop()
if(k(s))s.value()||t.goto(e)
else{let i=new B(s)
i.peek()||t.goto(e),t.updateWith(new Jt(i))}}),st.add(51,t=>{let e=t.env,s=t.stack
s.push(e.toConditionalReference(s.pop()))})
class Jt extends nt{constructor(t){super(),this.type="assert",this.tag=t.tag,this.cache=t}evaluate(t){let e=this.cache
e.revalidate()!==M&&t.throw()}}class qt extends nt{constructor(t,e){super(),this.target=e,this.type="jump-if-not-modified",this.tag=t,this.lastRevision=t.value()}evaluate(t){let e=this.tag,s=this.target,i=this.lastRevision
!t.alwaysRevalidate&&e.validate(i)&&t.goto(s)}didModify(){this.lastRevision=this.tag.value()}}class Zt extends nt{constructor(t){super(),this.target=t,this.type="did-modify",this.tag=y}evaluate(){this.target.didModify()}}class Qt{constructor(t){this.tag=y,this.type="label",this.label=null,this.prev=null,this.next=null,r(this),this.label=t}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}st.add(22,(t,{op1:e})=>{t.elements().appendText(t.constants.getString(e))}),st.add(23,(t,{op1:e})=>{t.elements().appendComment(t.constants.getString(e))}),st.add(25,(t,{op1:e})=>{t.elements().openElement(t.constants.getString(e))}),st.add(26,t=>{let e=t.stack.pop().value()
t.elements().openElement(e)}),st.add(33,t=>{let e,s,i=t.stack.pop(),n=t.stack.pop(),r=t.stack.pop().value()
if(k(i))e=i.value()
else{let s=new B(i)
e=s.peek(),t.updateWith(new Jt(s))}if(k(n))s=n.value()
else{let e=new B(n)
s=e.peek(),t.updateWith(new Jt(e))}t.elements().pushRemoteElement(e,r,s)}),st.add(34,t=>{t.elements().popRemoteElement()}),st.add(30,t=>{let e=t.fetchValue(rt.t0)
e&&(e.flush(t),t.loadValue(rt.t0,null)),t.elements().flushElement()}),st.add(31,t=>{t.elements().closeElement()}),st.add(32,(t,{op1:e})=>{let s=t.constants.resolveHandle(e),i=t.stack.pop()
var n=t.elements()
let r=n.constructing,a=n.updateOperations,l=t.dynamicScope(),o=s.create(r,i,l,a)
t.env.scheduleInstallModifier(o,s)
let h=s.getDestructor(o)
h&&t.newDestroyable(h)
let u=s.getTag(o)
S(u)||t.updateWith(new class extends nt{constructor(t,e,s){super(),this.tag=t,this.manager=e,this.modifier=s,this.type="update-modifier",this.lastUpdated=t.value()}evaluate(t){let e=this.manager,s=this.modifier,i=this.tag,n=this.lastUpdated
i.validate(n)||(t.env.scheduleUpdateModifier(s,e),this.lastUpdated=i.value())}}(u,s,o))})
st.add(27,(t,{op1:e,op2:s,op3:i})=>{let n=t.constants.getString(e),r=t.constants.getString(s),a=i?t.constants.getString(i):null
t.elements().setStaticAttribute(n,r,a)}),st.add(28,(t,{op1:e,op2:s,op3:i})=>{let n=t.constants.getString(e),r=t.stack.pop(),a=r.value(),l=i?t.constants.getString(i):null,o=t.elements().setDynamicAttribute(n,a,!!s,l)
k(r)||t.updateWith(new te(r,o))})
class te extends nt{constructor(t,e){super(),this.reference=t,this.attribute=e,this.type="patch-element",this.tag=t.tag,this.lastRevision=this.tag.value()}evaluate(t){let e=this.attribute,s=this.reference,i=this.tag
i.validate(this.lastRevision)||(this.lastRevision=i.value(),e.update(s.value(),t.env))}}function ee(t,e,s){let i=t.lookupComponent(e,s)
return i}function se(t){return ie(t)?"":String(t)}function ie(t){return null===t||void 0===t||"function"!=typeof t.toString}function ne(t){return"object"==typeof t&&null!==t&&"function"==typeof t.toHTML}function re(t){return"object"==typeof t&&null!==t&&"number"==typeof t.nodeType}function ae(t){return re(t)&&11===t.nodeType}function le(t){return"string"==typeof t}class oe{constructor(t){this.list=t,this.tag=E(t),this.list=t}value(){let t=[],e=this.list
for(let s=0;s<e.length;s++){let i=se(e[s].value())
i&&t.push(i)}return 0===t.length?null:t.join(" ")}}function he(t){return 0|(t.dynamicLayout?1:0)|(t.dynamicTag?2:0)|(t.prepareArgs?4:0)|(t.createArgs?8:0)|(t.attributeHook?16:0)|(t.elementHook?32:0)}function ue(t,e){return!!(t&e)}const ce=new class{constructor(){this.stack=null,this.positional=new Ft,this.named=new jt,this.blocks=new zt}setup(t,e,s,i,n){this.stack=t
let r=this.named,a=e.length,l=t.sp-a+1
r.setup(t,l,a,e,n)
let o=l-i
this.positional.setup(t,o,i)
let h=this.blocks,u=s.length,c=o-3*u
h.setup(t,c,u,s)}get tag(){return E([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(t){return this.positional.at(t)}realloc(t){if(t>0){let e=this.positional,s=this.named,i=this.stack,n=e.base+t
for(let t=e.length+s.length-1;t>=0;t--)i.copy(t+e.base,t+n)
e.base+=t,s.base+=t,i.sp+=t}}capture(){let t=0===this.positional.length?$t:this.positional.capture(),e=0===this.named.length?Ut:this.named.capture()
return{tag:this.tag,length:this.length,positional:t,named:e}}clear(){let t=this.stack,e=this.length
t.pop(e)}}
st.add(57,t=>{let e=t.stack,s=e.pop()
e.push(Kt.create(s))}),st.add(58,(t,{op1:e})=>{let s=t.stack,i=s.pop(),n=s.pop(),r=t.constants.getSerializable(e),a=t.constants.resolver
t.loadValue(rt.v0,new class{constructor(t,e,s,i){this.inner=t,this.resolver=e,this.meta=s,this.args=i,this.tag=t.tag,this.lastValue=null,this.lastDefinition=null}value(){let t=this.inner,e=this.lastValue,s=t.value()
if(s===e)return this.lastDefinition
let i=null
return Wt(s)?i=s:"string"==typeof s&&s&&(i=ee(this.resolver,s,this.meta)),i=this.curry(i),this.lastValue=s,this.lastDefinition=i,i}get(){return ht}curry(t){let e=this.args
return!e&&Wt(t)?t:t?new Xt(t,e):null}}(i,a,r,n))}),st.add(59,(t,{op1:e})=>{let s=t.constants.resolveHandle(e),i=s.manager,n={definition:s,manager:i,capabilities:he(i.getCapabilities(s.state)),state:null,handle:null,table:null}
t.stack.push(n)}),st.add(62,(e,{op1:s})=>{let i,n=e.stack,r=n.pop().value(),a=e.constants.getSerializable(s)
if(e.loadValue(rt.t1,null),"string"==typeof r){i=ee(e.constants.resolver,r,a)}else{if(!Wt(r))throw t()
i=r}n.push(i)}),st.add(60,t=>{let e,s,i=t.stack,n=i.pop()
Wt(n)?s=e=null:e=he((s=n.manager).getCapabilities(n.state)),i.push({definition:n,capabilities:e,manager:s,state:null,handle:null,table:null})}),st.add(61,(e,{op1:s})=>{let i,n=e.stack,r=n.pop().value()
if(!Wt(r))throw t()
i=r,n.push(i)}),st.add(63,(t,{op1:e,op2:s})=>{let i=t.stack,n=t.constants.getStringArray(e),r=s>>4,a=8&s,l=[]
4&s&&l.push("main"),2&s&&l.push("else"),1&s&&l.push("attrs"),ce.setup(i,n,l,r,!!a),i.push(ce)}),st.add(66,t=>{let e=t.stack,s=e.pop().capture()
e.push(s)}),st.add(65,(t,{op1:e})=>{let s=t.stack,i=t.fetchValue(e),n=s.pop(),r=i.definition
Wt(r)&&(r=function(t,e,s){let i=t.definition=e.unwrap(s),n=i.manager,r=i.state
return t.manager=n,t.capabilities=he(n.getCapabilities(r)),i}(i,r,n))
var a=r
let l=a.manager,o=a.state
if(!0!==ue(i.capabilities,4))return void s.push(n)
let h=n.blocks.values,u=n.blocks.names,c=l.prepareArgs(o,n)
if(c){n.clear()
for(let n=0;n<h.length;n++)s.push(h[n])
let t=c.positional,e=c.named,i=t.length
for(let n=0;n<i;n++)s.push(t[n])
let r=Object.keys(e)
for(let n=0;n<r.length;n++)s.push(e[r[n]])
n.setup(s,r,u,i,!0)}s.push(n)}),st.add(67,(t,{op1:e,op2:s})=>{let i=t.dynamicScope(),n=t.fetchValue(s),r=n.definition,a=n.manager,l=1&e,o=null
ue(n.capabilities=he(a.getCapabilities(r.state)),8)&&(o=t.stack.peek())
let h=a.create(t.env,r.state,o,i,t.getSelf(),!!l)
n.state=h
let u=a.getTag(h)
S(u)||t.updateWith(new class extends nt{constructor(t,e,s,i){super(),this.tag=t,this.component=e,this.manager=s,this.dynamicScope=i,this.type="update-component"}evaluate(t){let e=this.component,s=this.manager,i=this.dynamicScope
s.update(e,i)}}(u,h,a,i))}),st.add(68,(t,{op1:e})=>{var s=t.fetchValue(e)
let i=s.manager,n=s.state,r=i.getDestructor(n)
r&&t.newDestroyable(r)}),st.add(75,t=>{t.beginCacheGroup(),t.elements().pushSimpleBlock()}),st.add(69,t=>{t.loadValue(rt.t0,new class{constructor(){this.attributes=a(),this.classes=[]}setAttribute(t,e,s,i){let n={value:e,namespace:i,trusting:s}
"class"===t&&this.classes.push(e),this.attributes[t]=n}flush(t){for(let e in this.attributes){let s=this.attributes[e],i=s.value,n=s.namespace,r=s.trusting
"class"===e&&(i=new oe(this.classes))
let a=t.elements().setDynamicAttribute(e,i.value(),r,n)
k(i)||t.updateWith(new te(i,a))}}})}),st.add(29,(t,{op1:e,op2:s,op3:i})=>{let n=t.constants.getString(e),r=t.stack.pop(),a=i?t.constants.getString(i):null
t.fetchValue(rt.t0).setAttribute(n,r,!!s,a)})
st.add(77,(t,{op1:e})=>{var s=t.fetchValue(e)
let i=s.definition,n=s.state,r=i.manager,a=t.fetchValue(rt.t0)
r.didCreateElement(n,t.elements().expectConstructing("DidCreateElementOpcode#evaluate"),a)}),st.add(70,(t,{op1:e})=>{var s=t.fetchValue(e)
let i=s.definition,n=s.state,r=i.manager
t.stack.push(r.getSelf(n))}),st.add(71,(t,{op1:e})=>{var s=t.fetchValue(e)
let i=s.definition,n=s.state,r=i.manager
t.stack.push(r.getTagName(n))}),st.add(72,(e,{op1:s})=>{let i,n=e.fetchValue(s),r=n.manager,a=n.definition,l=e.constants.resolver,o=e.stack,h=n.state,u=n.capabilities,c=a.state
if(!1===ue(u,1))i=r.getLayout(c,l)
else{if(!function(t,e){return!0===ue(t,1)}(u))throw t()
i=r.getDynamicLayout(h,l)}o.push(i.symbolTable),o.push(i.handle)}),st.add(56,(t,{op1:e})=>{let s=t.stack.pop(),i=t.stack.pop(),n=s.manager,r={definition:s,manager:n,capabilities:he(n.getCapabilities(s.state)),state:null,handle:i.handle,table:i.symbolTable}
t.loadValue(e,r)}),st.add(73,(t,{op1:e})=>{let s=t.stack,i=s.pop(),n=s.pop(),r=t.fetchValue(e)
r.handle=i,r.table=n}),st.add(74,(t,{op1:e})=>{let s=t.stack
var i=t.fetchValue(e)
let n=i.handle
var r=i.table
let l=r.symbols,o=r.hasEval
{let e=s.pop(),i=t.pushRootScope(l.length+1,!0)
i.bindSelf(e)
let r=t.stack.pop(),h=null
o&&(h=a())
let u=r.named.atNames
for(let t=u.length-1;t>=0;t--){let e=u[t],s=l.indexOf(u[t]),n=r.named.get(e,!1);-1!==s&&i.bindSymbol(s+1,n),o&&(h[e]=n)}let c=(t,e)=>{let s=l.indexOf(t),n=p.get(e);-1!==s&&i.bindBlock(s+1,n),h&&(h[t]=n)},p=r.blocks
c(St,"attrs"),c("&inverse","else"),c("&default","main"),h&&i.bindEvalScope(h),t.call(n)}}),st.add(78,(t,{op1:e})=>{var s=t.fetchValue(e)
let i=s.manager,n=s.state,r=t.elements().popBlock()
i.didRenderLayout(n,r),t.env.didCreate(n,i),t.updateWith(new class extends nt{constructor(t,e,s){super(),this.manager=t,this.component=e,this.bounds=s,this.type="did-update-layout",this.tag=y}evaluate(t){let e=this.manager,s=this.component,i=this.bounds
e.didUpdateLayout(s,i),t.env.didUpdate(s,e)}}(i,n,r))}),st.add(76,t=>{t.commitCacheGroup()})
let pe=function(t,e){console.info("Use `context`, and `get(<path>)` to debug this template."),e("this")}
st.add(81,(t,{op1:e,op2:s})=>{let i=t.constants.getStringArray(e),n=t.constants.getArray(s),r=new class{constructor(t,e,s){this.scope=t,this.locals=a()
for(let i=0;i<s.length;i++){let n=s[i],r=e[n-1],a=t.getSymbol(n)
this.locals[r]=a}}get(t){let e=this.scope,s=this.locals,i=t.split(".")
var n=t.split(".")
let r,a=n[0],l=n.slice(1),o=e.getEvalScope()
return"this"===a?r=e.getSelf():s[a]?r=s[a]:0===a.indexOf("@")&&o[a]?r=o[a]:(r=this.scope.getSelf(),l=i),l.reduce((t,e)=>t.get(e),r)}}(t.scope(),i,n)
pe(t.getSelf().value(),t=>r.get(t).value())}),st.add(79,(t,{op1:e,op2:s,op3:i})=>{let n=t.constants,r=t.constants.resolver,a=t.stack.pop().value(),l=n.getSerializable(e),o=n.getStringArray(s),h=n.getArray(i),u=r.lookupPartial(a,l)
var c=r.resolve(u).getPartial()
let p=c.symbolTable,d=c.handle
{let e=p.symbols,s=t.scope(),i=t.pushRootScope(e.length,!1),n=s.getEvalScope()
i.bindCallerScope(s.getCallerScope()),i.bindEvalScope(n),i.bindSelf(s.getSelf())
let r=Object.create(s.getPartialMap())
for(let t=0;t<h.length;t++){let e=h[t],i=o[e-1],n=s.getSymbol(e)
r[i]=n}if(n)for(let t=0;t<e.length;t++){let s=t+1,r=n[e[t]]
void 0!==r&&i.bind(s,r)}i.bindPartialMap(r),t.pushFrame(),t.call(d)}})
st.add(54,t=>{let e=t.stack,s=e.pop(),i=e.pop(),n=new class{constructor(t){this.iterator=null
let e=new F(t)
this.artifacts=e}next(){let t=this.artifacts,e=(this.iterator=this.iterator||t.iterate()).next()
return null===e?null:t.append(e)}}(t.env.iterableFor(s,i.value()))
e.push(n),e.push(new class{constructor(t){this.tag=t.tag,this.artifacts=t}value(){return!this.artifacts.isEmpty()}}(n.artifacts))}),st.add(52,(t,{op1:e})=>{t.enterList(e)}),st.add(53,t=>{t.exitList()}),st.add(55,(t,{op1:e})=>{let s=t.stack.peek().next()
if(s){let e=t.iterate(s.memo,s.value)
t.enterItem(s.key,e)}else t.goto(e)})
class de{constructor(t,e){this.element=t,this.nextSibling=e}}class me{constructor(t,e,s){this.parentNode=t,this.first=e,this.last=s}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class ge{constructor(t,e){this.parentNode=t,this.node=e}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function fe(t,e){return new ge(t,e)}function be(t,e){let s=t.parentElement(),i=t.firstNode(),n=t.lastNode(),r=i
for(;r;){let t=r.nextSibling
if(s.insertBefore(r,e),r===n)return t
r=t}return null}function ye(t){let e=t.parentElement(),s=t.firstNode(),i=t.lastNode(),n=s
for(;n;){let t=n.nextSibling
if(e.removeChild(n),n===i)return t
n=t}return null}const ve="http://www.w3.org/2000/svg"
function ke(t,e,s){if(!t)return e
if(!function(t,e){let s=t.createElementNS(e,"svg")
try{s.insertAdjacentHTML("beforeend","<circle></circle>")}catch(t){}finally{return 1!==s.childNodes.length||s.firstChild.namespaceURI!==ve}}(t,s))return e
let i=t.createElement("div")
return class extends e{insertHTMLBefore(t,e,n){return null===n||""===n?super.insertHTMLBefore(t,e,n):t.namespaceURI!==s?super.insertHTMLBefore(t,e,n):function(t,e,s,i){let n="<svg>"+s+"</svg>"
e.innerHTML=n
var r=function(t,e,s){let i=t.firstChild,n=null,r=i
for(;r;)n=r,r=r.nextSibling,e.insertBefore(n,s)
return[i,n]}(e.firstChild,t,i)
let a=r[0],l=r[1]
return new me(t,a,l)}(t,i,n,e)}}}function Se(t,e){return t&&function(t){let e=t.createElement("div")
if(e.innerHTML="first",e.insertAdjacentHTML("beforeend","second"),2===e.childNodes.length)return!1
return!0}(t)?class extends e{constructor(t){super(t),this.uselessComment=t.createComment("")}insertHTMLBefore(t,e,s){if(null===s)return super.insertHTMLBefore(t,e,s)
let i=!1,n=e?e.previousSibling:t.lastChild
n&&n instanceof Text&&(i=!0,t.insertBefore(this.uselessComment,e))
let r=super.insertHTMLBefore(t,e,s)
return i&&t.removeChild(this.uselessComment),r}}:e}const we="http://www.w3.org/2000/svg",_e={foreignObject:1,desc:1,title:1},Ee=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(t=>Ee[t]=1)
let Ce="undefined"==typeof document?null:document
class xe{constructor(t){this.document=t,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(t,e){let s,i
if(e?(s=e.namespaceURI===we||"svg"===t,i=_e[e.tagName]):(s="svg"===t,i=!1),s&&!i){if(Ee[t])throw new Error(`Cannot create a ${t} inside an SVG context`)
return this.document.createElementNS(we,t)}return this.document.createElement(t)}insertBefore(t,e,s){t.insertBefore(e,s)}insertHTMLBefore(t,e,s){return function(t,e,s,i){let n,r=e,a=s,l=a?a.previousSibling:r.lastChild
if(null===i||""===i)return new me(r,null,null)
null===a?(r.insertAdjacentHTML("beforeend",i),n=r.lastChild):a instanceof HTMLElement?(a.insertAdjacentHTML("beforebegin",i),n=a.previousSibling):(r.insertBefore(t,a),t.insertAdjacentHTML("beforebegin",i),n=t.previousSibling,r.removeChild(t))
let o=l?l.nextSibling:r.firstChild
return new me(r,o,n)}(this.uselessElement,t,e,s)}createTextNode(t){return this.document.createTextNode(t)}createComment(t){return this.document.createComment(t)}}var Ae;(function(t){class e extends xe{createElementNS(t,e){return this.document.createElementNS(t,e)}setAttribute(t,e,s,i=null){i?t.setAttributeNS(i,e,s):t.setAttribute(e,s)}}t.TreeConstruction=e
let s=e
s=Se(Ce,s),s=ke(Ce,s,we),t.DOMTreeConstruction=s})(Ae||(Ae={}))
let Ne=class extends xe{constructor(t){super(t),this.document=t,this.namespace=null}setAttribute(t,e,s){t.setAttribute(e,s)}removeAttribute(t,e){t.removeAttribute(e)}insertAfter(t,e,s){this.insertBefore(t,e,s.nextSibling)}}
Ne=Se(Ce,Ne)
var Oe=Ne=ke(Ce,Ne,we)
const Te=Ae.DOMTreeConstruction,De=["javascript:","vbscript:"],Le=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],Be=["EMBED"],Me=["href","src","background","action"],Re=["src"]
function Ie(t,e){return-1!==t.indexOf(e)}function Fe(t,e){return(null===t||Ie(Le,t))&&Ie(Me,e)}function Pe(t,e){return null!==t&&(Ie(Be,t)&&Ie(Re,e))}function je(t,e){return Fe(t,e)||Pe(t,e)}function Ve(t,e,s,i){let n=null
if(null===i||void 0===i)return i
if(ne(i))return i.toHTML()
n=e?e.tagName.toUpperCase():null
let r=se(i)
if(Fe(n,s)){let e=t.protocolForURL(r)
if(Ie(De,e))return`unsafe:${r}`}return Pe(n,s)?`unsafe:${r}`:r}function ze(t,e){let s,i
if(e in t)i=e,s="prop"
else{let n=e.toLowerCase()
n in t?(s="prop",i=n):(s="attr",i=e)}return"prop"!==s||"style"!==i.toLowerCase()&&!function(t,e){let s=He[t.toUpperCase()]
return s&&s[e.toLowerCase()]||!1}(t.tagName,i)||(s="attr"),{normalized:i,type:s}}const He={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0}}
function Ue(t,e){let s=t.tagName
if(t.namespaceURI===we)return $e(s,e)
var i=ze(t,e)
let n=i.type,r=i.normalized
return"attr"===n?$e(s,r):function(t,e){if(je(t,e))return Xe
if(function(t,e){return("INPUT"===t||"TEXTAREA"===t)&&"value"===e}(t,e))return Je
if(function(t,e){return"OPTION"===t&&"selected"===e}(t,e))return qe
return We}(s,r)}function $e(t,e){return je(t,e)?Ke:Ge}class Ye{constructor(t){this.attribute=t}}class Ge extends Ye{set(t,e,s){let i=Ze(e)
if(null!==i){var n=this.attribute
let e=n.name,s=n.namespace
t.__setAttribute(e,i,s)}}update(t,e){let s=Ze(t)
var i=this.attribute
let n=i.element,r=i.name
null===s?n.removeAttribute(r):n.setAttribute(r,s)}}class We extends Ye{set(t,e,s){if(null!==e&&void 0!==e){let s=this.attribute.name
this.value=e,t.__setProperty(s,e)}}update(t,e){var s=this.attribute
let i=s.element,n=s.name
this.value!==t&&(i[n]=this.value=t,null!==t&&void 0!==t||this.removeAttribute())}removeAttribute(){var t=this.attribute
let e=t.element,s=t.name,i=t.namespace
i?e.removeAttributeNS(i,s):e.removeAttribute(s)}}class Xe extends We{set(t,e,s){var i=this.attribute
let n=Ve(s,i.element,i.name,e)
super.set(t,n,s)}update(t,e){var s=this.attribute
let i=Ve(e,s.element,s.name,t)
super.update(i,e)}}class Ke extends Ge{set(t,e,s){var i=this.attribute
let n=Ve(s,i.element,i.name,e)
super.set(t,n,s)}update(t,e){var s=this.attribute
let i=Ve(e,s.element,s.name,t)
super.update(i,e)}}class Je extends We{set(t,e){t.__setProperty("value",se(e))}update(t){let e=this.attribute.element,s=e.value,i=se(t)
s!==i&&(e.value=i)}}class qe extends We{set(t,e){null!==e&&void 0!==e&&!1!==e&&t.__setProperty("selected",!0)}update(t){let e=this.attribute.element
e.selected=!!t}}function Ze(t){return!1===t||void 0===t||null===t||void 0===t.toString?null:!0===t?"":"function"==typeof t?null:String(t)}class Qe{constructor(t,e,s,i){this.slots=t,this.callerScope=e,this.evalScope=s,this.partialMap=i}static root(t,e=0){let s=new Array(e+1)
for(let i=0;i<=e;i++)s[i]=ht
return new Qe(s,null,null,null).init({self:t})}static sized(t=0){let e=new Array(t+1)
for(let s=0;s<=t;s++)e[s]=ht
return new Qe(e,null,null,null)}init({self:t}){return this.slots[0]=t,this}getSelf(){return this.get(0)}getSymbol(t){return this.get(t)}getBlock(t){return this.get(t)}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(t,e){this.set(t,e)}bindSelf(t){this.set(0,t)}bindSymbol(t,e){this.set(t,e)}bindBlock(t,e){this.set(t,e)}bindEvalScope(t){this.evalScope=t}bindPartialMap(t){this.partialMap=t}bindCallerScope(t){this.callerScope=t}getCallerScope(){return this.callerScope}child(){return new Qe(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(t){if(t>=this.slots.length)throw new RangeError(`BUG: cannot get $${t} from scope; length=${this.slots.length}`)
return this.slots[t]}set(t,e){if(t>=this.slots.length)throw new RangeError(`BUG: cannot get $${t} from scope; length=${this.slots.length}`)
this.slots[t]=e}}class ts{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(t,e){this.createdComponents.push(t),this.createdManagers.push(e)}didUpdate(t,e){this.updatedComponents.push(t),this.updatedManagers.push(e)}scheduleInstallModifier(t,e){this.scheduledInstallManagers.push(e),this.scheduledInstallModifiers.push(t)}scheduleUpdateModifier(t,e){this.scheduledUpdateModifierManagers.push(e),this.scheduledUpdateModifiers.push(t)}didDestroy(t){this.destructors.push(t)}commit(){let t=this.createdComponents,e=this.createdManagers
for(let h=0;h<t.length;h++){let s=t[h]
e[h].didCreate(s)}let s=this.updatedComponents,i=this.updatedManagers
for(let h=0;h<s.length;h++){let t=s[h]
i[h].didUpdate(t)}let n=this.destructors
for(let h=0;h<n.length;h++)n[h].destroy()
let r=this.scheduledInstallManagers,a=this.scheduledInstallModifiers
for(let h=0;h<r.length;h++){let t=r[h],e=a[h]
t.install(e)}let l=this.scheduledUpdateModifierManagers,o=this.scheduledUpdateModifiers
for(let h=0;h<l.length;h++){let t=l[h],e=o[h]
t.update(e)}}}class es{constructor({appendOperations:t,updateOperations:e}){this._transaction=null,this.appendOperations=t,this.updateOperations=e}toConditionalReference(t){return new dt(t)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}getIdentity(t){return function(t){return t._guid||r(t)}(t)+""}begin(){this._transaction=new ts}get transaction(){return this._transaction}didCreate(t,e){this.transaction.didCreate(t,e)}didUpdate(t,e){this.transaction.didUpdate(t,e)}scheduleInstallModifier(t,e){this.transaction.scheduleInstallModifier(t,e)}scheduleUpdateModifier(t,e){this.transaction.scheduleUpdateModifier(t,e)}didDestroy(t){this.transaction.didDestroy(t)}commit(){let t=this.transaction
this._transaction=null,t.commit()}attributeFor(t,e,s,i=null){return Ue(t,e)}}class ss{constructor(t,e,s,i,n=-1,r=-1){this.stack=t,this.heap=e,this.program=s,this.externs=i,this.pc=n,this.ra=r,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}goto(t){let e=this.pc+t-this.currentOpSize
this.pc=e}call(t){this.ra=this.pc,this.pc=this.heap.getaddr(t)}returnTo(t){let e=this.pc+t-this.currentOpSize
this.ra=e}return(){this.pc=this.ra}nextStatement(){let t=this.pc,e=this.program
if(-1===t)return null
let s=this.program.opcode(t).size,i=this.currentOpSize=s
return this.pc+=i,e.opcode(t)}evaluateOuter(t,e){this.evaluateInner(t,e)}evaluateInner(t,e){t.isMachine?this.evaluateMachine(t):this.evaluateSyscall(t,e)}evaluateMachine(t){switch(t.type){case 47:return this.pushFrame()
case 48:return this.popFrame()
case 42:return this.call(t.op1)
case 41:return this.call(this.stack.popSmi())
case 44:return this.goto(t.op1)
case 20:return this.return()
case 21:return this.returnTo(t.op1)}}evaluateSyscall(t,e){st.evaluate(e,t,t.type)}}class is{constructor(t){this.trusting=t}retry(t,e){let s=this.bounds,i=s.parentElement(),n=ye(s),r=cs.forInitialRender(t,{element:i,nextSibling:n})
return this.trusting?r.__appendTrustingDynamicContent(e):r.__appendCautiousDynamicContent(e)}}class ns{constructor(t){this.inner=t,this.bounds=t.bounds}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}update(t,e){let s=this.inner=this.inner.update(t,e)
return this.bounds=s.bounds,this}}class rs extends is{constructor(t,e,s){super(s),this.bounds=t,this.lastValue=e}update(t,e){let s,i=this.lastValue
if(e===i)return this
if(re(e)||ne(e))return this.retry(t,e)
if((s=ie(e)?"":le(e)?e:String(e))!==i){this.bounds.firstNode().nodeValue=this.lastValue=s}return this}}class as extends is{constructor(t,e,s){super(s),this.bounds=t,this.lastValue=e}update(t,e){return e===this.lastValue?this:this.retry(t,e)}}class ls extends is{constructor(t,e,s){super(s),this.bounds=t,this.lastValue=e}update(t,e){let s=this.lastValue
return e===s?this:ne(e)&&e.toHTML()===s.toHTML()?(this.lastValue=e,this):this.retry(t,e)}}class os extends is{constructor(t,e,s){super(s),this.bounds=t,this.lastValue=e}update(t,e){let s=this.lastValue
return e===s?this:function(t){return ie(t)?"":le(t)?t:ne(t)?t.toHTML():re(t)?t:String(t)}(e)===s?this:this.retry(t,e)}}class hs{constructor(t){this.node=t}firstNode(){return this.node}}class us{constructor(t){this.node=t}lastNode(){return this.node}}class cs{constructor(t,e,s){this.constructing=null,this.operations=null,this.cursorStack=new l,this.blockStack=new l,this.pushElement(e,s),this.env=t,this.dom=t.getAppendOperations(),this.updateOperations=t.getDOM()}static forInitialRender(t,e){let s=new this(t,e.element,e.nextSibling)
return s.pushSimpleBlock(),s}static resume(t,e,s){let i=new this(t,e.parentElement(),s)
return i.pushSimpleBlock(),i.pushBlockTracker(e),i}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(t){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new ps(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new ms(this.element))}pushBlockList(t){return this.pushBlockTracker(new gs(this.element,t))}pushBlockTracker(t,e=!1){let s=this.blockStack.current
return null!==s&&(s.newDestroyable(t),e||s.didAppendBounds(t)),this.__openBlock(),this.blockStack.push(t),t}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(t){let e=this.__openElement(t)
return this.constructing=e,e}__openElement(t){return this.dom.createElement(t,this.element)}flushElement(){let t=this.element,e=this.constructing
this.__flushElement(t,e),this.constructing=null,this.operations=null,this.pushElement(e,null),this.didOpenElement(e)}__flushElement(t,e){this.dom.insertBefore(t,e,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(t,e,s=null){this.__pushRemoteElement(t,e,s)}__pushRemoteElement(t,e,s){this.pushElement(t,s)
let i=new ds(t)
this.pushBlockTracker(i,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(t,e){this.cursorStack.push(new de(t,e))}didAddDestroyable(t){this.block().newDestroyable(t)}didAppendBounds(t){return this.block().didAppendBounds(t),t}didAppendNode(t){return this.block().didAppendNode(t),t}didOpenElement(t){return this.block().openElement(t),t}willCloseElement(){this.block().closeElement()}appendText(t){return this.didAppendNode(this.__appendText(t))}__appendText(t){let e=this.dom,s=this.element,i=this.nextSibling,n=e.createTextNode(t)
return e.insertBefore(s,n,i),n}__appendNode(t){return this.dom.insertBefore(this.element,t,this.nextSibling),t}__appendFragment(t){let e=t.firstChild
if(e){let s=function(t,e,s){return new me(t,e,s)}(this.element,e,t.lastChild)
return this.dom.insertBefore(this.element,t,this.nextSibling),s}return fe(this.element,this.__appendComment(""))}__appendHTML(t){return this.dom.insertHTMLBefore(this.element,this.nextSibling,t)}appendTrustingDynamicContent(t){let e=new ns(this.__appendTrustingDynamicContent(t))
return this.didAppendBounds(e),e}__appendTrustingDynamicContent(t){if(le(t))return this.trustedContent(t)
if(ie(t))return this.trustedContent("")
if(ne(t))return this.trustedContent(t.toHTML())
if(ae(t)){let e=this.__appendFragment(t)
return new as(e,t,!0)}if(re(t)){let e=this.__appendNode(t)
return new as(fe(this.element,e),e,!0)}return this.trustedContent(String(t))}appendCautiousDynamicContent(t){let e=new ns(this.__appendCautiousDynamicContent(t))
return this.didAppendBounds(e.bounds),e}__appendCautiousDynamicContent(t){if(le(t))return this.untrustedContent(t)
if(ie(t))return this.untrustedContent("")
if(ae(t)){let e=this.__appendFragment(t)
return new as(e,t,!1)}if(re(t)){let e=this.__appendNode(t)
return new as(fe(this.element,e),e,!1)}if(ne(t)){let e=t.toHTML(),s=this.__appendHTML(e)
return new ls(s,t,!1)}return this.untrustedContent(String(t))}trustedContent(t){let e=this.__appendHTML(t)
return new os(e,t,!0)}untrustedContent(t){let e=this.__appendText(t),s=fe(this.element,e)
return new rs(s,t,!1)}appendComment(t){return this.didAppendNode(this.__appendComment(t))}__appendComment(t){let e=this.dom,s=this.element,i=this.nextSibling,n=e.createComment(t)
return e.insertBefore(s,n,i),n}__setAttribute(t,e,s){this.dom.setAttribute(this.constructing,t,e,s)}__setProperty(t,e){this.constructing[t]=e}setStaticAttribute(t,e,s){this.__setAttribute(t,e,s)}setDynamicAttribute(t,e,s,i){let n=this.constructing,r=new(this.env.attributeFor(n,t,s,i))({element:n,name:t,namespace:i||null})
return r.set(this,e,this.env),r}}class ps{constructor(t){this.parent=t,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let t=this.destroyables
if(t&&t.length)for(let e=0;e<t.length;e++)t[e].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(t){this.didAppendNode(t),this.nesting++}closeElement(){this.nesting--}didAppendNode(t){0===this.nesting&&(this.first||(this.first=new hs(t)),this.last=new us(t))}didAppendBounds(t){0===this.nesting&&(this.first||(this.first=t),this.last=t)}newDestroyable(t){this.destroyables=this.destroyables||[],this.destroyables.push(t)}finalize(t){this.first||t.appendComment("")}}class ds extends ps{destroy(){super.destroy(),ye(this)}}class ms extends ps{reset(t){let e=this.destroyables
if(e&&e.length)for(let i=0;i<e.length;i++)t.didDestroy(e[i])
let s=ye(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,s}}class gs{constructor(t,e){this.parent=t,this.boundList=e,this.parent=t,this.boundList=e}destroy(){this.boundList.forEachNode(t=>t.destroy())}parentElement(){return this.parent}firstNode(){let t=this.boundList.head()
return t&&t.firstNode()}lastNode(){let t=this.boundList.tail()
return t&&t.lastNode()}openElement(t){}closeElement(){}didAppendNode(t){}didAppendBounds(t){}newDestroyable(t){}finalize(t){}}class fs{constructor(t=[]){this.vec=t}clone(){return new fs(this.vec.slice())}sliceFrom(t){return new fs(this.vec.slice(t))}slice(t,e){return new fs(this.vec.slice(t,e))}copy(t,e){this.vec[e]=this.vec[t]}writeRaw(t,e){this.vec[t]=e}writeSmi(t,e){var s
this.vec[t]=(s=e)<0?Math.abs(s)<<3|4:s<<3|0}getRaw(t){return this.vec[t]}getSmi(t){return function(t){switch(7&t){case 0:return t>>3
case 4:return-(t>>3)
default:throw new Error("unreachable")}}(this.vec[t])}reset(){this.vec.length=0}len(){return this.vec.length}}const bs=2147483648,ys=2147483647
class vs{constructor(t=new fs,e=[]){this.inner=t,this.js=e}slice(t,e){let s
return s="number"==typeof t&&"number"==typeof e?this.inner.slice(t,e):"number"==typeof t&&void 0===e?this.inner.sliceFrom(t):this.inner.clone(),new vs(s,this.js.slice(t,e))}sliceInner(t,e){let s=[]
for(let i=t;i<e;i++)s.push(this.get(i))
return s}copy(t,e){this.inner.copy(t,e)}write(t,e){if(function(t){let e=typeof t
if(null===t||void 0===t)return!0
switch(e){case"boolean":case"undefined":return!0
case"number":if(t%1!=0)return!1
let s=Math.abs(t)
return!(s&bs)
default:return!1}}(e))this.inner.writeRaw(t,Ss(e))
else{let s=this.js.length
this.js.push(e),this.inner.writeRaw(t,s|bs)}}writeSmi(t,e){this.inner.writeSmi(t,e)}writeImmediate(t,e){this.inner.writeRaw(t,e)}get(e){let s=this.inner.getRaw(e)
return s&bs?this.js[s&ys]:function(e){switch(e){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw t()}}(e)}}(s)}getSmi(t){return this.inner.getSmi(t)}reset(){this.inner.reset()}get length(){return this.inner.len()}}class ks{constructor(t,e,s){this.stack=t,this.fp=e,this.sp=s}static empty(){return new this(new vs,0,-1)}static restore(t){let e=new vs
for(let s=0;s<t.length;s++)e.write(s,t[s])
return new this(e,0,t.length-1)}push(t){this.stack.write(++this.sp,t)}pushSmi(t){this.stack.writeSmi(++this.sp,t)}pushImmediate(t){this.stack.writeImmediate(++this.sp,Ss(t))}pushEncodedImmediate(t){this.stack.writeImmediate(++this.sp,t)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(t=this.sp){this.stack.copy(t,++this.sp)}copy(t,e){this.stack.copy(t,e)}pop(t=1){let e=this.stack.get(this.sp)
return this.sp-=t,e}popSmi(){return this.stack.getSmi(this.sp--)}peek(t=0){return this.stack.get(this.sp-t)}peekSmi(t=0){return this.stack.getSmi(this.sp-t)}get(t,e=this.fp){return this.stack.get(e+t)}getSmi(t,e=this.fp){return this.stack.getSmi(e+t)}set(t,e,s=this.fp){this.stack.write(s+e,t)}slice(t,e){return this.stack.slice(t,e)}sliceArray(t,e){return this.stack.sliceInner(t,e)}capture(t){let e=this.sp+1,s=e-t
return this.stack.sliceInner(s,e)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function Ss(e){switch(typeof e){case"number":return function(t){return t<0?Math.abs(t)<<3|4:t<<3|0}(e)
case"boolean":return e?11:3
case"object":return 19
case"undefined":return 27
default:throw t()}}class ws{constructor(t,e,{alwaysRevalidate:s=!1}){this.frameStack=new l,this.env=t,this.constants=e.constants,this.dom=t.getDOM(),this.alwaysRevalidate=s}execute(t,e){let s=this.frameStack
for(this.try(t,e);!s.isEmpty();){let t=this.frame.nextStatement()
null!==t?t.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(t){this.frame.goto(t)}try(t,e){this.frameStack.push(new As(t,e))}throw(){this.frame.handleException(),this.frameStack.pop()}}class _s extends nt{constructor(t,e,s,i){super(),this.start=t,this.state=e,this.type="block",this.next=null,this.prev=null,this.children=i,this.bounds=s}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(t){t.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.state.env.didDestroy(this.bounds)}}class Es extends _s{constructor(t,e,s,i){super(t,e,s,i),this.type="try",this.tag=this._tag=D.create(y)}didInitializeChildren(){this._tag.inner.update(C(this.children))}evaluate(t){t.try(this.children,this)}handleException(){let t=this.state,e=this.bounds,s=this.children,i=this.start,n=this.prev,r=this.next
s.clear()
let a=cs.resume(t.env,e,e.reset(t.env)),l=Os.resume(t,a),o=new h
l.execute(i,e=>{e.stack=ks.restore(t.stack),e.updatingOpcodeStack.push(o),e.updateWith(this),e.updatingOpcodeStack.push(s)}),this.prev=n,this.next=r}}class Cs{constructor(t,e){this.opcode=t,this.marker=e,this.didInsert=!1,this.didDelete=!1,this.map=t.map,this.updating=t.children}insert(t,e,s,i){let n=this.map,r=this.opcode,a=this.updating,l=null,o=null
l=i?(o=n[i]).bounds.firstNode():this.marker
let u=r.vmForInsertion(l),c=null,p=r.start
u.execute(p,i=>{n[t]=c=i.iterate(s,e),i.updatingOpcodeStack.push(new h),i.updateWith(c),i.updatingOpcodeStack.push(c.children)}),a.insertBefore(c,o),this.didInsert=!0}retain(t,e,s){}move(t,e,s,i){let n=this.map,r=this.updating,a=n[t],l=n[i]||null
be(a,i?l.firstNode():this.marker),r.remove(a),r.insertBefore(a,l)}delete(t){let e=this.map,s=e[t]
s.didDestroy(),ye(s),this.updating.remove(s),delete e[t],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class xs extends _s{constructor(t,e,s,i,n){super(t,e,s,i),this.type="list-block",this.map=a(),this.lastIterated=p,this.artifacts=n
let r=this._tag=D.create(y)
this.tag=x([n.tag,r])}didInitializeChildren(t=!0){this.lastIterated=this.artifacts.tag.value(),t&&this._tag.inner.update(C(this.children))}evaluate(t){let e=this.artifacts,s=this.lastIterated
if(!e.tag.validate(s)){let s=this.bounds,i=t.dom,n=i.createComment("")
i.insertAfter(s.parentElement(),n,s.lastNode())
let r=new Cs(this,n)
new j({target:r,artifacts:e}).sync(),this.parentElement().removeChild(n)}super.evaluate(t)}vmForInsertion(t){let e=this.bounds,s=this.state,i=cs.forInitialRender(s.env,{element:e.parentElement(),nextSibling:t})
return Os.resume(s,i)}}class As{constructor(t,e){this.ops=t,this.exceptionHandler=e,this.current=t.head()}goto(t){this.current=t}nextStatement(){let t=this.current,e=this.ops
return t&&(this.current=e.nextNode(t)),t}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class Ns{constructor(t,e,s,i){this.env=t,this.program=e,this.updating=s,this.bounds=i}rerender({alwaysRevalidate:t=!1}={alwaysRevalidate:!1}){let e=this.env,s=this.program,i=this.updating
new ws(e,s,{alwaysRevalidate:t}).execute(i,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),ye(this.bounds)}}class Os{constructor(t,e,s,i,n){this.program=t,this.env=e,this.elementStack=n,this.dynamicScopeStack=new l,this.scopeStack=new l,this.updatingOpcodeStack=new l,this.cacheGroups=new l,this.listBlockStack=new l,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.env=e,this.heap=t.heap,this.constants=t.constants,this.elementStack=n,this.scopeStack.push(s),this.dynamicScopeStack.push(i),this.inner=new ss(ks.empty(),this.heap,t,{debugBefore:t=>st.debugBefore(this,t,t.type),debugAfter:(t,e)=>{st.debugAfter(this,t,t.type,e)}})}get stack(){return this.inner.stack}set stack(t){this.inner.stack=t}set currentOpSize(t){this.inner.currentOpSize=t}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(t){this.inner.pc=t}get ra(){return this.inner.ra}set ra(t){this.inner.ra=t}get fp(){return this.stack.fp}set fp(t){this.stack.fp=t}get sp(){return this.stack.sp}set sp(t){this.stack.sp=t}fetch(t){this.stack.push(this[rt[t]])}load(t){this[rt[t]]=this.stack.pop()}fetchValue(t){return this[rt[t]]}loadValue(t,e){this[rt[t]]=e}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(t){this.inner.goto(t)}call(t){this.inner.call(t)}returnTo(t){this.inner.returnTo(t)}return(){this.inner.return()}static initial(t,e,s,i,n,r,a){let l=t.heap.scopesizeof(a),o=Qe.root(s,l),u=new Os(t,e,o,n,r)
return u.pc=u.heap.getaddr(a),u.updatingOpcodeStack.push(new h),u}static empty(t,e,s){let i={get:()=>ht,set:()=>ht,child:()=>i},n=new Os(t,e,Qe.root(ht,0),i,s)
return n.updatingOpcodeStack.push(new h),n}static resume({program:t,env:e,scope:s,dynamicScope:i},n){return new Os(t,e,s,i,n)}capture(t){return{env:this.env,program:this.program,dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(t)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let t=new Qt("END"),e=this.updating(),s=this.cacheGroups.pop(),i=s?e.nextNode(s):e.head(),n=e.tail(),r=C(new u(i,n)),a=new qt(r,t)
e.insertBefore(a,i),e.append(new Zt(a)),e.append(t)}enter(t){let e=new h,s=this.capture(t),i=this.elements().pushUpdatableBlock(),n=new Es(this.heap.gethandle(this.pc),s,i,e)
this.didEnter(n)}iterate(t,e){let s=this.stack
s.push(e),s.push(t)
let i=this.capture(2),n=this.elements().pushUpdatableBlock()
return new Es(this.heap.gethandle(this.pc),i,n,new h)}enterItem(t,e){this.listBlock().map[t]=e,this.didEnter(e)}enterList(t){let e=new h,s=this.capture(0),i=this.elements().pushBlockList(e),n=this.stack.peek().artifacts,r=this.pc+t-this.currentOpSize,a=this.heap.gethandle(r),l=new xs(a,s,i,e,n)
this.listBlockStack.push(l),this.didEnter(l)}didEnter(t){this.updateWith(t),this.updatingOpcodeStack.push(t.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(t){this.updating().append(t)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let t=this.dynamicScope().child()
return this.dynamicScopeStack.push(t),t}pushRootScope(t,e){let s=Qe.sized(t)
return e&&s.bindCallerScope(this.scope()),this.scopeStack.push(s),s}pushScope(t){this.scopeStack.push(t)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(t){this.elements().didAddDestroyable(t)}getSelf(){return this.scope().getSelf()}referenceForSymbol(t){return this.scope().getSymbol(t)}execute(t,e){let s
for(this.pc=this.heap.getaddr(t),e&&e(this);!(s=this.next()).done;);return s.value}next(){let t,e=this.env,s=this.program,i=this.updatingOpcodeStack,n=this.elementStack,r=this.inner.nextStatement()
return null!==r?(this.inner.evaluateOuter(r,this),t={done:!1,value:null}):(this.stack.reset(),t={done:!0,value:new Ns(e,s,i.pop(),n.popBlock())}),t}bindDynamicScope(t){let e=this.dynamicScope()
for(let s=t.length-1;s>=0;s--){let i=this.constants.getString(t[s])
e.set(i,this.stack.pop())}}}class Ts{constructor(t){this.vm=t}next(){return this.vm.next()}}let Ds=0
class Ls{constructor(t,e){this.options=t,this.parsedLayout=e,this.layout=null,this.partial=null
let s=e.block
this.symbols=s.symbols,this.hasEval=s.hasEval,this.statements=s.statements,this.referrer=e.referrer,this.id=e.id||`client-${Ds++}`}renderLayout(t){let e=t.env,s=t.self,i=t.dynamicScope
var n=t.args
let r=void 0===n?Yt:n,a=t.builder,l=this.asLayout().compile(),o=Os.initial(this.options.program,e,s,r,i,a,l)
return new Ts(o)}asLayout(){return this.layout?this.layout:this.layout=Bs(this.parsedLayout,this.options,!1)}asPartial(){return this.partial?this.partial:this.partial=Bs(this.parsedLayout,this.options,!0)}}function Bs(t,e,s){let n=t.block,r=t.referrer,a=n.hasEval,l=n.symbols,o=i({},e,{asPartial:s,referrer:r})
return new Tt(n.statements,t,o,{referrer:r,hasEval:a,symbols:l})}class Ms{get(t){return Fs.create(this,t)}}class Rs extends Ms{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let t=this.tag,e=this._lastRevision,s=this._lastValue
return e&&t.validate(e)||(s=this._lastValue=this.compute(),this._lastRevision=t.value()),s}}class Is extends R{constructor(){super(...arguments),this.children=a()}get(t){let e=this.children[t]
return e||(e=this.children[t]=new Ps(this.inner,t)),e}}class Fs extends Rs{static create(t,e){return k(t)?new Ps(t.value(),e):new js(t,e)}get(t){return new js(this,t)}}class Ps extends Fs{constructor(t,e){super(),this._parentValue=t,this._propertyKey=e,this.tag=G(t,e)}compute(){return this._parentValue[this._propertyKey]}}class js extends Fs{constructor(t,e){super()
let s=t.tag,i=D.create(y)
this._parentReference=t,this._parentObjectTag=i,this._propertyKey=e,this.tag=x([s,i])}compute(){let t=this._parentReference,e=this._parentObjectTag,s=this._propertyKey,i=t.value()
return e.inner.update(G(i,s)),"string"==typeof i&&"length"===s?i.length:"object"==typeof i&&i?i[s]:void 0}}class Vs extends Ms{constructor(t){super(),this.tag=_.create(),this._value=t}value(){return this._value}update(t){t!==this._value&&(this.tag.inner.dirty(),this._value=t)}}class zs{constructor(t,e,s){let i=t.ComponentClass,n=t.name
this.args=e
let r={debugName:n,args:this.namedArgsSnapshot()}
tt(r,s),i&&(this.component=i.create(r))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const Hs=new Is(null)
class Us{static create(t){return new Us(t)}constructor(t){this.env=t.env}prepareArgs(t,e){return null}getCapabilities(t){return t.capabilities}getLayout({name:t,handle:e,symbolTable:s},i){return e&&s?{handle:e,symbolTable:s}:i.compileTemplate(t,e)}create(t,e,s,i,n,r){if(e.ComponentClass){let t=Q(this.env)
return new zs(e,s.capture(),t)}}getSelf(t){return t?new Is(t.component):Hs}didCreateElement(t,e){}didRenderLayout(t,e){t&&(t.component.bounds=new et(e))}didCreate(t){t&&t.component.didInsertElement()}getTag(t){return t?t.tag:y}update(t,e){t&&(t.component.args=t.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(t){t&&t.component.didUpdate()}getDestructor(t){return t?t.component:$s}}const $s={destroy(){}}
class Ys{constructor(t,e){this._registry=t,this._resolver=e}register(t,e,s){let i=this._toAbsoluteSpecifier(t)
this._registry.register(i,e,s)}registration(t){let e=this._toAbsoluteSpecifier(t)
return this._registry.registration(e)}unregister(t){let e=this._toAbsoluteSpecifier(t)
this._registry.unregister(e)}registerOption(t,e,s){let i=this._toAbsoluteOrTypeSpecifier(t)
this._registry.registerOption(i,e,s)}registeredOption(t,e){let s=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredOption(s,e)}registeredOptions(t){let e=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredOptions(e)}unregisterOption(t,e){let s=this._toAbsoluteOrTypeSpecifier(t)
this._registry.unregisterOption(s,e)}registerInjection(t,e,s){let i=this._toAbsoluteOrTypeSpecifier(t),n=this._toAbsoluteSpecifier(s)
this._registry.registerInjection(i,e,n)}registeredInjections(t){let e=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredInjections(e)}_toAbsoluteSpecifier(t,e){return this._resolver.identify(t,e)}_toAbsoluteOrTypeSpecifier(t){return function(t){return-1===t.indexOf(":")}(t)?t:this._toAbsoluteSpecifier(t)}}class Gs{constructor(t=null){this.bucket=t?i({},t):{}}get(t){return this.bucket[t]}set(t,e){return this.bucket[t]=e}child(){return new Gs(this.bucket)}}class Ws{constructor(t,e){this.position=0,this.array=t,this.keyFor=e}isEmpty(){return 0===this.array.length}next(){let t=this.position,e=this.array,s=this.keyFor
if(t>=e.length)return null
let i=e[t],n=s(i,t),r=t
return this.position++,{key:n,value:i,memo:r}}}class Xs{constructor(t,e,s){this.position=0,this.keys=t,this.values=e,this.keyFor=s}isEmpty(){return 0===this.keys.length}next(){let t=this.position,e=this.keys,s=this.values,i=this.keyFor
if(t>=e.length)return null
let n=s[t],r=e[t],a=i(n,r)
return this.position++,{key:a,value:n,memo:r}}}const Ks=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class Js{constructor(t,e){this.tag=t.tag,this.ref=t,this.keyFor=e}iterate(){let t=this.ref,e=this.keyFor,s=t.value()
if(Array.isArray(s))return s.length>0?new Ws(s,e):Ks
if(void 0===s||null===s)return Ks
if(void 0!==s.forEach){let t=[]
return s.forEach(function(e){t.push(e)}),t.length>0?new Ws(t,e):Ks}if("object"==typeof s){let t=Object.keys(s)
return t.length>0?new Xs(t,t.map(t=>s[t]),e):Ks}throw new Error(`Don't know how to {{#each ${s}}}`)}valueReferenceFor(t){return new Vs(t.value)}updateValueReference(t,e){t.update(e.value)}memoReferenceFor(t){return new Vs(t.memo)}updateMemoReference(t,e){t.update(e.memo)}}class qs extends es{static create(t={}){return t.document=t.document||self.document,t.appendOperations=t.appendOperations||new Te(t.document),new qs(t)}constructor(t){super({appendOperations:t.appendOperations,updateOperations:new Oe(t.document||document)}),tt(this,Q(t)),this.uselessAnchor=t.document.createElement("a")}protocolForURL(t){return this.uselessAnchor.href=t,this.uselessAnchor.protocol}iterableFor(t,e){let s
if(!e)throw new Error("Must specify a key for #each")
switch(e){case"@index":s=((t,e)=>String(e))
break
case"@primitive":s=(t=>String(t))
break
default:s=(t=>t[e])}return new Js(t,s)}}const Zs="object"==typeof document?document:null
class Qs{constructor(t){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=t.rootName,this.resolver=t.resolver,e(t.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),e(t.renderer,"Must provide a Renderer to render the templates produced by the Loader."),e(t.builder,"Must provide a Builder that is responsible to building DOM."),this.document=t.document||Zs,this.loader=t.loader,this.renderer=t.renderer,this.builder=t.builder}renderComponent(t,e,s=null){let i=this._roots,n=this._self
i.push({id:this._rootsIndex++,component:t,parent:e,nextSibling:s}),n&&(n.update({roots:i}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(()=>{this._scheduled=!1,this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(t){this._initializers.push(t)}initRegistry(){let t=this._registry=new q,e=new Ys(this._registry,this.resolver)
t.register(`environment:/${this.rootName}/main/main`,qs),t.registerOption("helper","instantiate",!1),t.registerOption("template","instantiate",!1),t.register(`document:/${this.rootName}/main/main`,this.document),t.registerOption("document","instantiate",!1),t.registerInjection("environment","document",`document:/${this.rootName}/main/main`),t.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let s=this._initializers
for(let i=0;i<s.length;i++)s[i].initialize(e)
this._initialized=!0}initContainer(){this._container=new J(this._registry,this.resolver),this._container.defaultInjections=(t=>{let e={}
return tt(e,this),e})}async _render(){let t=this.env,e=this._self=new Vs({roots:this._roots}),s=new Gs,i=this.builder.getBuilder(t),n=await this.loader.getTemplateIterator(this,t,i,s,e)
try{t.begin(),await this.renderer.render(n),t.commit(),this._didRender()}catch(t){throw this._didError(t),t}}async _rerender(){let t=this.env
try{t.begin(),await this.renderer.rerender(),t.commit(),this._didRender()}catch(t){throw this._didError(t),t}}_didRender(){this._rendered=!0
let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[0]())}_didError(t){let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[1](t))}identify(t,e){return this.resolver.identify(t,e)}factoryFor(t,e){return this._container.factoryFor(this.identify(t,e))}lookup(t,e){return this._container.lookup(this.identify(t,e))}}class ti{constructor(){this.byName=a(),this.byHandle=a()}hasName(t){return t in this.byName}getHandle(t){return this.byName[t]}hasHandle(t){return t in this.byHandle}getByHandle(t){return this.byHandle[t]}register(t,e,s){this.byHandle[t]=s,this.byName[e]=t}}class ei{constructor(t,e){this.helper=t,this.tag=e.tag,this.args=e.capture()}value(){let t=this.helper,e=this.args
return t(e.positional.value(),e.named.value())}get(){return new Is(this)}}class si{constructor(t){this.owner=t,this.handleLookup=[],this.cache={component:new ti,template:new ti,compiledTemplate:new ti,helper:new ti,manager:new ti,modifier:new ti}}setCompileOptions(t){this.templateOptions=t}lookup(t,e,s){return this.cache[t].hasName(e)?this.cache[t].getHandle(e):null}register(t,e,s){let i=this.cache[t],n=this.handleLookup.length
return this.handleLookup.push(i),this.cache[t].register(n,e,s),n}lookupModifier(t,e){let s=this.lookup("modifier",t)
if(null===s)throw new Error(`Modifier for ${t} not found.`)
return s}compileTemplate(t,e){if(!this.cache.compiledTemplate.hasName(t)){let s=this.resolve(e),i=s.block,n=s.meta,r=s.id,a=JSON.parse(i),l=new Ls(this.templateOptions,{id:r,block:a,referrer:n}).asLayout(),o={handle:l.compile(),symbolTable:l.symbolTable}
return this.register("compiledTemplate",t,o),o}let s=this.lookup("compiledTemplate",t)
return this.resolve(s)}registerHelper(t,e){return this.register("helper",t,(t,s)=>new ei(e,s))}registerInternalHelper(t,e){this.register("helper",t,e)}registerComponent(t,e,s,i){let n=this.registerTemplate(e,i),r=this.managerFor(n.meta.managerId),a=new K(t,r,s,n.handle)
return this.register("component",t,a)}lookupComponentHandle(t,e){return this.cache.component.hasName(t)||this.lookupComponent(t,e),this.lookup("component",t,e)}managerFor(t="main"){let e
if(this.cache.manager.hasName(t)){let e=this.cache.manager.getHandle(t)
return this.cache.manager.getByHandle(e)}{let s=this.owner.rootName
if(!(e=this.owner.lookup(`component-manager:/${s}/component-managers/${t}`)))throw new Error(`No component manager found for ID ${t}.`)
return this.register("manager",t,e),e}}registerTemplate(t,e){return{name:t,handle:this.register("template",t,e),meta:e.meta}}lookupComponent(t,e){let s
if(this.cache.component.hasName(t))s=this.lookup("component",t,e)
else{let i=function(t,e){if(null===t||void 0===t)throw new Error(e)
return t}(this.identifyComponent(t,e),`Could not find the component '${t}'`),n=this.owner.lookup("template",i),r=this.owner.identify("component",i),a=null
void 0!==r&&(a=this.owner.factoryFor(r)),s=this.registerComponent(t,i,a,n)}return this.resolve(s)}lookupHelper(t,e){if(!this.cache.helper.hasName(t)){let s=this.owner,i=`helper:${t}`,n=e.specifier,r=s.identify(i,n)
if(void 0===r)return null
let a=this.owner.lookup(r,e.specifier)
return this.registerHelper(t,a)}return this.lookup("helper",t,e)}lookupPartial(t,e){throw new Error("Partials are not available in Glimmer applications.")}resolve(t){return this.handleLookup[t].getByHandle(t)}identifyComponent(t,e){let s=this.owner,i=`template:${t}`,n=e.specifier,r=s.identify(i,n)
if(void 0===r&&s.identify(`component:${t}`,n))throw new Error(`The component '${t}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return r}}const ii={},ni=0,ri=Object.freeze([])
class ai{constructor(){this.strings=[],this.arrays=[ri],this.tables=[],this.handles=[],this.resolved=[],this.floats=[],this.negatives=[]}float(t){let e=this.floats.indexOf(t)
return e>-1?e:this.floats.push(t)-1}negative(t){return this.negatives.push(t)-1}string(t){let e=this.strings.indexOf(t)
return e>-1?e:this.strings.push(t)-1}stringArray(t){let e=new Array(t.length)
for(let s=0;s<t.length;s++)e[s]=this.string(t[s])
return this.array(e)}array(t){if(0===t.length)return ni
let e=this.arrays.indexOf(t)
return e>-1?e:this.arrays.push(t)-1}handle(t){let e=this.handles.indexOf(t)
return e>-1?e:(this.resolved.push(ii),this.handles.push(t)-1)}serializable(t){let e=JSON.stringify(t),s=this.strings.indexOf(e)
return s>-1?s:this.strings.push(e)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,floats:this.floats,negatives:this.negatives}}}class li extends ai{constructor(t,e){super(),this.resolver=t,e&&(this.strings=e.strings,this.arrays=e.arrays,this.handles=e.handles,this.floats=e.floats,this.negatives=e.negatives,this.resolved=this.handles.map(()=>ii))}getFloat(t){return this.floats[t]}getNegative(t){return this.negatives[t]}getString(t){return this.strings[t]}getStringArray(t){let e=this.getArray(t),s=new Array(e.length)
for(let i=0;i<e.length;i++){let t=e[i]
s[i]=this.getString(t)}return s}getArray(t){return this.arrays[t]}resolveHandle(t){let e=this.resolved[t]
if(e===ii){let s=this.handles[t]
e=this.resolved[t]=this.resolver.resolve(s)}return e}getSerializable(t){return JSON.parse(this.strings[t])}}class oi extends li{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(t){let e=this.serializables.indexOf(t)
return e>-1?e:this.serializables.push(t)-1}getSerializable(t){return this.serializables[t]}getOther(t){return this.others[t-1]}other(t){return this.others.push(t)}}class hi{constructor(t){this.heap=t,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function ui(t,e,s){return t|e<<16|s<<30}function ci(t,e){return t|e<<30}class pi{constructor(t){if(this.placeholders=[],this.offset=0,this.handle=0,t){let e=t.buffer,s=t.table,i=t.handle
this.heap=new Uint16Array(e),this.table=s,this.offset=this.heap.length,this.handle=i}else this.heap=new Uint16Array(1048576),this.table=[]}push(t){this.heap[this.offset++]=t}getbyaddr(t){return this.heap[t]}setbyaddr(t,e){this.heap[t]=e}malloc(){this.table.push(this.offset,0)
let t=this.handle
return this.handle+=2,t}finishMalloc(t,e){let s=this.table[t],i=ui(this.offset-s,e,0)
this.table[t+1]=i}size(){return this.offset}getaddr(t){return this.table[t]}gethandle(t){this.table.push(t,ui(0,0,3))
let e=this.handle
return this.handle+=2,e}sizeof(t){return-1}scopesizeof(t){return(1073676288&this.table[t+1])>>16}free(t){let e=this.table[t+1]
this.table[t+1]=ci(e,1)}compact(){let t=0,e=this.table,s=this.table.length,i=this.heap
for(let n=0;n<s;n+=2){let s=e[n],r=e[n+1],a=65535&r,l=-1&r
if(2!==l)if(1===l)e[n+1]=ci(r,2),t+=a
else if(0===l){for(let e=s;e<=n+a;e++)i[e-t]=i[e]
e[n]=s-t}else 3===l&&(e[n]=s-t)}this.offset=this.offset-t}pushPlaceholder(t){let e=this.offset++
this.heap[e]=65535,this.placeholders.push([e,t])}patchPlaceholders(){let t=this.placeholders
for(let s=0;s<t.length;s++){var e=t[s]
let i=e[0],n=e[1]
this.setbyaddr(i,n())}}capture(){this.patchPlaceholders()
let t=function(t,e,s){if(t instanceof Uint16Array){if(void 0!==t.slice)return t.slice(e,s).buffer
let i=new Uint16Array(s)
for(;e<s;e++)i[e]=t[e]
return i.buffer}return null}(this.heap,0,this.offset)
return{handle:this.handle,table:this.table,buffer:t}}}class di{constructor(t=new ai,e=new pi){this.constants=t,this.heap=e,this._opcode=new hi(this.heap)}opcode(t){return this._opcode.offset=t,this._opcode}}class mi extends di{}var gi={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function fi(t,e){let s=t.getSelf(),i=e.capture(),n=i.positional.at(0).value()
return"function"!=typeof n&&function(t,e){let s=function(t){let e,s,i=""
if(null===t||void 0===t)return i
"parent"in t&&"property"in t?(e=t.parent.value(),s=t.property):"_parentValue"in t&&"_propertyKey"in t&&(e=t._parentValue,s=t._propertyKey)
void 0!==s&&(i+=`('${s}' on ${function(t){let e=typeof t
if(null===t||void 0===t)return e
if("number"===e||"boolean"===e)return t.toString()
if(t.debugName)return t.debugName
try{return JSON.stringify(t)}catch(t){}return t.toString()}(e)}) `)
return i}(e)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${s}was ${typeof t} instead of a function.`)}(n,i.positional.at(0)),new Vs(function(...t){let e=i.positional.value()
e.shift(),e.push(...t),n.apply(s&&s.value(),e)})}function bi(t){return t[0]?t[1]:t[2]}class yi{constructor(t){this.resolver=t}getComponentDefinition(t){let s=this.resolver.resolve(t)
return e(!!s,`Couldn't find a template for ${t}`),s}getCapabilities(t){let e=this.getComponentDefinition(t),s=e.manager,i=e.state
return s.getCapabilities(i)}getLayout(t){let e=this.getComponentDefinition(t),s=e.manager.getLayout(e,this.resolver)
return{compile:()=>s.handle,symbolTable:s.symbolTable}}lookupHelper(t,e){return this.resolver.lookupHelper(t,e)}lookupModifier(t,e){return this.resolver.lookupModifier(t,e)}lookupComponentDefinition(t,e){return this.resolver.lookupComponentHandle(t,e)}lookupPartial(t,e){return this.resolver.lookupPartial(t,e)}}class vi{constructor(t){this.resolver=t}async getTemplateIterator(t,e,s,n,r){let a=new si(t),l={program:new mi(new oi(a)),macros:new xt,resolver:new yi(a),Builder:It}
a.setCompileOptions(l),a.registerTemplate("main",gi),a.registerInternalHelper("action",fi),a.registerHelper("if",bi)
let o=function({id:t,meta:e,block:s}){let n,r=t||`client-${Ds++}`
return{id:r,meta:e,create:(t,a)=>{let l=a?i({},a,e):e
return n||(n=JSON.parse(s)),new Ls(t,{id:r,block:n,referrer:l})}}}(gi).create(l)
return Promise.resolve(o.renderLayout({env:e,builder:s,dynamicScope:n,self:r}))}}class ki{constructor({element:t,nextSibling:e=null}){this.cursor={element:t,nextSibling:e}}getBuilder(t){return function(t,e){return cs.forInitialRender(t,e)}(t,this.cursor)}}class Si{render(t){let e
do{e=t.next()}while(!e.done)
this.result=e.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function wi(t){return void 0!==t.rootName&&void 0!==t.collection&&void 0!==t.name&&void 0!==t.type}function _i(t){let e=t.type,s=function(t){let e=[]
t.rootName&&e.push(t.rootName)
t.collection&&e.push(t.collection)
t.namespace&&e.push(t.namespace)
t.name&&e.push(t.name)
if(e.length>0){let s=e.join("/")
return wi(t)&&(s="/"+s),s}}(t)
return s?e+":"+s:e}function Ei(t){let e={}
if(t.indexOf(":")>-1){var s=t.split(":")
let i,n=s[0],r=s[1]
e.type=n,0===r.indexOf("/")?(i=r.substr(1).split("/"),e.rootName=i.shift(),e.collection=i.shift()):i=r.split("/"),i.length>0&&(e.name=i.pop(),i.length>0&&(e.namespace=i.join("/")))}else e.type=t
return e}function Ci(t,e){if(!e)throw new Error("Assertion Failed: "+t)}class xi{constructor(t,e){this.config=t,this.registry=e}identify(t,e){if(function(t){var e=t.split(":")
let s=e[0],i=e[1]
return!!(s&&i&&0===i.indexOf("/")&&i.split("/").length>3)}(t))return t
let s,i=Ei(t)
if(e){let t=Ei(e)
if(wi(t)){Ci("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===i.rootName&&void 0===i.collection&&void 0===i.namespace),i.rootName=t.rootName,i.collection=t.collection
let e=this._definitiveCollection(i.type)
if(!i.name)return i.namespace=t.namespace,i.name=t.name,this._serializeAndVerify(i)
if(i.namespace=t.namespace?t.namespace+"/"+t.name:t.name,function(t){let e=t.namespace,s=t.collection,i=e.lastIndexOf("/-")
if(i>-1){i+=2
let t=e.indexOf("/",i)
s=e.slice(i,t>-1?t:void 0)}return s}(i)===e&&(s=this._serializeAndVerify(i)))return s
if(e&&(i.namespace+="/-"+e,s=this._serializeAndVerify(i)))return s
i.rootName=i.collection=i.namespace=void 0}else Ci('Referrer must either be "absolute" or include a `type` to determine the associated type',t.type),i.collection=this._definitiveCollection(t.type),i.namespace||(i.namespace=t.rootName),Ci(`'${t.type}' does not have a definitive collection`,i.collection)}if(i.collection||(i.collection=this._definitiveCollection(i.type),Ci(`'${i.type}' does not have a definitive collection`,i.collection)),!i.rootName){if(i.rootName=this.config.app.rootName||"app",s=this._serializeAndVerify(i))return s
let t
i.namespace?(t=this.config.addons&&this.config.addons[i.namespace],i.rootName=i.namespace,i.namespace=void 0):(t=this.config.addons&&this.config.addons[i.name],i.rootName=i.name,i.name="main")}return(s=this._serializeAndVerify(i))?s:void 0}retrieve(t){return this.registry.get(t)}resolve(t,e){let s=this.identify(t,e)
if(s)return this.retrieve(s)}_definitiveCollection(t){let e=this.config.types[t]
return Ci(`'${t}' is not a recognized type`,e),e.definitiveCollection}_serializeAndVerify(t){let e=_i(t)
if(this.registry.has(e))return e}}class Ai{constructor(t={}){this._entries=t}has(t){return t in this._entries}get(t){return this._entries[t]}}const Ni="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Oi="January February March April May June July August September October November December".split(" ")
var Ti={"component:/p365/components/P365":class extends W{},"template:/p365/components/P365":{id:"Lwd7TxES",block:'{"symbols":[],"statements":[[6,"h1"],[10,"class","title"],[8],[0,"Project 365"],[9],[0,"\\n"],[5,"PhotoCollection",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/p365/components/P365"}},"component:/p365/components/PhotoCollection":class extends W{get today(){return new Date}get currentDayNumber(){let t=this.today
return(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())-Date.UTC(t.getFullYear(),0,0))/24/60/60/1e3}get dates(){let t=this.today,e=[],s=this.currentDayNumber,i=1
for(;i<=s;)e.push(new Date(t.getFullYear(),0,i++))
return e.reverse()}},"template:/p365/components/PhotoCollection":{id:"7ciC3ZoA",block:'{"symbols":["date","index"],"statements":[[6,"div"],[10,"class","photo-collection"],[8],[0,"\\n"],[4,"each",[[22,["dates"]]],[["key"],["@index"]],{"statements":[[0,"    "],[5,"PhotoDay",[],[["@date"],[[21,1,[]]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[1,2]},null],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/p365/components/PhotoCollection"}},"component:/p365/components/PhotoDay":class extends W{get currentDayNumber(){let t=this.args.date
return(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())-Date.UTC(t.getFullYear(),0,0))/24/60/60/1e3}get formattedDate(){let t=this.args.date,e=Ni[t.getDay()],s=Oi[t.getMonth()],i=(t.getDate(),t.getFullYear())
return`${e}, ${s} ${this.ordinalizedDayNum}, ${i}`}get ordinalizedDayNum(){let t=this.args.date.getDate().toString(),e=t[t.length-1]
return`${t}${(t<10||t>19)&&{1:"st",2:"nd",3:"rd"}[e]||"th"}`}},"template:/p365/components/PhotoDay":{id:"WSv5/xxo",block:'{"symbols":[],"statements":[[6,"div"],[10,"class","photo-day"],[8],[0,"\\n  "],[6,"div"],[10,"class","container"],[8],[0,"\\n    "],[6,"div"],[10,"class","date-box"],[8],[6,"h1"],[8],[1,[20,"currentDayNumber"],false],[9],[9],[0,"\\n    "],[6,"h3"],[10,"class","date"],[8],[1,[20,"formattedDate"],false],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/p365/components/PhotoDay"}}},Di={app:{name:"p365",rootName:"p365"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
const Li=new class extends Qs{constructor(){let t=new Ai(Ti),e=new xi(Di,t)
const s=document.body
super({builder:new ki({element:s,nextSibling:null}),loader:new vi(e),renderer:new Si,resolver:e,rootName:Di.app.rootName})}},Bi=document.getElementById("app")
$=(()=>{Li.scheduleRerender()}),Li.registerInitializer({initialize(t){t.register(`component-manager:/${Li.rootName}/component-managers/main`,Us)}}),Li.renderComponent("P365",Bi,null),Li.boot()})
