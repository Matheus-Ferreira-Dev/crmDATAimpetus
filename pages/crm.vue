<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessageSquare, KanbanSquare, Table as TableIcon } from 'lucide-vue-next'
import KanbanBoard from '@/components/crm/KanbanBoard.vue'
import LeadTable from '@/components/crm/LeadTable.vue'
import LeadDetailsModal from '@/components/leads/LeadDetailsModal.vue'
import type { Cliente, CrmStatus } from '@/types/crm'

const { mainMargin } = useSidebarState()

// State
const currentView = ref<'kanban' | 'table'>('kanban')
const leads = ref<Cliente[]>([])
const loading = ref(true)
const error = ref<any>(null)
const showModal = ref(false)
const selectedLead = ref<Cliente | null>(null)

// Fetch Data - MOCKED
const fetchLeads = async () => {
  loading.value = true
  error.value = null
  
  try {
    const { mockLeads } = useMockData()
    await new Promise(resolve => setTimeout(resolve, 500))
    leads.value = mockLeads as Cliente[]
  } catch (err) {
    console.error('Error fetching leads:', err)
    error.value = err
  } finally {
    loading.value = false
  }
}

const handleStatusUpdate = async (id: string, newStatus: any) => {
  const lead = leads.value.find(l => l.id === id)
  if (lead) {
    lead.estagiokanbam = newStatus as any
  }
}

const openLeadDetails = (lead: Cliente) => {
  selectedLead.value = lead
  showModal.value = true
}

const handleNotesUpdate = async (id: string, notes: string) => {
  const lead = leads.value.find(l => l.id === id)
  if (lead && (lead as any).metadata) {
    (lead as any).metadata.notes = notes
  }
}

onMounted(() => {
  fetchLeads()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white font-sans transition-colors duration-300">
    <Sidebar />

    <!-- Error Debug Output -->
    <pre v-if="error" class="fixed top-4 right-4 bg-red-50 text-red-600 dark:bg-red-900 dark:text-white p-4 rounded-xl z-50 max-w-md overflow-auto shadow-card">{{ error }}</pre>

    <main :class="[mainMargin, 'p-10 h-screen overflow-hidden flex flex-col transition-all duration-300']">
      <!-- Header -->
      <header class="flex justify-between items-center mb-8">
        <div class="flex items-center gap-4">
          <div class="p-2.5 bg-primary-50 dark:bg-primary-500/10 rounded-xl text-primary-500">
             <MessageSquare class="w-5 h-5" />
          </div>
          <div>
            <h1 class="text-xl font-bold tracking-tight flex items-center gap-3">
              Pipeline de Leads
              <span v-if="!loading" class="text-xs font-medium text-gray-500 dark:text-dark-muted px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border">
                {{ leads.length }} leads
              </span>
            </h1>
            <p class="text-gray-400 dark:text-dark-muted text-sm mt-0.5">Gerencie o fluxo de negociações.</p>
          </div>
        </div>
        
        <!-- View Toggle -->
        <div class="bg-white dark:bg-dark-surface p-1 rounded-xl border border-gray-100 dark:border-dark-border shadow-card flex gap-1 transition-colors duration-300">
          <button 
            @click="currentView = 'kanban'"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              currentView === 'kanban' ? 'bg-primary-500 text-white shadow-luxury' : 'text-gray-500 dark:text-dark-muted hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
            ]"
          >
            <KanbanSquare class="w-4 h-4" /> Kanban
          </button>
          
          <button 
            @click="currentView = 'table'"
            :class="[
               'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
               currentView === 'table' ? 'bg-primary-500 text-white shadow-luxury' : 'text-gray-500 dark:text-dark-muted hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
            ]"
          >
            <TableIcon class="w-4 h-4" /> Tabela
          </button>
        </div>
      </header>

      <!-- Content Area -->
      <div class="flex-1 overflow-hidden relative">
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-10 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm transition-colors duration-300">
           <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>

        <Transition name="fade" mode="out-in">
          <KanbanBoard 
            v-if="currentView === 'kanban'" 
            :leads="leads" 
            @update-status="handleStatusUpdate"
            @view-details="openLeadDetails"
          />
          <LeadTable 
            v-else 
            :leads="leads"
            @view-details="openLeadDetails"
          />
        </Transition>
      </div>
    </main>
  </div>

  <!-- Lead Details Modal -->
  <LeadDetailsModal
    :model-value="showModal"
    @update:model-value="showModal = $event"
    :lead="selectedLead"
    @update-status="handleStatusUpdate"
    @save-notes="handleNotesUpdate"
  />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
