const mongoose = require("mongoose");
const Food = require("../models/food");
const Ingredient = require("../models/ingredient");
const { connect } = require("../db/db_atlas");

const foods = [
  {
    name: "Mus de paté con cebolla caramelizada",
    ingredients: [],
    price: 15,
    type: "Entrante",
  },
  {
    name: "Cigarrillos de morcilla con pasas",
    ingredients: [],
    price: 10,
    type: "Entrante",
  },
  {
    name: "Langostinos crujientes con mus de mostaza",
    ingredients: [],
    price: 9,
    type: "Entrante",
  },
  {
    name: "Brocheta de queso tierno de Miraflores con salmón marinado",
    ingredients: [],
    price: 8,
    type: "Entrante",
  },
  {
    name: "Pan de pueblo relleno de chistorra",
    ingredients: [],
    price: 7,
    type: "Entrante",
  },
  {
    name: "Chupito de patata violeta y crema de queso",
    ingredients: [],
    price: 5,
    type: "Entrante",
  },
  {
    name: "Bolitas de bacalao que hace la abuela",
    ingredients: [],
    price: 15,
    type: "Entrante",
  },
  {
    name: "Crudités de hortalizas con 2 salsas",
    ingredients: [],
    price: 11,
    type: "Entrante",
  },
  {
    name: "Cucurucho de chanquetes",
    ingredients: [],
    price: 20,
    type: "Entrante",
  },
  {
    name: "Mejillón de la Ría con vinagreta de cebollinos",
    ingredients: [],
    price: 13,
    type: "Entrante",
  },
  {
    name: "Crema de melón con virutas de jamón ibérico",
    ingredients: [],
    price: 35,
    type: "Pimero",
  },
  {
    name: "Canelón de creepe relleno de boletus edulis y gambas con salsa de carabineros",
    ingredients: [],
    price: 35,
    type: "Pimero",
  },
  {
    name: "Entrecot de ternera a la parrilla con el cremoso de patatas y el salteado de pimientos",
    ingredients: [],
    price: 35,
    type: "Carne",
  },
  {
    name: "Crema templada de gambas con nido de puerros",
    ingredients: [],
    price: 32,
    type: "Pimero",
  },
  {
    name: "Mézclum de brotes y lechugas con queso artesano de cabra y las nueces, aliñada con vinagre a la miel",
    ingredients: [],
    price: 32,
    type: "Pimero",
  },
  {
    name: "Entrecot de ternera a la parrilla con el cremosos de patatas y el salteado de pimientos",
    ingredients: [],
    price: 32,
    type: "Carne",
  },
  {
    name: "Milhojas de lubina y verduras con vinagreta de ajos de Las Pedroñeras",
    ingredients: [],
    price: 32,
    type: "Pescado",
  },
  {
    name: "Salmorejo cordobés con coca de jamón ibérico y el aceite de oliva virgen",
    ingredients: [],
    price: 32,
    type: "Pimero",
  },
  {
    name: "Brocheta de rape con langostinos sobre cama de verduras a la plancha y crema de balsámico",
    ingredients: [],
    price: 32,
    type: "Pimero",
  },
  {
    name: "Medallones de solomillo de ibérico en salsa de Oporto con trigueros albardados",
    ingredients: [],
    price: 32,
    type: "Carne",
  },
  {
    name: "Crema templada de puerros con almejas y toque suave de pimienta blanca",
    ingredients: [],
    price: 32,
    type: "Pimero",
  },
  {
    name: "Mézclum de brotes y lechugas con bogavante, langostinos de Sanlúcar y mango, aliñado con vinagreta de cebollinos",
    ingredients: [],
    price: 32,
    type: "Pimero",
  },
  {
    name: "Milhojas de presa ibérica con setas, jamón ibérico , el queso parmesano y guarnición de pimientos de padrón y el tomate asado",
    ingredients: [],
    price: 32,
    type: "Entrante",
  },
  {
    name: "Asado de espárragos “cojonudos” de la Rioja sobre salsa bearnesa y el queso fundido",
    ingredients: [],
    price: 32,
    type: "Pimero",
  },
  {
    name: "Rodaballo horneado al cava con las almendras y el frito de la huerta",
    ingredients: [],
    price: 32,
    type: "Pescado",
  },
  {
    name: "Solomillo de buey a la parrilla con el salteado de setas y los espárragos trigueros",
    ingredients: [],
    price: 32,
    type: "Carne",
  },
];

async function getRandomIngredients() {
  return Ingredient.aggregate(
    [{ $match: {} }, { $sample: { size: Math.random() * 10 } }],
    (err, docs) => {
      return docs;
    }
  );
}

async function main() {
  const FoodDocuments = [];
  for (const food of foods) {
    const nfood = new Food(food);
    const ingredients = (await getRandomIngredients()).map(
      (ingredient) => ingredient._id
    );
    nfood.ingredients = ingredients;
    FoodDocuments.push(nfood);
  }
  console.log(
    `Randomly filled ${FoodDocuments.length} foods on Menus collection`
  );
  const run = async () => {
    const allFoods = await Food.find();
    if (allFoods.length > 0) {
      await Food.collection
        .drop()
        .then(() => console.log("Food collection dropped"));
    }
    await Food.insertMany(FoodDocuments).then(() =>
      console.log(
        "Food collection filled with " + FoodDocuments.length + " documents"
      )
    );
    mongoose.disconnect().then(() => console.log("Disconnected"));
  };
  await run();
}
main();
