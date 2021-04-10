<template>
  <b-modal
    id="modal-create-directory"
    :title="$t('createNewDirectory')"
    :cancel-title="$t('cancel')"
    :ok-title="$t('createDirectory')"
    centered
    :ok-disabled="newDirectoryName.length < 1"
    @ok="createDirectory(`${currentDirectory}/${newDirectoryName}`)"
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
import {mapActions, mapGetters} from 'vuex'

export default {
  data () {
    return {
      newDirectoryName: ''
    }
  },
  computed: {
    ...mapGetters('api', [
      'currentDirectory'
    ])
  },
  methods: {
    ...mapActions('api', [
      'createDirectory'
    ])
  }
}
</script>
