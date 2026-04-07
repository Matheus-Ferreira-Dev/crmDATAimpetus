<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit, Trash2, Search, Building, X, Save } from 'lucide-vue-next'
import { useProperties } from '~/composables/useProperties'
import Sidebar from '~/components/Sidebar.vue'

const { mainMargin } = useSidebarState()
const { properties, addProperty, updateProperty, deleteProperty } = useProperties()

const searchQuery = ref('')

// Modal state
const showModal = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const editingId = ref<string | null>(null)

const formData = ref({
  title: '',
  location: '',
  price: '',
  condominio: '',
  iptu: '',
  type: 'Aluguel',
  description: '',
  specs: { beds: 0, baths: 0, area: 0, parking: 0 },
  image: ''
})

const openCreateModal = () => {
  modalMode.value = 'create'
  editingId.value = null
  formData.value = {
    title: '', location: '', price: '', condominio: '', iptu: '',
    type: 'Aluguel', description: '',
    specs: { beds: 0, baths: 0, area: 0, parking: 0 },
    image: ''
  }
  showModal.value = true
}

const openEditModal = (prop: any) => {
  modalMode.value = 'edit'
  editingId.value = prop.id
  formData.value = JSON.parse(JSON.stringify(prop))
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleSave = () => {
  if (modalMode.value === 'create') {
    addProperty(formData.value)
  } else if (modalMode.value === 'edit' && editingId.value) {
    updateProperty(editingId.value, formData.value)
  }
  closeModal()
}

const confirmDelete = (id: string) => {
  if (confirm('Tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.')) {
    deleteProperty(id)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white font-sans transition-colors duration-300">
    <Sidebar />

    <main :class="[mainMargin, 'p-10 min-h-screen flex flex-col transition-all duration-300']">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold font-serif text-gray-900 dark:text-white tracking-wide">Meus Imóveis</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">Gerencie os imóveis exibidos no catálogo público.</p>
        </div>
        <button @click="openCreateModal" class="flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-sm hover:bg-primary-600 transition-colors shadow-luxury">
          <Plus class="w-4 h-4" />
          <span class="font-semibold uppercase tracking-widest text-xs">Novo Imóvel</span>
        </button>
      </div>

      <!-- Search / Filter bar -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search class="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar no inventário..." 
            class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-sm leading-5 bg-white dark:bg-dark-surface/50 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors shadow-sm dark:shadow-none"
          >
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white dark:bg-dark-surface/50 backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-sm overflow-hidden shadow-card dark:shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider border-b border-gray-200 dark:border-white/5">
                <th class="py-4 px-6 font-semibold">Imóvel</th>
                <th class="py-4 px-6 font-semibold">Localização</th>
                <th class="py-4 px-6 font-semibold">Preço</th>
                <th class="py-4 px-6 font-semibold">Status</th>
                <th class="py-4 px-6 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-white/5 text-gray-600 dark:text-gray-300 text-sm">
              <tr v-for="prop in properties" :key="prop.id" class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td class="py-4 px-6">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-sm overflow-hidden border border-gray-200 dark:border-white/10 shrink-0">
                      <img :src="prop.image" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p class="text-gray-900 dark:text-white font-medium">{{ prop.title }}</p>
                      <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Cód: {{ prop.id }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6">{{ prop.location }}</td>
                <td class="py-4 px-6 font-medium text-gray-900 dark:text-white">{{ prop.price }}</td>
                <td class="py-4 px-6">
                  <span class="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20 px-2.5 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-widest">Publicado</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="openEditModal(prop)" class="p-2 text-gray-400 hover:text-primary-500 transition-colors rounded-sm hover:bg-gray-100 dark:hover:bg-white/5" title="Editar">
                      <Edit class="w-4 h-4" />
                    </button>
                    <button @click="confirmDelete(prop.id)" class="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-sm hover:bg-gray-100 dark:hover:bg-white/5" title="Excluir">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="properties.length === 0">
                <td colspan="5" class="py-12 text-center text-gray-400 dark:text-gray-500">
                  <Building class="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>O seu inventário está vazio.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal CRUD -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>
      
      <div class="relative bg-white dark:bg-dark-card w-full max-w-3xl rounded-sm shadow-2xl border border-gray-200 dark:border-white/10 flex flex-col max-h-[90vh]">
        
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between sticky top-0 bg-white dark:bg-dark-card z-10">
          <h2 class="text-xl font-serif font-bold text-gray-900 dark:text-white">
            {{ modalMode === 'create' ? 'Novo Imóvel' : 'Editar Imóvel' }}
          </h2>
          <button @click="closeModal" class="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto flex-1 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Título -->
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Título do Imóvel</label>
              <input v-model="formData.title" type="text" class="w-full bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-white/10 rounded-sm px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500">
            </div>

            <!-- Localização -->
            <div>
              <label class="block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Localização</label>
              <input v-model="formData.location" type="text" class="w-full bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-white/10 rounded-sm px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500">
            </div>

            <!-- Tipo -->
            <div>
              <label class="block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Modalidade</label>
              <select v-model="formData.type" class="w-full bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-white/10 rounded-sm px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500">
                <option value="Aluguel">Aluguel</option>
                <option value="Aluguel Mensal">Aluguel Mensal</option>
                <option value="Venda">Venda</option>
              </select>
            </div>

            <!-- Preço -->
            <div>
              <label class="block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Preço (Ex: R$ 45.000)</label>
              <input v-model="formData.price" type="text" class="w-full bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-white/10 rounded-sm px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500">
            </div>

             <!-- Imagem de Capa -->
             <div>
              <label class="block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">URL da Imagem</label>
              <input v-model="formData.image" type="text" placeholder="https://..." class="w-full bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-white/10 rounded-sm px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500">
            </div>

            <!-- Quartos / Vagas -->
            <div class="grid grid-cols-3 gap-4 md:col-span-2">
               <div>
                  <label class="block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Quartos</label>
                  <input v-model.number="formData.specs.beds" type="number" class="w-full bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-white/10 rounded-sm px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500">
               </div>
               <div>
                  <label class="block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Banheiros</label>
                  <input v-model.number="formData.specs.baths" type="number" class="w-full bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-white/10 rounded-sm px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500">
               </div>
               <div>
                  <label class="block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Área (m²)</label>
                  <input v-model.number="formData.specs.area" type="number" class="w-full bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-white/10 rounded-sm px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500">
               </div>
            </div>

            <!-- Descrição -->
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Descrição</label>
              <textarea v-model="formData.description" rows="4" class="w-full bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-white/10 rounded-sm px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500"></textarea>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-dark-surface/50 flex justify-end gap-3 sticky bottom-0">
          <button @click="closeModal" class="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/5 rounded-sm transition-colors uppercase tracking-widest">
            Cancelar
          </button>
          <button @click="handleSave" class="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-sm transition-colors shadow-luxury uppercase tracking-widest">
            <Save class="w-4 h-4" />
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
