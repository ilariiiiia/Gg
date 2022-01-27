//This will create a cube and you are able to move it around the screen up, down, left, right and (still to be worked on) rotate it on the x axis.
//screen variables
var w, h, cx, cy, key;
w = h = 320;
cx = cy = 160;
//cube variables
var verts = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
var edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
var edgesc = list2lines(edges, verts);
//world variables
var world = World(edgesc);
var camera = Camera([0, 0, 0], [0, 0], [160, 160]);
//main loop (text_input1 is my method to gain the keys, feel free to use anything else)
timedLoop(4, function(){
  key = getText("text_input1");
  setText("text_input1", '');
  camera.render(world, 0.05, key);
});
