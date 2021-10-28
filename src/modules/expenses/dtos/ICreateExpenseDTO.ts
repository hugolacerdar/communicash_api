interface ICreateExpenseDTO {
  id?: string;
  user_id: string;
  category_id: string;
  date: Date;
  description: string;
  amount: number;
  community_id: string;
}

export { ICreateExpenseDTO };
