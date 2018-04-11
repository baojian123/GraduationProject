<template lang="html">
  <div>
    <div class="preview" v-html="content">
    </div>
    <div class="editor">
      <quillEditor v-model="content" :options="editorOption"></quillEditor>
    </div>
    <button @click="getContent()" type="button" name="button">查看内容</button>
    <button @click="submitContent()" type="button" name="button">提交内容</button>
  </div>
</template>

<script>
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/ImageDrop', ImageDrop)
Quill.register('modules/ImageResize', ImageResize)
Quill.register('modules/ImageExtend', ImageExtend)
export default {
  name: 'PassageEditor',
  data () {
    return {
      content: '',
      updateUrl: '',
      editorOption: {
        modules: {
          ImageResize: {},
          ImageExtend: {
            name: 'img',
            size: 2, // 单位为M, 1M = 1024KB
            action: '',
            headers: (xhr) => {
            },
            response: (res) => {
              return res.info
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  methods: {
    getContent: function () {
      alert(this.content)
    },
    submitContent: function () {
      this.$emit('submitContent', this.content)
    }
  },
  mounted () {

  },
  components: {
    quillEditor
  }
}
</script>

<style lang="css">
.quill-editor:not(.bubble) .ql-container,
.quill-editor:not(.bubble) .ql-container .ql-editor {
  min-height: 10rem;
  max-height: 25rem;
  padding-bottom: 1rem;
}
.editor {
  width:1000px;
}
</style>
