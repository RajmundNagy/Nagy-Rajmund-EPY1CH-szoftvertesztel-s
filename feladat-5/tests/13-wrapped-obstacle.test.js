'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('13-wrapped-obstacle',()=>{const r=new Rover(7,1,'E',{width:8,height:5,obstacles:[[0,1]]});r.execute('f');assert.deepEqual(r.obstacle,{x:0,y:1});assert.equal(r.state().x,7);});
