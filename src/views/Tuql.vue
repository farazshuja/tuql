<template>
  <div class="tuql">
    <div class="row g-3 align-items-center my-1">
      <div class="col-auto">
        <label class="col-form-label">Initials:</label>
      </div>
      <div class="col-auto">
        <input v-model="search" type="text" class="form-control">
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-primary" @click="onSearch">Search</button>
      </div>
    </div>
    <div id="adobe-dc-view"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getPageByString } from '@/data/tuql/tuql-data'

export default defineComponent({
  name: 'Tuql',
  data () {
    return {
      adobeViewer: null,
      search: ''
    }
  },
  mounted () {
    this.search = this.$route.query.search as string
    this.loadPdf()
  },
  methods: {
    loadPdf () {
      if (!(window as any).AdobeDC) {
        setTimeout(this.loadPdf, 1000)
        return
      }

      var adobeDCView = new (window as any).AdobeDC.View({ clientId: '170e385dc8634478921015e0fed7fd0b', divId: 'adobe-dc-view' })
      const previewFilePromise = adobeDCView.previewFile({
        content: {
          location: {
            url: 'https://unirazz.com/tuql.pdf'
          }
        },
        metaData: { fileName: 'tuql.pdf' }
      })

      previewFilePromise.then((adobeViewer) => {
        this.adobeViewer = adobeViewer
        this.onSearch()
      })
    },
    onSearch () {
      if (!this.adobeViewer) {
        return
      }
      const page = getPageByString(this.search)
      // @ts-ignore
      this.adobeViewer.getAPIs().then((apis) => {
        apis.gotoLocation(page)
          .then(() => console.log('Success'))
          .catch((error) => console.log(error))
      })
    }
  }
})
</script>

<style>
  .tuql {
    max-width: 1800px;
  }
  #adobe-dc-view {
    height: calc(100vh - 70px);
  }
</style>
