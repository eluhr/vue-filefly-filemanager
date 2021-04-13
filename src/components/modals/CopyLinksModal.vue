<template>
  <b-modal
    id="modal-copy-link"
    :title="$t('copyLinks', { currentDirectory })"
    :cancel-title="$t('cancel')"
    hide-footer
    centered
  >
    <label for="file-path">{{ $t('filePath') }}</label>
    <b-form-input
      id="file-path"
      v-model="path"
      readonly
    />
  </b-modal>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      path: ''
    }
  },
  computed: {
    ...mapState([
      'activeItem'
    ]),
    ...mapState('api', [
      'currentDirectory',
      'currentDirectory'
    ])
  },
  watch: {
    activeItem: function (item) {
      const basePath = (this.currentDirectory === '/' ? '/' : this.currentDirectory + '/');
      if (item) {
        const path = basePath + item.name
        this.path = path
      }
    }
  }
}
</script>
