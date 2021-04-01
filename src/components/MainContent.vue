<template>
  <div v-if="isIndexing">
    <font-awesome-icon
      icon="spinner"
      class="fa-spin"
    />&nbsp;{{ $t('loading') }}
  </div>
  <div
    v-else
    :class="contentLayout === 'list' ? 'list-group' : 'row'"
  >
    <div
      v-for="(item, itemIndex) in content"
      :key="itemIndex"
      :class="contentLayout === 'list' ? 'list-group-item' : 'col-4'"
      @contextmenu.prevent="openContextMenu($event, item)"
    >
      <directory-item
        v-if="item.type === 'dir'"
        :item="item"
      />
      <file-item
        v-else
        :item="item"
      />
    </div>
    <div v-if="content.length === 0">
      <b-alert
        :show="true"
        variant="warning"
        class="mt-4"
      >
        {{ $t('noFilesInThisDirectory') }}
      </b-alert>
    </div>
    <item-context-menu ref="contextMenu" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ItemContextMenu from '@/components/ItemContextMenu'
import DirectoryItem from '@/components/items/DirectoryItem'
import FileItem from '@/components/items/FileItem'

export default {
  components: {
    DirectoryItem,
    FileItem,
    ItemContextMenu
  },
  data () {
    return {
      newDirectoryName: '',
      files: []
    }
  },
  computed: {
    ...mapGetters([
      'currentDirectory',
      'content',
      'contentLayout',
      'isIndexing'
    ]),
  },
  methods: {
    ...mapActions([
      'listContent'
    ]),
    nextDirectory(newDirectoryName) {
      return this.currentDirectory.length === 1 ? newDirectoryName : this.currentDirectory + '/' + newDirectoryName;
    },
    openContextMenu(event, item) {
      this.$refs.contextMenu.$refs.innerContextMenu.open(event, {item})
    }
  }
}
</script>
