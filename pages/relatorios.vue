<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download, FileText, CheckCircle2 } from 'lucide-vue-next'

const supabase = useSupabaseClient()

// State
const reports = ref<any[]>([])
const loading = ref(true)
const selectedPeriod = ref('30d')

// Stats (calculated from clients for now)
const stats = ref([
  {
    title: 'Total de Leads',
    value: '0',
    change: 'Total',
    trend: 'up',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Qualificados',
    value: '0',
    change: 'Conversão',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-[#00E096]',
    bgColor: 'bg-[#00E096]/10'
  }
])

const fetchReports = async () => {
  loading.value = true
  
  // 1. Fetch real reports from 'relatorio' table
  const { data: reportsData } = await supabase
    .from('relatorio')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)
  
  if (reportsData) reports.value = reportsData

  // 2. Fetch some stats from clients
  const { count: totalLeads } = await supabase.from('clients').select('*', { count: 'exact', head: true })
  const { count: qualifiedLeads } = await supabase.from('clients').select('*', { count: 'exact', head: true }).eq('is_qualified', true)

  stats.value[0].value = (totalLeads || 0).toString()
  stats.value[1].value = (qualifiedLeads || 0).toString()
  
  loading.value = false
}

onMounted(() => {
  fetchReports()
})
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary-500 selection:text-black">
    <Sidebar />

    <main class="ml-64 p-8">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-[#00E096]/10 rounded-xl text-[#00E096]">
              <BarChart3 class="w-6 h-6" />
            </div>
            <div>
              <h1 class="text-3xl font-bold tracking-tight">Relatórios & Performance</h1>
              <p class="text-[#9CA3AF] text-sm mt-1">Dados reais de leads e registros de automação</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button class="flex items-center gap-2 px-4 py-2.5 bg-[#00E096] text-black rounded-lg text-sm font-bold hover:bg-[#00B87A] transition-all">
              <Download class="w-4 h-4" />
              Exportar Dados
            </button>
          </div>
        </div>
      </header>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 hover:border-[#27272A] transition-all"
        >
          <div class="flex items-start justify-between mb-4">
            <div :class="['p-3 rounded-xl', stat.bgColor]">
              <component :is="stat.icon" :class="['w-6 h-6', stat.color]" />
            </div>
          </div>
          <h3 class="text-[#9CA3AF] text-sm mb-2">{{ stat.title }}</h3>
          <p class="text-3xl font-bold text-white">{{ stat.value }}</p>
        </div>
      </div>

      <!-- Real Reports from Table -->
      <div class="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-[#1F1F1F] flex items-center justify-between">
          <h2 class="text-lg font-bold text-white">Registros de Atividade (Relatório)</h2>
          <span class="text-xs text-[#9CA3AF]">{{ reports.length }} registros recentes</span>
        </div>

        <div v-if="loading" class="p-12 text-center text-[#9CA3AF]">
          Carregando registros...
        </div>
        
        <div v-else-if="reports.length === 0" class="p-12 text-center text-[#9CA3AF]">
          Nenhum registro encontrado na tabela de relatórios.
        </div>

        <div v-else class="divide-y divide-[#1F1F1F]">
          <div v-for="report in reports" :key="report.id" class="px-6 py-4 hover:bg-[#121212] transition-all">
            <div class="flex items-start gap-4">
              <div :class="['mt-1', report.lido ? 'text-gray-600' : 'text-[#00E096]']">
                <CheckCircle2 class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <p class="text-white text-sm leading-relaxed">{{ report.texto }}</p>
                <div class="flex items-center gap-4 mt-2">
                  <span class="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider">
                    {{ new Date(report.created_at).toLocaleString() }}
                  </span>
                  <span v-if="!report.lido" class="px-2 py-0.5 rounded bg-[#00E096]/10 text-[#00E096] text-[10px] font-bold">NOVO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="bg-[#121212] border border-[#1F1F1F] rounded-xl p-6 text-center">
        <BarChart3 class="w-12 h-12 text-[#9CA3AF]/20 mx-auto mb-3" />
        <h3 class="text-white font-bold mb-2">Análise Avançada</h3>
        <p class="text-[#9CA3AF] text-sm max-w-md mx-auto">
          Gráficos e dashboards complexos estão sendo integrados diretamente com os dados de vertical e score gerados pela IA.
        </p>
      </div>
    </main>
  </div>
</template>
