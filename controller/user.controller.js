const User = require('../model/User');
const bcrypt = require('bcrypt');


exports.addUser = async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    const userExist = await User.findOne({ email:email.toLowerCase() });
    if (userExist) {
        return res.status(400).json({ message: 'User already exist' });
    }
    const saltRound=await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, saltRound);
    // console.log(hashedPassword);
    const user = new User({ name, email:email.toLowerCase() ,password:hashedPassword, age });
    await user.save();
    res.status(201).json({ message: 'User added successfully', user: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist=await User.findOne({email:email.toLowerCase()});
        if(!userExist){
            return res.status(400).json({message:'User not found'});
        }
        const isMatch=await bcrypt.compare(password,userExist.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid username or password'});
        }
        res.status(200).json({message:'User logged in successfully',user:userExist});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedUser = await User.findById(id);
    if (!foundedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User found', user: foundedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedUser = await User.findById(id);
    if (!foundedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { name, email, password, age } = req.body;
    const updatedUser = await User.updateOne(
      { _id: id },
      { name, email, password, age },
      { new: true }
    );
    res
      .status(200)
      .json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const {id}=req.params;
  try {
    const foundedUser = await User.findById(id);
    if (!foundedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const deletedUser = await User.deleteOne({ _id: id})
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}