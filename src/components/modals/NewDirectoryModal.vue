<template>
  <b-modal
    id="modal-create-directory"
    :title="$t('createNewDirectory')"
    :cancel-title="$t('cancel')"
    :ok-title="$t('createDirectory')"
    :ok-variant="mainTheme"
    centered
    :ok-disabled="newDirectoryName.length < 1"
    @ok="createNewDirectory(`${currentDirectory}/${newDirectoryName}`)"
  >
    <label for="new-directory-name">{{ $t('directoryName') }}</label>
    <b-form-input
      id="new-directory-name"
      v-model="newDirectoryName"
      type="text"
      required
      autofocus
    />
  </b-modal>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  data () {
    return {
      newDirectoryName: ''
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
      'createDirectory'
    ]),
    createNewDirectory (newDirectoryName) {
      this.createDirectory(newDirectoryName)
      this.newDirectoryName = ''
    }
  }
}
</script>
