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