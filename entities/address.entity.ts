import {Column,Entity, JoinColumn, OneToOne} from "typeorm"
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity{
    

    @Column()
    line1:string;

    @Column()
    pincode:string;

    @OneToOne(() => Employee, (employee) => employee.address, {
     onDelete: 'CASCADE'
    })
    @JoinColumn()
    employee: Employee;
    
    @Column()
    houseNo:string;

    @Column()
    line2:string;
}

export default Address
