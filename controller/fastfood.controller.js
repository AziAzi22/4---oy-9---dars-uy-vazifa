const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/file-manager");
const menu = read_file("fastfood.json");
const myFind = (arr, id) => arr.find((food) => food.id === id);

/// get menu

const getMenu = async (req, res) => {
  try {
    res.status(200).render("index", { menu });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/// get one food

const getOneFood = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedFood = myFind(menu, id);

    if (!foundedFood) {
      return res.status(302).redirect("https://four-oy-9-dars-uy-vazifa-1.onrender.com/get_menu");
    }

    res.status(200).render("details", { foundedFood });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/// add new food

const addNewFood = async (req, res) => {
  try {
    const { title, price, discription, calories } = req.body;
    menu.push({
      id: v4(),
      title,
      price,
      discription,
      calories,
      tiem: new Date().getHours() + ":" + new Date().getMinutes(),
    });

    write_file("fastfood.json", menu);
    res.status(312).redirect("https://four-oy-9-dars-uy-vazifa-1.onrender.com/get_menu");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/// update food

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedFood = myFind(menu, id);
    const { title, price, discription, calories } = req.body;

    if (!foundedFood) {
      return res.status(302).redirect("https://four-oy-9-dars-uy-vazifa-1.onrender.com/get_menu");
    }

    menu.forEach((food) => {
      if (food.id === id) {
        food.title = title ? title : food.title;
        food.price = price ? price : food.price;
        food.discription = discription ? discription : food.discription;
        food.calories = calories ? calories : food.calories;
      }
    });

    write_file("fastfood.json", menu);
    res.status(302).redirect("https://four-oy-9-dars-uy-vazifa-1.onrender.com/get_menu");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/// delete food

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedFood = myFind(menu, id);

    if (!foundedFood) {
      res.status(302).redirect("https://four-oy-9-dars-uy-vazifa-1.onrender.com/get_menu");
    }

    menu.forEach((food, i) => {
      if (food.id === id) {
        menu.splice(i, 1);
      }
    });

    write_file("fastfood.json", menu);
    res.status(302).redirect("https://four-oy-9-dars-uy-vazifa-1.onrender.com/get_menu");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMenu,
  getOneFood,
  addNewFood,
  updateFood,
  deleteFood,
};
