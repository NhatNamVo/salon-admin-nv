<template>
      <div class="example-avatar">
        <div class="avatar-upload" v-show="!edit">
          <div class="text-center p-2">
            <label for="avatar">
              <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
            </label>
          </div>
          <div class="text-center p-2">
            <file-upload
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png,image/gif,image/jpeg,image/webp"
              name="avatar"
              class="btn btn-primary"
              post-action="/"
              :drop="!edit"
              v-model="files"
              @input-filter="inputFilter"
              @input-file="inputFile"
              ref="upload">
              Upload avatar
            </file-upload>
          </div>
        </div>

        <div class="avatar-edit" v-show="files.length && edit">
          <div class="avatar-edit-image" v-if="files.length">
            <img ref="editImage" :src="files[0].url" />
          </div>
          <div class="text-center p-4">
            <button type="button" class="btn btn-secondary" @click.prevent="edit = false">Cancel</button>
            <button type="submit" class="btn btn-primary" @click.prevent="editSave">Save</button>
          </div>
        </div>
      </div>
</template>

<script>
import Cropper from 'cropperjs';
import { computed, nextTick, ref, watch } from 'vue';

export default {

  props: {
    modelValue: {
      type: Array,
      default: () => [],
    }
  },

  setup(props, {emit}) {
    const edit = ref(false);
    const cropper = ref(false);
    const editImage = ref(null);
    const upload = ref(null);

    const files = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const inputFile = (newFile, oldFile) => {
      if (newFile && !oldFile) {
        nextTick(function () {
          edit.value = true
        })
      }
      if (!newFile && oldFile) {
        edit.value = false
      }
    };

    const inputFilter = (newFile, oldFile, prevent) => {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          alert('Your choice is not a picture')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    }

    const editSave = () => {
      edit.value = false
      let oldFile = files.value[0]
      let binStr = atob(cropper.value.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
      let arr = new Uint8Array(binStr.length)
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      let file = new File([arr], oldFile.name, { type: oldFile.type })
      upload.value.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true,
      });
      emit('crooper-image-file');
    };

    watch(edit, (value) => {
      if (value) {
        nextTick(function () {
          if (!editImage.value) {
            return
          }
          let cropperOptions = new Cropper(editImage.value, {
            aspectRatio: 1 / 1,
            viewMode: 1,
          });
          cropper.value = cropperOptions
        })
      } else {
        if (cropper.value) {
          cropper.value.destroy()
          cropper.value = false
        }
      }
    });

    return {
      edit,
      files,
      cropper,
      editSave,
      inputFile,
      editImage,
      upload,
      inputFilter,
    }
  }

};
</script>

<style lang="scss" scoped>
.example-avatar .avatar-upload .rounded-circle {
  width: 200px;
  height: 200px;
}
.example-avatar .text-center .btn {
  margin: 0 .5rem
}
.example-avatar .avatar-edit-image {
  max-width: 100%
}
.example-avatar .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
.example-avatar .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
.cropper-hidden {
    display: none !important;
}
</style>