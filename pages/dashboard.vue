<template>
    <div>
      <h1>Bienvenue sur votre Dashboard</h1>
      <p>Voici des informations sensibles réservées aux utilisateurs authentifiés.</p>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    middleware: ['auth'] // Applique le middleware uniquement à la page du tableau de bord
  })
  </script>
  