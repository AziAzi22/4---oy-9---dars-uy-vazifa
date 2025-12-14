const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/file-manager");

const myFind = (arr, id) => arr.find((food) => food.id === id);

/// get menu
const getMenu = async (req, res) => {
  try {
    const menu = read_file("fastfood.json");
    res.render("index", { menu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// get one food
const getOneFood = async (req, res) => {
  try {
    const menu = read_file("fastfood.json");
    const { id } = req.params;
    const foundedFood = myFind(menu, id);

    if (!foundedFood) {
      return res.redirect("/get_menu");
    }

    res.render("details", { foundedFood });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// add new food
const addNewFood = async (req, res) => {
  try {
    const menu = read_file("fastfood.json");
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
    res.redirect("/get_menu");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// update food
const updateFood = async (req, res) => {
  try {
    const menu = read_file("fastfood.json");
    const { id } = req.params;
    const foundedFood = myFind(menu, id);
    const { title, price, discription, calories } = req.body;

    if (!foundedFood) {
      return res.redirect("/get_menu");
    }

    menu.forEach((food) => {
      if (food.id === id) {
        food.title = title ?? food.title;
        food.price = price ?? food.price;
        food.discription = discription ?? food.discription;
        food.calories = calories ?? food.calories;
      }
    });

    write_file("fastfood.json", menu);
    res.redirect("/get_menu");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// delete food
const deleteFood = async (req, res) => {
  try {
    const menu = read_file("fastfood.json");
    const { id } = req.params;
    const foundedFood = myFind(menu, id);

    if (!foundedFood) {
      return res.redirect("/get_menu");
    }

    const newMenu = menu.filter((food) => food.id !== id);

    write_file("fastfood.json", newMenu);
    res.redirect("/get_menu");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMenu,
  getOneFood,
  addNewFood,
  updateFood,
  deleteFood,
};
