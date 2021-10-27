import { User } from "../../../../accounts/infra/typeorm/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("incomes")
class Income {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

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

export { Income };
