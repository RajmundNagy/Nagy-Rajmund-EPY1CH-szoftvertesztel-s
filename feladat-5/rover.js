'use strict';
const DIRECTIONS = ['N','E','S','W'];
const STEP = {N:[0,1], E:[1,0], S:[0,-1], W:[-1,0]};
class Rover {
  constructor(x,y,direction,{width=8,height=5,obstacles=[]}={}) {
    if (!Number.isInteger(width) || width < 2 || width % 2 !== 0 ||
        !Number.isInteger(height) || height < 2)
      throw new RangeError('A szélesség pozitív páros, a magasság legalább 2 legyen.');
    if (!Number.isInteger(x) || !Number.isInteger(y) ||
        x < 0 || x >= width || y < 0 || y >= height)
      throw new RangeError('Érvénytelen kezdőkoordináta.');
    if (!DIRECTIONS.includes(direction))
      throw new TypeError('Az irány N, E, S vagy W lehet.');
    if (!Array.isArray(obstacles)) throw new TypeError('Az akadályok listája hibás.');
    for (const point of obstacles) {
      if (!Array.isArray(point) || point.length !== 2 ||
          !Number.isInteger(point[0]) || !Number.isInteger(point[1]) ||
          point[0] < 0 || point[0] >= width || point[1] < 0 || point[1] >= height)
        throw new RangeError('Érvénytelen akadálykoordináta.');
    }
    this.x=x; this.y=y; this.direction=direction;
    this.width=width; this.height=height;
    this.obstacles=new Set(obstacles.map(([a,b])=>a+','+b));
    this.obstacle=null;
  }
  state() { return {x:this.x,y:this.y,direction:this.direction}; }
  execute(commands) {
    if (typeof commands !== 'string' || !/^[fblr]*$/.test(commands))
      throw new TypeError('Csak f, b, l, r utasítások engedélyezettek.');
    this.obstacle=null;
    for (const command of commands) {
      if (command === 'l' || command === 'r') {
        const index=DIRECTIONS.indexOf(this.direction);
        this.direction=DIRECTIONS[(index+(command==='r'?1:3))%4];
        continue;
      }
      const [dx,dy]=STEP[this.direction];
      const sign=command==='f'?1:-1;
      let nx=(this.x+dx*sign+this.width)%this.width;
      let ny=this.y+dy*sign;
      let heading=this.direction;
      if (ny < 0 || ny >= this.height) {
        ny=ny<0?0:this.height-1;
        nx=(nx+this.width/2)%this.width;
        if (heading==='N') heading='S';
        else if (heading==='S') heading='N';
      }
      if (this.obstacles.has(nx+','+ny)) {
        this.obstacle={x:nx,y:ny};
        break;
      }
      this.x=nx;this.y=ny;this.direction=heading;
    }
    return this;
  }
}
module.exports={Rover};
