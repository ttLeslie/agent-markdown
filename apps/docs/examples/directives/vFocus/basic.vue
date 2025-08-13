<template>
  <input v-focus type="text" value="123" />
</template>

<script setup lang="ts">
import { vFocus } from '@agentX/directives';
</script>

<style scoped>
input {
  all: revert;
}
</style>
