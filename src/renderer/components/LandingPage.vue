<template>
  <div id="wrapper">
    <section class="section">
      <Setting></Setting>
    </section>
    <section class="section">
      <div class="file is-info">
        <label class="file-label">
          <input class="file-input" type="file" name="file" @change="onFileChanged" ref="fileInput" multiple>
          <span class="file-cta">
            <span class="file-icon">
              <i class="fa fa-upload"></i>
            </span>
            <span class="file-label">
              Upload..
            </span>
          </span>
        </label>
      </div>
    </section>
  </div>
</template>

<script>
import { ipcRenderer, shell } from 'electron'
import Setting from './Setting.vue'
document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())

export default {
    name: 'landing-page',
    components: { Setting },
    data() {
        return {
            files: []
        }
    },

    created() {
        ipcRenderer.on('uploaded', (event, arg) => {
            shell.openItem(arg)
            // console.log(this.$refs.fileInput.files)
            this.$refs.fileInput.value = ''
            // // this.data.files = []
        })
    },

    computed: {
        setting() {
            return this.$store.state.setting
        }
    },

    methods: {
        onFileChanged(event) {
            const { files } = event.target

            this.files = Object.keys(files).map(key => ({
                name: files[key].name,
                path: files[key].path,
                size: files[key].size,
                type: files[key].type
            }))

            ipcRenderer.send('upload-file', { files: this.files, setting: this.setting })
        }
    }
}
</script>
  
<style scoped>
.upload-container input[type='file'] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}
</style>
  