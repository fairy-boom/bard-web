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
                  @click="test(plugin.id)"
                  v-for="plugin in plugins"
                  :key="plugin.id"
                  :title="plugin.name"
                  style="min-width: 300px"
                  :loading="false"
                  :hoverable="true"
                  :headStyle="{backgroundColor: '#F5F5F5'}">
                  <a-checkbox slot="extra" :change="handlePluginSelected"></a-checkbox>
                  <p>
                    {{ plugin.description }}
                  </p>
                </a-card>
              </div>
            </div>
            <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
          </div>
          <a-divider />
          <div class="plugin-description large horizontal">
            <a-descriptions :title="111" :column="2">
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
        activePlugin: {},
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
          this.currentOffset -= this.paginationFactor * this.windowSize
        } else if (direction === -1 && !this.atHeadOfList) {
          this.currentOffset += this.paginationFactor * this.windowSize
        }
      },
      handlePluginSelected (e) {
        console.log(e)
      },
      test (id) {
        const v = this.plugins.find((item) => {
          return item.id === id
        })
        console.log(v)
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
<style lang="less">
  .plugin-description {
    margin: 0 50px;
    .title {
      color: rgba(0,0,0,.85);
      font-size: 14px;
      font-weight: 800;
      margin-bottom: 16px;
    }

    /deep/ .term {
      color: rgba(0,0,0,.85);
      display: table-cell;
      line-height: 20px;
      margin-right: 8px;
      padding-bottom: 16px;
      white-space: nowrap;

      &:not(:empty):after {
        content: ":";
        margin: 0 8px 0 2px;
        position: relative;
        top: -.5px;
      }
    }

    /deep/ .content {
      color: rgba(0,0,0,.65);
      display: table-cell;
      min-height: 22px;
      line-height: 22px;
      padding-bottom: 16px;
      width: 100%;
      &:empty {
        content: ' ';
        height: 38px;
        padding-bottom: 16px;
      }
    }

    &.small {

      .title {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        font-weight: normal;
        margin-bottom: 12px;
      }
      /deep/ .term, .content {
        padding-bottom: 8px;
      }
    }

    &.large {
      /deep/ .term, .content {
        padding-bottom: 16px;
      }

      .title {
        font-size: 16px;
      }
    }

    &.vertical {
      .term {
        padding-bottom: 8px;
      }
      /deep/ .term, .content {
        display: block;
      }
    }
  }
</style>
