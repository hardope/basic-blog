import { Column, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Blog extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false })
    title: string;

    @Column({ allowNull: false })
    content: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({ defaultValue: false })
    isVerified: boolean;
}