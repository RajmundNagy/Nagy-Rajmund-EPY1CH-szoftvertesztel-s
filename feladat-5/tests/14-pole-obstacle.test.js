'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('14-pole-obstacle',()=>{const r=new Rover(1,4,'N',{width:8,height:5,obstacles:[[5,4]]});r.execute('f');assert.deepEqual(r.state(),{x:1,y:4,direction:'N'});assert.deepEqual(r.obstacle,{x:5,y:4});});
