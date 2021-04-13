<template>
  <b-modal
    id="modal-rename-file"
    :title="$t('rename', { currentDirectory })"
    :cancel-title="$t('cancel')"
    :ok-title="$t('rename')"
    :ok-disabled="name.length < 1"
    :ok-variant="mainTheme"
    centered
    @ok="renameItemByItem"
  >
    <label for="new-file-name">{{ $t('newNameForFile', {itemName: currentItemName}) }}</label>
    <b-form-input
      id="new-file-name"
      v-model="name"
      required
    />
  </b-modal>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState([
      'renameItem'
    ]),
    ...mapState('api', [
      'currentDirectory'
    ]),
    ...mapGetters('preferences', [
      'mainTheme'
    ]),
    currentItemName() {
      return this.renameItem?.name || ''
    }
  },
  watch: {
    renameItem: function (item) {
      if (item) {
        this.name = item.name
      }
    }
  },
  methods: {
    ...mapActions('api', {
      'internalRenameItem': 'renameItem'
    }),
    ...mapMutations([
        'setRenameItem'
    ]),
    renameItemByItem () {
      this.internalRenameItem({
        item: this.renameItem,
        newName: this.name
      })
      this.setRenameItem(null)
      this.name = ''
    }
  }
}
</script>
