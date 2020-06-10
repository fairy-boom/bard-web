<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="分组名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['name', {rules:[{required: true, message: '请输入分组名称'}]}]" />
    </a-form-item>
    <a-form-item
      label="服务地址"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['serverUrl', {rules:[{required: true, message: '请输入分组名称'}]}]" />
    </a-form-item>
    <a-form-item
      label="URL前缀"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['prefixUrl', {rules:[{required: true, message: '请输入URL前缀'}]}]" />
    </a-form-item>
    <a-form-item
      label="描述"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-textarea v-decorator="['description']"></a-textarea>
    </a-form-item>
  </a-form>
</template>

<script>
  import pick from 'lodash.pick'

  export default {
    name: 'GroupForm',
    props: {
      record: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        },
        form: this.$form.createForm(this)
      }
    },
    mounted () {
      console.log('this.', this.record)
      if (this.record) {
        this.form.setFieldsValue(pick(this.record, ['taskName']))
      }
    },
    methods: {
      onOk () {
        return new Promise(resolve => {
          resolve(true)
        })
      },
      onCancel () {
        return new Promise(resolve => {
          resolve(true)
        })
      },
      handleSubmit () {
        const { form: { validateFields } } = this
        this.visible = true
        validateFields((errors, values) => {
          if (!errors) {
            console.log('values', values)
          }
        })
      }
    }
  }
</script>
