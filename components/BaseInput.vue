<template>
  <div class="space-y-1.5 w-full">
    <label v-if="label" :for="id" class="block text-sm font-semibold text-slate-700 dark:text-slate-200">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 bg-white border border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-dark-surface dark:border-dark-border dark:text-white dark:placeholder-dark-muted dark:focus:border-primary-400 dark:focus:ring-primary-500/10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string
  id?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
