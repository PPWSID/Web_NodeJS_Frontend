<template>
    <div class="max-w-md mx-auto">
      <!-- Game Stats -->
      <div class="flex justify-between mb-4">
        <div class="text-lg">
          ชนะ: {{ stats.wins }} | แพ้: {{ stats.losses }} | เสมอ: {{ stats.draws }}
        </div>
        <button 
          @click="resetStats"
          class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          รีเซ็ตสถิติ
        </button>
      </div>
  
      <!-- Game Board -->
      <div class="grid grid-cols-3 gap-2 mb-4">
        <BoardCell 
          v-for="(cell, index) in board"
          :key="index"
          :value="cell"
          :winning="winningCells.includes(index)"
          :disabled="gameOver || cell !== ''"
          @click="makeMove(index)"
        />
      </div>
  
      <!-- Game Status -->
      <div v-if="gameOver" class="text-center mb-4">
        <h2 class="text-xl font-bold mb-2">{{ gameOverMessage }}</h2>
        <button 
          @click="resetGame"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          เริ่มเกมใหม่
        </button>
      </div>
  
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center">
        <p>AI กำลังคิด...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue'
  import BoardCell from './TicTacToeCell.vue'
  import { checkWinner } from '../utils/TicTacToe'
  import { makeAIMove } from '../services/TicTacToe'
  
  export default {
    name: 'GameBoard',
    components: {
      BoardCell
    },
    setup() {
      const board = ref(Array(9).fill(''))
      const winningCells = ref([])
      const gameOver = ref(false)
      const gameOverMessage = ref('')
      const isLoading = ref(false)
      const stats = reactive({
        wins: 0,
        losses: 0,
        draws: 0
      })
  
      const makeMove = async (index) => {
        if (board.value[index] === '' && !gameOver.value && !isLoading.value) {
          // Player's move
          board.value[index] = 'X'
          
          if (checkGameEnd()) return
  
          // AI's move
          isLoading.value = true
          try {
            const aiMove = await makeAIMove([...board.value])
            board.value[aiMove] = 'O'
            checkGameEnd()
          } catch (error) {
            console.error('Error:', error)
          } finally {
            isLoading.value = false
          }
        }
      }
  
      const checkGameEnd = () => {
        const winner = checkWinner(board.value)
        if (winner) {
          gameOver.value = true
          if (winner === 'X') {
            gameOverMessage.value = 'คุณชนะ! 🎉'
            stats.wins++
          } else {
            gameOverMessage.value = 'AI ชนะ! 🤖'
            stats.losses++
          }
          winningCells.value = findWinningCells(board.value)
          return true
        }
        
        if (board.value.every(cell => cell !== '')) {
          gameOver.value = true
          gameOverMessage.value = 'เสมอ! 🤝'
          stats.draws++
          return true
        }
        
        return false
      }
  
      const resetGame = () => {
        board.value = Array(9).fill('')
        winningCells.value = []
        gameOver.value = false
        gameOverMessage.value = ''
      }
  
      const resetStats = () => {
        stats.wins = 0
        stats.losses = 0
        stats.draws = 0
      }
  
      return {
        board,
        winningCells,
        gameOver,
        gameOverMessage,
        isLoading,
        stats,
        makeMove,
        resetGame,
        resetStats
      }
    }
  }
  </script>