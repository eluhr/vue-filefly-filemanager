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
    this.$eventHub.$on('SHOW_ERROR_MESSAGE_TO_USER', this.showErrorMessage)
  },
  methods: {
    ...mapActions([
      'listContent'
    ]),
    showErrorMessage (errorMessage) {
      // need "+ ''" only god knows why...
      this.$bvToast.toast(errorMessage + '', {
        title: this.$t('anErrorOccurred'),
        variant: 'danger',
        solid: true,
        toaster: 'b-toaster-bottom-right',
        appendToast: false
      })
    }
  }
}
</script>
