'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('12-stop',()=>{const r=new Rover(1,1,'E',{width:8,height:5,obstacles:[[2,1]]});r.execute('flf');assert.deepEqual(r.state(),{x:1,y:1,direction:'E'});});
