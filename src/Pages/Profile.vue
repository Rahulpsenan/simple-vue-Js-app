<template>
  <span>
    <user-profile></user-profile>
  </span>
</template>
<script>
import UserProfile from '@/Pages/User/Profile.vue'
export default {
  name: 'Dashboard',
  components: { UserProfile },
  data: () => ({
    role: localStorage.getItem('role'),
  })
}
</script>