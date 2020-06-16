<template>
  <a-card :bordered="false" title="选择组件" v-if="plugins.length > 0">
    <div class="plugin-shop-header"></div>
    <div class="plugin-shop-container card-container">
      <a-tabs default-active-key="0" @change="handleTabChange">
        <a-tab-pane v-for="(item, index) in pluginCategory" :key="index" :tab="item.name">
          <div class="card-carousel-wrapper">
            <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
            <div class="card-carousel--overflow-container">
              <div class="plugin-card-container" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
                <a-card
                  class="plugin-card"
                  @click="handlePluginSelected(pluginIndex)"
                  v-for="(plugin, pluginIndex) in plugins"
                  :key="plugin.id"
                  :title="plugin.name"
                  style="min-width: 300px"
                  :loading="false"
                  :hoverable="true"
                  :headStyle="{backgroundColor: plugin.selected ? '#42b883' : '#F5F5F5'}">
                  <a-checkbox slot="extra" :checked="plugin.selected" :value="pluginIndex" @change:click.stop="handlePluginChange"></a-checkbox>
                  <p>
                    {{ plugin.description }}
                  </p>
                </a-card>
              </div>
            </div>
            <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
          </div>
          <a-divider />
          <div class="plugin-description large horizontal" v-if="Object.keys(activePlugin).length !== 0">
            <a-descriptions title="基本信息" :column="2" :bordered="true">
              <a-descriptions-item label="插件名">{{ activePlugin.name }}</a-descriptions-item>
              <a-descriptions-item label="插件分类">{{ activePlugin.categoryName }}</a-descriptions-item>
              <a-descriptions-item label="版本">{{ activePlugin.version }}</a-descriptions-item>
              <a-descriptions-item label="创建时间">{{ activePlugin.createTime }}</a-descriptions-item>
              <a-descriptions-item label="描述">{{ activePlugin.description }}</a-descriptions-item>
            </a-descriptions>
          </div>
        </a-tab-pane>
        <a-button slot="tabBarExtraContent">
          确认选择
        </a-button>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
  export default {
    name: 'PluginShop',
    data () {
      return {
        currentOffset: 0,
        paginationFactor: 320,
        windowSize: 5,
        pluginCategory: [],
        plugins: [],
        activePlugin: {},
        selectPluginIds: {},
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
    methods: {
      moveCarousel (direction) {
        if (direction === 1 && !this.atEndOfList) {
          this.currentOffset -= this.paginationFactor * this.windowSize
        } else if (direction === -1 && !this.atHeadOfList) {
          this.currentOffset += this.paginationFactor * this.windowSize
        }
      },
      handleTabChange (key) {
        this.activePlugin = {}
        console.log(key)
      },
      handlePluginChange (e) {
        if (e) {
          e.preventDefault()
        }
        this.handlePluginSelected(e.target.value)
      },
      handlePluginSelected (index) {
        const plugin = this.plugins[index]
        if (plugin) {
          if (plugin.selected) {
            plugin.selected = false
          } else {
            this.plugins[index].selected = true
            this.activePlugin = this.plugins[index]
          }
        } else {
          this.plugins[index].selected = false
          this.activePlugin = null
        }
        this.$set(this.plugins, index, this.plugins[index])
      }
    }
  }
</script>
