interface ICreateIncomeDTO {
  id?: string;
  user_id: string;
  date: Date;
  description: string;
  amount: number;
}

export { ICreateIncomeDTO };
