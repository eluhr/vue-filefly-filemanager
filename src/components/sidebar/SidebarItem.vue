<template>
  <div
    v-if="items.length > 0"
    class="list-group"
  >
    <div
      v-for="(item, itemIndex) in items || []"
      :key="itemIndex"
      class="list-group-item"
      @click="listContent(item.name)"
    >
      <font-awesome-icon icon="folder" /><span class="ml-2">{{ item.name }}</span>
      <SidebarItem :items="childItems(item.name)" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SidebarItem',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters([
        'findInDirectoryStructure'
    ])
  },
  methods: {
    ...mapActions([
      'listContent'
    ]),
    childItems (name) {
      const item = this.findInDirectoryStructure(name)
      return item ? item.children : []
    }
  }
}
</script>
