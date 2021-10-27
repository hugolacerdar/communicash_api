import { User } from "../../../../accounts/infra/typeorm/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("communities")
class Community {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "creator_id" })
  creator: User;

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
