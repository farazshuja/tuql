<template>
  <div class="tuql">
    <div class="row g-3 align-items-center">
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
      const vm = this
      // document.addEventListener('adobe_dc_view_sdk.ready', function () {
      //   debugger;
      // @ts-ignore
      var adobeDCView = new AdobeDC.View({ clientId: 'abd4710beeea4202a3b61d04ef73e1a4', divId: 'adobe-dc-view' })
      const previewFilePromise = adobeDCView.previewFile({
        content: {
          location: {
            url: 'http://unirazz.com/tuql.pdf'
          }
        },
        metaData: { fileName: 'tuql.pdf' }
      })

      previewFilePromise.then((adobeViewer) => {
        vm.adobeViewer = adobeViewer
        vm.onSearch()
      })
      // })
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
