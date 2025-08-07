import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  defaultId:number

  @Column({nullable:true})
  filename: string;

  @Column({nullable:true})
  url: string;
}
