<template>
  <div style="padding-top: 40px">
    <el-row id="app_form_predict">
      <el-col :span="12" :offset="6">
        <h2 class="title">Structure Prediction</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="right">
          <el-form-item label="Input Sequence" prop="protein_seq">
            <el-input type="textarea" v-model="ruleForm.protein_seq" :autosize="{ minRows: 4, maxRows: 20 }" clearable></el-input>
          </el-form-item>

          <el-form-item label="Platform" prop="platform">
            <el-checkbox-group v-model="ruleForm.platform">
              <el-checkbox label="AlphaFold 2" checked></el-checkbox>
              <el-checkbox label="RoseTTAFold"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="Job Name" prop="proj_name">
            <el-input v-model="ruleForm.proj_name"></el-input>
          </el-form-item>

          <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email" type="email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Summit</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
            <el-button @click="ExampleFrom()">Example</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Structure_prediction',
    data() {
      return {
        ruleForm: {
          proj_name: '',
          email: '',
          platform: [],
          protein_seq: '',
        },
        rules: {
          proj_name: [
            {
              required: true,
              message: 'Please input a job name!',
              trigger: 'blur',
            },
            {
              min: 3,
              max: 20,
              message: 'length 3 to 20 characters',
              trigger: 'blur',
            },
            { validator: this.checkProName, trigger: 'blur' },
          ],


          protein_seq: [
          {
            required: true,
            message: 'Please input protein sequence!',
            trigger: 'blur',
          }, ],

          email: [
          {
            type: 'email',
            required: true,
            message: 'please input valid email address!',
            trigger: 'change',
          }, ],
          platform: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one platform',
            trigger: 'blur',
          }, ],
        },
      }
    },

    created() {
      // this.get_token()
    },
    methods: {
      submitForm(formName) {
        this.ruleForm.protein_seq = this.ruleForm.protein_seq.toString().trim()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getFormResponse()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      getFormResponse() {
        this.$http
          .post(
            '/predict/structure_submit/',
            //headers: { 'X-CSRFToken': window.sessionStorage.getItem('X-CSRFToken') },
            this.ruleForm
          )
          .then((res) => {
            console.log(res)
            this.$router.push('/predict/structure/queue/')
          })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields()
      },

      ExampleFrom() {
        ;
        (this.ruleForm.proj_name = 'Job_1'),
        (this.ruleForm.email = 'HelloWorld@gmail.com'),
        (this.ruleForm.platform = ['AlphaFold 2', 'RoseTTAFold']),
        (this.ruleForm.protein_seq =
          '>T1078 Tsp1, Trichoderma virens, 138 residues|\nMAAPTPADKSMMAAVPEWTITNLKRVCNAGNTSCTWTFGVDTHLATATSCTYVVKANANASQASGGPVTCGPYTITSSWSGQFGPNNGFTTFAVTDFSKKLIVWPAYTDVQVQAGKVVSPNQSYAPANLPLEHHHHHH')
      },

      async checkProName(rule, value, callback) {
        const { data: res } = await this.$http.get('/predict/structure/check/', {
          params: { proj_name: value },
        })

        if (res.isExist == 1) {
          return callback(new Error('Job name exist !'))
        } else {
          return callback()
        }
      },

      async get_token() {
        const { data: res } = await this.$http.get('get_token')

        window.sessionStorage.setItem('X-CSRFToken', res.token)
      },
    },
  }
</script>

<style lang="less" scoped>
</style>