<template>
  <a-card :bordered="false">
    <div class="plugin-shop-header"></div>
    <div class="plugin-shop-container card-container">
      <a-tabs type="card">
        <a-tab-pane v-for="item in pluginCategory" :key="item.id" :tab="item.name"> Content of tab {{ item.name }} </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
  import { getDictByCode } from '@/api/system/dict'

  export default {
    name: 'PluginShop',
    data () {
      return {
        pluginCategory: []
      }
    },
    mounted () {
      this.getPluginCategory()
    },
    methods: {
      getPluginCategory () {
        getDictByCode('plugin').then(res => {
          if (res.success) {
            console.log(res)
            this.pluginCategory = res.data
          }
        })
      }
    }
  }
</script>
