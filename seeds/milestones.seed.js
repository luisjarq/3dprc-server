const mongoose = require("mongoose");
const Milestone = require("../models/milestone");
const Menu = require("../models/menu");
const { getRandomInt } = require("../utils/utils");
const { connect } = require("../db/db_atlas");

const milestones = [
  {
    name: "Jardin1",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/3_2/960/jpg/0002_1_2053-162556823753409.jpeg",
    ],
    menus: [],
  },
  {
    name: "Jardin2",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/3_2/960/jpg/panoramica-jardin_1_2053-162556843657440.jpeg",
      "https://cdn0.bodas.net/vendor/2053/3_2/960/jpg/panoramica-jardin_1_2053-162556843657440.jpeg",
    ],
    menus: [],
  },
  {
    name: "Oficinas",
    image_urls: "COficinas_Orientation",
    menus: [],
  },
  {
    name: "Parking",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/imgp8553_1_2053.webp",
    ],
    menus: [],
  },
  {
    name: "Plaza",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/finca-el-rocio-5_1_2053.webp",
      "https://cdn0.bodas.net/vendor/2053/3_2/960/jpg/finca-el-rocio-4_1_2053.jpeg",
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/entrada-rocio-1_1_2053-162556645325238.webp",
    ],
    menus: [],
  },
  {
    name: "Restaurante",
    image_urls: [
      "https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_1600/https://fincaelrocio.es/wp-content/uploads/2020/09/restaurante-1.jpg",
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/finca-el-rocio-20_1_2053.webp",
    ],
    menus: [],
  },
  {
    name: "Cuadras",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/0185_1_2053.webp",
    ],
    menus: [],
  },
  {
    name: "Juegos",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/0237_1_2053.webp",
    ],
    menus: [],
  },
  {
    name: "Pista",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/20141004-193728_1_2053.webp",
      "https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_661/https://fincaelrocio.es/wp-content/uploads/2020/09/entretenimiento.jpg",
    ],
    menus: [],
  },
  {
    name: "Bar",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/jardin-flores_1_2053-162566697071390.webp",
      "https://cdn0.bodas.net/vendor/2053/original/960/jpeg/banera-cerveza_1_2053-162748869924453.webp",
    ],
    menus: [],
  },
  {
    name: "Bodas",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/foto-2-de-portada-sala-de-reina_1_2053-162556613917390.webp",
      "https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_1920/https://fincaelrocio.es/wp-content/uploads/2020/08/bodas-fincas-el-rocio.jpg",
      "https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/a42140b3-a472-41d5-8ad3-7f3b3eb723b7/b1cdc442-1904-4a42-a518-edd4e14c5a39.jpg",
    ],
    menus: [""],
  },
  {
    name: "Fiestas",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/img-0442_1_2053.webp",
    ],
    menus: [],
  },
  {
    name: "Terraza",
    image_urls: [
      "https://cdn0.bodas.net/vendor/2053/original/960/jpg/-mg-7908_1_2053-162556661164980.webp",
      "https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/a42140b3-a472-41d5-8ad3-7f3b3eb723b7/155aa44e-5420-495a-b709-9eee92c21fea.jpg",
    ],
    menus: [],
  },
];

async function getRandomMenus() {
  return Menu.aggregate(
    [{ $match: {} }, { $sample: { size: getRandomInt(1, 4) } }],
    (err, docs) => {
      return docs;
    }
  );
}

async function main() {
  const MilestoneDocuments = [];
  for (const milestone of milestones) {
    const nMilestone = new Milestone(milestone);
    const menus = (await getRandomMenus()).map((menu) => menu._id);
    nMilestone.menus = menus;
    MilestoneDocuments.push(nMilestone);
  }
  console.log(
    `Randomly filled ${MilestoneDocuments.length} milestones Menus collection`
  );
  const run = async () => {
    const allMilestones = await Milestone.find();
    if (allMilestones.length > 0) {
      await Milestone.collection
        .drop()
        .then(() => console.log("Milestone collection dropped"));
    }
    await Milestone.insertMany(MilestoneDocuments).then(() =>
      console.log(
        "Milestone collection filled with " +
          MilestoneDocuments.length +
          " documents"
      )
    );
    mongoose.disconnect().then(() => console.log("Disconnected"));
  };
  await run();
}
main();
