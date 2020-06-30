<template>
  <div>
    <a-row :gutter="24" type="flex">
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false" title="字典列表" :style="{ height: '100%' }">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                  <a-form-item label="字典编号">
                    <a-input v-model="queryParamParent.code" placeholder="字典编号"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="字典名称">
                    <a-input v-model="queryParamParent.name" placeholder="字典名称"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParamParent = {}">重置</a-button>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div class="table-operator">
            <a-button type="primary" icon="plus" @click="handlerAdd()">新增</a-button>
            <a-button type="primary" icon="plus" @click="handlerBatchRemove()">删除</a-button>
          </div>

          <s-table
            ref="table"
            size="default"
            :columns="parentColumns"
            :data="loadData"
            :rowSelection="{ selectedRowKeys: parentSelectedRowKeys, onChange: onSelectChange, onClick: onParentRowClick }"
            :customRow="(record) =>{ return {
              on:{
                click:(record)=>{
                  this.onSelectChange(record)
                }
              }
            }}"
          >
            <span slot="serial" slot-scope="text, record, index">
              {{ index + 1 }}
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="handlerEdit(record)">
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
      </a-col>
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false" title="字典详情" :style="{ height: '100%' }">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                  <a-form-item label="字典编号">
                    <a-input v-model="queryParamChild.code" placeholder="字典编号"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="字典名称">
                    <a-input v-model="queryParamChild.name" placeholder="字典名称"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParamChild = {}">重置</a-button>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div class="table-operator">
            <a-button type="primary" icon="plus" @click="add()">新增</a-button>
            <a-button type="primary" icon="plus" @click="add()">删除</a-button>
          </div>

          <s-table
            ref="table"
            size="default"
            :columns="parentColumns"
            :data="loadChildData"
            :rowSelection="{ selectedRowKeys: childSelectedRowKeys, onChange: onSelectChange }"
          >
            <span slot="serial" slot-scope="text, record, index">
              {{ index + 1 }}
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
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { STable } from '@/components'
import DictForm from './modules/DictForm'
import { queryDict, deleteDict, deleteDicts } from '@/api/system/dict'
import PluginForm from '@/views/system/plugin/modules/PluginForm'

export default {
  name: 'TableList',
  components: {
    STable,
    DictForm
  },
  data () {
    return {
      // 查询参数
      queryParamParent: {},
      queryParamChild: {},
      // 表头
      parentColumns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '字典编号',
          dataIndex: 'code'
        },
        {
          title: '字典名称',
          dataIndex: 'name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 表头
      childColumns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '字典编号',
          dataIndex: 'code'
        },
        {
          title: '字典名称',
          dataIndex: 'name'
        },
        {
          title: '字典值',
          dataIndex: 'name'
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
        return queryDict(Object.assign(parameter, this.queryParamParent))
          .then(res => {
            return res.data
          })
      },
      loadChildData: parameter => {
        return queryDict(Object.assign(parameter, this.queryParamChild))
          .then(res => {
            return res.data
          })
      },
      parentSelectedRowKeys: [],
      childSelectedRowKeys: []
    }
  },
  methods: {
    handlerAdd () {
      this.$dialog(DictForm,
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
    handlerEdit (record) {
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
          deleteDict(record.id).then(res => {
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
    handlerBatchRemove () {
      if (!this.selectedRowKeys.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }
      const vm = this
      this.$confirm({
        title: '提示',
        content: '确定删除选中的记录?',
        centered: true,
        onOk () {
          deleteDicts(this.selectedRowKeys).then(res => {
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
    onParentRowClick (row) {
      this.queryParamChild.parentId = row.id
      this.loadChildData()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>
