<template>
  <a-card :bordered="false" title="选择组件">
    <div class="plugin-shop-header"></div>
    <div class="plugin-shop-container card-container">
      <a-tabs default-active-key="1">
        <a-tab-pane v-for="item in pluginCategory" :key="item.id" :tab="item.name">
          <div class="card-carousel-wrapper">
            <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
            <div class="plugin-card-container" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
              <a-card
                class="plugin-card"
                v-for="plugin in plugins"
                :key="plugin.id"
                :title="plugin.name"
                style="min-width: 320px"
                :loading="false"
                :hoverable="true"
                :headStyle="{backgroundColor: '#F5F5F5'}">
                <a-checkbox slot="extra"></a-checkbox>
                <p>
                  {{ plugin.description }}
                </p>
              </a-card>
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
        paginationFactor: 220,
        windowSize: 7,
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
<style lang="less">
  .card-carousel-wrapper {
    display: flex;
    align-items: center;
    margin: 20px 0 40px;
    color: #666a73;

    .card-carousel--nav__left, .card-carousel--nav__right {
      display: inline-block;
      width: 15px;
      height: 15px;
      padding: 10px;
      box-sizing: border-box;
      border-top: 2px solid #42b883;
      border-right: 2px solid #42b883;
      cursor: pointer;
      margin: 0 10px;
      transition: transform 150ms linear;
    }

    .card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
      opacity: 0.2;
      border-color: black;
    }

    .card-carousel--nav__left {
      transform: rotate(-135deg);
    }

    .card-carousel--nav__left:active {
      transform: rotate(-135deg) scale(0.9);
    }
    .card-carousel--nav__right {
      transform: rotate(45deg);
    }
    .card-carousel--nav__right:active {
      transform: rotate(45deg) scale(0.9);
    }
  }

  .plugin-card-container {
    display: flex;
    transition: transform 150ms ease-out;
    overflow: hidden;

    .plugin-card {
      min-height: 180px;
      cursor: pointer;
      box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40, 44, 53, 0.08);
      background-color: #fff;
      border-radius: 4px;
      z-index: 3;
      margin: 0 10px 2px;
    }
  }
</style>
