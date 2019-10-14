import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {TodoList} from './todolist.model';
import {DataTypes, Sequelize} from 'sequelize';
import * as sequelize from 'sequelize';

@Table
export class User extends Model<User> {

    @Column
    name!: string;

    @Column
    password!: string;

    @Column
    tel!: number;

    @Column
    eMail!: string;

    @Column
    address!: string;



    toSimplification(): any {
        return {
            'id': this.id,
            'name': this.name,
            'tel': this.tel,
            'eMail': this.eMail,
            'address': this.address,
            'password': this.password
        };
    }

    fromSimplification(simplification: any): void {
        this.name = simplification['username'];
        this.tel = simplification['tel'];
        this.eMail = simplification['eMail'];
        this.address = simplification['address'];
        this.password = simplification['password'];
    }

}
/*
User.init({
  name: {
    type: new DataTypes.STRING(128),
    unique: true
  },
  tel: {
  type: new DataTypes.INTEGER
},
  email: {
    type: new DataTypes.STRING(128)
  },
  address: {
    type: new DataTypes.STRING(128)
  },

},{
  tableName: 'users',
    sequelize : sequelize, // this bit is important
});
*/
