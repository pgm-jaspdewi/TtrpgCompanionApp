<template>
  <div class="w-full">
    <BaseImage v-if="src" :src="src" />
    <div
      v-else
      class="border-2 border-darkKhaki rounded-lg bg-lightKhaki"
      :style="{ height: size + 'em', width: size + 'em' }"
    />

    <div :style="{ width: size + 'em' }" class="flex justify-center">
      <label
        :class="[
          uploading ? 'bg-paleGold text-darkKhaki': 'bg-maroon hover:bg-lightKhaki text-lightKhaki hover:text-maroon border-maroon',
          editForm ? 'w-11/12' : 'w-9/12'
        ]"
        class="text-sm border-2 py-1 px-2 mt-2 rounded-3xl flex items-center justify-between group cursor-pointer shadow-lg"
        for="single"
      >
        {{  uploading ? 'Uploading' : editForm ? 'Change Avatar' : 'Add Image'  }}
        <div
          :class=" uploading ? 'bg-darkKhaki': 'bg-lightKhaki group-hover:bg-maroon'"
          class="rounded-full w-5 h-5 flex justify-center items-center"
        >
          <FaPlus
            :class=" uploading ? 'fill-paleGold' : 'fill-maroon group-hover:fill-lightKhaki'"
            class="w-4 h-4"
          />
        </div>
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { supabase } from '@/supabase'
import { FaPlus } from 'vue3-icons/fa'
import BaseImage from '../baseComponents/BaseImage.vue'

const props = defineProps({
  path: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 10
  },
  editForm: {
    type: Boolean,
    default: false
  }
})

const { path, size } = toRefs(props)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
  // Download the image from the storage-bucket to show in the UI
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', (error as Error).message)
  }
}

const uploadAvatar = async (evt: any) => {
  if (path.value !== '') {
    // Remove the existing image before uploading a new one to avoid cluttering the storage-bucket
    try {
      const { error } = await supabase.storage.from('avatars').remove([path.value])
      if (error) throw error
    } catch (error) {
      console.error('Error removing image: ', (error as Error).message)
    }
  }
  files.value = evt.target.files
  // Upload the image to the storage-bucket
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    emit('update:path', filePath)
    emit('upload')

    if (uploadError) throw uploadError
  } catch (error) {
    alert((error as Error).message)
  } finally {
    uploading.value = false
  }
}

// Download the image when the component is mounted. used when user backs to this step
if (path.value !== '') downloadImage()

// Watch for changes in the path prop and download the image when it changes. used when user selects a new image.
watch(path, () => {
  if (path.value) downloadImage()
})
</script>
