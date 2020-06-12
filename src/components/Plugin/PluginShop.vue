<template>
  <a-card :bordered="false" title="选择组件">
    <div class="plugin-shop-header"></div>
    <div class="plugin-shop-container card-container">
      <a-tabs default-active-key="1">
        <a-tab-pane v-for="item in pluginCategory" :key="item.id" :tab="item.name">
          <a-carousel arrows :dots="false">
            <div v-for="plugin in plugins" :key="plugin.id">
              <a-card :title="plugin.name" style="width: 300px" :loading="false" :hoverable="true" :headStyle="{backgroundColor: '#1890ff'}">
                <a-checkbox slot="extra"></a-checkbox>
                <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
              </a-card>
            </div>
          </a-carousel>
          <a-divider />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
  import { getDictByCode } from '@/api/system/dict'
  import { getPluginByCategory } from '@/api/plugin'

  export default {
    name: 'PluginShop',
    data () {
      return {
        pluginCategory: [],
        plugins: [],
        defaultActiveKey: 1
      }
    },
    mounted () {
      this.getPluginCategory()
    },
    methods: {
      getPluginCategory () {
        getDictByCode('plugin').then(res => {
          if (res.success) {
            this.pluginCategory = res.data
            if (this.pluginCategory.length > 0) {
              this.defaultActiveKey = this.pluginCategory[0].dictKey
              this.getPlugins(this.defaultActiveKey)
            }
          }
        })
      },
      getPlugins (categoryId) {
        getPluginByCategory(categoryId).then(res => {
          if (res.success) {
            console.log(res.data)
            this.plugins = res.data
          }
        })
      }
    }
  }
</script>
<style scoped>
  /* For demo */
  .ant-carousel >>> .slick-slide {
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel >>> .slick-slide h3 {
    color: #fff;
  }
</style>
