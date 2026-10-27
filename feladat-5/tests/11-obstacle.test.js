'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('11-obstacle',()=>{const r=new Rover(1,1,'E',{width:8,height:5,obstacles:[[3,1]]}); const result=r.execute('fff'); assert.deepEqual(result.state(),{x:2,y:1,direction:'E'}); assert.deepEqual(result.obstacle,{x:3,y:1});});
