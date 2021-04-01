<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="dark"
  >
    <b-collapse
      id="nav-collapse"
      is-nav
    >
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
            />&nbsp;{{ $t('createNewDirectory')
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
    </b-collapse>
  </b-navbar>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'currentDirectory',
      'contentLayout'
    ])
  },
  methods: {
    ...mapActions([
      'listContent',
      'toggleContentLayout'
    ])
  }
}
</script>
