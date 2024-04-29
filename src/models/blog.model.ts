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
    authorId: number;

    @BelongsTo(() => User)
    author: User;

    @Column({ defaultValue: false })
    isApproved: boolean;

    @Column
    category: string;

    toJSON() {
        const values = Object.assign({}, this.get());
        delete values.authorId;
        return values;
    }
}