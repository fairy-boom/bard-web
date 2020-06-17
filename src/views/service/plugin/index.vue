<template>
  <a-card :bordered="false">
    <div style="text-align: right">
      <a-button type="primary" @click="goAddPlugin">添加插件</a-button>
    </div>
    <a-empty v-if="plugins.length === 0" />
    <plugin-shop v-else :is-show="true" :pluginCategory="pluginCategory" :plugins="plugins" @removePlugin="removePlugin"/>
  </a-card>
</template>

<script>
  import { Empty } from 'ant-design-vue'
  import { PluginShop } from '@/components'
  import { getServiceGroupPlugin, deleteServiceGroups } from '@/api/service/group/plugin'
  import { getDictByCode } from '@/api/system/dict'
  import Vue from 'vue'
  Vue.use(Empty)

  export default {
    name: 'PluginManage',
    components: {
      PluginShop
    },
    data () {
      return {
        groupId: this.$route.query.groupId,
        pluginCategory: [],
        plugins: []
      }
    },
    mounted () {
      this.getPluginCategory()
      this.getServiceGroupPlugin()
    },
    methods: {
      getPluginCategory () {
        getDictByCode('plugin').then(res => {
          if (res.success) {
            this.pluginCategory = res.data
            if (this.pluginCategory.length > 0) {
              this.defaultActiveKey = this.pluginCategory[0].dictKey
            }
          }
        })
      },
      getServiceGroupPlugin () {
        getServiceGroupPlugin(this.groupId).then(res => {
          if (res.success) {
            this.plugins = res.data
          }
        })
      },
      goAddPlugin () {
        this.$router.push({ path: '/service/plugin' })
      },
      removePlugin (plugin) {
        const vm = this
        deleteServiceGroups(plugin.id).then(res => {
          if (res.success) {
            this.getPluginCategory()
          } else {
            vm.$message.error(res.msg)
          }
        })
      }
    }
  }
</script>
