/*
DOCS

READ https://github.com/nicola-commits/gg/main/readme.MD for more detailed info
*/


/*
-------WORLD AND RENDER FUNCTIONS-------
*/


//draws all the lines in lines.
//Arguments: lines {list[line]} - a list of line objects
//Doesn't return anything
function drawlines(lines, camera){
  if(!lines){return}
  for(var i = 0; i < lines.length; i++){
    var point1 = lines[i].points[0];
    var point2 = lines[i].points[1];
    var p1 = _3dto2d(point1, camera);
    var p2 = _3dto2d(point2, camera);
    line(p1.x, p1.y, p2.x, p2.y);
  }
}

//draws all the points in points, with a size of size.
//Arguments: points{list[point]} - a list of the points to be drawn
//           *size{int} - the size of the point
//Doesn't return anything
function drawpoints(points, camera, size){
  if(!points){return}
  size = size || 2;
  for(var i = 0; i < points.length; i++){
    circle(_3dto2d(points[i], camera), size);
  }
}


/*
-------POINT MANIPULATION FUNCTIONS-------
*/


//transforms a 3d object into a 2d representation of it.
//Arguments: vert{list[x, y, z]} - the point to be transformed
//           camera{camera obj} - the camera
//Returns: {object} - a 2d point object
//object propertties: x, y, {int} - the x and y position of the 2d representation of that point
function _3dto2d(vert, camera){
  var x = vert.x - camera.pos[0];
  var y = vert.y - camera.pos[1];
  var z = vert.z - camera.pos[2];
  
  var r = rotate2d([x, z], camera.rot[1]);
  x = r[0];
  z = r[1];
  
  /*
  rotation for the y axis (not working, gonna fix that later)
  r = rotate2d([x, z], camera.rot[0]);
  y = r[0];
  z = r[1];
  */
  
  z += 5;
  var f = 200/z;
  x *= f;
  y *= f;
  return {
    x: camera.cx + x,
    y: camera.cy + y
  };
}

//Rotates an object around the origin. Not the expected behavior
//Arguments: pos{list[x, y]} - a list of the 2d coordinates of the point
//           rad{int} - the degrees by which rotate the solid
//Returns: {list[x, y]} - the new coordinate of the point
function rotate2d(pos, rad){
  var x = pos[0];
  var y = pos[1];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  return [y*s + x*c, y*c - x*s];
}





/*
-------CLASS LIKE FUNCTIONS-------
*/

//section to convert a series of lists into objects

//converts a list of points into a list of point objects
//Arguments: list{list[list[x, y, z]]} - a list of the points in format [[x, y, z], [x, y, z]]
//Returns: list{point obj} - the list of the point objects
function list2points(list){
  var res = [];
  for(var i = 0; i < list.length; i++){
    res.push(point(list[i][0], list[i][1], list[i][2]));
  }
  return res;
}

//converts a list of lines into a line object.
//Arguments: list{list[]} - the list of lines in terms of the indexes of the points in points which are their endpoints
//           points{list[list[x, y, z]]} - the list of the points in format [[x, y, z], [x, y, z]]
//Returns: {list[Line obj]} - the list of the line objects
function list2lines(list, points){
  var res = [];
  for(var i = 0 ; i < list.length ; i++){
    res.push(Line(
          point(points[list[i][0]][0], points[list[i][0]][1], points[list[i][0]][2]), 
          point(points[list[i][1]][0], points[list[i][1]][1], points[list[i][1]][2])
      ));
  }
  return res;
}

//class-like function. Returns a world object.
//Arguments: lines{list[Line obj]} - the line objects of the world
//           points{list[point obj]} - the points of the world
//Returns: {world obj} - a world object
function World(lines, points){
  return {
    lines:lines,
    points:points
  };
}


//class-like function. Returns a line object.
//Arguments: point1, point2 {point obj} - the line's endpoints
//Returns: {line obj} - a line object
function Line(point1, point2){
  return {
    type:'line',
    points : [point1, point2]
  };
}

//class-like function. Returns point object
//Arguments: x, y, z {int} - the x, y, and z coordinates of the point
//Returns: {point obj} - a point class-like object
//obj properties: x, y, z {int} - the x, y and z coordinates of the point
//obj methods: to2d(camera){
//  returns the 2d points of itself using the _3dto2d function in this library  
//}
function point(x, y, z){
  return {
    type:'point',
    x:x,
    y:y,
    z:z,
    to2d: function(camera){return _3dto2d(this, camera)}
  };
}


//Class-like function. Returns camera object.
//args: *position {[int, int, int]} - the initial position of the camera
//      *rotation {[int, int, int]} - the initial rotation of the camera
//returns: {object} - a camera class-like object
//obj properties: pos {[int, int int]} - the camera's position (x, y, z)
//                rot {[int, int]} - the camera's rotation (degx, degy)
//obj methods:    update(dt, key){
//  dt: speed multiplier. Recommended 0.05
//  key: the key being pressed. Can be both uppercase of lowercase with no distinction
//  commands:
//  W and S increase and decrease z respectively
//  A and D increase and decrease x respectively
//  E and Q increase and decrease y respectively
//  
//}
function Camera(position, rotation, center){
  var pos = position || [0, 0, 0];
  var rot = rotation || [0, 0];
  return {
    pos : pos,
    rot : rot,
    cx : center[0],
    cy: center[1],
    rad : 0,
    update: function(dt, key){
      if(!dt || !key){return}
      key = key.toUpperCase();
      var s = dt * 10;
      switch(key){
        case('W'): //should be W
          this.pos[2] += s;
          break;
        case("A"): //should be A
          this.pos[0] += s;
          break;
        case('S'): //should be S
          this.pos[2] -= s;
          break;
        case('D'): //should be D
          this.pos[0] -= s;
          break;
        case('Q'): //should be Q
          this.pos[1] -= s;
          break;
        case('E'): //should be E
          this.pos[1] += s;
          break;
        case('1'):
          this.rad += s;
          break;
        case('3'):
          this.rad -= s;
          break;
        case('Z'):
          this.rot[0] += s;
          break;
        case('X'):
          this.rot[0] -= s;
          break;
        case('C'):
          this.rot[1] += s;
          break;
        case('V'):
          this.rot[1] -= s;
          break;
      }
    },
    render: function(world, dt, key){
      clearCanvas();
      this.update(dt, key);
      drawlines(world.lines, this);
      drawpoints(world.points, this);
    }
  };
}
