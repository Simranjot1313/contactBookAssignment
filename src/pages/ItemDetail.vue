<template>
    <Panel header="Details" toggleable>
      <p><strong>First Name:</strong> {{ data?.first }}</p>
      <p><strong>Last Name:</strong> {{ data?.last }}</p>
      <p><strong>Email:</strong> {{ data?.email }}</p>
      <p><strong>City:</strong> {{ data?.city?.name }} ({{ data?.city?.code }})</p>
    </Panel>

    <div class="p-mt-3 flex gap-2">
      <Button  label="Edit" severity="warning" @click="gotoEdit" />
      <Button  label="Delete" severity="danger" @click="doDelete" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findItem, writeItems, readItems } from '../services/storageService'
import Panel from 'primevue/panel'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const data = ref(null)

onMounted(() => {
  data.value = findItem(route.params.uid)
})

function gotoEdit() {
  router.push(`/edit/${data.value.uid}`)
}
function doDelete() {
  if (window.confirm('Confirm delete?')) {
    const arr = readItems().filter(x => x.uid !== data.value.uid)
    writeItems(arr)
    router.push('/')
  }
}
function goHome() {
  router.push('/')
}
</script>
