<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">เกม OX กับ AI</h1>
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from './components/TicTacToe.vue'

export default {
  name: 'App',
  components: {
    GameBoard
  }
}
</script>