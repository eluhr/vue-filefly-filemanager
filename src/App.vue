<template>
  <div id="app">
    <div class="row">
      <div class="col-12">
        <navbar />
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-4">
            <sidebar />
          </div>
          <div class="col-8">
            <main-content />
          </div>
        </div>
      </div>
    </div>
    <new-directory-modal />
    <upload-file-modal />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import MainContent from '@/components/MainContent'
import Navbar from '@/components/Navbar'
import NewDirectoryModal from '@/components/NewDirectoryModal'
import UploadFileModal from '@/components/UploadFileModal'
import Sidebar from '@/components/Sidebar'

export default {
  components: {
    MainContent,
    Navbar,
    NewDirectoryModal,
    Sidebar,
    UploadFileModal
  },
  computed: {
    ...mapGetters([
      'currentDirectory'
    ])
  },
  created() {
    this.listContent(this.currentDirectory)
  },
  methods: {
    ...mapActions([
      'listContent'
    ])
  }
}
</script>
