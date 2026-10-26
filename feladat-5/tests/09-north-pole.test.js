'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('09-north-pole',()=>{const r=new Rover(1,4,'N',{width:8,height:5}); assert.deepEqual(r.execute('f').state(),{x:5,y:4,direction:'S'});});
