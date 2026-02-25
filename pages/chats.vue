<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { MessageSquare, Phone, Search, FileText, Menu, X, BotOff, Bot } from 'lucide-vue-next'

const supabase = useSupabaseClient()
const route = useRoute()

// State
const chats = ref<any[]>([])
const selectedChat = ref<any>(null)
const messages = ref<any[]>([])
const loading = ref(true)
const messagesLoading = ref(false)
const searchQuery = ref('')
const isSidebarOpen = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

// Fetch Clients to populate chat list
const fetchChats = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('clients')
    .select('id, name, remotejid, about, ultimamensagemusuario, media_url, "Ativado", estagiokanbam')
    .order('ultimamensagemusuario', { ascending: false })

  if (error) {
    console.error('Error fetching chats from clients:', error)
  } else {
    chats.value = (data || []).map(c => ({
      id: c.id,
      name: c.name || 'Sem nome',
      phone: c.remotejid,
      lastMessage: c.about || 'Sem histórico',
      timestamp: c.ultimamensagemusuario ? new Date(c.ultimamensagemusuario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---',
      avatar: (c.name || 'U').charAt(0).toUpperCase(),
      media_url: c.media_url,
      Ativado: c.Ativado,
      estagiokanbam: c.estagiokanbam || 'novo'
    }))

    // Auto-select first chat or from query
    const clientId = route.query.clientId as string
    if (clientId) {
      const chat = chats.value.find(c => c.id === clientId || c.phone === clientId)
      if (chat) selectChat(chat)
    } else if (chats.value.length > 0) {
      selectChat(chats.value[0])
    }
  }
  loading.value = false
}

// Fetch Messages for selected chat
const fetchMessages = async (sessionId: string) => {
  messagesLoading.value = true
  // Session ID in n8n_chat_histories matches remotejid
  const { data, error } = await supabase
    .from('n8n_chat_histories')
    .select('*')
    .eq('session_id', sessionId)
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching messages:', error)
  } else {
    messages.value = (data || [])
      .map(m => {
        // Parse the JSON correctly
        let msgData: any = {}
        try {
          msgData = typeof m.message === 'string' ? JSON.parse(m.message) : m.message
        } catch (e) {
          console.error('Error parsing message JSON', e)
        }

        // Use the type for flow side, ignore tools or empty messages if desired
        const isHuman = msgData.type === 'human'
        
        return {
          id: m.id,
          // 'user' (left side) means the Lead/Customer sent it (human). 
          // 'me' (right side) means the System/AI sent it.
          // Wait, the human is the lead (left). AI is the system answering (right).
          sender: isHuman ? 'user' : 'me', 
          text: msgData.content || '',
          timestamp: '', // Optional: format from db trigger if available
          type: msgData.type || 'unknown'
        }
      })
      // Filtrar apenas mensagens válidas que tenham conteúdo textual real para o cliente
      .filter(m => {
        if (!m.text) return false
        const t = m.text.trim()
        if (t.length === 0) return false
        if (t === '""' || t === "''" || t === '```json' || t === '```') return false // Ignore empty strings or markdown block starts
        if (t.startsWith('Calling ') || t.startsWith('{"guardrailsInput"')) return false // Ignore Tool Calls from LangChain/n8n
        return true
      })
    scrollToBottom()
  }
  messagesLoading.value = false
}

