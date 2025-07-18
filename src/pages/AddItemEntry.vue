<template>
  <p-card header="Contact Information Form">
    <div class="p-fluid p-formgrid p-grid  p-3">
      <div class="p-field p-col-12 pb-3">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText v-model="formData.first" placeholder="Enter first name" required/>
        </InputGroup>
      </div>
      <div class="p-field p-col-12 pb-3">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user-edit"></i>
          </InputGroupAddon>
          <InputText v-model="formData.last" placeholder="Enter last name" />
        </InputGroup>
      </div>
      <div class="p-field p-col-12 pb-3">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-envelope"></i>
          </InputGroupAddon>
          <InputText v-model="formData.email" placeholder="your@email.com" />
        </InputGroup>
      </div>
      <div class="p-field p-col-12 pb-3">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-map-marker"></i>
          </InputGroupAddon>
          <Dropdown v-model="formData.city" :options="cityOptions" optionLabel="name" placeholder="Select City" />
        </InputGroup>
      </div>
    </div>

    <div class="pt-3 pb-3">
      <Button label="Save" icon="pi pi-check"  @click="handleSave" />
      <Button label="Cancel" icon="pi pi-times" style="margin-left:20px" @click="handleCancel" />
    </div>
  </p-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { readItems, writeItems, findItem } from '../services/storageService'

import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const isEditing = route.path.startsWith('/edit')

const formData = ref({
  uid: Date.now().toString(),
  first: '',
  last: '',
  email: '',
  city: null
})

const cityOptions = ref([
  { name: 'Canada', code: 'CA' },
  { name: 'America', code: 'USA' },
  { name: 'India', code: 'IN' }
])

onMounted(() => {
  if (isEditing) {
    const record = findItem(route.params.uid)
    if (record) formData.value = { ...record }
  }
})

function handleSave() {
  const data = readItems()
  if (isEditing) {
    const i = data.findIndex(x => x.uid === formData.value.uid)
    if (i !== -1) data[i] = formData.value
  } else {
    data.push(formData.value)
  }
  writeItems(data)
  router.push(`/profile/${formData.value.uid}`)
}

function handleCancel() {
  router.push('/')
}
</script>

<style scoped>
.p-card {
  max-width: 750px;
  margin: auto;
}
</style>
