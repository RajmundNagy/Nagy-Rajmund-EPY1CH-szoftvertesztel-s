'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('15-invalid-input',()=>{assert.throws(()=>new Rover(-1,1,'N',{width:8,height:5}),RangeError); assert.throws(()=>new Rover(1,1,'X',{width:8,height:5}),TypeError);});
