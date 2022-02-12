const mongoose = require("mongoose");
const Food = require("../models/food");
const Menu = require("../models/menu");
const { getRandomInt } = require("../utils/utils");
const { connect } = require("../db/db_atlas");

const menus = [
  {
    name: "The Matrix",
    foods: [
      "Mus de paté con cebolla caramelizada",
      "Cigarrillos de morcilla con pasas",
      "Langostinos crujientes con mus de mostaza",
      "Brocheta de queso tierno de Miraflores con salmón marinado",
      "Pan de pueblo relleno de chistorra",
      "Chupito de patata violeta y crema de queso",
      "Bolitas de bacalao que hace la abuela",
      "Crudités de hortalizas con 2 salsas",
      "Cucurucho de chanquetes",
      "Mejillón  de la Ría con vinagreta de cebollinos",
    ],
    price: 1999,
  },
  {
    name: "The Matrix Reloaded",
    foods: [],
    price: 2003,
  },
  {
    name: "Buscando a Nemo",
    foods: [],
    price: 2003,
  },
  {
    name: "Buscando a Dory",
    foods: [],
    price: 2016,
  },
  {
    name: "Interestelar",
    foods: [],
    price: 2014,
  },
  {
    name: "50 primeras citas",
    foods: [],
    price: 2004,
  },
];

async function getRandomFoods() {
  return Food.aggregate(
    [{ $match: {} }, { $sample: { size: getRandomInt(6, 10) } }],
    (err, docs) => {
      return docs;
    }
  );
}

async function main() {
  const MenuDocuments = [];
  for (const menu of menus) {
    const nMenu = new Menu(menu);
    const foods = (await getRandomFoods()).map((food) => food._id);
    nMenu.foods = foods;
    nMenu.price = foods.length * getRandomInt(6, 30);
    MenuDocuments.push(nMenu);
  }
  console.log(
    `Randomly filled ${MenuDocuments.length} milestones Menus collection`
  );
  const run = async () => {
    const allMenus = await Menu.find();
    if (allMenus.length > 0) {
      await Menu.collection
        .drop()
        .then(() => console.log("Menu collection dropped"));
    }
    await Menu.insertMany(MenuDocuments).then(() =>
      console.log(
        "Menu collection filled with " +
          MenuDocuments.length +
          " documents"
      )
    );
    mongoose.disconnect().then(() => console.log("Disconnected"));
  };
  await run();
}
main();
