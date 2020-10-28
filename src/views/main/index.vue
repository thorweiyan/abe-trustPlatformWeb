<template>
  <el-container style="height: 900px; border: 1px solid #eee; background-color: #545c64">
    <el-aside width="200px"
              style="background-color: #545c64">
      <el-menu default-active="1"
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
          <el-row>
            <el-col :span="4">申请的属性</el-col>
            <el-col :span="20">{{othersAttributesForDisplay}}</el-col>
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
                     @click="handleAnnotateAttr">确认申请</el-button>
        </div>
        <!-- 3-1-1 -->
        <div class=main
             v-show="active === '3-1-1'">
          <el-row>
            <el-col :span="4">现有组织</el-col>
            <el-col :span="20">{{orgsForDisplay}}</el-col>
          </el-row>
        </div>
        <!-- 3-1-2 -->
        <div class=main
             v-show="active === '3-1-2'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">查询类型</el-col>
            <el-col :span="10">
              <el-radio v-model="searchApplyType"
                        label="CREATION">组织申请</el-radio>
            </el-col>
            <el-col :span="10">
              <el-radio v-model="searchApplyType"
                        label="ATTRIBUTE">组织属性申请</el-radio>
            </el-col>
          </el-row>
          <el-row v-show="searchApplyType === 'ATTRIBUTE'">
            <el-col :span="4">组织属性名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgAttrName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-button style="margin-top: 12px;"
                     @click="handleApplySearch">查询</el-button>
          <div v-show="searchApplyResponse != null && searchApplyResponse.orgId != null">
            <jsonView :json='searchApplyResponse'></jsonView>
          </div>
        </div>
        <!-- 3-1-3 -->
        <div class=main
             v-show="active === '3-1-3'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-button style="margin-top: 12px;"
                     @click="handleOrgSearch">查询</el-button>
          <div v-show="searchOrgResponse.orgId != null">
            <el-row>
              <el-col :span="4">组织名称</el-col>
              <el-col :span="20">
                {{ searchOrgResponse.orgId }}
              </el-col>
              <el-col :span="4">组织成员</el-col>
              <el-col :span="20">
                {{ searchOrgResponse.uidSet == null ? '' : searchOrgResponse.uidSet.join(', ') }}
              </el-col>
              <el-col :span="4">现有属性</el-col>
              <el-col :span="20">
                {{ searchOrgResponse.attrSet == null ? '' : searchOrgResponse.attrSet.join(', ') }}
              </el-col>
              <el-col :span="4">阈值</el-col>
              <el-col :span="20">
                {{ searchOrgResponse.t }}
              </el-col>
              <el-col :span="4">成员总数</el-col>
              <el-col :span="20">
                {{ searchOrgResponse.n }}
              </el-col>
              <el-col :span="4">opk</el-col>
              <el-col :span="20">
                {{ searchOrgResponse.opk }}
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 3-2-1 -->
        <div class=main
             v-show="active === '3-2-1'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="newOrg.orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">阈值t和组织成员总数n</el-col>
            <el-col :span="10">
              <el-input v-model="newOrg.t"
                        placeholder="t"
                        type="number"
                        clearable>
              </el-input>
            </el-col>
            <el-col :span="10">
              <el-input v-model="newOrg.n"
                        placeholder="n"
                        type="number"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">用户</el-col>
            <el-col :span="5">
              <el-input v-model="newOrg.tempUser"
                        clearable>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-button style="margin-top: 12px;"
                         @click="handleAddOrgUser(newOrg.tempUser)">添加</el-button>
            </el-col>
            <el-col :span="10">
              {{newOrg.users.join(", ")}}
            </el-col>
          </el-row>

          <el-button style="margin-top: 12px;"
                     @click="handleApplyNewOrg">申请</el-button>
        </div>
        <!-- 3-2-2 -->
        <div class=main
             v-show="active === '3-2-2'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-button style="margin-top: 12px;"
                         @click="handleApproveOrg(true)">加入</el-button>
            </el-col>
            <el-col :span="12">
              <el-button style="margin-top: 12px;"
                         @click="handleApproveOrg(false)">不加入</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 3-2-3 -->
        <div class=main
             v-show="active === '3-2-3'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>

          <el-button style="margin-top: 12px;"
                     @click="handleShareForOrg">确认分享秘密</el-button>
        </div>
        <!-- 3-2-4 -->
        <div class=main
             v-show="active === '3-2-4'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>

          <el-button style="margin-top: 12px;"
                     @click="handleConfirmOrg">确认创建该组织</el-button>
        </div>
        <!-- 3-3-1 -->
        <div class=main
             v-show="active === '3-3-1'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="newOrgAttr.orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">组织属性名称</el-col>
            <el-col :span="20">
              <el-input v-model="newOrgAttr.orgAttrName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>

          <el-button style="margin-top: 12px;"
                     @click="handleApplyNewOrg">申请</el-button>
        </div>
        <!-- 3-3-2 -->
        <div class=main
             v-show="active === '3-3-2'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">组织属性名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgAttrName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-button style="margin-top: 12px;"
                         @click="handleApproveOrgAttr(true)">通过审批</el-button>
            </el-col>
            <el-col :span="12">
              <el-button style="margin-top: 12px;"
                         @click="handleApproveOrgAttr(false)">不通过审批</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 3-3-3 -->
        <div class=main
             v-show="active === '3-3-3'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">组织属性名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgAttrName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>

          <el-button style="margin-top: 12px;"
                     @click="handleShareForOrgAttr()">确认分享秘密</el-button>
        </div>
        <!-- 3-3-4 -->
        <div class=main
             v-show="active === '3-3-4'">
          <el-row>
            <el-col :span="4">组织名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">组织属性名称</el-col>
            <el-col :span="20">
              <el-input v-model="orgAttrName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>

          <el-button style="margin-top: 12px;"
                     @click="handleConfirmOrgAttr()">确认声明该组织属性</el-button>
        </div>
        <!-- 4-1 -->
        <div class=main
             v-show="active === '4-1'">
          <el-row>
            <el-col :span="4">申请的属性</el-col>
            <el-col :span="20">
              <el-input v-model="applyNewAttr.attrName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">申请对象类型</el-col>
            <el-col :span="10">
              <el-radio v-model="applyNewAttr.type"
                        label=0>用户</el-radio>
            </el-col>
            <el-col :span="10">
              <el-radio v-model="applyNewAttr.type"
                        label=1>组织</el-radio>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">申请对象名称（用户/组织）</el-col>
            <el-col :span="20">
              <el-input v-model="applyNewAttr.toName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">备注</el-col>
            <el-col :span="20">
              <el-input v-model="applyNewAttr.remark"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">是否公开</el-col>
            <el-col :span="10">
              <el-radio v-model="applyNewAttr.isPublic"
                        label=0>公开</el-radio>
            </el-col>
            <el-col :span="10">
              <el-radio v-model="applyNewAttr.isPublic"
                        label=1>不公开</el-radio>
            </el-col>
          </el-row>
          <el-button style="margin-top: 12px;"
                     @click="handleApplyUserAttr">确认申请</el-button>
        </div>
        <!-- 4-2 -->
        <div class=main
             v-show="active === '4-2'">
          <el-row>
            <el-col :span="4">类型</el-col>
            <el-col :span="10">
              <el-radio v-model="searchApplyRequest.type"
                        label=0>用户属性</el-radio>
            </el-col>
            <el-col :span="10">
              <el-radio v-model="searchApplyRequest.type"
                        label=1>组织属性</el-radio>
            </el-col>
          </el-row>
          <el-row v-show="searchApplyRequest.type == 0">
            <el-col :span="4">被申请人</el-col>
            <el-col :span="20">
              <el-input v-model="searchApplyRequest.toUid"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row v-show="searchApplyRequest.type == 1">
            <el-col :span="4">被申请组织</el-col>
            <el-col :span="20">
              <el-input v-model="searchApplyRequest.toOrgId"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">申请人</el-col>
            <el-col :span="20">
              <el-input v-model="searchApplyRequest.userName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">状态</el-col>
            <el-col :span="20">
              <el-dropdown @command="handleStatusClick">
                <el-button>
                  {{searchApplyRequest.status}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="ALL">ALL</el-dropdown-item>
                  <el-dropdown-item command="PENDING">PENDING</el-dropdown-item>
                  <el-dropdown-item command="SUCCESS">SUCCESS</el-dropdown-item>
                  <el-dropdown-item command="FAIL">FAIL</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <el-button style="margin-top: 12px; margin-bottom:12px"
                     type="primary"
                     @click="handleSearchAttrApply">查询申请</el-button>
          <el-table :data="attrApplies"
                    border
                    style="width: 100%">
            <el-table-column prop="fromUid"
                             label="申请人"
                             width="80">
            </el-table-column>
            <el-table-column prop="toUid"
                             label="被申请人"
                             width="80">
            </el-table-column>
            <el-table-column prop="toOrgId"
                             label="被申请组织"
                             width="100">
            </el-table-column>
            <el-table-column prop="isPublicStr"
                             label="是否公开"
                             width="80">
            </el-table-column>
            <el-table-column prop="attrName"
                             label="申请属性"
                             width="110">
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             width="90">
            </el-table-column>
            <el-table-column prop="approvalMapStr"
                             label="审批状态">
            </el-table-column>
            <el-table-column prop="remark"
                             label="备注">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             width="100">
              <template slot-scope="scope">
                <el-row style="line-height: 30px">
                  <el-button @click="handleClick(scope.row, true)"
                             type="text"
                             style="middle"
                             size="small">审批通过</el-button>
                </el-row>
                <el-row style="line-height: 30px">
                  <el-button @click="handleClick(scope.row, false)"
                             type="text"
                             style="middle"
                             size="small">审批不通过</el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 5 -->
        <div class=main
             v-show="active === '5'">
          <el-row>
            <el-col :span="4">明文</el-col>
            <el-col :span="20">
              <el-input v-model="encryptData.plainText"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">标签</el-col>
            <el-col :span="20">
              <el-input v-model="encryptData.tagsStr"
                        placeholder="用逗号隔开"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">访问控制策略</el-col>
            <el-col :span="20">
              <el-input v-model="encryptData.tagsStr"
                        placeholder="例子: (A AND (B OR C))"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-button style="margin-top: 12px;"
                     @click="handleEncrypt">确认分享</el-button>
        </div>
        <!-- 6 -->
        <div class=main
             v-show="active === '6'">
          <el-row>
            <el-col :span="4">分享人</el-col>
            <el-col :span="20">
              <el-input v-model="queryRequest.fromUserName"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">标签</el-col>
            <el-col :span="20">
              <el-input v-model="queryRequest.tag"
                        clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-button style="margin-top: 12px; margin-bottom:12px"
                     type="primary"
                     @click="handleQueryContents">查询</el-button>
          <el-table :data="cipherTexts"
                    border
                    style="width: 100%">
            <el-table-column prop="policy"
                             label="访问控制策略"
                             width="180">
            </el-table-column>
            <el-table-column prop="tagsStr"
                             label="标签"
                             width="100">
            </el-table-column>
            <el-table-column label="操作"
                             width="100">
              <template slot-scope="scope">
                <el-button @click="showCipherText(scope.row)"
                           type="text"
                           style="middle"
                           size="small">显示</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="plainText"
                             label="明文">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             width="100">
              <template slot-scope="scope">
                <el-button @click="handleDecrypt(scope.row)"
                           type="text"
                           style="middle"
                           size="small">解密</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="prev, pager, next"
                         :total="bookmark.length*10+1"
                         @current-change="handleChangePage"
                         :current-page.sync="bookIndex">
          </el-pagination>
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
.el-main {
  background-color: #ffffff;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<script>
import { getOrgApply, getOrgAttrApply, getOrgInfo } from '../../api/org';
import { getDABEUser } from '../../api/register';
import { applyOthersAttr, approveAttrApply, DABEGenerateUserAttr, getOthersApply, PlatGenerateUserAttr } from '../../api/userAttr';
  import jsonView from '../../components/jsonView'

  export default {
    components: {
      jsonView: jsonView,
    },
    created() {
      this.baseUserInfo()
    },
    data() {
      return {
        fileName: this.$route.params.fileName,
        active: '1',
        // 基本信息
        userName: null,
        priKey: null,
        pubKey: null,
        attributes: [],
        attributesForDisplay: null,
        othersAttributes: [],
        othersAttributesForDisplay: null,
        // 声明用户属性
        newAttr: '',
        // 组织相关
        orgs: [],
        orgsForDisplay: '',
        orgApplies: [],
        orgName: '',
        orgAttrName: '',
        searchApplyType: '',
        newOrg: {
          orgName: '',
          t: 0,
          n: 0,
          tempUser: '',
          users: [this.userName],
        },
        newOrgAttr: {
          orgName: '',
          orgAttrName: '',
        },
        searchApplyResponse: {},
        searchOrgResponse: {},
        // 组织属性相关
        orgAttrApplies: [],
        // 属性相关
        applyNewAttr: {
          toName: '',
          remark: '',
          attrName: '',
          isPublic: 2,
          type: 2,
        },
        searchApplyRequest: {
          type: 2,
          userName: '',
          status: 'ALL',
        },
        attrApplies: [],
        // 加密
        encryptData: {
          plainText: '',
          policy: '',
          tags: [],
          tagsStr: ''
        },
        // 查询密文
        queryRequest: {
          tag: '',
          fromUserName: '',
        },
        cipherTexts: [],
        bookmark: [null,],
        bookIndex: 1,
        pageSize: 10,
      }
    },
    watch: {
      attributes: {
        handler() {
          this.attributesForDisplay = this.attributes.join(', ')
        },
        deep:true
      },
      othersAttributes: {
        handler() {
          this.othersAttributesForDisplay = this.othersAttributes.join(', ')
        },
        deep:true
      },
      orgs: {
        handler() {
          this.orgsForDisplay = this.orgs.join(', ')
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
        getDABEUser(this.fileName).then(res => {
          this.dabeUser = res.data.data
          this.userName = this.dabeUser.Name
          this.pubKey = this.dabeUser.EGGAlpha
          
          this.attributes = []
          this.othersAttributes = []
          for (const key in this.dabeUser.APKMap) {
            this.attributes.push(key)
          }
          for (const key in this.dabeUser.appliedAttrMap) {
            this.othersAttributes.push(key)
          }
        })
      },
      newUserAttr() {
      },
      existingOrgs() {
        this.orgs = []
        for (const key in this.dabeUser.OPKMap) {
          this.orgs.push(key)
        }
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
      handleAnnotateAttr() {
        if (this.attributes.indexOf(this.newAttr) != -1) {
          this.$message('申请重复属性');
          return
        }
        
        DABEGenerateUserAttr(this.fileName, this.newAttr).then(res => {
          console.log(res)
          this.$message("DABE生成属性成功")
          PlatGenerateUserAttr(this.fileName, this.newAttr).then(res => {
            console.log(res)
            this.$message("Plat生成属性成功")
            this.attributes.push(this.newAttr)
          })
        })
      },
      handleApplyUserAttr() {
        if (this.applyNewAttr.type === 2 || this.applyNewAttr.isPublic === 2 
        || this.applyNewAttr.attrName === '' || this.applyNewAttr.toName === '') {
          this.$message("请检查参数")
          return
        }
        applyOthersAttr(this.fileName, this.applyNewAttr.attrName, this.applyNewAttr.type == '0' ? this.applyNewAttr.toName : '',
          this.applyNewAttr.type == '1' ? this.applyNewAttr.toName : '', this.applyNewAttr.isPublic == '0', this.applyNewAttr.remark)
          .then(res => {
            console.log(res)
            this.$message("申请成功")
          })
      },
      handleApplySearch() {
        if (this.searchApplyType === 'CREATION') {
          getOrgApply(this.orgName, this.searchApplyType).then(res => {
            if (res.data.data == null) {
              this.$message("没有有效申请")
            }
            this.searchApplyResponse = res.data.data === null ? null : res.data.data
          })
        } else if (this.searchApplyType === 'ATTRIBUTE') {
          getOrgAttrApply(this.orgName, this.searchApplyType, this.orgAttrName).then(res => {
            if (res.data.data == null) {
              this.$message("没有有效申请")
            }
            this.searchApplyResponse = res.data.data == null ? null : res.data.data
          })
        }

        console.log(this.searchApplyResponse)
      },
      handleOrgSearch() {
        getOrgInfo(this.orgName).then(res => {
          if (res.data.data == null) {
              this.$message("没有查到该组织")
            }
            this.searchOrgResponse = res.data.data == null ? {} : res.data.data
        })
        console.log(this.searchOrgResponse)
      },
      handleAddOrgUser(userName) {
        if (this.newOrg.users.indexOf(userName) != -1) {
          this.$message('添加重复用户')
          return
        }
        this.newOrg.users.push(userName)
        console.log(this.newOrg.users)
      },
      handleApplyNewOrg() {
        //TODO real
        this.$message('申请发起成功')
      },
      handleApproveOrg(join) {
        //TODO real
        if (join) {
          this.$message('加入成功')
        } else {
          this.$message('已确认不加入该组织')
        }
      },
      handleShareForOrg() {
        //TODO real
        this.$message('分享成功')
      },
      handleConfirmOrg() {
        //TODO real
        this.$message('组织创建成功')
      },
      handleApproveOrgAttr(approval) {
        //TODO real
        if (approval) {
          this.$message('审批成功')
        } else {
          this.$message('已确认不通过该属性')
        }
      },
      handleShareForOrgAttr() {
        //TODO real
        this.$message('分享成功')
      },
      handleConfirmOrgAttr() {
        //TODO real
        this.$message('组织属性声明成功')
      },
      handleStatusClick(val) {
        this.searchApplyRequest.status = val
      },
      handleSearchAttrApply() {
        if (this.searchApplyRequest.type == 2) {
          this.$message("请检查参数")
          return
        }
        var rAttrApplies = []
        getOthersApply(this.searchApplyRequest.type == 0 ? this.searchApplyRequest.toUid : this.searchApplyRequest.toOrgId,
          this.searchApplyRequest.type, this.searchApplyRequest.userName, this.searchApplyRequest.status).then(res => {
            console.log(res)
            rAttrApplies = res.data.data

            this.attrApplies = []
            rAttrApplies.forEach(aa => {
              aa.isPublicStr = aa.isPublic ? "是" : "否"
              var mapStr = ''
              for (const name in aa.approvalMap) {
                var value = aa.approvalMap[name]
                if (value === null) {
                  mapStr += name + '未审批;  '
                } else {
                  mapStr += name 
                  + (value.agree ? "已同意，备注：" : "不同意，备注：") 
                  + (value.approveRemark === '' ? "无" : value.approveRemark) + ';  '
                }
              }
              aa.approvalMapStr = mapStr

              this.attrApplies.push(aa)
            });
          })
      },
      //approve
      handleClick(row, flag) {
        console.log(row)
        if (!this.canApprove(row)) {
          this.$message("没有权限审批")
          return
        }
        this.$prompt('请输入备注', flag ? '审批通过' : '审批不通过', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          approveAttrApply(this.fileName, row.fromUid, row.attrName, value, flag).then(res => {
            console.log(res)
            this.$message('审批成功')
            this.handleSearchAttrApply()
          })
        })
      },
      canApprove(row) {
        if (row.status != 'PENDING') {
          return false
        }
        if (row.toUid != '') {
          return row.toUid === this.userName
        }
        for (const key in row.approvalMap) {
          if (key === row.userName) {
            return row.approvalMap[key] == null
          }
        }
        return false
      },
      handleEncrypt() {
        //TODO real
        this.$message('分享成功')
      },
      handleQueryContents() {
        var responses = {
            "contents": [{
            "policy": "(cznczn:friend AND simpleOrg:member4)",
            "cipher": "{\"C0\":\"[385432142305060606611340833406329067902422647725938022013018515544848168314216996856640780149761430871146900062890711, 5748563754401831419820406140588136587840173696070255851947521866902126160485078917687535022766568518747567417190750475]\",\"C1s\":[\"[3757455770143764229957160741545060273816865246087086993633113121605298834075002274914781494410009546583613656560344729, 4035703018783749380280383213449163578691650987476226185370087906201722924887934554035488427609275113324750211935807894]\",\"[4809284297116877465723707676638743325639375741690271664640090978176325154494693342992305860141934492855351347697903996, 1583483581055026432373306204436466464036200215943457490416748270650194656151831550041925516162992367436445452907104803]\"],\"C2s\":[\"[560322342521070697261345929666216204293799558525027731989116709090515419688907783090904805604295619009457270712862369, 846128185155430374596299298467362172916624185728013785181423369149786804819827300034478920578370404396935125689019077]\",\"[6022692439119823014184574910973816479865408225296092479730520435843642413623394873682000110507453998492349107345364418, 3088466961000024671349176374898824884895801972916511870960387122983152866267996187258855952857757593323076936690398163]\"],\"C3s\":[\"[527357166780896077545014007498770403793271159564725833681775886575791125189084299108882251998836818220563513197516206, 1263883713237002063570987638583148157646965167513892481538249209827541451154208581743393554631804604743932781762097851]\",\"[6611738627044786788138924830984029322596550933529309927796334717224720682182643635245859588365147730952405164510726856, 1642941168488470413869547565582588092582814228425460756518984714891559688671587307443330921009839666995676821924298372]\"],\"CipherText\":\"[56,231,196,103,27,214,255,159,141,161,182,212,42,74,52,14,149,192,147,59,3,125,220,199,179,211,36,17,80,229,104,140]\",\"Policy\":\"(cznczn:friend AND simpleOrg:member4)\"}",
            "tags": ["test", "cznczn"]
          }],
          "bookmark": "g1AAAADUeJzLYWBgYMpgSmHgKy5JLCrJTq2MT8lPzkzJBYoHBXs4Brm6xPsGu1slV-UBkZVFWrKpUWqicVKSeZKxuWWiabJJskWacZqlmZm5qYWFmWGqsbGlsYFhClA-LdUgycAyOdUwMcU4KdEsMdU0yQxkEwfMJhrZkQUAm7I9-w",
          "pageSize": 10,
          "count": 1
        }
        if (this.bookIndex > this.bookmark.length) {
          this.bookmark.push(responses.bookmark)
        }

        responses.contents.forEach(content => {
          content.tagsStr = content.tags.join(",")
          this.cipherTexts.push(content)
        })
      },
      handleDecrypt(row) {
        console.log(row)
        //todo
        row.plainText = '测试'
      },
      showCipherText(row) {
        this.$alert(row.cipher, '密文')
      },
      handleChangePage(page) {
        this.bookIndex = page
        this.doQuery(this.bookmark[page-1])
      },
      doQuery(bookmarkStr) {
        console.log(bookmarkStr)
      }
    }
  };

</script>