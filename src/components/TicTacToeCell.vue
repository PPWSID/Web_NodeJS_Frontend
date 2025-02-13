<template>
    <button 
      class="w-full h-24 text-4xl font-bold border-2 rounded"
      :class="{
        'bg-green-200': winning,
        'hover:bg-gray-100': !disabled,
        'cursor-not-allowed': disabled
      }"
      :disabled="disabled"
      @click="$emit('click')"
    >
      {{ value }}
    </button>
  </template>
  
<script>
  export default {
    name: 'BoardCell',
    props: {
      value: {
        type: String,
        required: true
      },
      winning: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-color: black;
}

.game-container {
  text-align: center;
  background-color: black;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.game-board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
  margin: 20px 0;
}

.board-cell {
  width: 100px;
  height: 100px;
  border: 2px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.board-cell:hover {
  background-color: #f0f0f0;
}

.board-cell.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.game-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.game-status {
  margin-top: 20px;
  font-weight: bold;
}

.btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 5px;
}

.btn:hover {
  background-color: #45a049;
}
  </style>