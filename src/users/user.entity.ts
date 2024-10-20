import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;
}