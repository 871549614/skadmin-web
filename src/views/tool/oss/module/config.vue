<template>
  <el-form ref="form" :model="form" :rules="rules" style="margin-top: 6px;" size="small" label-width="130px">
    <el-form-item label="服务提供商" prop="serviceProvider">
      <el-select v-model="value" placeholder="请选择" style="width: 200px" @on-change="changeOss">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
    </el-select></el-form-item>
    <div v-if="value !== 'LOCAL_OSS'">
      <el-form-item label="accessKey：" prop="accessKey">
        <el-input v-model="oss.accessKey" type="text" placeholder="请输入accessKey" style="width: 350px"/>
      </el-form-item>
      <el-form-item label="secretKey：" prop="secretKey">
        <el-tooltip placement="right" content="无法编辑时请先点击查看图标">
          <el-input v-model="oss.secretKey" :readonly="!changedOssSK" class="input-see" type="text" icon="ios-eye" placeholder="请输入secretKey" style="width: 350px" @on-click="seeSecret(oss.serviceName)"/>
        </el-tooltip>
      </el-form-item>
      <el-form-item v-if="value === 'QINIU_OSS'" label="zone存储区域：" prop="zone">
        <el-select v-model="oss.zone" placeholder="请选择存储区域" style="width: 350px">
          <el-option value="-1">自动判断</el-option>
          <el-option value="0">华东</el-option>
          <el-option value="1">华北</el-option>
          <el-option value="2">华南</el-option>
          <el-option value="3">北美</el-option>
          <el-option value="4">东南亚</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="bucket空间：" prop="bucket">
        <el-select v-model="oss.bucket" type="text" placeholder="请输入bucket空间名" style="width: 350px"/>
      </el-form-item>
      <el-form-item v-if="value === 'TENCENT_OSS'" label="所属地域：" prop="bucketRegion">
        <el-select v-model="oss.bucketRegion" placeholder="请选择或输入搜索" style="width: 350px" filterable>
          <el-option v-for="(item, i) in dictBucketRegions" :key="i" :value="item.value">{{ item.title }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :error="errorMsg" label="endpoint域名：" prop="endpoint">
        <el-input v-model="oss.endpoint" :placeholder="endpointPH" type="text" style="width: 350px">
          <el-select slot="prepend" v-model="oss.http" style="width: 80px" prop="http">
            <el-option value="http://">http://</el-option>
            <el-option value="https://">https://</el-option>
          </el-select>
        </el-input>
      </el-form-item>
    </div>
    <div v-else>
      <el-form-item :error="errorMsg2" label="存储磁盘路径：" prop="filePath">
        <el-input v-model="oss.filePath" type="text" placeholder="例如：D:/upload" style="width: 350px"/>
      </el-form-item>
      <el-form-item :error="errorMsg" label="文件预览接口：" prop="endpoint">
        <el-input v-model="oss.endpoint" type="text" placeholder="请输入文件预览接口" style="width: 350px">
          <el-select slot="prepend" v-model="value1" style="width: 80px" prop="http">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1"/>
          </el-select>
        </el-input>
      </el-form-item>
    </div>
    <el-button :loading="loading" style="margin-left:5%;" size="medium" type="success" @click="doSubmit">保存配置</el-button>
  </el-form>
</template>

<script>
import { get, update, getOssSet } from '@/api/qiniu'
export default {
  name: 'Config',
  data() {
    return {
      form: 'oss',
      options: [{
        value: 'LOCAL_OSS',
        label: '本地服务器'
      }, {
        value: 'MINIO_OSS',
        label: 'MinIO'
      }, {
        value: 'QINIU_OSS',
        label: '七牛云'
      }, {
        value: 'ALI_OSS',
        label: '阿里云'
      }, {
        value: 'TENCENT_OSS',
        label: '腾讯云'
      }],
      value: 'QINIU_OSS',
      options1: [{
        value1: 'http://',
        label1: 'http://'
      }, {
        value1: 'https://',
        label1: 'https://'
      }],
      value1: '',
      errorMsg: '',
      errorMsg2: '',
      oss: {
        serviceName: '',
        accessKey: '',
        secretKey: '',
        endpoint: '',
        bucket: ''
      },
      rules: {
        accessKey: [
          { required: true, message: '请输入accessKey', trigger: 'blur' }
        ],
        secretKey: [
          { required: true, message: '请输入secretKey', trigger: 'blur' }
        ],
        bucket: [
          { required: true, message: '请输入空间名称', trigger: 'blur' }
        ],
        host: [
          { required: true, message: '请输入外链域名', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '空间类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      get().then(res => {
        this.form = res
      })
    },
    changeOss(v) {
      if (v === 'ALI_OSS') {
        this.endpointPH = '请输入EndPoint(地域节点) 非Bucket域名'
      } else if (v === 'TENCENT_OSS') {
        this.endpointPH =
          '请输入完整请求域名'
      } else {
        this.endpointPH = '请输入空间访问域名'
      }
      getOssSet(v).then(res => {
        if (res.result) {
          // 转换null为""
          for (const attr in res.result) {
            if (res.result[attr] == null) {
              res.result[attr] = ''
            }
          }
          this.oss = res.result
          this.changedOssSK = false
        } else {
          this.oss = { serviceName: v }
          if (this.oss.serviceName === 'LOCAL_OSS') {
            this.oss.http = 'http://'
            this.oss.endpoint = '127.0.0.1:9999/xboot/file/view'
          }
          this.changedOssSK = true
        }
      })
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          update(this.form).then(res => {
            this.$notify({
              title: '修改成功',
              type: 'success',
              duration: 2500
            })
            this.loading = false
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
