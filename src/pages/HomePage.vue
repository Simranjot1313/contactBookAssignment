<template>
  <div class="p-4">
      <InputText v-model="keyword" placeholder="Search by Name..." />
      <Button icon="pi pi-search" severity="secondary" />
      <DataView :value="filteredContacts" layout="grid">
      <template #empty>
        <div class="p-text-center p-mt-4">
          <Message severity="info" :closable="false">No contacts found.</Message>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <Card class="shadow-md rounded-xl">
              <template #title>
                <RouterLink
                  :to="`/profile/${item.uid}`"
                  class="text-blue-600 hover:underline font-semibold"
                >
                  {{ item.first }} {{ item.last }}
                </RouterLink>
                <div class="text-sm text-gray-500 mt-1" style="font-size: 12px;">
                  <i class="pi pi-map-marker mr-2"></i>{{ item.city?.name }} ({{ item.city?.code }})
                </div>
              </template>
              <template #content>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import DataView from 'primevue/dataview';
import Card from 'primevue/card';
import Message from 'primevue/message';
import {  readItems } from '../services/storageService'

const keyword = ref('')
const allItems = ref(readItems())
const router = useRouter()
onMounted(() => {
  allItems.value = readItems()
})
const filteredContacts = computed(() =>
  allItems.value
    .filter(c => (c.first + c.last).toLowerCase().includes(keyword.value.toLowerCase()))
    .sort((a, b) => a.last.localeCompare(b.last))
)
console.log('filteredContacts', filteredContacts.value)


function goToDetail(cid) {
  router.push(`/profile/${cid}`)
}
</script>
