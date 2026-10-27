'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('07-longitude-wrap-east',()=>{const r=new Rover(7,2,'E',{width:8,height:5}); assert.deepEqual(r.execute('f').state(),{x:0,y:2,direction:'E'});});
