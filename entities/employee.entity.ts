import {Column ,Entity,OneToOne,JoinColumn, ManyToOne} from "typeorm"
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
// import Department from "./department.entity";


export enum EmployeeRole{
  UI='UI',
  UX='UX',
  DEVELOPER='DEVELOPER',
  HR='HR'
}



@Entity()
class Employee extends AbstractEntity{

    @Column({unique:true})
    email: string;

    @Column()
    name: string;

    @Column()
    age:number;

    @OneToOne(()=>Address,(address) => address.employee,{
      cascade: true,
      onDelete:'CASCADE'
    })
    @JoinColumn()
    address:Address

    @Column()
    password:string;

    @Column({
      type:"enum",
      enum:EmployeeRole,
      default:EmployeeRole.DEVELOPER
    })
    role:EmployeeRole


    // @ManyToOne(()=>Department,(department) =>department.employees,{
    //   cascade:true,
    //   onDelete:'CASCADE'
    // })
    // @JoinColumn()
    // department:Department

  }
  
  export default Employee;
  