import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {TodoList} from './todolist.model';
import {Sequelize} from 'sequelize';

@Table
export class User extends Model<User> {

    @Column
    name!: string;
        /*{

        type: string,
        unique: true,
        allowNull: false};

         */

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
        this.name = simplification['name'];
        this.tel = simplification['tel'];
        this.eMail = simplification['eMail'];
        this.address = simplification['address'];
        this.password = simplification['password'];
    }

}
