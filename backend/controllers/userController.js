require('mongoose');
const Usr = require('../models/userModel');


const getAllUsers = async (limit,offset) => {

    const users = await Usr.find({}).limit(limit).skip(offset).populate('dolls');

    return users;
}

const getUser = async(id) => {

    const user = await Usr.findById(id).populate('dolls');;
    
    return user;
}


const addUser = async (name,lastname,email,isActive,password) => {

    let existUser = await Usr.findOne({ email: email });
   
    if(!existUser) {

        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');
        
        const usr = new Usr(
            {              
                name: name,
                lastname:lastname,
                email: email,
                isActive:isActive,
                password:cryptoPass
            }
        );

        let user = await usr.save(); 
        console.log("usuario nuevo");
        console.log(user);
        return { user }; 

    }else{
        return false;
    }
}   


const editUser = async(user) => {

    const result = await Usr.findByIdAndUpdate(user._id,user,{new:true});

    return result;
}


const editRoles = async(roles,id) => {

    const result = await Usr.findByIdAndUpdate(id,{$set:{roles:roles}},{new:true});

    return result;
}


const deleteUser = async(id) => {

    const result = await Usr.findByIdAndDelete(id);

    return result;
}

// Obtener peluches de un usuario específico
const getPeluchesByUser = async (id) => {
  
    // Esto trae un objeto PELUCHE que tiene solo id + name.
    const user = await Usr.findById(id).populate('dolls');
    if (!user) {
      throw new Error('Peluche no encontrado');
    }
    return user.dolls;
  }


module.exports = { addUser, getAllUsers, getUser, editUser, editRoles, deleteUser, getPeluchesByUser}