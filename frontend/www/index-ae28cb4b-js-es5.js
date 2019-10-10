(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["index-ae28cb4b-js"],{/***/"./node_modules/@ionic/core/dist/esm/index-ae28cb4b.js":/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/index-ae28cb4b.js ***!
  \*************************************************************/ /*! exports provided: create */ /***/function node_modulesIonicCoreDistEsmIndexAe28cb4bJs(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"create",function(){return create});var transitionEnd=function transitionEnd(el,callback){var unRegTrans;var opts={passive:true};var unregister=function unregister(){if(unRegTrans){unRegTrans()}};var onTransitionEnd=function onTransitionEnd(ev){if(el===ev.target){unregister();callback(ev)}};if(el){el.addEventListener("webkitTransitionEnd",onTransitionEnd,opts);el.addEventListener("transitionend",onTransitionEnd,opts);unRegTrans=function unRegTrans(){el.removeEventListener("webkitTransitionEnd",onTransitionEnd,opts);el.removeEventListener("transitionend",onTransitionEnd,opts)}}return unregister};var CSS_VALUE_REGEX=/(^-?\d*\.?\d*)(.*)/;var DURATION_MIN=32;var TRANSITION_END_FALLBACK_PADDING_MS=400;var TRANSFORM_PROPS={"translateX":1,"translateY":1,"translateZ":1,"scale":1,"scaleX":1,"scaleY":1,"scaleZ":1,"rotate":1,"rotateX":1,"rotateY":1,"rotateZ":1,"skewX":1,"skewY":1,"perspective":1};var win=typeof window!=="undefined"?window:{};var raf=win.requestAnimationFrame?win.requestAnimationFrame.bind(win):function(f){return f(Date.now())};var Animator=/*#__PURE__*/function(){function Animator(){this._hasDur=false;this._hasTweenEffect=false;this._isAsync=false;this._isReverse=false;this._destroyed=false;this.hasChildren=false;this.isPlaying=false;this.hasCompleted=false}var _proto=Animator.prototype;_proto.addElement=function addElement(el){if(el!=null){if(el.length>0){for(var i=0;i<el.length;i++){this._addEl(el[i])}}else{this._addEl(el)}}return this}/**
     * NO DOM
     */;_proto._addEl=function _addEl(el){if(el.nodeType===1){(this._elements=this._elements||[]).push(el)}}/**
     * Add a child animation to this animation.
     */;_proto.add=function add(childAnimation){childAnimation.parent=this;this.hasChildren=true;(this._childAnimations=this._childAnimations||[]).push(childAnimation);return this}/**
     * Get the duration of this animation. If this animation does
     * not have a duration, then it'll get the duration from its parent.
     */;_proto.getDuration=function getDuration(opts){if(opts&&opts.duration!==undefined){return opts.duration}else if(this._duration!==undefined){return this._duration}else if(this.parent){return this.parent.getDuration()}return 0}/**
     * Returns if the animation is a root one.
     */;_proto.isRoot=function isRoot(){return!this.parent}/**
     * Set the duration for this animation.
     */;_proto.duration=function duration(milliseconds){this._duration=milliseconds;return this}/**
     * Get the easing of this animation. If this animation does
     * not have an easing, then it'll get the easing from its parent.
     */;_proto.getEasing=function getEasing(){if(this._isReverse&&this._reversedEasingName!==undefined){return this._reversedEasingName}return this._easingName!==undefined?this._easingName:this.parent&&this.parent.getEasing()||null}/**
     * Set the easing for this animation.
     */;_proto.easing=function easing(name){this._easingName=name;return this}/**
     * Set the easing for this reversed animation.
     */;_proto.easingReverse=function easingReverse(name){this._reversedEasingName=name;return this}/**
     * Add the "from" value for a specific property.
     */;_proto.from=function from(prop,val){this._addProp("from",prop,val);return this}/**
     * Add the "to" value for a specific property.
     */;_proto.to=function to(prop,val,clearProperyAfterTransition){if(clearProperyAfterTransition===void 0){clearProperyAfterTransition=false}var fx=this._addProp("to",prop,val);if(clearProperyAfterTransition){// if this effect is a transform then clear the transform effect
// otherwise just clear the actual property
this.afterClearStyles(fx.trans?["transform","-webkit-transform"]:[prop])}return this}/**
     * Shortcut to add both the "from" and "to" for the same property.
     */;_proto.fromTo=function fromTo(prop,fromVal,toVal,clearProperyAfterTransition){return this.from(prop,fromVal).to(prop,toVal,clearProperyAfterTransition)}/**
     * NO DOM
     */;_proto._getProp=function _getProp(name){if(this._fxProperties){return this._fxProperties.find(function(prop){return prop.effectName===name})}return undefined};_proto._addProp=function _addProp(state,prop,val){var fxProp=this._getProp(prop);if(!fxProp){// first time we've see this EffectProperty
var shouldTrans=TRANSFORM_PROPS[prop]===1;fxProp={effectName:prop,trans:shouldTrans,// add the will-change property for transforms or opacity
wc:shouldTrans?"transform":prop};(this._fxProperties=this._fxProperties||[]).push(fxProp)}// add from/to EffectState to the EffectProperty
var fxState={val:val,num:0,effectUnit:""};fxProp[state]=fxState;if(typeof val==="string"&&val.indexOf(" ")<0){var r=val.match(CSS_VALUE_REGEX);if(r){var num=parseFloat(r[1]);if(!isNaN(num)){fxState.num=num}fxState.effectUnit=r[0]!==r[2]?r[2]:""}}else if(typeof val==="number"){fxState.num=val}return fxProp}/**
     * Add CSS class to this animation's elements
     * before the animation begins.
     */;_proto.beforeAddClass=function beforeAddClass(className){(this._beforeAddClasses=this._beforeAddClasses||[]).push(className);return this}/**
     * Remove CSS class from this animation's elements
     * before the animation begins.
     */;_proto.beforeRemoveClass=function beforeRemoveClass(className){(this._beforeRemoveClasses=this._beforeRemoveClasses||[]).push(className);return this}/**
     * Set CSS inline styles to this animation's elements
     * before the animation begins.
     */;_proto.beforeStyles=function beforeStyles(styles){this._beforeStyles=styles;return this}/**
     * Clear CSS inline styles from this animation's elements
     * before the animation begins.
     */;_proto.beforeClearStyles=function beforeClearStyles(propertyNames){this._beforeStyles=this._beforeStyles||{};for(var _iterator=propertyNames,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[Symbol.iterator]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++]}else{_i=_iterator.next();if(_i.done)break;_ref=_i.value}var prop=_ref;this._beforeStyles[prop]=""}return this}/**
     * Add a function which contains DOM reads, which will run
     * before the animation begins.
     */;_proto.beforeAddRead=function beforeAddRead(domReadFn){(this._readCallbacks=this._readCallbacks||[]).push(domReadFn);return this}/**
     * Add a function which contains DOM writes, which will run
     * before the animation begins.
     */;_proto.beforeAddWrite=function beforeAddWrite(domWriteFn){(this._writeCallbacks=this._writeCallbacks||[]).push(domWriteFn);return this}/**
     * Add CSS class to this animation's elements
     * after the animation finishes.
     */;_proto.afterAddClass=function afterAddClass(className){(this._afterAddClasses=this._afterAddClasses||[]).push(className);return this}/**
     * Remove CSS class from this animation's elements
     * after the animation finishes.
     */;_proto.afterRemoveClass=function afterRemoveClass(className){(this._afterRemoveClasses=this._afterRemoveClasses||[]).push(className);return this}/**
     * Set CSS inline styles to this animation's elements
     * after the animation finishes.
     */;_proto.afterStyles=function afterStyles(styles){this._afterStyles=styles;return this}/**
     * Clear CSS inline styles from this animation's elements
     * after the animation finishes.
     */;_proto.afterClearStyles=function afterClearStyles(propertyNames){this._afterStyles=this._afterStyles||{};for(var _iterator2=propertyNames,_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[Symbol.iterator]();;){var _ref2;if(_isArray2){if(_i2>=_iterator2.length)break;_ref2=_iterator2[_i2++]}else{_i2=_iterator2.next();if(_i2.done)break;_ref2=_i2.value}var prop=_ref2;this._afterStyles[prop]=""}return this}/**
     * Play the animation.
     */;_proto.play=function play(opts){var _this=this;// If the animation was already invalidated (it did finish), do nothing
if(this._destroyed){return}// this is the top level animation and is in full control
// of when the async play() should actually kick off
// if there is no duration then it'll set the TO property immediately
// if there is a duration, then it'll stage all animations at the
// FROM property and transition duration, wait a few frames, then
// kick off the animation by setting the TO property for each animation
this._isAsync=this._hasDuration(opts);// ensure all past transition end events have been cleared
this._clearAsync();// recursively kicks off the correct progress step for each child animation
// ******** DOM WRITE ****************
this._playInit(opts);// doubling up RAFs since this animation was probably triggered
// from an input event, and just having one RAF would have this code
// run within the same frame as the triggering input event, and the
// input event probably already did way too much work for one frame
raf(function(){raf(function(){_this._playDomInspect(opts)})})};_proto.playAsync=function playAsync(opts){var _this2=this;return new Promise(function(resolve){_this2.onFinish(resolve,{oneTimeCallback:true,clearExistingCallbacks:true});_this2.play(opts);return _this2})};_proto.playSync=function playSync(){// If the animation was already invalidated (it did finish), do nothing
if(!this._destroyed){var opts={duration:0};this._isAsync=false;this._clearAsync();this._playInit(opts);this._playDomInspect(opts)}}/**
     * DOM WRITE
     * RECURSION
     */;_proto._playInit=function _playInit(opts){// always default that an animation does not tween
// a tween requires that an Animation class has an element
// and that it has at least one FROM/TO effect
// and that the FROM/TO effect can tween numeric values
this._hasTweenEffect=false;this.isPlaying=true;this.hasCompleted=false;this._hasDur=this.getDuration(opts)>DURATION_MIN;var children=this._childAnimations;if(children){for(var _iterator3=children,_isArray3=Array.isArray(_iterator3),_i3=0,_iterator3=_isArray3?_iterator3:_iterator3[Symbol.iterator]();;){var _ref3;if(_isArray3){if(_i3>=_iterator3.length)break;_ref3=_iterator3[_i3++]}else{_i3=_iterator3.next();if(_i3.done)break;_ref3=_i3.value}var child=_ref3;// ******** DOM WRITE ****************
child._playInit(opts)}}if(this._hasDur){// if there is a duration then we want to start at step 0
// ******** DOM WRITE ****************
this._progress(0);// add the will-change properties
// ******** DOM WRITE ****************
this._willChange(true)}}/**
     * DOM WRITE
     * NO RECURSION
     * ROOT ANIMATION
     */;_proto._playDomInspect=function _playDomInspect(opts){var _this3=this;// fire off all the "before" function that have DOM READS in them
// elements will be in the DOM, however visibily hidden
// so we can read their dimensions if need be
// ******** DOM READ ****************
// ******** DOM WRITE ****************
this._beforeAnimation();// for the root animation only
// set the async TRANSITION END event
// and run onFinishes when the transition ends
var dur=this.getDuration(opts);if(this._isAsync){this._asyncEnd(dur,true)}// ******** DOM WRITE ****************
this._playProgress(opts);if(this._isAsync&&!this._destroyed){// this animation has a duration so we need another RAF
// for the CSS TRANSITION properties to kick in
raf(function(){_this3._playToStep(1)})}}/**
     * DOM WRITE
     * RECURSION
     */;_proto._playProgress=function _playProgress(opts){var children=this._childAnimations;if(children){for(var _iterator4=children,_isArray4=Array.isArray(_iterator4),_i4=0,_iterator4=_isArray4?_iterator4:_iterator4[Symbol.iterator]();;){var _ref4;if(_isArray4){if(_i4>=_iterator4.length)break;_ref4=_iterator4[_i4++]}else{_i4=_iterator4.next();if(_i4.done)break;_ref4=_i4.value}var child=_ref4;// ******** DOM WRITE ****************
child._playProgress(opts)}}if(this._hasDur){// set the CSS TRANSITION duration/easing
// ******** DOM WRITE ****************
this._setTrans(this.getDuration(opts),false)}else{// this animation does not have a duration, so it should not animate
// just go straight to the TO properties and call it done
// ******** DOM WRITE ****************
this._progress(1);// since there was no animation, immediately run the after
// ******** DOM WRITE ****************
this._setAfterStyles();// this animation has no duration, so it has finished
// other animations could still be running
this._didFinish(true)}}/**
     * DOM WRITE
     * RECURSION
     */;_proto._playToStep=function _playToStep(stepValue){if(!this._destroyed){var children=this._childAnimations;if(children){for(var _iterator5=children,_isArray5=Array.isArray(_iterator5),_i5=0,_iterator5=_isArray5?_iterator5:_iterator5[Symbol.iterator]();;){var _ref5;if(_isArray5){if(_i5>=_iterator5.length)break;_ref5=_iterator5[_i5++]}else{_i5=_iterator5.next();if(_i5.done)break;_ref5=_i5.value}var child=_ref5;// ******** DOM WRITE ****************
child._playToStep(stepValue)}}if(this._hasDur){// browser had some time to render everything in place
// and the transition duration/easing is set
// now set the TO properties which will trigger the transition to begin
// ******** DOM WRITE ****************
this._progress(stepValue)}}}/**
     * DOM WRITE
     * NO RECURSION
     * ROOT ANIMATION
     */;_proto._asyncEnd=function _asyncEnd(dur,shouldComplete){var self=this;var onTransitionEnd=function onTransitionEnd(){// congrats! a successful transition completed!
// ensure transition end events and timeouts have been cleared
self._clearAsync();// ******** DOM WRITE ****************
self._playEnd();// transition finished
self._didFinishAll(shouldComplete,true,false)};var onTransitionFallback=function onTransitionFallback(){// oh noz! the transition end event didn't fire in time!
// instead the fallback timer when first
// if all goes well this fallback should never fire
// clear the other async end events from firing
self._timerId=undefined;self._clearAsync();// set the after styles
// ******** DOM WRITE ****************
self._playEnd(shouldComplete?1:0);// transition finished
self._didFinishAll(shouldComplete,true,false)};// set the TRANSITION END event on one of the transition elements
self._unregisterTrnsEnd=transitionEnd(self._transEl(),onTransitionEnd);// set a fallback timeout if the transition end event never fires, or is too slow
// transition end fallback: (animation duration + XXms)
self._timerId=setTimeout(onTransitionFallback,dur+TRANSITION_END_FALLBACK_PADDING_MS)}/**
     * DOM WRITE
     * RECURSION
     */;_proto._playEnd=function _playEnd(stepValue){var children=this._childAnimations;if(children){for(var _iterator6=children,_isArray6=Array.isArray(_iterator6),_i6=0,_iterator6=_isArray6?_iterator6:_iterator6[Symbol.iterator]();;){var _ref6;if(_isArray6){if(_i6>=_iterator6.length)break;_ref6=_iterator6[_i6++]}else{_i6=_iterator6.next();if(_i6.done)break;_ref6=_i6.value}var child=_ref6;// ******** DOM WRITE ****************
child._playEnd(stepValue)}}if(this._hasDur){if(stepValue!==undefined){// too late to have a smooth animation, just finish it
// ******** DOM WRITE ****************
this._setTrans(0,true);// ensure the ending progress step gets rendered
// ******** DOM WRITE ****************
this._progress(stepValue)}// set the after styles
// ******** DOM WRITE ****************
this._setAfterStyles();// remove the will-change properties
// ******** DOM WRITE ****************
this._willChange(false)}}/**
     * NO DOM
     * RECURSION
     */;_proto._hasDuration=function _hasDuration(opts){if(this.getDuration(opts)>DURATION_MIN){return true}var children=this._childAnimations;if(children){for(var _iterator7=children,_isArray7=Array.isArray(_iterator7),_i7=0,_iterator7=_isArray7?_iterator7:_iterator7[Symbol.iterator]();;){var _ref7;if(_isArray7){if(_i7>=_iterator7.length)break;_ref7=_iterator7[_i7++]}else{_i7=_iterator7.next();if(_i7.done)break;_ref7=_i7.value}var child=_ref7;if(child._hasDuration(opts)){return true}}}return false}/**
     * NO DOM
     * RECURSION
     */;_proto._hasDomReads=function _hasDomReads(){if(this._readCallbacks&&this._readCallbacks.length>0){return true}var children=this._childAnimations;if(children){for(var _iterator8=children,_isArray8=Array.isArray(_iterator8),_i8=0,_iterator8=_isArray8?_iterator8:_iterator8[Symbol.iterator]();;){var _ref8;if(_isArray8){if(_i8>=_iterator8.length)break;_ref8=_iterator8[_i8++]}else{_i8=_iterator8.next();if(_i8.done)break;_ref8=_i8.value}var child=_ref8;if(child._hasDomReads()){return true}}}return false}/**
     * Immediately stop at the end of the animation.
     */;_proto.stop=function stop(stepValue){if(stepValue===void 0){stepValue=1}// ensure all past transition end events have been cleared
this._clearAsync();this._hasDur=true;this._playEnd(stepValue)}/**
     * NO DOM
     * NO RECURSION
     */;_proto._clearAsync=function _clearAsync(){if(this._unregisterTrnsEnd){this._unregisterTrnsEnd()}if(this._timerId){clearTimeout(this._timerId)}this._timerId=this._unregisterTrnsEnd=undefined}/**
     * DOM WRITE
     * NO RECURSION
     */;_proto._progress=function _progress(stepValue){// bread 'n butter
var val;var elements=this._elements;var effects=this._fxProperties;if(!elements||elements.length===0||!effects||this._destroyed){return}// flip the number if we're going in reverse
if(this._isReverse){stepValue=1-stepValue}var i=0;var j=0;var finalTransform="";var fx;for(i=0;i<effects.length;i++){fx=effects[i];if(fx.from&&fx.to){var fromNum=fx.from.num;var toNum=fx.to.num;var tweenEffect=fromNum!==toNum;if(tweenEffect){this._hasTweenEffect=true}if(stepValue===0){// FROM
val=fx.from.val}else if(stepValue===1){// TO
val=fx.to.val}else if(tweenEffect){// EVERYTHING IN BETWEEN
var valNum=(toNum-fromNum)*stepValue+fromNum;var unit=fx.to.effectUnit;val=valNum+unit}if(val!==null){var prop=fx.effectName;if(fx.trans){finalTransform+=prop+"("+val+") "}else{for(j=0;j<elements.length;j++){// ******** DOM WRITE ****************
elements[j].style.setProperty(prop,val)}}}}}// place all transforms on the same property
if(finalTransform.length>0){if(!this._isReverse&&stepValue!==1||this._isReverse&&stepValue!==0){finalTransform+="translateZ(0px)"}for(i=0;i<elements.length;i++){// ******** DOM WRITE ****************
elements[i].style.setProperty("transform",finalTransform);elements[i].style.setProperty("-webkit-transform",finalTransform)}}}/**
     * DOM WRITE
     * NO RECURSION
     */;_proto._setTrans=function _setTrans(dur,forcedLinearEasing){// Transition is not enabled if there are not effects
var elements=this._elements;if(!elements||elements.length===0||!this._fxProperties){return}// set the TRANSITION properties inline on the element
var easing=forcedLinearEasing?"linear":this.getEasing();var durString=dur+"ms";for(var _iterator9=elements,_isArray9=Array.isArray(_iterator9),_i9=0,_iterator9=_isArray9?_iterator9:_iterator9[Symbol.iterator]();;){var _ref9;if(_isArray9){if(_i9>=_iterator9.length)break;_ref9=_iterator9[_i9++]}else{_i9=_iterator9.next();if(_i9.done)break;_ref9=_i9.value}var _ref10=_ref9,style=_ref10.style;if(dur>0){// ******** DOM WRITE ****************
style.transitionDuration=durString;// each animation can have a different easing
if(easing!==null){// ******** DOM WRITE ****************
style.transitionTimingFunction=easing}}else{style.transitionDuration="0"}}}/**
     * DOM READ
     * DOM WRITE
     * RECURSION
     */;_proto._beforeAnimation=function _beforeAnimation(){// fire off all the "before" function that have DOM READS in them
// elements will be in the DOM, however visibily hidden
// so we can read their dimensions if need be
// ******** DOM READ ****************
this._fireBeforeReadFunc();// ******** DOM READS ABOVE / DOM WRITES BELOW ****************
// fire off all the "before" function that have DOM WRITES in them
// ******** DOM WRITE ****************
this._fireBeforeWriteFunc();// stage all of the before css classes and inline styles
// ******** DOM WRITE ****************
this._setBeforeStyles()}/**
     * DOM WRITE
     * RECURSION
     */;_proto._setBeforeStyles=function _setBeforeStyles(){var children=this._childAnimations;if(children){for(var _iterator10=children,_isArray10=Array.isArray(_iterator10),_i10=0,_iterator10=_isArray10?_iterator10:_iterator10[Symbol.iterator]();;){var _ref11;if(_isArray10){if(_i10>=_iterator10.length)break;_ref11=_iterator10[_i10++]}else{_i10=_iterator10.next();if(_i10.done)break;_ref11=_i10.value}var child=_ref11;child._setBeforeStyles()}}var elements=this._elements;// before the animations have started
// only set before styles if animation is not reversed
if(!elements||elements.length===0||this._isReverse){return}var addClasses=this._beforeAddClasses;var removeClasses=this._beforeRemoveClasses;for(var _iterator11=elements,_isArray11=Array.isArray(_iterator11),_i11=0,_iterator11=_isArray11?_iterator11:_iterator11[Symbol.iterator]();;){var _ref12;if(_isArray11){if(_i11>=_iterator11.length)break;_ref12=_iterator11[_i11++]}else{_i11=_iterator11.next();if(_i11.done)break;_ref12=_i11.value}var el=_ref12;var elementClassList=el.classList;// css classes to add before the animation
if(addClasses){for(var _iterator12=addClasses,_isArray12=Array.isArray(_iterator12),_i12=0,_iterator12=_isArray12?_iterator12:_iterator12[Symbol.iterator]();;){var _ref13;if(_isArray12){if(_i12>=_iterator12.length)break;_ref13=_iterator12[_i12++]}else{_i12=_iterator12.next();if(_i12.done)break;_ref13=_i12.value}var c=_ref13;// ******** DOM WRITE ****************
elementClassList.add(c)}}// css classes to remove before the animation
if(removeClasses){for(var _iterator13=removeClasses,_isArray13=Array.isArray(_iterator13),_i13=0,_iterator13=_isArray13?_iterator13:_iterator13[Symbol.iterator]();;){var _ref14;if(_isArray13){if(_i13>=_iterator13.length)break;_ref14=_iterator13[_i13++]}else{_i13=_iterator13.next();if(_i13.done)break;_ref14=_i13.value}var _c=_ref14;// ******** DOM WRITE ****************
elementClassList.remove(_c)}}// inline styles to add before the animation
if(this._beforeStyles){for(var _i14=0,_Object$entries=Object.entries(this._beforeStyles);_i14<_Object$entries.length;_i14++){var _Object$entries$_i=_Object$entries[_i14],key=_Object$entries$_i[0],value=_Object$entries$_i[1];// ******** DOM WRITE ****************
el.style.setProperty(key,value)}}}}/**
     * DOM READ
     * RECURSION
     */;_proto._fireBeforeReadFunc=function _fireBeforeReadFunc(){var children=this._childAnimations;if(children){for(var _iterator14=children,_isArray14=Array.isArray(_iterator14),_i15=0,_iterator14=_isArray14?_iterator14:_iterator14[Symbol.iterator]();;){var _ref15;if(_isArray14){if(_i15>=_iterator14.length)break;_ref15=_iterator14[_i15++]}else{_i15=_iterator14.next();if(_i15.done)break;_ref15=_i15.value}var child=_ref15;// ******** DOM READ ****************
child._fireBeforeReadFunc()}}var readFunctions=this._readCallbacks;if(readFunctions){for(var _iterator15=readFunctions,_isArray15=Array.isArray(_iterator15),_i16=0,_iterator15=_isArray15?_iterator15:_iterator15[Symbol.iterator]();;){var _ref16;if(_isArray15){if(_i16>=_iterator15.length)break;_ref16=_iterator15[_i16++]}else{_i16=_iterator15.next();if(_i16.done)break;_ref16=_i16.value}var callback=_ref16;// ******** DOM READ ****************
callback()}}}/**
     * DOM WRITE
     * RECURSION
     */;_proto._fireBeforeWriteFunc=function _fireBeforeWriteFunc(){var children=this._childAnimations;if(children){for(var _iterator16=children,_isArray16=Array.isArray(_iterator16),_i17=0,_iterator16=_isArray16?_iterator16:_iterator16[Symbol.iterator]();;){var _ref17;if(_isArray16){if(_i17>=_iterator16.length)break;_ref17=_iterator16[_i17++]}else{_i17=_iterator16.next();if(_i17.done)break;_ref17=_i17.value}var child=_ref17;// ******** DOM WRITE ****************
child._fireBeforeWriteFunc()}}var writeFunctions=this._writeCallbacks;if(writeFunctions){for(var _iterator17=writeFunctions,_isArray17=Array.isArray(_iterator17),_i18=0,_iterator17=_isArray17?_iterator17:_iterator17[Symbol.iterator]();;){var _ref18;if(_isArray17){if(_i18>=_iterator17.length)break;_ref18=_iterator17[_i18++]}else{_i18=_iterator17.next();if(_i18.done)break;_ref18=_i18.value}var callback=_ref18;// ******** DOM WRITE ****************
callback()}}}/**
     * DOM WRITE
     */;_proto._setAfterStyles=function _setAfterStyles(){var elements=this._elements;if(!elements){return}for(var _iterator18=elements,_isArray18=Array.isArray(_iterator18),_i19=0,_iterator18=_isArray18?_iterator18:_iterator18[Symbol.iterator]();;){var _ref19;if(_isArray18){if(_i19>=_iterator18.length)break;_ref19=_iterator18[_i19++]}else{_i19=_iterator18.next();if(_i19.done)break;_ref19=_i19.value}var el=_ref19;var elementClassList=el.classList;// remove the transition duration/easing
// ******** DOM WRITE ****************
el.style.transitionDuration=el.style.transitionTimingFunction="";if(this._isReverse){// finished in reverse direction
// css classes that were added before the animation should be removed
var beforeAddClasses=this._beforeAddClasses;if(beforeAddClasses){for(var _iterator19=beforeAddClasses,_isArray19=Array.isArray(_iterator19),_i20=0,_iterator19=_isArray19?_iterator19:_iterator19[Symbol.iterator]();;){var _ref20;if(_isArray19){if(_i20>=_iterator19.length)break;_ref20=_iterator19[_i20++]}else{_i20=_iterator19.next();if(_i20.done)break;_ref20=_i20.value}var c=_ref20;elementClassList.remove(c)}}// css classes that were removed before the animation should be added
var beforeRemoveClasses=this._beforeRemoveClasses;if(beforeRemoveClasses){for(var _iterator20=beforeRemoveClasses,_isArray20=Array.isArray(_iterator20),_i21=0,_iterator20=_isArray20?_iterator20:_iterator20[Symbol.iterator]();;){var _ref21;if(_isArray20){if(_i21>=_iterator20.length)break;_ref21=_iterator20[_i21++]}else{_i21=_iterator20.next();if(_i21.done)break;_ref21=_i21.value}var _c2=_ref21;elementClassList.add(_c2)}}// inline styles that were added before the animation should be removed
var beforeStyles=this._beforeStyles;if(beforeStyles){for(var _i22=0,_Object$keys=Object.keys(beforeStyles);_i22<_Object$keys.length;_i22++){var propName=_Object$keys[_i22];// ******** DOM WRITE ****************
el.style.removeProperty(propName)}}}else{// finished in forward direction
// css classes to add after the animation
var afterAddClasses=this._afterAddClasses;if(afterAddClasses){for(var _iterator21=afterAddClasses,_isArray21=Array.isArray(_iterator21),_i23=0,_iterator21=_isArray21?_iterator21:_iterator21[Symbol.iterator]();;){var _ref22;if(_isArray21){if(_i23>=_iterator21.length)break;_ref22=_iterator21[_i23++]}else{_i23=_iterator21.next();if(_i23.done)break;_ref22=_i23.value}var _c3=_ref22;// ******** DOM WRITE ****************
elementClassList.add(_c3)}}// css classes to remove after the animation
var afterRemoveClasses=this._afterRemoveClasses;if(afterRemoveClasses){for(var _iterator22=afterRemoveClasses,_isArray22=Array.isArray(_iterator22),_i24=0,_iterator22=_isArray22?_iterator22:_iterator22[Symbol.iterator]();;){var _ref23;if(_isArray22){if(_i24>=_iterator22.length)break;_ref23=_iterator22[_i24++]}else{_i24=_iterator22.next();if(_i24.done)break;_ref23=_i24.value}var _c4=_ref23;// ******** DOM WRITE ****************
elementClassList.remove(_c4)}}// inline styles to add after the animation
var afterStyles=this._afterStyles;if(afterStyles){for(var _i25=0,_Object$entries2=Object.entries(afterStyles);_i25<_Object$entries2.length;_i25++){var _Object$entries2$_i=_Object$entries2[_i25],key=_Object$entries2$_i[0],value=_Object$entries2$_i[1];el.style.setProperty(key,value)}}}}}/**
     * DOM WRITE
     * NO RECURSION
     */;_proto._willChange=function _willChange(addWillChange){var wc;var effects=this._fxProperties;var willChange;if(addWillChange&&effects){wc=[];for(var _iterator23=effects,_isArray23=Array.isArray(_iterator23),_i26=0,_iterator23=_isArray23?_iterator23:_iterator23[Symbol.iterator]();;){var _ref24;if(_isArray23){if(_i26>=_iterator23.length)break;_ref24=_iterator23[_i26++]}else{_i26=_iterator23.next();if(_i26.done)break;_ref24=_i26.value}var effect=_ref24;var propWC=effect.wc;if(propWC==="webkitTransform"){wc.push("transform","-webkit-transform")}else if(propWC!==undefined){wc.push(propWC)}}willChange=wc.join(",")}else{willChange=""}var elements=this._elements;if(elements){for(var _iterator24=elements,_isArray24=Array.isArray(_iterator24),_i27=0,_iterator24=_isArray24?_iterator24:_iterator24[Symbol.iterator]();;){var _ref25;if(_isArray24){if(_i27>=_iterator24.length)break;_ref25=_iterator24[_i27++]}else{_i27=_iterator24.next();if(_i27.done)break;_ref25=_i27.value}var el=_ref25;// ******** DOM WRITE ****************
el.style.setProperty("will-change",willChange)}}}/**
     * Start the animation with a user controlled progress.
     */;_proto.progressStart=function progressStart(){// ensure all past transition end events have been cleared
this._clearAsync();// ******** DOM READ/WRITE ****************
this._beforeAnimation();// ******** DOM WRITE ****************
this._progressStart()}/**
     * DOM WRITE
     * RECURSION
     */;_proto._progressStart=function _progressStart(){var children=this._childAnimations;if(children){for(var _iterator25=children,_isArray25=Array.isArray(_iterator25),_i28=0,_iterator25=_isArray25?_iterator25:_iterator25[Symbol.iterator]();;){var _ref26;if(_isArray25){if(_i28>=_iterator25.length)break;_ref26=_iterator25[_i28++]}else{_i28=_iterator25.next();if(_i28.done)break;_ref26=_i28.value}var child=_ref26;// ******** DOM WRITE ****************
child._progressStart()}}// force no duration, linear easing
// ******** DOM WRITE ****************
this._setTrans(0,true);// ******** DOM WRITE ****************
this._willChange(true)}/**
     * Set the progress step for this animation.
     * progressStep() is not debounced, so it should not be called faster than 60FPS.
     */;_proto.progressStep=function progressStep(stepValue){// only update if the last update was more than 16ms ago
stepValue=Math.min(1,Math.max(0,stepValue));var children=this._childAnimations;if(children){for(var _iterator26=children,_isArray26=Array.isArray(_iterator26),_i29=0,_iterator26=_isArray26?_iterator26:_iterator26[Symbol.iterator]();;){var _ref27;if(_isArray26){if(_i29>=_iterator26.length)break;_ref27=_iterator26[_i29++]}else{_i29=_iterator26.next();if(_i29.done)break;_ref27=_i29.value}var child=_ref27;// ******** DOM WRITE ****************
child.progressStep(stepValue)}}// ******** DOM WRITE ****************
this._progress(stepValue)}/**
     * End the progress animation.
     */;_proto.progressEnd=function progressEnd(shouldComplete,currentStepValue,dur){var _this4=this;if(dur===void 0){dur=-1}if(this._isReverse){// if the animation is going in reverse then
// flip the step value: 0 becomes 1, 1 becomes 0
currentStepValue=1-currentStepValue}var stepValue=shouldComplete?1:0;var diff=Math.abs(currentStepValue-stepValue);if(dur<0){dur=this._duration||0}else if(diff<0.05){dur=0}this._isAsync=dur>30;this._progressEnd(shouldComplete,stepValue,dur,this._isAsync);if(this._isAsync){// for the root animation only
// set the async TRANSITION END event
// and run onFinishes when the transition ends
// ******** DOM WRITE ****************
this._asyncEnd(dur,shouldComplete);// this animation has a duration so we need another RAF
// for the CSS TRANSITION properties to kick in
if(!this._destroyed){raf(function(){_this4._playToStep(stepValue)})}}}/**
     * DOM WRITE
     * RECURSION
     */;_proto._progressEnd=function _progressEnd(shouldComplete,stepValue,dur,isAsync){var children=this._childAnimations;if(children){for(var _iterator27=children,_isArray27=Array.isArray(_iterator27),_i30=0,_iterator27=_isArray27?_iterator27:_iterator27[Symbol.iterator]();;){var _ref28;if(_isArray27){if(_i30>=_iterator27.length)break;_ref28=_iterator27[_i30++]}else{_i30=_iterator27.next();if(_i30.done)break;_ref28=_i30.value}var child=_ref28;// ******** DOM WRITE ****************
child._progressEnd(shouldComplete,stepValue,dur,isAsync)}}if(!isAsync){// stop immediately
// set all the animations to their final position
// ******** DOM WRITE ****************
this._progress(stepValue);this._willChange(false);this._setAfterStyles();this._didFinish(shouldComplete)}else{// animate it back to it's ending position
this.isPlaying=true;this.hasCompleted=false;this._hasDur=true;// ******** DOM WRITE ****************
this._willChange(true);this._setTrans(dur,false)}}/**
     * Add a callback to fire when the animation has finished.
     */;_proto.onFinish=function onFinish(callback,opts){if(opts&&opts.clearExistingCallbacks){this._onFinishCallbacks=this._onFinishOneTimeCallbacks=undefined}if(opts&&opts.oneTimeCallback){this._onFinishOneTimeCallbacks=this._onFinishOneTimeCallbacks||[];this._onFinishOneTimeCallbacks.push(callback)}else{this._onFinishCallbacks=this._onFinishCallbacks||[];this._onFinishCallbacks.push(callback)}return this}/**
     * NO DOM
     * RECURSION
     */;_proto._didFinishAll=function _didFinishAll(hasCompleted,finishAsyncAnimations,finishNoDurationAnimations){var children=this._childAnimations;if(children){for(var _iterator28=children,_isArray28=Array.isArray(_iterator28),_i31=0,_iterator28=_isArray28?_iterator28:_iterator28[Symbol.iterator]();;){var _ref29;if(_isArray28){if(_i31>=_iterator28.length)break;_ref29=_iterator28[_i31++]}else{_i31=_iterator28.next();if(_i31.done)break;_ref29=_i31.value}var child=_ref29;child._didFinishAll(hasCompleted,finishAsyncAnimations,finishNoDurationAnimations)}}if(finishAsyncAnimations&&this._isAsync||finishNoDurationAnimations&&!this._isAsync){this._didFinish(hasCompleted)}}/**
     * NO RECURSION
     */;_proto._didFinish=function _didFinish(hasCompleted){this.isPlaying=false;this.hasCompleted=hasCompleted;if(this._onFinishCallbacks){// run all finish callbacks
for(var _iterator29=this._onFinishCallbacks,_isArray29=Array.isArray(_iterator29),_i32=0,_iterator29=_isArray29?_iterator29:_iterator29[Symbol.iterator]();;){var _ref30;if(_isArray29){if(_i32>=_iterator29.length)break;_ref30=_iterator29[_i32++]}else{_i32=_iterator29.next();if(_i32.done)break;_ref30=_i32.value}var callback=_ref30;callback(this)}}if(this._onFinishOneTimeCallbacks){// run all "onetime" finish callbacks
for(var _iterator30=this._onFinishOneTimeCallbacks,_isArray30=Array.isArray(_iterator30),_i33=0,_iterator30=_isArray30?_iterator30:_iterator30[Symbol.iterator]();;){var _ref31;if(_isArray30){if(_i33>=_iterator30.length)break;_ref31=_iterator30[_i33++]}else{_i33=_iterator30.next();if(_i33.done)break;_ref31=_i33.value}var _callback=_ref31;_callback(this)}this._onFinishOneTimeCallbacks.length=0}}/**
     * Reverse the animation.
     */;_proto.reverse=function reverse(shouldReverse){if(shouldReverse===void 0){shouldReverse=true}var children=this._childAnimations;if(children){for(var _iterator31=children,_isArray31=Array.isArray(_iterator31),_i34=0,_iterator31=_isArray31?_iterator31:_iterator31[Symbol.iterator]();;){var _ref32;if(_isArray31){if(_i34>=_iterator31.length)break;_ref32=_iterator31[_i34++]}else{_i34=_iterator31.next();if(_i34.done)break;_ref32=_i34.value}var child=_ref32;child.reverse(shouldReverse)}}this._isReverse=!!shouldReverse;return this}/**
     * Recursively destroy this animation and all child animations.
     */;_proto.destroy=function destroy(){this._didFinish(false);this._destroyed=true;var children=this._childAnimations;if(children){for(var _iterator32=children,_isArray32=Array.isArray(_iterator32),_i35=0,_iterator32=_isArray32?_iterator32:_iterator32[Symbol.iterator]();;){var _ref33;if(_isArray32){if(_i35>=_iterator32.length)break;_ref33=_iterator32[_i35++]}else{_i35=_iterator32.next();if(_i35.done)break;_ref33=_i35.value}var child=_ref33;child.destroy()}}this._clearAsync();if(this._elements){this._elements.length=0}if(this._readCallbacks){this._readCallbacks.length=0}if(this._writeCallbacks){this._writeCallbacks.length=0}this.parent=undefined;if(this._childAnimations){this._childAnimations.length=0}if(this._onFinishCallbacks){this._onFinishCallbacks.length=0}if(this._onFinishOneTimeCallbacks){this._onFinishOneTimeCallbacks.length=0}}/**
     * NO DOM
     */;_proto._transEl=function _transEl(){// get the lowest level element that has an Animator
var children=this._childAnimations;if(children){for(var _iterator33=children,_isArray33=Array.isArray(_iterator33),_i36=0,_iterator33=_isArray33?_iterator33:_iterator33[Symbol.iterator]();;){var _ref34;if(_isArray33){if(_i36>=_iterator33.length)break;_ref34=_iterator33[_i36++]}else{_i36=_iterator33.next();if(_i36.done)break;_ref34=_i36.value}var child=_ref34;var targetEl=child._transEl();if(targetEl){return targetEl}}}return this._hasTweenEffect&&this._hasDur&&this._elements!==undefined&&this._elements.length>0?this._elements[0]:null};return Animator}();var create=function create(animationBuilder,baseEl,opts){if(animationBuilder){return animationBuilder(Animator,baseEl,opts)}return Promise.resolve(new Animator)};/***/}}]);//# sourceMappingURL=index-ae28cb4b-js-es2015.js.map
//# sourceMappingURL=index-ae28cb4b-js-es5.js.map