import bcrypt from 'bcrypt';
export class User{
  constructor({id,name,email,password}){

    console.log("User model constructor called with:", {id, name, email, password});
   
    if( !name || !email || !password){
      throw new Error("All fields are required");
    }
    if(!email.includes("@")){
      throw new Error("Invalid email format");
    }
  if (typeof password !== 'string' || password.length < 6 ) {
      throw new Error("Password must be at least 6 characters long");
    }

    this.id=id
    this.name=name
    this.email=email.toLowerCase();
    const hashedPassword = bcrypt.hashSync(password, 10); 
    this.password=hashedPassword;
  }
}


