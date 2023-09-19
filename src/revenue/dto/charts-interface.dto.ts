export interface IPieChart {
  incoming: number;
  expense: number;
}

export interface IStackedChart {
  dates: string[];
  incomings: number[];
  expenses: number[];
}

export interface IBarChart {
  dates: string[];
  data: number[];
}
