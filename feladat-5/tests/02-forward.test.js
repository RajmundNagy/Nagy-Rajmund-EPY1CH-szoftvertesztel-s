'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('02-forward',()=>{const r=new Rover(2,1,'N',{width:8,height:5}); assert.deepEqual(r.execute('f').state(),{x:2,y:2,direction:'N'});});
