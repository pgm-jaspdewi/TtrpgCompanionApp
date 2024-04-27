<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="border-2 border-darkKhaki rounded-lg bg-lightKaki"
      :style="{ height: size + 'em', width: size + 'em' }"
    />
    <div
      v-else
      class="border-2 border-darkKhaki rounded-lg bg-lightKaki"
      :style="{ height: size + 'em', width: size + 'em' }"
    />

    <div :style="{ width: size + 'em' }" class="flex justify-center">
      <label
        :class="{
          'bg-paleGold text-darkKhaki': uploading,
          'bg-maroon hover:bg-lightKaki text-lightKaki hover:text-maroon border-maroon': !uploading
        }"
        class="text-sm border-2 py-1 px-2 mt-2 rounded-3xl flex items-center justify-between group cursor-pointer w-9/12"
        for="single"
      >
        {{ uploading ? 'Uploading' : 'Add Image' }}
        <div
          :class="{
            'bg-darkKhaki': uploading,
            'bg-lightKaki group-hover:bg-maroon ': !uploading
          }"
          class="rounded-full w-5 h-5 flex justify-center items-center"
        >
          <FaPlus
            :class="{
              'fill-paleGold': uploading,
              'fill-maroon group-hover:fill-lightKaki': !uploading
            }"
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
import { supabase } from '../supabase'
import { FaPlus } from 'vue3-icons/fa'

const props = defineProps({
  path: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 10
  }
})

const { path, size } = toRefs(props)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
  console.log('Downloading image...')
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
    console.log('Image downloaded successfully')
  } catch (error) {
    console.error('Error downloading image: ', (error as Error).message)
  }
}

const uploadAvatar = async (evt: any) => {
  files.value = evt.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    emit('update:path', filePath)
    emit('upload')

    if (uploadError) throw uploadError
  } catch (error) {
    alert((error as Error).message)
  } finally {
    uploading.value = false
  }
}

watch(path, () => {
  console.log('Path changed')
  if (path.value) downloadImage()
})
</script>
