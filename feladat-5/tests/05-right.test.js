'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('05-right',()=>{const r=new Rover(2,1,'N',{width:8,height:5}); assert.equal(r.execute('r').state().direction,'E');});
