# Gg
A 3d renderer for code.org and based upon its pre-built 2d engine. Learn more about code.org at https://github.com/code-dot-org/code-dot-org.

### USAGE
The whole library relies on two objects, world and camera. To create this two objects call the functions World() and Camera() respectively and assign them to a variable. As the creator of this project, I recommend using world and camera respectively.

to create a line, you can either use the function Line() or create it with a much simpler method using list2lines(). More information and examples about the functions later.

to create a point, use the function point() or list2points(). They work in a similar way the line counterparts work.

In order to display the result, use the Camera.render() function (instead of Camera remember to use the variable you assigned the function Camera() to) that takes the parameters world, dt and keys. world should be the variable that you assigned to the result of the function World(), dt shuld be by how much would you like your camera to move per movement (recommended 0.05) and keys shuold be the key associated with the letters on code.org. If you want to use a different way to update the Camera() object properties, you can leave it undefined and deal with it later. For it to render not just one frame, but to do it continuosuly, use a timedloop or a while loop.

### Example code

```Javascript
var key;
var verts = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
var edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
var edgesc = Gg.list2lines(edges, verts);
createCanvas('mycanvas');
var world = Gg.World(edgesc);
var camera = Gg.Camera([0, 0, 0], [0, 0], [160, 160]);
timedLoop(4, function(){
  camera.render(world, 0.05, key);
});
```

Let's break it down:

Line 1: ```var key``` I'm defining the key variable used to give inputs to the camera to change its position (not done here, see [here](https://github.com/nicola-commits/Gg/blob/main/example.js)).

Line 2: I'm defining the vertex of a cube with the points' x, y and z position inside of a list. This list is 8 points together.

Line 3: same as line 2, but we are defining the edges for the lines. Every line is a list with the indexes of the endpoints in the variable defined in line 2.

Line 4: I'm transforming all those lists into a list of line objects, non dependent from either ```verts``` or ```edges``` anymore.

Line 5: I'm creating a canvas where to put all the drawings in

Lines 6 and 7: I'm creating the world and camera objects from their functions. The world function takes one argument, edgesc, because that is our list of lines. If we had points too, we would add that as the second parameter. If you wanted to only render points, leave the first argument as ```undefined```. For the camera, the function is taking three arguments: the first one is ```[0, 0, 0]```, which is the starting position of our camera. The second argument is ```[0, 0]```, the rotation of our camera (WIP) and the last argument is a list with the center of the screen in format ```[cx, cy]```.

Line 8: starting a timedLoop() function (see [here](https://studio.code.org/docs/applab/timedLoop/) for more info).

Line 9: This is the actual rendering, made with camera.render(). The function takes three arguments: world is the return of World(), the second one is by how much should the position of the camera change, and the third argument is the key that is being pressed (again, not implemented in this small demo).

Result: a 3d representation of a cube
