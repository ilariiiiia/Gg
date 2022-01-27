# Gg
A 3d renderer for code.org and based upon its pre-built 2d engine. Learn more about code.org at https://github.com/code-dot-ord/code-dot-org.

# USAGE
The whole library relies on two objects, world and camera. To create this two objects call the functions World() and Camera() respectively and assign them to a variable. As the creator of this project, I recommend using world and camera respectively.

to create a line, you can either use the function Line() or create it with a much simpler method using list2lines(). More information and examples about the functions later.

to create a point, use the function point() or list2points(). They work in a similar way the line counterparts work.

In order to display the result, use the Camera.render() function (instead of Camera remember to use the variable you assigned the function Camera() to) that takes the parameters world, dt and keys. world should be the variable that you assigned to the result of the function World(), dt shuld be by how much would you like your camera to move per movement (recommended 0.05) and keys shuold be the key associated with the letters on code.org. If you want to use a different way to update the Camera() object properties, you can leave it undefined and deal with it later. For it to render not just one frame, but to do it continuosuly, use a timedloop or a while loop.
