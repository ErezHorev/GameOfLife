# GameOfLifeJS
#### Implementing [Conway’s Game Of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using JavaScript and html.

### Watch it live: https://erezhorev.github.io/GameOfLife    

#### Approaching this project:   
Started this project with a zero experience in web development and its territory.
Had to learn html, javascript from scratch (mostly from [w3school](https://www.w3schools.com/), [mdn](https://developer.mozilla.org/en-US/) and google ofcourse).   
As in many challenging development projects, there are many ways to implement and achieve this project's goal.    
Turns out that web development is a rapidly changing world where new infrastructures and libraries are introduced in a high rate (~months).    
So my first challenge began before writing my first line of code. the challenge was to plan and design my implementation for this project in the great ocean of possibilities.
As a newcomer there's a high chance my design and implementation include some flaws in the lack of knowledge, please excuse (feedbacks are more then welcome).


Project’s original sizing: 7 days (actual: ~11)

### Architecture    
For the Server side i picked Node.js. Why Node? it supports JavaScript (this will allow reuse our client code on server side if we'd like), fast to implement, its popularity  is trending and it meets my minimal requirements.    
On the client side: HTML(+JQuery) and JS.

### Design
3 main entities exists: 'canvas', 'Grid', 'GameOfLife'.    
'GameOfLife' responds to user actions/controls and kickstarts actions on the grid.    
'Grid' is the model - our game board which is being updated during the game.    
The 'canvas' is our presentation layer, it is the view component which user actually see on screen. we're drawing our model on the canvas after each game tick (step).

### Workplan
- using javascript on client side that runs the whole show, drawing on html canvas - cost 1 day
- implement basic view of the grid and game algorithm (grid + game classes) - 2 days
- add buttons + parameters to control the program  - 2 days
- support multiple game patterns, manual draw on board  - 2 days
- add game intro  - 1 days
- code cleanup, documentation - 1 day

#### Notes:    
- Project's documentation was auto generated by [jsdoc](http://usejsdoc.org/) (generate using `scripts/generate_doc.sh` wrapper for your convenience).
- The live example is running only the client side code, which is currently most of this exercise.
If you wish to run with node.js web server just run the following from this project's root dir:  `node server.js`.   
**Dependencies:** node.js, npm, express js (`npm install express`).

### TODO
- Model-View-Controller model is partially exists in current code (model=Grid, View=Canvas, Controller=Game), we require more cleanups and more decoupling/isolating those layers using events.
- Add unittests.
- Add github hook/build task to run UTs and auto generate documentation on each commit.
- Add more known patterns.

### Enhancement ideas
- Run the game on server side. (Its relatively easy to move the game’s logic to server side since Node.Js native lang is JavaScript which is one of the reasons we chose Node in the first place). This will allow to support multiple sessions and save their state in case browser was shut down. Will reduce computation on client side (can be slower on different mobiles, home pc).
- While moving logic to server side, use DB to save the state of the game/s. Save patterns and allow starting from previously saved unique templates (repetitive patterns..etc). 
- spice up the game: allow defining a bot which spawn live cells by some parameters (e.g. interval of revival, revive rate..etc)

### JS code styling references
- [google js style guide](https://google.github.io/styleguide/jsguide.html)
- [js best practices](https://www.w3schools.com/js/js_best_practices.asp)
- [w3 js conventions](https://www.w3schools.com/js/js_conventions.asp)
- [callback hell](http://callbackhell.com/)


### Developement environment
- IDE: Visual Studio Code (1.17.1)
- MacBook OS X
