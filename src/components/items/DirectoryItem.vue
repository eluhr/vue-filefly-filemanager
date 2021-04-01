<template>
  <div class="directory">
    <a @click="listContent(nextDirectory(item.name))">
      <font-awesome-icon icon="folder" />
      <span
        class="ml-2"
      >{{ item.name }}</span>
    </a>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'currentDirectory'
    ]),
  },
  methods: {
    ...mapActions([
      'listContent'
    ]),
    nextDirectory(newDirectoryName) {
      return this.currentDirectory.length === 1 ? newDirectoryName : this.currentDirectory + '/' + newDirectoryName;
    }
  }
}
</script>
