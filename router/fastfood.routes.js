const {Router} = require("express")
const { getMenu, getOneFood, addNewFood, updateFood, deleteFood } = require("../controller/fastfood.controller")

const fastfoodRouter = Router()

fastfoodRouter.get("/get_menu", getMenu)
fastfoodRouter.get("/get_one_food/:id", getOneFood)
fastfoodRouter.post("/add_new_food", addNewFood)
fastfoodRouter.post("/update_food/:id", updateFood)
fastfoodRouter.post("/delete_food/:id", deleteFood)

module.exports = fastfoodRouter