<template>
    <router-link to="/tictactoe">
      <v-img
        :src="iconpicture" 
        alt="ไปยังหน้า Tic Tac Toe"
        width="500"
        height="300"
        cover
        class="cursor-pointer"
      ></v-img>
    </router-link>
</template>
  
<script setup>
  import iconpicture from '../assets/images/tictactoeicons.png';
</script>
  