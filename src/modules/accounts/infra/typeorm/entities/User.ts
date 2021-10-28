import { Income } from "../../../../incomes/infra/typeorm/entities/Income";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import { Community } from "../../../../communities/infra/typeorm/entities/Community";
import { Expense } from "../../../../expenses/infra/typeorm/entities/Expense";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  community_id: string;

  @ManyToOne(() => Community, (community) => community.members)
  @JoinColumn({ name: "community_id" })
  community: Community;

  @OneToMany(() => Income, (income) => income.user)
  incomes: Income[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  birth_date: Date;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}

export { User };
