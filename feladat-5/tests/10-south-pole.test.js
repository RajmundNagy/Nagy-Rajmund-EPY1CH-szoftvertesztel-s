'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('10-south-pole',()=>{const r=new Rover(1,0,'S',{width:8,height:5}); assert.deepEqual(r.execute('f').state(),{x:5,y:0,direction:'N'});});
