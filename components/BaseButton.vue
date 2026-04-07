<template>
  <button 
    :class="[
      'px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2 focus:ring-offset-transparent',
      variantClasses[variant],
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  disabled?: boolean
}>(), {
  variant: 'primary',
  disabled: false
})

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-card',
  secondary: 'bg-white border border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-50 dark:bg-dark-surface dark:border-dark-border dark:text-white dark:hover:bg-dark-card',
  ghost: 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-dark-muted dark:hover:text-white dark:hover:bg-white/5',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-card'
}
</script>
