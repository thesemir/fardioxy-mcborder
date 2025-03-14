<template>
  <div class="pt-20 min-h-screen relative">
    <!-- Page de redirection -->
    <div class="flex justify-center items-center h-full">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  // Récupération des données de l'URL
  const id = route.query.id;
  
  if (id) {
    // Rediriger vers la nouvelle page dynamique
    router.replace(`/confirmation/${id}`);
  } else {
    // Rediriger vers la page d'accueil si aucun ID
    router.replace('/');
  }
});
</script>

<style scoped>
/* Loader */
.loader {
  border: 5px solid rgba(245, 158, 11, 0.2);
  border-radius: 50%;
  border-top: 5px solid rgba(245, 158, 11, 0.8);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>