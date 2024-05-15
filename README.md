# Tic Tac Toe

Welcome to the Tic Tac Toe app! This application brings the classic game of Tic Tac Toe to your mobile device with a sleek, modern design and enhanced features.

## Table of Contents

- [Gameplay](#gameplay)
- [Features](#features)
- [Screenshots](#screenshots)
- [How to Play](#how-to-play)
- [Technical Implementations](#technical-implementations)

## Gameplay

Tic Tac Toe is a classic strategy game where two players take turns marking a space in a 10x10 grid with either an 'X' or an 'O'. The objective is to be the first player to place five of their marks in a horizontal, vertical, or diagonal row. The game ends when one player achieves this objective or all spaces on the grid are filled without a winner, resulting in a draw.

## Features

- **Start Game**: Begin your Tic Tac Toe match with a simple tap on the 'START GAME' button.
- **Settings**: Adjust your gameplay experience with the settings menu, allowing you to:
  - Change the player's name.
  - Select the difficulty level.
  - Enable or disable sounds.
  - Toggle dark mode.
  
- **Highscores**: View the high scores of previous games, including the number of rounds won or lost and the dates.
- **Game Statistics**: Analyze your game performance with detailed statistics and graphical representations of your wins, losses, and draws over a specific period.

## Screenshots

### Main Menu
<p>
<details>

![Screenshot from 2024-05-14 22-58-37](https://github.com/Empatixx/tamz-project/assets/26182195/e2df2e78-6af2-4e2d-8041-7fa06b4df3c1)

</p>
</details>

### Settings

<p>
<details>

![Screenshot from 2024-05-14 22-58-51](https://github.com/Empatixx/tamz-project/assets/26182195/c0301aed-7db8-4f72-bc3f-e3ef6849e28c)

</p>
</details>

### Highscore
<p>
<details>

![Screenshot from 2024-05-14 22-59-03](https://github.com/Empatixx/tamz-project/assets/26182195/9bdcc107-ba8d-4b4c-9c27-ab42c519bfc6)

</p>
</details>

### Game Statistics

<p>
<details>

![Screenshot from 2024-05-14 22-59-10](https://github.com/Empatixx/tamz-project/assets/26182195/87e05b8a-0738-4878-a0e4-a6c80ab3c673)

</p>
</details>

### In-Game
<p>
<details>

![Screenshot from 2024-05-14 22-59-36](https://github.com/Empatixx/tamz-project/assets/26182195/d79991c3-2d84-4a94-bdf3-35dbc8317a94)

</p>
</details>

## How to Play

1. **Start the Game**: From the main menu, tap on 'START GAME' to begin.
2. **Make Your Move**: Players take turns to place their marks ('X' or 'O') on the 10x10 grid.
3. **Win the Game**: Align five of your marks in a row horizontally, vertically, or diagonally to win.
4. **Game Over**: The game ends when one player wins or when all spaces are filled without a winner, resulting in a draw.

## Technical Implementations

- **Parallel Monte Carlo Algorithm using web workers**
- **Typescript**
- **React with Ionic**
- **Capacitor**
- **IndexedDB**

## How to run
```
ionic build
ionic copy
ionic cap open android/ios
ionic cap run android/ios
```
