'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('01-start',()=>{const r=new Rover(2,1,'N',{width:8,height:5}); assert.deepEqual(r.state(),{x:2,y:1,direction:'N'});});
