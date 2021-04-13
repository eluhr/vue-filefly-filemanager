<template>
  <b-modal
    id="modal-upload-file"
    :title="$t('uploadFileTo', { currentDirectory })"
    :cancel-title="$t('cancel')"
    :ok-title="$t('uploadFile')"
    :ok-disabled="files.length < 1"
    :ok-variant="mainTheme"
    centered
    @ok="uploadFile(files)"
  >
    <label for="new-file-name">{{ $t('selectAFile') }}</label>
    <b-form-file
      id="new-file-name"
      v-model="files"
      multiple
    />
  </b-modal>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  data () {
    return {
      files: []
    }
  },
  computed: {
    ...mapState('api', [
      'currentDirectory'
    ]),
    ...mapGetters('preferences', [
      'mainTheme'
    ])
  },
  methods: {
    ...mapActions('api', [
      'uploadFile'
    ])
  }
}
</script>
