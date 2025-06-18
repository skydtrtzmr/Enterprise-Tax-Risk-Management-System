import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  return [
    {
      id: 'four-streams-01',
      name: '委托物流配送业务风险',
      year: '2024',
      month: '4',
      status: '未应对',
      module: 'four-streams',
    },
    {
      id: 'four-streams-02',
      name: '委托付款进项转出风险',
      year: '2023',
      month: '',
      status: '未应对',
      module: 'four-streams',
    },
    {
      id: 'rd-expense-01',
      name: '研发费用加计扣除企业所得税存在差异',
      year: '2024',
      month: '2',
      status: '未应对',
      module: 'rd-expense',
    },
    {
      id: 'subsidy-management',
      name: '补贴全流程管理系统',
      year: '-',
      month: '-',
      status: '进入管理',
      module: 'subsidy',
    }
  ];
}); 