import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { User } from "../../../../accounts/infra/typeorm/entities/User";
import { Community } from "../../../../communities/infra/typeorm/entities/Community";
import { ExpenseCategory } from "./ExpenseCategory";

@Entity("expenses")
class Expense {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  community_id: string;

  @Column()
  category_id: string;

  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Community, (community) => community.expenses)
  @JoinColumn({ name: "community_id" })
  community: Community;

  @ManyToOne(() => ExpenseCategory)
  @JoinColumn({ name: "category_id" })
  category: ExpenseCategory;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  amount: number;

  constructor() {
    if (!this.id) this.id = uuid4();
  }
}

export { Expense };
