'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('17-back-at-pole',()=>{const r=new Rover(1,4,'S',{width:8,height:5});assert.deepEqual(r.execute('b').state(),{x:5,y:4,direction:'N'});});
