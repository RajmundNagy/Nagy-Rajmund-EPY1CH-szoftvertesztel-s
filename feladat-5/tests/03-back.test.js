'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('03-back',()=>{const r=new Rover(2,1,'N',{width:8,height:5}); assert.deepEqual(r.execute('b').state(),{x:2,y:0,direction:'N'});});
