<template>
  <Header />
    <router-view />
  <Footer />
</template>

<script setup>
import Header from './widgets/Header.vue'
import Footer from './widgets/Footer.vue'
</script>
