<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="插件名称">
              <a-input v-model="queryParam.name" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="分类">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">路由</a-select-option>
                <a-select-option value="2">日志</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="add()">添加插件</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleBatch">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <a-menu-item key="2"><a-icon type="lock" />禁用</a-menu-item>
          <a-menu-item key="3"><a-icon type="lock" />启用</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    >
      <span slot="status" slot-scope="text">
        <template>
          {{ text | status }}
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="edit(record)">
            <a-icon type="edit" />编辑
          </a>
          <a-divider type="vertical" />
          <a @click="handleRemove(record)">
            <a-icon type="delete" />删除
          </a>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import PluginForm from './modules/PluginForm'
import { getPlugins, deletePlugin, deletePlugins, updateStatus } from '@/api/plugin'

export default {
  name: 'TableList',
  components: {
    STable,
    PluginForm
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '插件名称',
          dataIndex: 'name'
        },
        {
          title: '分类',
          dataIndex: 'category'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '描述',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '创建时间',
          dataIndex: 'createdTime'
        },
        {
          title: '更新时间',
          dataIndex: 'modifyTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getPlugins(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    add () {
      this.$dialog(PluginForm,
        {
          record: {},
          on: {
            ok () {
              console.log('ok 回调')
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        {
          title: '添加插件',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    edit (record) {
      console.log('record', record)
      this.$dialog(PluginForm,
        {
          record,
          on: {
            ok () {
              console.log('ok 回调')
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        {
          title: '编辑',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    handleRemove (record) {
      const vm = this
      this.$confirm({
        title: '提示',
        content: '确定删除该行记录?',
        centered: true,
        onOk () {
          deletePlugin(record.id).then(res => {
            if (res.success) {
              vm.$refs.table.refresh(true)
            } else {
              vm.$message.error(res.msg)
            }
          })
        },
        onCancel () {}
      })
    },
    handleBatchRemove (ids) {
      const vm = this
      this.$confirm({
        title: '提示',
        content: '确定删除选中的记录?',
        centered: true,
        onOk () {
          deletePlugins(ids).then(res => {
            if (res.success) {
              vm.$refs.table.refresh(true)
            } else {
              vm.$message.error(res.msg)
            }
          })
        },
        onCancel () {}
      })
    },
    handleUpdateStatus (ids, status) {
      const vm = this
      const tip = status === 1 ? '启用' : '禁用'
      this.$confirm({
        title: '提示',
        content: '确定' + tip + '选中的记录?',
        centered: true,
        onOk () {
          updateStatus(ids, status).then(res => {
            if (res.success) {
              vm.$refs.table.refresh(true)
            } else {
              vm.$message.error(res.msg)
            }
          })
        },
        onCancel () {}
      })
    },
    handleBatch (record) {
      if (!this.selectedRowKeys.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }
      switch (record.key) {
        case '1':
          this.handleBatchRemove(this.selectedRowKeys)
          break
        case '2':
          this.handleUpdateStatus(this.selectedRowKeys, 2)
          break
        case '3':
          this.handleUpdateStatus(this.selectedRowKeys, 1)
          break
      }
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
