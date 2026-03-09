<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  CalendarDays, ChevronLeft, ChevronRight, Clock, User
} from 'lucide-vue-next'

const { mainMargin } = useSidebarState()

// Doctors
const doctors = [
  { id: 'dr1', name: 'Dr. Ricardo Mendes', color: 'bg-blue-500', light: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/20' },
  { id: 'dr2', name: 'Dra. Camila Ferreira', color: 'bg-emerald-500', light: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20' },
  { id: 'dr3', name: 'Dr. André Bastos', color: 'bg-violet-500', light: 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/20' },
]

// State
const currentDate = ref(new Date())
const viewMode = ref<'week' | 'day'>('week')

// Current week days
const weekDays = computed(() => {
  const d = new Date(currentDate.value)
  const day = d.getDay()
  const monday = new Date(d)
  monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  
  const days = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    days.push(date)
  }
  return days
})

const weekLabel = computed(() => {
  const first = weekDays.value[0]
  const last = weekDays.value[6]
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  if (first!.getMonth() === last!.getMonth()) {
    return `${first!.getDate()} – ${last!.getDate()} ${months[first!.getMonth()]} ${first!.getFullYear()}`
  }
  return `${first!.getDate()} ${months[first!.getMonth()]} – ${last!.getDate()} ${months[last!.getMonth()]} ${last!.getFullYear()}`
})

const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

// Navigate
const prevWeek = () => {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() - 7)
  currentDate.value = d
}
const nextWeek = () => {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() + 7)
  currentDate.value = d
}
const goToday = () => {
  currentDate.value = new Date()
}

// Check if date is today
const isToday = (date: Date) => {
  const today = new Date()
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}

// Mock appointments (recurring weekly pattern based on day-of-week)
const mockAppointments = [
  // Monday
  { day: 1, hour: '09:00', duration: 1, doctor: 'dr1', patient: 'Isabella Rezende', procedure: 'Avaliação Lentes' },
  { day: 1, hour: '10:00', duration: 1, doctor: 'dr2', patient: 'Ana Clara Moreira', procedure: 'Clareamento' },
  { day: 1, hour: '14:00', duration: 2, doctor: 'dr1', patient: 'Carlos Albuquerque', procedure: 'Protocolo — Planej.' },
  { day: 1, hour: '15:00', duration: 1, doctor: 'dr3', patient: 'Roberto Junqueira', procedure: 'Emergência Implante' },
  // Tuesday
  { day: 2, hour: '08:00', duration: 1, doctor: 'dr2', patient: 'Mariana Costa', procedure: 'Avaliação Clareamento' },
  { day: 2, hour: '10:00', duration: 2, doctor: 'dr1', patient: 'Dr. Fernando Mello', procedure: 'Lentes E-max — Prep' },
  { day: 2, hour: '14:00', duration: 1, doctor: 'dr3', patient: 'Pedro Henrique Silva', procedure: 'Implante Consulta' },
  { day: 2, hour: '16:00', duration: 1, doctor: 'dr2', patient: 'Juliana Ferreira', procedure: 'Profilaxia' },
  // Wednesday
  { day: 3, hour: '09:00', duration: 2, doctor: 'dr1', patient: 'Carolina Almeida', procedure: 'Invisalign Moldagem' },
  { day: 3, hour: '11:00', duration: 1, doctor: 'dr3', patient: 'Marcos Vinícius', procedure: 'Avaliação Protocolo' },
  { day: 3, hour: '14:00', duration: 1, doctor: 'dr2', patient: 'Patrícia Gomes', procedure: 'Retorno Clareamento' },
  { day: 3, hour: '15:00', duration: 1, doctor: 'dr1', patient: 'Ricardo Santos', procedure: 'Lentes — Cimentação' },
  // Thursday
  { day: 4, hour: '08:00', duration: 1, doctor: 'dr3', patient: 'Isabella Rezende', procedure: 'Retorno Avaliação' },
  { day: 4, hour: '10:00', duration: 2, doctor: 'dr1', patient: 'Carlos Albuquerque', procedure: 'Protocolo — Cirurgia' },
  { day: 4, hour: '14:00', duration: 1, doctor: 'dr2', patient: 'Ana Clara Moreira', procedure: 'Moldagem Clareamento' },
  { day: 4, hour: '16:00', duration: 1, doctor: 'dr3', patient: 'Roberto Junqueira', procedure: 'Controle Implante' },
  // Friday
  { day: 5, hour: '09:00', duration: 1, doctor: 'dr2', patient: 'Mariana Costa', procedure: 'Clareamento Sessão 1' },
  { day: 5, hour: '10:00', duration: 1, doctor: 'dr1', patient: 'Dr. Fernando Mello', procedure: 'Lentes E-max — Prova' },
  { day: 5, hour: '14:00', duration: 2, doctor: 'dr3', patient: 'Pedro Henrique Silva', procedure: 'Implante — Cirurgia' },
  { day: 5, hour: '15:00', duration: 1, doctor: 'dr2', patient: 'Juliana Ferreira', procedure: 'Limpeza Periodontal' },
]

