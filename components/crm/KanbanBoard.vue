<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { Phone, Lock, Bot, Eye, EyeOff } from 'lucide-vue-next'
import type { Cliente, CrmStatus } from '@/types/crm'

const props = defineProps<{
  leads: Cliente[]
}>()

const emit = defineEmits<{
  (e: 'update-status', id: string, newStatus: CrmStatus): void
  (e: 'view-details', lead: Cliente): void
}>()

// Columns Configuration — unified blue-based style
const columnsConfig = [
  { key: 'novo' as CrmStatus, label: 'Novo' },
  { key: 'contato' as CrmStatus, label: 'Contato' },
  { key: 'qualificando' as CrmStatus, label: 'Qualificando' },
  { key: 'Engajado' as CrmStatus, label: 'Engajado' },
  { key: 'qualificado' as CrmStatus, label: 'Qualificado' },
  { key: 'agendado' as CrmStatus, label: 'Agendado' }
]

const columnsData = computed(() => {
  const map: Record<string, any> = {}
  columnsConfig.forEach(col => {
    map[col.key] = computed({
      get: () => {
        if (col.key === 'novo') {
          return props.leads.filter(l => !l.estagiokanbam || l.estagiokanbam === '' || l.estagiokanbam === 'novo')
        }
        return props.leads.filter(l => l.estagiokanbam === col.key)
      },
      set: (newVal: Cliente[]) => {
        const movedLead = newVal.find(l => l.estagiokanbam !== col.key)
        if (movedLead) {
           emit('update-status', movedLead.id, col.key)
        }
      }
    })
  })
  return map
})

// Auto-scroll during drag
const kanbanRef = ref<HTMLElement | null>(null)
let scrollInterval: ReturnType<typeof setInterval> | null = null
const isDragging = ref(false)

const onDragStart = () => { isDragging.value = true }
const onDragEnd = () => { isDragging.value = false; stopDragScroll() }

const handleDragScroll = (e: MouseEvent) => {
  if (!isDragging.value) return
  const container = kanbanRef.value
  if (!container) return
  
  const rect = container.getBoundingClientRect()
  const edgeZone = 80
  const scrollSpeed = 12
  
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
  
  if (e.clientX - rect.left < edgeZone) {
    scrollInterval = setInterval(() => {
      container.scrollLeft -= scrollSpeed
    }, 16)
  } else if (rect.right - e.clientX < edgeZone) {
    scrollInterval = setInterval(() => {
      container.scrollLeft += scrollSpeed
    }, 16)
  }
}

const stopDragScroll = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleDragScroll)
  document.addEventListener('mouseup', stopDragScroll)
  document.addEventListener('dragend', stopDragScroll)
})

onUnmounted(() => {
  stopDragScroll()
  document.removeEventListener('mousemove', handleDragScroll)
  document.removeEventListener('mouseup', stopDragScroll)
  document.removeEventListener('dragend', stopDragScroll)
})
</script>

<template>
  <div ref="kanbanRef" class="flex gap-5 overflow-x-auto pb-6 h-[calc(100vh-180px)] kanban-scroll">
    <div 
      v-for="col in columnsConfig" 
      :key="col.key" 
      class="min-w-[300px] w-[300px] flex flex-col"
    >
      <!-- Column Header -->
      <div class="flex items-center justify-between mb-4 px-1">
        <div class="flex items-center gap-2.5">
          <div class="w-2 h-2 rounded-full bg-primary-500"></div>
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">{{ col.label }}</span>
          <span class="bg-gray-100 dark:bg-dark-card text-gray-500 dark:text-dark-muted text-xs font-medium px-2 py-0.5 rounded-full">
            {{ columnsData[col.key].value.length }}
          </span>
        </div>
      </div>

      <!-- Draggable Area -->
      <VueDraggable
        v-model="columnsData[col.key].value"
        :group="{ name: 'crm-leads' }"
        :animation="200"
        ghost-class="ghost-card"
        class="flex-1 flex flex-col gap-3 min-h-[100px] p-1"
        @start="onDragStart"
        @end="onDragEnd"
      >
        <div 
          v-for="lead in columnsData[col.key].value"
          :key="lead.id" 
          class="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl p-4 cursor-grab active:cursor-grabbing hover:shadow-card-hover hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200 group flex flex-col gap-3"
        >
          <!-- Header: Avatar + Name -->
          <div class="flex items-center gap-3">
            <div v-if="lead.media_url" class="w-9 h-9 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100 dark:border-dark-border">
              <img :src="lead.media_url" :alt="lead.name || 'Avatar'" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-500/20">
              {{ (lead.name || 'D').charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
               <span class="font-semibold text-gray-900 dark:text-white text-sm block truncate">{{ lead.name || 'Desconhecido' }}</span>
            </div>
            <button 
              @click="emit('view-details', lead)"
              class="p-1.5 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              title="Ver Detalhes"
            >
              <Eye class="w-4 h-4" />
            </button>
          </div>

          <!-- Phone -->
          <div class="flex items-center gap-2 text-gray-400 dark:text-dark-muted text-xs bg-gray-50 dark:bg-dark-card p-2.5 rounded-lg">
             <Phone class="w-3 h-3 flex-shrink-0" />
             <span class="font-mono blur-sm select-none hover:blur-none transition-all">{{ lead.remotejid }}</span>
          </div>

          <!-- Footer: Badges -->
          <div class="flex items-center justify-between">
            <span 
              v-if="lead.qualificado" 
              class="text-[10px] font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              Qualificado
            </span>
            <span 
              v-else 
              class="text-[10px] font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-dark-card text-gray-400"
            >
               Não qualificado
            </span>

            <div v-if="lead.trava" class="text-amber-500" title="Modo Manual">
               <Lock class="w-3.5 h-3.5" />
            </div>
            <div v-else class="text-primary-500" title="Modo Automático (IA)">
               <Bot class="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="columnsData[col.key].value.length === 0" class="flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-dark-border rounded-xl m-1 min-h-[100px]">
          <span class="text-gray-300 dark:text-gray-600 text-xs font-medium">Vazio</span>
        </div>
      </VueDraggable>
    </div>
  </div>
</template>

<style scoped>
.ghost-card {
  opacity: 0.4;
  background: #F3F4F6;
  border: 1px dashed #D1D5DB;
}

:root.dark .ghost-card {
  background: #1F2937;
  border: 1px dashed #374151;
}

.kanban-scroll {
  scrollbar-width: auto;
  scrollbar-color: #93C5FD #E5E7EB;
}

:root.dark .kanban-scroll {
  scrollbar-color: #1E40AF #1F2937;
}

.kanban-scroll::-webkit-scrollbar {
  height: 10px;
}

.kanban-scroll::-webkit-scrollbar-track {
  background: #E5E7EB;
  border-radius: 8px;
}

:root.dark .kanban-scroll::-webkit-scrollbar-track {
  background: #1F2937;
}

.kanban-scroll::-webkit-scrollbar-thumb {
  background: #93C5FD;
  border-radius: 8px;
  border: 2px solid #E5E7EB;
}

.kanban-scroll::-webkit-scrollbar-thumb:hover {
  background: #60A5FA;
}

:root.dark .kanban-scroll::-webkit-scrollbar-thumb {
  background: #1E40AF;
  border: 2px solid #1F2937;
}

:root.dark .kanban-scroll::-webkit-scrollbar-thumb:hover {
  background: #2563EB;
}
</style>
