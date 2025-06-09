<template>
  <div class="subsidy-detail-container">
    <!-- Collapsible Project Info -->
    <div
      v-if="!isProjectInfoExpanded"
      class="project-info-collapsed"
      @click="isProjectInfoExpanded = true"
    >
      <div class="info-title">
        <el-icon><CollectionTag /></el-icon>
        <span>项目信息：新型锂电池材料研发补贴</span>
      </div>
      <el-button type="primary" link>
        展开详情 <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </el-button>
    </div>

    <!-- Expanded Project Info -->
    <el-descriptions
      v-else
      :column="3"
      border
      class="project-info-expanded"
    >
      <template #title>
        <div class="info-title">
          <el-icon><CollectionTag /></el-icon>
          <span>项目信息</span>
        </div>
      </template>
      <template #extra>
        <el-button
          :icon="Close"
          circle
          plain
          @click="isProjectInfoExpanded = false"
        />
      </template>
      <el-descriptions-item label="项目编号">{{ projectId }}</el-descriptions-item>
      <el-descriptions-item label="补贴金额">200 万元</el-descriptions-item>
      <el-descriptions-item label="管理状态">
        <el-tag size="small">全流程管控中</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="申请日期">2024-03-15</el-descriptions-item>
      <el-descriptions-item label="到账日期">2024-04-20</el-descriptions-item>
      <el-descriptions-item label="补贴类型">研发专项补贴</el-descriptions-item>
    </el-descriptions>

    <el-collapse v-model="activeCollapse" class="data-tables-collapse">
      <el-collapse-item title="1. 补贴用途分配表" name="1">
        <el-table :data="tableData1" stripe style="width: 100%" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
          <el-table-column type="expand">
            <template #default="props">
              <div class="expanded-content">
                <p>详细信息 for: {{ props.row.category }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="用途类别" prop="category" />
          <el-table-column label="申请金额（万元）" prop="amount" />
          <el-table-column label="占比" prop="percentage" />
          <el-table-column label="对应项目 / 人员" prop="correspondence" />
          <el-table-column label="系统匹配状态" prop="status">
            <template #default="scope">
              <el-tag
                :type="scope.row.status === '已匹配' ? 'success' : 'warning'"
                disable-transitions
              >
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>

      <el-collapse-item title="2. 项目关联表" name="2">
        <el-table :data="tableData2" stripe style="width: 100%" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
          <el-table-column type="expand">
            <template #default="props">
              <div class="expanded-content">
                <p>详细信息 for: {{ props.row.usage }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="补贴用途" prop="usage" />
          <el-table-column label="关联研发项目" prop="project" />
          <el-table-column label="项目编号" prop="projectId" />
          <el-table-column label="预计投入占比" prop="ratio" />
          <el-table-column label="系统自动关联状态" prop="status">
            <template #default="scope">
              <el-tag type="success" disable-transitions>{{
                scope.row.status
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>

      <el-collapse-item title="3. 会计科目设置与分录" name="3">
        <el-table :data="tableData3" stripe style="width: 100%" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
          <el-table-column type="expand">
            <template #default="props">
              <div class="expanded-content">
                <p>详细信息 for: {{ props.row.scenario }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="业务场景" prop="scenario" />
          <el-table-column label="会计分录" prop="entry" />
          <el-table-column label="系统自动生成标记" prop="tag">
            <template #default="scope">
              <el-tag type="success" disable-transitions>{{
                scope.row.tag
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>

      <el-collapse-item title="4. 数据对账校验结果" name="4">
        <el-table :data="tableData4" stripe style="width: 100%" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
          <el-table-column type="expand">
            <template #default="props">
              <div class="expanded-content">
                <p>详细信息 for: {{ props.row.dimension }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="校验维度" prop="dimension" />
          <el-table-column label="系统校验内容" prop="content" />
          <el-table-column label="校验结果" prop="result">
            <template #default="scope">
              <el-tag
                :type="scope.row.result === '一致' ? 'success' : 'warning'"
                disable-transitions
              >
                {{ scope.row.result }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="差异金额" prop="difference" />
          <el-table-column label="处理状态" prop="status">
            <template #default="scope">
              <el-tag
                :type="scope.row.status === '已结案' ? 'success' : 'primary'"
                disable-transitions
              >
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>

      <el-collapse-item title="5. 税务师鉴证项目清单" name="5">
        <el-table :data="tableData5" stripe style="width: 100%" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
          <el-table-column type="expand">
            <template #default="props">
              <div class="expanded-content">
                <p>详细信息 for: {{ props.row.item }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="鉴证项目" prop="item" />
          <el-table-column label="鉴证内容" prop="content" />
          <el-table-column label="鉴证结论" prop="conclusion">
            <template #default="scope">
              <el-tag type="success" disable-transitions>{{
                scope.row.conclusion
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="证据附件" prop="attachment">
            <template #default="scope">
              <el-button type="primary" link>{{
                scope.row.attachment
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>

      <el-collapse-item title="6. 鉴证结论摘要表" name="6">
        <el-table :data="tableData6" stripe style="width: 100%" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
          <el-table-column type="expand">
            <template #default="props">
              <div class="expanded-content">
                <p>详细信息 for: {{ props.row.type }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="结论类型" prop="type">
            <template #default="scope">
              <el-tag disable-transitions>{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="结论内容" prop="content" />
          <el-table-column label="税务影响" prop="impact" />
        </el-table>
      </el-collapse-item>

      <el-collapse-item title="7. 平台操作日志" name="7">
        <el-table :data="tableData7" stripe style="width: 100%" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
          <el-table-column type="expand">
            <template #default="props">
              <div class="expanded-content">
                <p>
                  详细信息 for: {{ props.row.operator }} at {{ props.row.time }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" prop="time" />
          <el-table-column label="操作人" prop="operator" />
          <el-table-column label="操作内容" prop="action" />
          <el-table-column label="系统反馈" prop="feedback">
            <template #default="scope">
              <el-tag type="success" disable-transitions>{{
                scope.row.feedback
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CollectionTag, ArrowDown, Close } from '@element-plus/icons-vue';

defineProps<{
  projectId: string;
}>();

const isProjectInfoExpanded = ref(false);
const activeCollapse = ref(['1']); // Default to first open

// Data based on 补贴全流程管理平台设计.md
const tableData1 = ref([
  { category: '材料采购', amount: 100, percentage: '50%', correspondence: '研发项目 B、电解液采购', status: '已匹配' },
  { category: '人员工资', amount: 60, percentage: '30%', correspondence: '工程师 A（600h）、B（400h）', status: '已匹配' },
  { category: '设备租赁', amount: 40, percentage: '20%', correspondence: '测试设备租赁', status: '待执行' },
]);

const tableData2 = ref([
  { usage: '材料采购', project: '新型锂电池研发', projectId: 'RD-2024-06', ratio: '50%', status: '已关联' },
  { usage: '人员工资', project: '新型锂电池研发', projectId: 'RD-2024-06', ratio: '30%', status: '已关联' },
  { usage: '设备租赁', project: '新型锂电池研发', projectId: 'RD-2024-06', ratio: '20%', status: '已关联' },
]);

const tableData3 = ref([
  { scenario: '收到补贴', entry: '借：银行存款 200 万\n  贷：递延收益 - 研发补贴 200 万', tag: '已生成' },
  { scenario: '采购电解液', entry: '借：研发支出 - 材料 - 项目 B 100 万  贷：银行存款 100 万  借：递延收益 - 研发补贴 100 万  贷：其他收益 - 补贴收入 100 万', tag: '已生成' },
  { scenario: '支付工资', entry: '借：研发支出 - 人工 - 项目 B 60 万  贷：应付职工薪酬 60 万  借：递延收益 - 研发补贴 60 万  贷：其他收益 - 补贴收入 60 万', tag: '已生成' },
]);

const tableData4 = ref([
    { dimension: '材料采购', content: '补贴用途 100 万元 ：发票不含税金额 100 万元', result: '一致', difference: '0', status: '已结案' },
    { dimension: '人员工资', content: '补贴分配 60 万元 ： 工时分摊 60 万元', result: '一致', difference: '0', status: '已结案' },
    { dimension: '设备租赁', content: '补贴计划 40 万元 ： 实际支出 0 万元', result: '待执行', difference: '40 万', status: '进行中' },
]);

const tableData5 = ref([
    { item: '用途匹配性', content: '电解液发票与补贴用途匹配性', conclusion: '匹配', attachment: '发票扫描件' },
    { item: '工资合理性', content: '工程师 A 工时工资分摊合理性', conclusion: '合理', attachment: '工时记录' },
    { item: '会计合规性', content: '递延收益科目使用规范', conclusion: '合规', attachment: '分录截图' },
]);

const tableData6 = ref([
    { type: '用途明确性', content: '补贴用途与实际支出匹配率 100%', impact: '可认定为不征税收入' },
    { type: '会计规范性', content: '会计处理符合会计准则', impact: '无报表错报风险' },
    { type: '节税效益', content: '避免多缴企业所得税30 万元', impact: '直接节税 30万元' },
]);

const tableData7 = ref([
    { time: '2024-03-15', operator: '张某某', action: '录入补贴用途分配表', feedback: '保存成功' },
    { time: '2024-04-20', operator: '李某某', action: '录入收到补贴分录', feedback: '校验通过' },
    { time: '2024-05-10', operator: '王某某', action: '提交税务师鉴证报告', feedback: '审核通过' },
]);

</script>

<style scoped>
.subsidy-detail-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-info-collapsed {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.project-info-collapsed:hover {
  border-color: #c8e0ff;
  box-shadow: 0 2px 12px 0 rgba(64, 158, 255, 0.1);
}

.project-info-expanded {
  border-radius: 8px;
  overflow: hidden; /* To make border-radius work with el-descriptions */
  border: 1px solid #ebeef5;
}

.info-title {
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #303133;
}

.data-tables-collapse {
  border: none;
}

:deep(.el-collapse-item) {
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px !important;
  margin-bottom: 12px;
  overflow: hidden;
}

:deep(.el-collapse-item__header) {
  padding: 0 20px;
  font-size: 15px;
  font-weight: 500;
  height: 52px;
  line-height: 52px;
}

:deep(.el-collapse-item__wrap) {
  will-change: height;
}

:deep(.el-collapse-item__content) {
  padding: 20px;
  padding-top: 10px;
}

.expanded-content {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

:deep(.el-table th.el-table__cell) {
  background-color: #f5f7fa;
}

:deep(.el-table) {
  border-radius: 6px;
  overflow: hidden;
}
</style> 