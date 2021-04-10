<template>
  <main>
    <div v-if="isIndexing">
      <font-awesome-icon
        icon="spinner"
        class="fa-spin"
      />&nbsp;{{ $t('loading') }}
    </div>
    <div :class="contentLayout === 'list' ? 'py-4' : 'p-4'">
      <div
        v-if="!isIndexing"
        :class="contentLayout === 'list' ? 'list-group' : 'row'"
      >
        <div
          v-for="(item, itemIndex) in content"
          :key="itemIndex"
          :class="contentLayout === 'list' ? 'list-group-item' : 'col-4'"
          @contextmenu.prevent="openContextMenu($event, item)"
          @click="handleClick($event, item)"
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
      </div>
    </div>
    <b-alert
      v-if="content.length === 0 && !isIndexing"
      :show="true"
      variant="warning"
      class="w-100"
    >
      {{ $t('noFilesInThisDirectory') }}
    </b-alert>
    <item-context-menu ref="contextMenu" />
    <file-detail ref="fileDetail" />
  </main>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ItemContextMenu from '@/components/utils/ItemContextMenu'
import DirectoryItem from '@/components/items/DirectoryItem'
import FileItem from '@/components/items/FileItem'
import FileDetail from '@/components/utils/FileDetail'

export default {
  components: {
    DirectoryItem,
    FileItem,
    ItemContextMenu,
    FileDetail
  },
  data () {
    return {
      newDirectoryName: '',
      files: []
    }
  },
  computed: {
    ...mapGetters('api', [
      'currentDirectory',
      'content',
      'contentLayout',
      'isIndexing'
    ]),
  },
  methods: {
    ...mapActions('api', [
      'listContent'
    ]),
    nextDirectory(newDirectoryName) {
      return this.currentDirectory.length === 1 ? newDirectoryName : this.currentDirectory + '/' + newDirectoryName;
    },
    openContextMenu(event, item) {
      this.$refs.contextMenu.$refs.innerContextMenu.open(event, {item})
    },
    handleClick(event, item) {
      if (item.type === 'dir') {
        this.listContent(this.nextDirectory(item.name))
      } else {
        this.$refs.fileDetail.open(event, item)
      }
    }
  }
}
</script>