// Get appointments for a specific day/hour
const getAppointments = (dayDate: Date, hour: string) => {
  const dayOfWeek = dayDate.getDay() === 0 ? 7 : dayDate.getDay()
  return mockAppointments.filter(a => a.day === dayOfWeek && a.hour === hour)
}

// Get doctor info
const getDoctor = (id: string) => doctors.find(d => d.id === id)

// Stats
const todayCount = computed(() => {
  const today = new Date()
  const dow = today.getDay() === 0 ? 7 : today.getDay()
  return mockAppointments.filter(a => a.day === dow).length
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white font-sans transition-colors duration-300">
    <Sidebar />

    <main :class="[mainMargin, 'p-8 transition-all duration-300']">
      <!-- Header -->
      <header class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="p-2.5 bg-primary-50 dark:bg-primary-500/10 rounded-xl text-primary-500">
            <CalendarDays class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-xl font-bold tracking-tight">Agenda</h1>
            <p class="text-gray-400 dark:text-dark-muted text-sm mt-0.5">{{ todayCount }} agendamentos hoje</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Doctor Legend -->
          <div class="flex items-center gap-3 mr-4">
            <div v-for="doc in doctors" :key="doc.id" class="flex items-center gap-1.5">
              <div :class="['w-2.5 h-2.5 rounded-full', doc.color]"></div>
              <span class="text-[11px] font-medium text-gray-500 dark:text-dark-muted">{{ doc.name }}</span>
            </div>
          </div>

          <!-- Navigation -->
          <button @click="goToday" class="px-3 py-1.5 text-xs font-semibold text-primary-500 bg-primary-50 dark:bg-primary-500/10 rounded-lg border border-primary-200 dark:border-primary-500/20 hover:bg-primary-100 transition-colors">
            Hoje
          </button>
          <div class="flex items-center gap-1">
            <button @click="prevWeek" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
              <ChevronLeft class="w-4 h-4" />
            </button>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-[200px] text-center">{{ weekLabel }}</span>
            <button @click="nextWeek" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <!-- Calendar Grid -->
      <div class="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl overflow-hidden">
        <!-- Day Headers -->
        <div class="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-100 dark:border-dark-border">
          <div class="p-2"></div>
          <div 
            v-for="(day, idx) in weekDays" 
            :key="idx"
            :class="[
              'py-3 px-2 text-center border-l border-gray-100 dark:border-dark-border',
              isToday(day) ? 'bg-primary-50/50 dark:bg-primary-500/5' : ''
            ]"
          >
            <span class="text-[10px] font-semibold text-gray-400 dark:text-dark-muted uppercase tracking-wider">{{ dayLabels[idx] }}</span>
            <p :class="[
              'text-lg font-bold mt-0.5',
              isToday(day) ? 'text-primary-500' : 'text-gray-900 dark:text-white'
            ]">
              {{ day.getDate() }}
            </p>
          </div>
        </div>

        <!-- Time Slots -->
        <div class="max-h-[calc(100vh-260px)] overflow-y-auto">
          <div v-for="hour in hours" :key="hour" class="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-50 dark:border-dark-border/50 min-h-[70px]">
            <!-- Hour Label -->
            <div class="p-2 text-[11px] font-medium text-gray-400 dark:text-dark-muted text-right pr-3 pt-1">
              {{ hour }}
            </div>

            <!-- Day Cells -->
            <div 
              v-for="(day, dayIdx) in weekDays" 
              :key="dayIdx"
              :class="[
                'border-l border-gray-50 dark:border-dark-border/50 p-0.5 relative',
                isToday(day) ? 'bg-primary-50/20 dark:bg-primary-500/[0.02]' : ''
              ]"
            >
              <!-- Appointments -->
              <div 
                v-for="apt in getAppointments(day, hour)" 
                :key="apt.patient + apt.hour"
                :class="[
                  'rounded-lg p-2 border text-[11px] leading-tight cursor-default',
                  getDoctor(apt.doctor)?.light
                ]"
                :style="{ minHeight: (apt.duration * 66 - 4) + 'px' }"
              >
                <div class="flex items-center gap-1 mb-0.5">
                  <div :class="['w-1.5 h-1.5 rounded-full flex-shrink-0', getDoctor(apt.doctor)?.color]"></div>
                  <span class="font-bold truncate">{{ apt.patient }}</span>
                </div>
                <p class="text-[10px] opacity-75 truncate">{{ apt.procedure }}</p>
                <div class="flex items-center gap-1 mt-1 opacity-60">
                  <Clock class="w-2.5 h-2.5" />
                  <span class="text-[9px]">{{ apt.hour }} · {{ apt.duration }}h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
