//This will create a cube and you are able to move it around the screen up, down, left, right and (still to be worked on) rotate it on the x axis.
//screen variables
var cx, cy, key;
cx = cy = 160;
//cube variables
var verts = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
var edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
var edgesc = Gg.list2lines(edges, verts);
//world variables
createCanvas('mycanvas');
var world = Gg.World(edgesc);
var camera = Gg.Camera([0, 0, 0], [0, 0], [160, 160]);
//main loop (text_input1 is my method to gain the keys, feel free to use anything else)
timedLoop(4, function(){
  camera.render(world, 0.05, key);
});
