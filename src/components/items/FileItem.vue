<template>
  <div class="item-file py-2">
    <font-awesome-icon icon="file" />
    <span
      class="ml-2"
    >{{ item.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
