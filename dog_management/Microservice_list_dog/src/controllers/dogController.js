import dogModel from "../models/dogModel.js";

//get all dogs
const listProduct = async (req, res) => {
  try {
    const dogs = await dogModel.find({}); 
    res.json({ success: true, dogs }); 
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" }); 
  }
};

export { listProduct };
