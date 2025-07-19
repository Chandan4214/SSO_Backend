import * as authServices from "../services/auth.services.js";

export const register = async (req, res) => {
  try{
    const {username,email,password}=req.body;
    await authServices.registerUser(username,email,password);
    res.status(201).json({message:"User Signup successfully"});
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
}


export const loginUser = async (req, res) => {
  try {
    const  {email,password}=req.body;
    const {token,userId}=await authServices.loginUser(email,password);

    res.status(201).json({token:token,id:userId});
    
  } catch (error) {
    res.status(401).json({message:error.message});
  }
}


export const DeleteUser = async (req, res) => {
  try {
    const {id}=req.params;
    await authServices.DeleteUser(id);
    res.status(200).json({message:"User deleted successfully"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}



export const getUser = async (req, res) => {
  try {
   
    const user=await authServices.getUserById(req.userId);
    res.status(200).json({user:user});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}


