import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";

import { User } from "../../../../accounts/infra/typeorm/entities/User";
import { Income } from "../../../../incomes/infra/typeorm/entities/Income";
import { Expense } from "../../../../expenses/infra/typeorm/entities/Expense";

@Entity("communities")
class Community {
  @PrimaryColumn()
  id: string;

  @Column()
  creator_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "creator_id" })
  creator: User;

  @OneToMany(() => User, (user) => user.community)
  members: User[];

  @OneToMany(() => Income, (income) => income.community)
  incomes: Income[];

  @OneToMany(() => Expense, (expense) => expense.community)
  expenses: Expense[];

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid4();
  }
}

export { Community };
