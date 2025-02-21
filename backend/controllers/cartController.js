import userModel from "../models/userModel.js"
// Add Items to user Cart
const addToCart = async (req, res) => {
    try {
        let user = await userModel.findById(req.body.userId );

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {}; 
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

        res.json({ success: true, message: "Item Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error" });
    }
};


// Remove Items from USer Cart 
const removeFromCart = async(req,res) =>{
    try {
        let userData = await userModel.findById({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1
            await userModel.findByIdAndUpdate(req.body.userId,{ cartData },{ new: true });
            res.json({ success: true, message: "Item Removed from Cart" });
        }else{
            res.json({ success: false, message: "Item not found in Cart" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error" });
    }
}

// Fetch User Cart data
const getCart =async(req,res) =>{

}

export{addToCart,removeFromCart,getCart}