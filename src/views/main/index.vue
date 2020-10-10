<template>
  <el-container style="height: 900px; border: 1px solid #eee; background-color: #545c64">
    <el-aside width="200px"
              style="background-color: #545c64">
      <el-menu default-active="3-1-2"
               class="el-menu-vertical-demo"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               @select="handleSelected">
        <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>基本信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <template slot="title">
            <i class="el-icon-circle-plus"></i>
            <span>声明用户属性</span>
          </template>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-office-building"></i>
            <span>组织</span>
          </template>
          <el-menu-item-group>
            <template slot="title">基本信息</template>
            <el-menu-item index="3-1-1">已有组织</el-menu-item>
            <el-menu-item index="3-1-2">查询申请</el-menu-item>
            <el-menu-item index="3-1-3">查询组织</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">组织操作</template>
            <el-menu-item index="3-2-1">申请新组织</el-menu-item>
            <el-menu-item index="3-2-2">审批新组织</el-menu-item>
            <el-menu-item index="3-2-3">秘密分享</el-menu-item>
            <el-menu-item index="3-2-4">确认新组织</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">组织属性操作</template>
            <el-menu-item index="3-3-1">申请新组织属性</el-menu-item>
            <el-menu-item index="3-3-2">审批新组织属性</el-menu-item>
            <el-menu-item index="3-3-3">秘密分享</el-menu-item>
            <el-menu-item index="3-3-4">确认新组织属性</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-chat-line-square"></i>
            <span>属性相关</span>
          </template>
          <el-menu-item index="4-1">属性申请</el-menu-item>
          <el-menu-item index="4-2">属性审批</el-menu-item>
        </el-submenu>
        <el-menu-item index="5">
          <template slot="title">
            <i class="el-icon-coffee-cup"></i>
            <span>加密分享</span>
          </template>
        </el-menu-item>
        <el-menu-item index="6">
          <template slot="title">
            <i class="el-icon-mobile-phone"></i>
            <span>查询密文</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px; background-color: #545c64; color: #fff">
        <span>{{fileName}}</span>
      </el-header>

      <!-- main parts -->
      <el-main>
        <!-- 1 -->
        <div class=main
             v-show="active === '1'">
          <el-row>
            <el-col :span="4">文件名</el-col>
            <el-col :span="20">{{fileName}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">用户名</el-col>
            <el-col :span="20">{{userName}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">公钥</el-col>
            <el-col :span="20">{{pubKey}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">现有属性</el-col>
            <el-col :span="20">{{attributesForDisplay}}</el-col>
          </el-row>
        </div>
        <!-- 2 -->
        <div class=main
             v-show="active === '2'">
          <el-row>
            <el-col :span="4">现有属性</el-col>
            <el-col :span="20">{{attributesForDisplay}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">新声明属性名称</el-col>
            <el-col :span="20">
              <el-input placeholder="格式：用户名:属性名称，支持小写字母"
                        v-model="newAttr"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-button style="margin-top: 12px;"
                     @click="handleApplyUserAttr">确认申请</el-button>
        </div>
        <!-- 3-1-1 -->
        <div class=main
             v-show="active === '3-1-1'">
          <el-row>
            <el-col :span="4">现有组织</el-col>
            <el-col :span="20">{{orgs.join(', ')}}</el-col>
          </el-row>
        </div>
        <!-- 3-1-2 -->
        <div class=main
             v-show="active === '3-1-2'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="searchOrg"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">查询类型</el-col>
            <el-col :span="10">
              <el-radio v-model="searchApplyType"
                        label="1">组织申请</el-radio>
            </el-col>
            <el-col :span="10">
              <el-radio v-model="searchApplyType"
                        label="2">组织属性申请</el-radio>
            </el-col>
          </el-row>
          <el-button style="margin-top: 12px;"
                     @click="handleApplySearch">查询</el-button>
          <div v-show="searchApplyResponse.orgId != null">
            <jsonView :json='searchApplyResponse'></jsonView>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template> 

<style>
.el-header {
  background-color: #b3c0d1;
  line-height: 60px;
}
.el-row {
  line-height: 60px;
}
</style>

<script>
  import jsonView from '../../components/jsonView'

  export default {
    components: {
      jsonView: jsonView,
    },
    data() {
      return {
        fileName: this.$route.params.fileName,
        active: '3-1-2',
        // 基本信息
        userName: null,
        priKey: null,
        pubKey: null,
        attributes: [],
        attributesForDisplay: null,
        // 声明用户属性
        newAttr: '',
        // 组织相关
        orgs: [],
        orgApplies: [],
        searchOrg: '',
        searchApplyType: '',
        newOrg: '',
        searchApplyResponse: {},
        // 组织属性相关
        orgAttrApplies: [],
        // 属性相关
        applyNewAttr: '',
        attrApplies: [],
        // 加密
        plainText: '',
        policy: '',
        cipherText: '',
        // 查询密文
        cipherTexts: [],
      }
    },
    watch: {
      attributes: {
        handler() {
          this.attributesForDisplay = this.attributes.join(', ')
        },
        deep:true
      },
    },
    methods: {
      handleSelected(index, indexPath) {
        console.log(index, indexPath)
        this.active = index;
        switch(index) {
          case '1':
            this.baseUserInfo()
            break
            case '2':
              this.newUserAttr()
              break
            case '3-1-1':
              this.existingOrgs()
              break
            case '3-1-2':
              this.relatedApplies()
              break
            case '3-1-3':
              this.searchOrgs()
              break
            case '3-2-1':
              this.orgApply()
              break
            case '3-2-2':
              this.approveOrgApply()
              break
            case '3-2-3':
              this.shareForOrg()
              break
            case '3-2-4':
              this.confirmOrg()
              break
            case '3-3-1':
              this.orgAttrApply()
              break
            case '3-3-2':
              this.approveOrgAttrApply()
              break
            case '3-3-3':
              this.shareForOrgAttr()
              break
            case '3-3-4':
              this.confirmOrgAttr()
              break
            case '4-1':
              this.applyAttr()
              break
            case '4-2':
              this.approveAttr()
              break
            case '5':
              this.encrypt()
              break
            case '6':
              this.searchAndDecrypt()
              break
        }
      },
      baseUserInfo: function() {
        console.log('base user info')
      },
      newUserAttr() {
        
      },
      existingOrgs() {
        
      },
      relatedApplies() {
        
      },
      searchOrgs() {
        
      },
      orgApply() {
        
      },
      approveOrgApply() {
        
      },
      shareForOrg() {
        
      },
      confirmOrg() {
        
      },
      orgAttrApply() {
        
      },
      approveOrgAttrApply() {
        
      },
      shareForOrgAttr() {
        
      },
      confirmOrgAttr() {
        
      },
      applyAttr() {
        
      },
      approveAttr() {
        
      },
      encrypt() {
        
      },
      searchAndDecrypt() {
        
      },

      // 操作
      handleApplyUserAttr() {
        if (this.attributes.indexOf(this.newAttr) != -1) {
          this.$message('申请重复属性');
          return
        }
        //todo real
        this.$message('申请成功');
        this.attributes.push(this.newAttr)
      },
      handleApplySearch() {
        //todo real
        this.searchApplyResponse = {
          "orgId": "simpleOrg",
          "uidMap": {
            "cznczn": true,
            "cznczn2": false,
            "weiyan": false
          },
          "shareMap": {
            "cznczn": {},
            "cznczn2": {},
            "weiyan": {}
          },
          "opkMap": {},
          "t": 2,
          "n": 3,
          "fromUserName": "cznczn",
          "status": "PENDING_APPROVE",
          "createTime": "1594781237"
        }
        console.log(this.searchApplyResponse)
      },
    }
  };

</script>