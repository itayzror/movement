import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({name:'users'})
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  avatar: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;
}