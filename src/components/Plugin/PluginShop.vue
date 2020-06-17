<template>
  <a-card :bordered="false">
    <div class="plugin-shop-header"></div>
    <div class="plugin-shop-container card-container">
      <a-tabs @change="handleTabChange">
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
                  :headStyle="{backgroundColor: plugin.selected || isShow ? '#42b883' : '#F5F5F5', color: plugin.selected || isShow ? '#FFF' : ''}">
                  <a-icon type="delete" slot="extra" :style="{color: '#FFF'}" v-if="isShow" @click="remove(plugin)"/>
                  <a-checkbox slot="extra" :checked="plugin.selected" :value="pluginIndex" @change="handlePluginChange" v-else></a-checkbox>
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
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
  export default {
    name: 'PluginShop',
    props: {
      isShow: {
        type: Boolean,
        default: true,
        required: true
      },
      pluginCategory: {
        type: Array,
        default: null,
        required: true
      },
      plugins: {
        type: Array,
        default: null,
        required: true
      }
    },
    data () {
      return {
        currentOffset: 0,
        paginationFactor: 360,
        windowSize: 5,
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
        if (e.target.checked) {
            this.plugins[e.target.value].selected = true
        } else {
          this.plugins[e.target.value].selected = false
        }
        this.$set(this.plugins, e.target.value, this.plugins[e.target.value])
      },
      handlePluginSelected (index) {
        this.activePlugin = this.plugins[index]
      },
      remove (plugin) {
        this.$emit('removePlugin', plugin)
      }
    }
  }
</script>
