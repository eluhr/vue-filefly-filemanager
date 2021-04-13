<template>
  <b-navbar
    toggleable="lg"
    :type="navbarTheme"
    :variant="navbarTheme"
  >
    <b-navbar-nav>
      <b-nav-item @click="listContent('/')">
        /
      </b-nav-item>
      <b-nav-text>
        <a
          v-for="(directoryName, index) in directories"
          :key="index"
          class="cursor-pointer"
          @click="listContentByDirectoryIndex(index)"
        ><span v-if="index !== 0">&nbsp;/&nbsp;</span>{{ directoryName }}</a>
      </b-nav-text>
    </b-navbar-nav>

    <b-navbar-nav
      class="ml-auto"
    >
      <b-nav-item @click="listContent(currentDirectory)">
        <font-awesome-icon
          icon="sync"
        />
      </b-nav-item>
      <b-nav-item @click="toggleContentLayout">
        <font-awesome-icon
          :icon="contentLayout === 'list' ? 'th' : 'list'"
        />
      </b-nav-item>
      <b-nav-item-dropdown
        id="my-nav-dropdown"
        toggle-class="nav-link-custom"
        right
        :no-caret="true"
      >
        <template slot="button-content">
          <font-awesome-icon
            icon="ellipsis-v"
          />
        </template>
        <b-dropdown-item
          v-b-modal.modal-create-directory
        >
          <font-awesome-icon
            icon="folder-plus"
          />&nbsp;{{
            $t('createNewDirectory')
          }}
        </b-dropdown-item>
        <b-dropdown-item
          v-b-modal.modal-upload-file
        >
          <font-awesome-icon
            icon="file"
          />&nbsp;{{ $t('uploadAFile') }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  computed: {
    ...mapState('api', [
      'currentDirectory',
    ]),
    ...mapState('preferences', [
      'contentLayout'
    ]),
    ...mapGetters('preferences', [
      'navbarTheme'
    ]),
    directories() {
      if (this.currentDirectory === '/') {
        return []
      }
      return this.currentDirectory.split('/')
    }
  },
  methods: {
    ...mapActions('api', [
      'listContent'
    ]),
    ...mapActions('preferences', [
      'toggleContentLayout'
    ]),
    listContentByDirectoryIndex(index) {
      let path = []
      for (let i = 0; i < index + 1; i++) {
        path.push(this.directories[i])
      }
      this.listContent(path.join('/'))
    }
  }
}
</script>
