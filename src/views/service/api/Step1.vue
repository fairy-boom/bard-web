<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="请填写API名称" v-decorator="['name', { rules: [{required: true, message: 'API名称不能为空'}] }]"/>
      </a-form-item>
      <a-form-item
        label="版本"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="请填写API版本号" v-decorator="['version', { rules: [{required: true, message: '版本号不能为空'}] }]"/>
      </a-form-item>
      <a-form-item
        label="分组"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="API名称"
          v-decorator="['name', { rules: [{required: true, message: '付款账户必须填写'}] }]">
          <a-select-option value="1">ant-design@alipay.com</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="HTTP请求方法"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="HTTP请求方法"
          v-decorator="['name', { rules: [{required: true, message: '付款账户必须填写'}] }]">
          <a-select-option value="1">ant-design@alipay.com</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="请求路径"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input placeholder="请填写请求路径" v-decorator="['name', { rules: [{required: true, message: '请求路径不能为空'}] }]"/>
      </a-form-item>
      <a-form-item
        label="描述"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name']"/>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>转账到支付宝账户</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
      <h4>转账到银行卡</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
