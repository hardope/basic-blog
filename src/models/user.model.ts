import { Column, Model, Table, BeforeCreate, BeforeUpdate } from "sequelize-typescript";
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false })
    username: string;

    @Column({ allowNull: false })
    email: string;

    @Column({ allowNull: false })
    password: string;

    @Column({ allowNull: false, defaultValue: 'user'})
    role: 'admin' | 'user';

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    // Hash the password before saving it to the database
    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: User) {
        if (instance.changed('password')) {
            instance.password = await bcrypt.hash(instance.password, 10);
        }
    }
}
