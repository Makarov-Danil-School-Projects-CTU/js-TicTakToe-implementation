Keywords: JavaScript, Game, Async

📝 Task Objective: TicTacToe - Main (5b.)

Create a classic implementation of the TicTacToe game with a 3x3 grid.

🎮 Requirements:

Object-Oriented Design:<br>
Implement the game using classes (at least one class, such as for the entire game).

Method Design:<br>
Properly design methods and their responsibilities within the class.
The class should implement one public method move(x, y) and any number of private methods as needed.

Rendering:<br>
On each move, the current game state should be rendered to the console.<br>
Provide warnings if necessary, such as:<br>
"You cannot move to x;y because this spot is already occupied!"<br>
"Game Over! x (or o) won!"<br>

🛠️ Example Console Output:

o _ _<br>
_ x _<br>
_ _ x<br>

⚠️ Example Warnings:<br>
"You cannot move to x;y because this spot is already occupied!"<br>
"Game Over! x (or o) won!"

📝 TicTacToe - Bonus 1 (+5b.)<br>
Expand the implementation to save and load the game state asynchronously, as if the state were stored on a server and you were sending/downloading the data over the internet. You do not need to set up an actual HTTP server or search for a REST API. Instead, create a class (e.g., NetworkStorage) and implement methods get() and set(x, y) asynchronously with a delay of 200ms (you can promisify setTimeout). The game state should be stored in the NetworkStorage class, and the game class should communicate with it correctly.

📝 TicTacToe - Bonus 2 (+3b.)<br>
Expand the implementation to handle any grid size, not just 3x3:<br>
const game = new TicTacToe(5) // 5x5
