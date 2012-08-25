var Player=function(e,t,n){var r={local:n===Player.modes.LOCAL,id:game.playerCount++,update:function(){r.defeated||i.length===0&&(r.defeated=!0,console.log("player "+r.id+" was defeated."))}},i=ns.Node(),s=n,o="Player666",u=game.colors[r.id],a=function(e,t){var n=Unit(e,t,u);s===0&&n.on("click",function(e){return function(){game.deselectAll(),e.select(),game.selectedUnits.add(e)}}(n)),n.owner=r,game.units.add(n),i.add(n)};console.log(r.id),i.draw=function(){i.each(function(){this.draw(),this.dead&&(i.remove(this),game.units.remove(this))})},game.root.add(i);var f=game.spiral(13,{X:e,Y:t});for(var l=0;l<13;l++)a(f[l].X,f[l].Y);return r};Player.modes={LOCAL:0,AI:1,NETWORK:2};var Unit=function(e,t,n){var r=e*tileSize,i=t*tileSize,s=n,o=[],u=5,a=100,f=1e3,l=0,c=0,h=0,p=!1,d=100,v=Unit.GUARD,m=function(n,s,o){e=n,t=s,r=n*tileSize,i=s*tileSize,o&&(game.collisionMap[e][t]===collision.UNIT?(console.log("collision, evading."),b.go(game.spiral(2,{X:e,Y:t})[1],!0)):game.collisionMap[e][t]=collision.UNIT)},g=function(e){o=e,h=(new Date).getTime(),o.length===0&&console.log("no path!")},y=0,b={target:{X:0,Y:0},select:function(){p=!0},deselect:function(){p=!1},draw:function(){game.context.save(),game.context.fillStyle=s.toString(),game.context.strokeStyle=p?"yellow":"black",game.context.translate(r-game.map.offset.X*tileSize+tileSize/2,i-game.map.offset.Y*tileSize+tileSize/2),game.context.rotate(c),game.context.fillRect(-8,-16,16,32),game.context.strokeRect(-8,-16,16,32),y!==0&&(game.context.rotate(-c),game.context.rotate(y)),game.context.fillRect(-2,-16,4,24),game.context.strokeRect(-2,-16,4,24),game.context.fillRect(-5,-5,10,10),game.context.strokeRect(-5,-5,10,10),game.context.restore(),this.update()},hit:function(e){a-=e,a<0&&(b.dead=!0)},isInside:function(e,t){var n=game.map.offset.X*tileSize,s=game.map.offset.Y*tileSize;return t&&(n=0,s=0),r>e[0]+n&&r<e[0]+n+e[2]&&i>e[1]+s&&i<e[1]+s+e[3]},go:function(n,r){game.collisionMap[n.X][n.Y]===collision.PASSABLE?(r||(game.collisionMap[e][t]=collision.PASSABLE),pathFinder.find({X:e,Y:t},n,g)):console.log("sir no sir, destination is: "+game.collisionMap[n.X][n.Y])},click:function(e,t){var n=r-game.map.offset.X*tileSize,s=i-game.map.offset.Y*tileSize;return e>n-16&&e<n+16&&t>s-16&&t<s+16?(b.fire("click"),!0):!1},update:function(){if(o.length>0){curTime=(new Date).getTime()-h;if(curTime>d){var n=o.shift();m(n.X,n.Y,o.length===0),h=(new Date).getTime()}else{var s=o[0].X*tileSize,a=o[0].Y*tileSize,p=e*tileSize,v=t*tileSize,g=s-p,w=a-v,E=parseFloat(curTime)/parseFloat(d);r=p+E*g|0,i=v+E*w|0,c=Math.atan2(o[0].X-e,t-o[0].Y)}}rangeBox=[r-u*tileSize,i-u*tileSize,u*2*tileSize,u*2*tileSize],b.target={X:0,Y:0},game.units.each(function(){this.owner.id!==b.owner.id&&this.isInside(rangeBox,!0)&&(b.target=this.position)});var S=(new Date).getTime();if(b.target.X!==0&&b.target.Y!==0){y=Math.atan2(b.target.X-r,i-b.target.Y);if(S-l>f){var T=Bullet({X:r,Y:i},b.target,10);game.root.add(T),l=S}}else y=0}};return Object.defineProperty(b,"position",{get:function(){return{X:r,Y:i}}}),Object.defineProperty(b,"tile",{get:function(){return{X:e,Y:t}}}),game.collisionMap[e][t]=collision.UNIT,Events.attach(b),b};Unit.GUARD=0,Unit.AGRESSIVE=1,Unit.CEASEFIRE=0;