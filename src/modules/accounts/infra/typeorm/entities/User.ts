import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import { Community } from "../../../../communities/infra/typeorm/entities/Community";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  community_id: string;

  @ManyToOne(() => Community)
  @JoinColumn({ name: "community_id" })
  community: Community;

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
