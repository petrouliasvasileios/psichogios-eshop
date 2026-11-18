export const eur = (n: number) =>
  new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR" }).format(n);

export const kg = (n: number) =>
  `${new Intl.NumberFormat("el-GR", { maximumFractionDigits: 2 }).format(n)} kg`;
