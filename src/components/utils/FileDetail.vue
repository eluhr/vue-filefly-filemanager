<template>
  <aside
    v-if="fileItem"
    class="w-100 position-fixed bg-white p-4 border"
  >
    <h3>
      {{ fileItem.name }}
      <br>
      <small class="text-muted">{{ fileSize }}</small>
    </h3>
    <h5>{{ $t('informations') }}</h5>
    <div class="border-bottom pb-1 row">
      <div class="col">
        {{ $t('uploadedAt') }}
      </div>
      <div class="text-right">
        {{ uploadedAtDate }}
      </div>
    </div>
  </aside>
</template>

<script>

export default {
  data () {
    return {
      fileItem: null
    }
  },
  computed: {
    uploadedAtDate () {
      return this.$d(new Date(this.fileItem.date), 'long')
    },
    fileSize () {
      const bytes = this.fileItem.size
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
  },
  methods: {
    open (event, item) {
      this.fileItem = item
    }
  }
}
</script>

<style>
 aside {
   left: 0;
   bottom: 0;
 }
</style>
