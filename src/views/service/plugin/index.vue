<template>
  <a-card :bordered="false">
    <a-alert type="warning" :style="{ marginTop: '24px' }">
      <span slot="message">
        你还没有添加插件，请前往选择插件添加你所需要的插件
      </span>
    </a-alert>

    <plugin-shop></plugin-shop>
  </a-card>
</template>

<script>
  import { PluginShop } from '@/components'
  export default {
    name: 'PluginManage',
    components: {
      PluginShop
    }
  }
</script>
