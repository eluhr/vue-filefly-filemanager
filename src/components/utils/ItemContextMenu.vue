<template>
  <context-menu
    id="context-menu"
    ref="innerContextMenu"
    class="list-group"
    @ctx-open="openCtx"
    @ctx-cancel="resetCtx"
  >
    <li
      v-for="(contextMenuItem, contextMenuItemIndex) in contextMenuItems"
      :key="contextMenuItemIndex"
      class="list-group-item p-1"
      @click="executeMethod(contextMenuItem.action, contextMenuItem.item)"
    >
      {{ contextMenuItem.label }}
    </li>
  </context-menu>
</template>

<script>
import contextMenu from 'vue-context-menu'
import {mapActions, mapMutations} from "vuex";

export default {
  components: {
    contextMenu
  },
  data() {
    return {
      contextMenuItems: []
    }
  },
  methods: {
    ...mapActions('api', [
      'deleteFile',
      'listContent'
    ]),
    ...mapMutations([
      'setActiveItem'
    ]),
    openCtx(locals) {
      const item = locals.item
      if (item.type === 'file') {
        this.contextMenuItems = [
          {
            label: this.$t('copyLinks'),
            action: 'copyLinks',
            item: item
          },
          {
            label: this.$t('rename'),
            action: 'renameItem',
            item: item
          },
          {
            label: this.$t('deleteFile'),
            action: 'deleteFile',
            item: item
          }
        ]
      } else {
        this.contextMenuItems = [
          {
            label: this.$t('rename'),
            action: 'renameItem',
            item: item
          },
          {
            label: this.$t('openDirectory'),
            action: 'openDirectory',
            item: item
          }
        ]
      }
    },
    resetCtx() {
      this.contextMenuItems = []
    },
    executeMethod (action, item) {
      switch (action) {
        case 'deleteFile':
            this.deleteFile([item.name]);
          break;
        case 'openDirectory':
            this.listContent(item.name)
          break;
        case 'renameItem':
            this.openRenameModal(item)
          break;
        case 'copyLinks':
            this.openCopyLinksModal(item)
          break;
          default:
            console.info(action, 'not implemented')
      }
    },
    openRenameModal (item) {
      this.setActiveItem(item)
      this.$bvModal.show('modal-rename-item')
    },
    openCopyLinksModal (item) {
      this.setActiveItem(item)
      this.$bvModal.show('modal-copy-link')
    }
  }
}
</script>

<style>
  .ctx-menu {
    padding: 0;
    border: none;
  }
</style>