const selectChat = (chat: any) => {
  selectedChat.value = chat
  isSidebarOpen.value = false // Auto close drawer when changing chats
  fetchMessages(chat.phone)
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Actions
const toggleAI = async () => {
  if (!selectedChat.value) return
  const newValue = !selectedChat.value.Ativado
  selectedChat.value.Ativado = newValue
  
  // Note: Database column is 'Ativado' with capital A.
  await supabase.from('clients')
    .update({ Ativado: newValue } as never) // Cast to never to bypass TS errors if needed for custom cols
    .eq('id', selectedChat.value.id)
}

const updateStatus = async () => {
  if (!selectedChat.value) return
  await supabase.from('clients')
    .update({ estagiokanbam: selectedChat.value.estagiokanbam } as never)
    .eq('id', selectedChat.value.id)
}

onMounted(() => {
  fetchChats()
})
</script>

<template>
  <div class="h-screen w-full bg-[#050505] text-white font-sans flex overflow-hidden">
    <Sidebar />

    <!-- Chat Sidebar (Left) -->
    <aside class="w-80 border-r border-[#1F1F1F] flex flex-col bg-[#0A0A0A] ml-64 flex-shrink-0">
      <!-- Search -->
      <div class="p-4 border-b border-[#1F1F1F]">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar conversas..."
            class="w-full bg-[#121212] border border-[#27272A] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E096]/50"
          />
        </div>
      </div>

      <!-- Chat List -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="loading" class="p-8 text-center text-[#9CA3AF]">
          Carregando...
        </div>
        <div v-else-if="chats.length === 0" class="p-8 text-center text-[#9CA3AF]">
          Nenhuma conversa encontrada.
        </div>
        <button
          v-for="chat in chats"
          :key="chat.id"
          @click="selectChat(chat)"
          :class="[
            'w-full p-4 flex gap-3 border-b border-[#1F1F1F] transition-all hover:bg-[#121212]',
            selectedChat?.id === chat.id ? 'bg-[#121212] border-l-2 border-l-[#00E096]' : ''
          ]"
        >
          <div v-if="chat.media_url" class="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden border border-[#27272A]">
            <img :src="chat.media_url" :alt="chat.name" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-12 h-12 rounded-full bg-gradient-to-br from-[#00E096] to-[#00B87A] flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
            {{ chat.avatar }}
          </div>
          <div class="flex-1 min-w-0 text-left">
            <div class="flex items-center justify-between mb-1">
              <h3 class="font-bold text-white truncate text-sm">{{ chat.name }}</h3>
              <span class="text-[10px] text-[#9CA3AF] uppercase">{{ chat.timestamp }}</span>
            </div>
            <p class="text-xs text-[#9CA3AF] truncate">{{ chat.lastMessage }}</p>
          </div>
        </button>
      </div>
    </aside>

    <!-- Chat Content (Middle) -->
    <section class="flex-1 flex flex-col bg-[#050505] relative min-w-0">
      <div v-if="selectedChat" class="flex-1 flex flex-col overflow-hidden relative">
        <!-- Header -->
        <header class="p-4 border-b border-[#1F1F1F] bg-[#0A0A0A] flex items-center justify-between z-20">
          <div class="flex items-center gap-3">
            <div v-if="selectedChat.media_url" class="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden border border-[#27272A]">
              <img :src="selectedChat.media_url" :alt="selectedChat.name" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E096] to-[#00B87A] flex items-center justify-center text-black font-bold">
              {{ selectedChat.avatar }}
            </div>
            <div>
              <h2 class="font-bold text-white">{{ selectedChat.name }}</h2>
              <p class="text-xs text-[#9CA3AF] flex items-center gap-1">
                <Phone class="w-3 h-3" />
                {{ selectedChat.phone }}
              </p>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <NuxtLink 
              :to="`/crm?clientId=${selectedChat.id}`"
              class="flex items-center gap-2 px-3 py-1.5 bg-[#1F1F1F] text-white rounded-lg text-xs font-bold hover:bg-[#27272A] border border-[#27272A] transition-all"
            >
              <FileText class="w-3 h-3" /> Ver no CRM
            </NuxtLink>

            <!-- Menu Hamburger -->
            <button 
              @click="isSidebarOpen = !isSidebarOpen"
              class="p-1 text-[#9CA3AF] hover:text-white transition-colors hover:bg-white/10 rounded"
              title="Ações"
            >
              <Menu class="w-5 h-5" v-if="!isSidebarOpen" />
              <X class="w-5 h-5 text-white" v-else />
            </button>
          </div>
        </header>

        <!-- Messages Area -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto overflow-x-hidden p-6 flex flex-col gap-4 relative custom-scrollbar pb-24">
          <div v-if="messagesLoading" class="flex-1 flex items-center justify-center">
             <p class="text-[#9CA3AF]">Carregando histórico...</p>
          </div>
          <div v-else-if="messages.length === 0" class="flex-1 flex items-center justify-center">
             <p class="text-[#9CA3AF]">Nenhuma mensagem encontrada nesta sessão.</p>
          </div>
          <div
            v-else
            v-for="message in messages"
            :key="message.id"
            :class="[
              'flex',
              message.sender === 'me' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-md px-4 py-3 rounded-2xl shadow-lg overflow-hidden shrink-0',
                message.sender === 'me' 
                  ? 'bg-gradient-to-br from-[#00E096] to-[#00B87A] text-black rounded-br-none' 
                  : 'bg-[#1F1F1F] text-white border border-[#27272A] rounded-bl-none'
              ]"
            >
              <p class="text-sm leading-relaxed whitespace-pre-wrap break-words break-all">{{ message.text }}</p>
              <p v-if="message.timestamp" :class="['text-[10px] mt-1 text-right', message.sender === 'me' ? 'text-black/60' : 'text-[#9CA3AF]']">
                {{ message.timestamp }}
              </p>
            </div>
          </div>
        </div>

        <!-- Floating Action Button: Gerar Resumo -->
        <div class="absolute bottom-20 right-6 z-30">
           <button class="bg-[#1F1F1F] hover:bg-[#27272A] border border-[#333] shadow-2xl text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold transition-transform hover:-translate-y-1">
             <FileText class="w-4 h-4 text-[#00E096]" /> GERAR RESUMO
           </button>
        </div>

        <!-- Footer: Input (Read Only for now) -->
        <footer class="p-4 border-t border-[#1F1F1F] bg-[#0A0A0A] z-20">
          <div class="bg-[#121212] border border-orange-500/20 text-orange-500/80 px-4 py-2 rounded-lg text-xs text-center border-dashed">
            O envio de mensagens deve ser feito via WhatsApp ou automação externa.
          </div>
        </footer>
      </div>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-[#9CA3AF] p-12">
        <div class="w-20 h-20 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl flex items-center justify-center mb-6">
          <MessageSquare class="w-10 h-10 opacity-20" />
        </div>
        <h2 class="text-xl font-bold text-white mb-2">Selecione uma conversa</h2>
        <p class="text-center max-w-xs text-sm">Escolha um lead à esquerda para visualizar o histórico completo da conversa com a IA.</p>
      </div>
    </section>

    <!-- Side Actions Drawer (Right) -->
    <aside 
      v-if="isSidebarOpen && selectedChat" 
      class="w-72 border-l border-[#1F1F1F] bg-[#0A0A0A] flex flex-col flex-shrink-0 animate-in slide-in-from-right duration-200"
    >
      <div class="p-6 border-b border-[#1F1F1F]/50">
        <h2 class="font-extrabold text-white text-xl">Ações</h2>
      </div>

      <div class="p-6 flex flex-col gap-8 flex-1 overflow-y-auto">
        <!-- AI Toggle Section -->
        <div>
          <label class="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 block font-bold">IA</label>
          <button 
            @click="toggleAI"
            :class="[
              'w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all border text-sm',
              selectedChat.Ativado 
                ? 'bg-[#00E096]/10 text-[#00E096] hover:bg-[#00E096]/20 border-[#00E096]/20'
                : 'bg-[#2A1115] text-[#EF4444] hover:bg-[#3B181E] border-[#441C23]' 
            ]"
          >
            <BotOff class="w-4 h-4" v-if="!selectedChat.Ativado" />
            <Bot class="w-4 h-4" v-else />
            {{ selectedChat.Ativado ? 'Ativada' : 'Desativar' }}
          </button>
        </div>

        <!-- Status Section -->
        <div>
          <label class="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 block font-bold">Status</label>
          <div class="relative">
            <select 
              v-model="selectedChat.estagiokanbam" 
              @change="updateStatus"
              class="w-full bg-[#121212] border border-[#27272A] rounded-xl p-3 text-white text-sm font-semibold focus:outline-none focus:border-[#404040] appearance-none"
            >
              <option value="novo">Novo</option>
              <option value="contato">Contato</option>
              <option value="Engajado">Engajado</option>
              <option value="qualificado">Qualificado</option>
              <option value="agendado">Agendado</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9CA3AF]">
               <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
               </svg>
            </div>
          </div>
        </div>

        <!-- Summary Section -->
        <div>
          <label class="text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 block font-bold">Resumo</label>
          <button class="w-full bg-[#18181A] hover:bg-[#27272A] border border-[#27272A] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-extrabold transition-all text-sm">
            <FileText class="w-4 h-4" /> Gerar
          </button>
        </div>
      </div>
    </aside>


  </div>
</template>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #27272A #050505;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #050505;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #27272A;
  border-radius: 10px;
}
</style>
