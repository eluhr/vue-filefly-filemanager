<template>
  <aside>
    <div
      class="list-group"
    >
      <div
        v-for="(directoryItem, directoryIndex) in rootDirectoryStructure"
        :key="directoryIndex"
        class="list-group-item"
      >
        <div
          class="mb-2"
          @click="listContent(directoryItem.name)"
        >
          <font-awesome-icon icon="folder-open" /><span class="ml-3">{{ directoryItem.name }}</span>
        </div>
        <sidebar-item :items="directoryItem.children" />
      </div>
    </div>
  </aside>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SidebarItem from '@/components/sidebar/SidebarItem'

export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
        'rootDirectoryStructure',
        'findInDirectoryStructure'
    ])
  },
  methods: {
    ...mapActions([
      'listContent'
    ])
  }
}
</script>
