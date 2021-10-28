import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("expenses_categories")
class ExpenseCategory {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  title: string;

  constructor() {
    if (!this.id) this.id = uuid4();
  }
}

export { ExpenseCategory };
