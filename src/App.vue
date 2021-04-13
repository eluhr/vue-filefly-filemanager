<template>
  <div id="app">
    <navbar />
    <main-content />
    <new-directory-modal />
    <upload-file-modal />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import MainContent from '@/components/layout/MainContent'
import Navbar from '@/components/layout/Navbar'
import NewDirectoryModal from '@/components/modals/NewDirectoryModal'
import UploadFileModal from '@/components/modals/UploadFileModal'

export default {
  components: {
    MainContent,
    Navbar,
    NewDirectoryModal,
    UploadFileModal
  },
  computed: {
    ...mapGetters('api', [
      'currentDirectory'
    ])
  },
  created() {
    this.listContent(this.currentDirectory)
    this.$eventHub.$on('SHOW_ERROR_MESSAGE_TO_USER', this.showErrorMessage)
  },
  methods: {
    ...mapActions('api', [
      'listContent'
    ]),
    showErrorMessage (errorMessage) {
      console.error(errorMessage)
      this.$bvToast.toast(errorMessage.message, {
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

<style>
  .item-decorator {
    transition: background-color 100ms ease-in;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .item-decorator:hover, .item-decorator:focus {
    background-color: rgba(0, 0, 0, 0.125);
  }
  .item-decorator:active {
    background-color: rgba(0, 0, 0, 0.250);
  }
</style>
