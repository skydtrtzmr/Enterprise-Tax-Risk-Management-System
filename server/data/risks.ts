// server/data/risks.ts

// Define a type for our risk objects for better type safety
export interface Risk {
    id: string;
    type: string;
    name: string;
    year: string;
    month: string;
    status: "未应对" | "已应对";
}

// Export the array of risks directly.
// This data can be imported and used anywhere in the Nuxt application.
export const allRisksData: Risk[] = [
    // 接收风险
    {
        id: "FEE-VAR-01",
        type: "jieshou",
        name: "期间费用变动率与营业收入变动率比对异常风险",
        year: "2023",
        month: "-",
        status: "未应对",
    },
    {
        id: "VAT-RENT-01",
        type: "jieshou",
        name: "增值税不动产租赁税目申报金额与房产税比对异常风险",
        year: "2022,2023",
        month: "-",
        status: "未应对",
    },
    // 测评风险
    {
        id: "STAMP-DUTY-01",
        type: "ceping",
        name: "买卖合同印花税比对存在差异",
        year: "2024",
        month: "-",
        status: "未应对",
    },
    {
        id: "BANK-PAY-01",
        type: "ceping",
        name: "纳税人银行存款是否有期末余额委托付款进项转出风险",
        year: "2023,2024",
        month: "-",
        status: "未应对",
    },
    {
        id: "LOG-DIST-01",
        type: "ceping",
        name: "委托物流配送业务风险",
        year: "2024",
        month: "4",
        status: "未应对"
    },
    {
        id: "ENTR-PAY-01",
        type: "ceping",
        name: "委托付款进项转出风险",
        year: "2024",
        month: "6",
        status: "未应对"
    },
    {
        id: "RD-DED-01",
        type: "ceping",
        name: "研发费用加计扣除企业所得税存在差异",
        year: "2024",
        month: "-",
        status: "未应对"
    },
    // 补贴管理系统
    {
        id: "SUB-TAX-01",
        type: "butie-SUB-2024-001",
        name: "新型锂电池材料研发补贴误缴税款风险",
        year: "2024",
        month: "-",
        status: "未应对",
    },
    {
        id: "CASH-BAL-01",
        type: "butie-SUB-2024-001",
        name: "不征税补贴资金用于支出所形成的费用或资产的纳税调整风险",
        year: "2023,2024",
        month: "-",
        status: "未应对",
    },
    {
        id: "ASSET-LOSS-01",
        type: "butie-SUB-2024-001",
        name: "享受补贴的资产发生损失未按规定申报的风险",
        year: "2022",
        month: "-",
        status: "未应对",
    },
    {
        id: "LAND-TAX-01",
        type: "butie-SUB-2024-002",
        name: "土地未清算或未按公允价值清算少缴税款风险",
        year: "2023,2024",
        month: "-",
        status: "未应对",
    },
    {
        id: "INV-SALE-01",
        type: "butie-SUB-2024-003",
        name: "存货未清算或未做视同销售处理少缴税款风险",
        year: "2022",
        month: "-",
        status: "已应对",
    },
    {
        id: "AR-RISK-01",
        type: "butie-SUB-2024-004",
        name: "应收类往来账户涉税风险模型",
        year: "2024",
        month: "-",
        status: "已应对",
    },
    {
        id: "AP-RISK-01",
        type: "butie-SUB-2024-005",
        name: "应付类往来账户涉税风险模型",
        year: "2023",
        month: "-",
        status: "已应对",
    },
];
