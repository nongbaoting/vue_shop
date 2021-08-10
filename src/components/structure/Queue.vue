<template>
  <el-row>
    <el-col>
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" :stripe='true' @row-click='clickRow'>
        <el-table-column type='index'></el-table-column>
        <el-table-column sortable prop="fields.job_name" label="Job Name">
          <template slot-scope="scope">
            <!-- 如果出现完completed_date就现实连接 -->
            <el-link v-if="scope.row.fields.completed_date" type="success" @click=toResult(scope.row.fields.job_name)>
              {{ scope.row.fields.proj_name }}
            </el-link>
              <!-- 否者现实弹框 -->
              <el-popover v-else trigger="click" placement="top">
                <p>Job <span style="color:red">{{ scope.row.fields.proj_name }}</span> is not completed</p>
                <div slot="reference" class="name-wrapper">
                  <el-link type="info" disabled>
                    {{ scope.row.fields.proj_name }}
                  </el-link>
                </div>
              </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Tools">
          <template slot-scope="scope">
            {{ scope.row.fields.tools.replace(',', ', ') }}
          </template>
        </el-table-column>
        <el-table-column label="Submitted Date">
          <template slot-scope="scope">
            {{ format_date( scope.row.fields.upload_date ) }}
          </template>
        </el-table-column>
        <el-table-column label="Started Date">
          <template slot-scope="scope">
            {{ format_date( scope.row.fields.running_date) }}
          </template>
        </el-table-column>

        <el-table-column sortable prop="fields.completed_date" label="Completed Date">
          <template slot-scope="scope">
            {{ format_date( scope.row.fields.completed_date) }}
          </template> </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Structure_queue',
    data() {
      return {
        tableData: [],
      }
    },
    mounted() {
      this.queue()
    },

    computed: {

    },
    methods: {
      clickRow({ row, rowIndex }) {
        console.log(row)

      },
      toResult(proj_name) {
        this.$router.push({
          path: '/predict/structure/result/',
          query: { proj_name: proj_name },
        })
      },
      queue() {
        this.$http.get('/api/structure/queue/').then((response) => {
          // console.log(response)
          this.tableData = JSON.parse(response.data)
          // console.log(this.tableData)
        })
      },
      format_date: function (dat_str) {
        if (dat_str) {
          return dat_str.toString().replace('T', ' ').replace(/\.\d+$/, '')
        } else {
          return 'pending'
        }

      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
    },
  }
</script>

<style lang="less" scoped>
  .title {
    position: absolute;
    display: flex;
    text-align: center;
    justify-content: center;
    padding-bottom: 5px;
    transform: translate(-50%, -50%);
  }
</style>