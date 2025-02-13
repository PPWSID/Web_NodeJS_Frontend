<template>
  <div class="game-container">
    <div class="game-title">
      <h1>Tic Tac Toe</h1>
    </div>
    
    <div class="game-stats">
      <span>Win: {{ stats.win }}</span>
      <span>Lose: {{ stats.lose }}</span>
      <span>Draw: {{ stats.draw }}</span>
      <button @click="resetGame">New Game</button>
    </div>

    <div class="game-result">
      {{ resultMessage }}
    </div>

    <div class="game-board">
      <div 
        v-for="(cell, index) in board" 
        :key="index"
        class="cell"
        @click="makeMove(index)"
      >
        {{ cell }}
      </div>
    </div>
 
  </div>
</template>
  
<script>
import  {makeAIMove}  from '../services/TicTacToe';

export default {
  data() {
    return {
      board: Array(9).fill(''),
      resultMessage: 'GAME ON!',
      stats: {
        win: 0,
        lose: 0,
        draw: 0
      },
      gameOver: false 
    };
  },
  methods: {
    makeMove(index) {
      if (this.board[index] === '' && !this.gameOver) { 
        this.board[index] = 'X';

        const winner = this.checkGameStatus(); 

        if (!winner) {
          this.aiMove();
        }
      }
    },
    async aiMove() {
      if (this.gameOver) return; 

      const aiIndex = await makeAIMove(this.board);
      console.log(aiIndex);
      
      this.board[aiIndex] = 'O';
      this.checkGameStatus();
      
    },
    checkGameStatus() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      for (let [a, b, c] of winPatterns) {
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          this.gameOver = true;
          this.resultMessage = this.board[a] === 'X' ? 'You Win!' : 'AI Wins!';
          this.stats[this.board[a] === 'X' ? 'win' : 'lose']++;
          return this.board[a]; 
        }
      }

      if (this.board.every(cell => cell !== '')) {
        this.gameOver = true;
        this.resultMessage = 'Draw!';
        this.stats.draw++;
        return 'draw'; 
      }

      return null; 
    },
    resetGame() {
      this.board = Array(9).fill('');
      this.gameOver = false;
      this.resultMessage = 'GAME ON!';
    }
  }
};
</script>


<style scoped>
.game-container {
  text-align: center;
  width: 350px;
  /* margin: auto; */
}

.game-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.cell {
  border: 1px solid white;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  cursor: pointer;
}

.game-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.game-stats span {
  text-align: center;
  padding-top: 10px;
  width: 70px ;
}

.game-result {
  margin-top: 20px;
}
</style>