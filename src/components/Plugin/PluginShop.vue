<template>
  <a-card :bordered="false" title="选择组件">
    <div class="plugin-shop-header"></div>
    <div class="plugin-shop-container card-container">
      <a-tabs default-active-key="1">
        <a-tab-pane v-for="item in pluginCategory" :key="item.id" :tab="item.name">
          <div class="card-carousel-wrapper">
            <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
            <div class="card-carousel--overflow-container">
              <div class="plugin-card-container" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
                <a-card
                  class="plugin-card"
                  v-for="plugin in plugins"
                  :key="plugin.id"
                  :title="plugin.name"
                  style="min-width: 300px"
                  :loading="false"
                  :hoverable="true"
                  :headStyle="{backgroundColor: '#F5F5F5'}">
                  <a-checkbox slot="extra"></a-checkbox>
                  <p>
                    {{ plugin.description }}
                  </p>
                </a-card>
              </div>
            </div>
            <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
          </div>
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
        currentOffset: 0,
        paginationFactor: 320,
        windowSize: 5,
        pluginCategory: [],
        plugins: [],
        defaultActiveKey: 1
      }
    },
    computed: {
      atEndOfList () {
        return this.currentOffset <= (this.paginationFactor * -1) * (this.plugins.length - this.windowSize)
      },
      atHeadOfList () {
        return this.currentOffset === 0
      }
    },
    mounted () {
      this.getPluginCategory()
    },
    methods: {
      moveCarousel (direction) {
        if (direction === 1 && !this.atEndOfList) {
          this.currentOffset -= this.paginationFactor
        } else if (direction === -1 && !this.atHeadOfList) {
          this.currentOffset += this.paginationFactor
        }
      },
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
