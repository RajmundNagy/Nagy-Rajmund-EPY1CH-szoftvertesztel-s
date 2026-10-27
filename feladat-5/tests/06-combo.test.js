'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('06-combo',()=>{const r=new Rover(1,1,'N',{width:8,height:5}); assert.deepEqual(r.execute('ffrff').state(),{x:3,y:3,direction:'E'});});
