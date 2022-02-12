const mongoose = require("mongoose");
const Provider = require("../models/provider");
const { connect } = require("../db/db_atlas");
const providers = [
  { name: "Nestlé", telephone: 000000000, email: "" },
  { name: "PepsiCo, Inc.", telephone: 000000000, email: "" },
  { name: "JBS", telephone: 000000000, email: "" },
  { name: "Anheuser-Busch InBev", telephone: 000000000, email: "" },
  { name: "The Coca-Cola Company", telephone: 000000000, email: "" },
  { name: "Archer Daniels Midland Company", telephone: 000000000, email: "" },
  { name: "Tyson", telephone: 000000000, email: "" },
  { name: "Mondelez International", telephone: 000000000, email: "" },
  { name: "Cargill", telephone: 000000000, email: "" },
  { name: "Mars", telephone: 000000000, email: "" },
  { name: "Unilever", telephone: 000000000, email: "" },
  { name: "Danone", telephone: 000000000, email: "" },
  { name: "Kraft Heinz", telephone: 000000000, email: "" },
  { name: "SABMiller", telephone: 000000000, email: "" },
  { name: "Heineken", telephone: 000000000, email: "" },
  { name: "Lactalis", telephone: 000000000, email: "" },
  { name: "Suntory", telephone: 000000000, email: "" },
  { name: "Kirin Holdings", telephone: 000000000, email: "" },
  { name: "Fonterra", telephone: 000000000, email: "" },
  { name: "General Mills Inc.", telephone: 000000000, email: "" },
  { name: "ConAgra Foods Inc.", telephone: 000000000, email: "" },
  { name: "Asahi Group", telephone: 000000000, email: "" },
  { name: "Diageo", telephone: 000000000, email: "" },
  { name: "Royal FrieslandCampina", telephone: 000000000, email: "" },
  { name: "Kellogg Company", telephone: 000000000, email: "" },
  { name: "CHS Inc.", telephone: 000000000, email: "" },
  { name: "Grupo Bimbo (Mexico)", telephone: 000000000, email: "" },
  { name: "Arla Foods", telephone: 000000000, email: "" },
  { name: "Smithfield Foods Inc.", telephone: 000000000, email: "" },
  { name: "Brf Brasil Foods", telephone: 000000000, email: "" },
  { name: "NH Foods", telephone: 000000000, email: "" },
  { name: "Carlsberg", telephone: 000000000, email: "" },
  { name: "Ferrero", telephone: 000000000, email: "" },
  { name: "Femsa", telephone: 000000000, email: "" },
  { name: "Pernod Ricard", telephone: 000000000, email: "" },
  { name: "Vion", telephone: 000000000, email: "" },
  { name: "Danish Crown", telephone: 000000000, email: "" },
  { name: "Meiji Holdings", telephone: 000000000, email: "" },
  { name: "Bunge", telephone: 000000000, email: "" },
  { name: "Saputo", telephone: 000000000, email: "" },
  { name: "Marfrig Group", telephone: 000000000, email: "" },
  { name: "Dean Foods Company", telephone: 000000000, email: "" },
  { name: "Yili Group", telephone: 000000000, email: "" },
  { name: "Hormel Foods Corporation", telephone: 000000000, email: "" },
  { name: "Yamazaki Baking", telephone: 000000000, email: "" },
  { name: "Sudzucker", telephone: 000000000, email: "" },
  { name: "Associated British Foods", telephone: 000000000, email: "" },
  { name: "Coca-Cola HBC", telephone: 000000000, email: "" },
  { name: "Maruha Nichiro Corporation", telephone: 000000000, email: "" },
  { name: "China Mengniu Dairy Company", telephone: 000000000, email: "" },
  { name: "Campbell Soup Company", telephone: 000000000, email: "" },
  { name: "Coca-Cola Enterprises", telephone: 000000000, email: "" },
  { name: "Kerry Group", telephone: 000000000, email: "" },
  { name: "Parmalat", telephone: 000000000, email: "" },
  { name: "The Hershey Company", telephone: 000000000, email: "" },
  { name: "DMK Deutsches Milchkontor", telephone: 000000000, email: "" },
  { name: "Sodiaal", telephone: 000000000, email: "" },
  { name: "Oetker Group", telephone: 000000000, email: "" },
  { name: "Red Bull", telephone: 000000000, email: "" },
  { name: "McCain Foods Limited", telephone: 000000000, email: "" },
  { name: "Muller Group", telephone: 000000000, email: "" },
  { name: "Ajinomoto", telephone: 000000000, email: "" },
  { name: "Savencia Fromage & Dairy", telephone: 000000000, email: "" },
  { name: "Dr Pepper Snapple Group", telephone: 000000000, email: "" },
  { name: "Constellation Brands", telephone: 000000000, email: "" },
  { name: "Ingredion Inc.", telephone: 000000000, email: "" },
  { name: "The JM Smucker Company", telephone: 000000000, email: "" },
  { name: "Morinaga Milk Industry", telephone: 000000000, email: "" },
  { name: "Nissui", telephone: 000000000, email: "" },
  { name: "Bacardi", telephone: 000000000, email: "" },
  { name: "LVMH", telephone: 000000000, email: "" },
  { name: "Barry Callebaut", telephone: 000000000, email: "" },
  { name: "Land O' Lakes Inc.", telephone: 000000000, email: "" },
  { name: "ThaiBev", telephone: 000000000, email: "" },
  { name: "Barilla", telephone: 000000000, email: "" },
  { name: "Tsingtao Brewery", telephone: 000000000, email: "" },
  { name: "Itoham Foods", telephone: 000000000, email: "" },
  { name: "Maxingvest/Tchibo", telephone: 000000000, email: "" },
  { name: "Schreiber Foods", telephone: 000000000, email: "" },
  { name: "Sapporo Holdings", telephone: 000000000, email: "" },
  { name: "Nisshin Seifun Group", telephone: 000000000, email: "" },
  { name: "Dole Food Company, Inc.", telephone: 000000000, email: "" },
  { name: "Coca-Cola Amatil", telephone: 000000000, email: "" },
  { name: "Nissin Foods Group", telephone: 000000000, email: "" },
  { name: "Ito En", telephone: 000000000, email: "" },
  { name: "McCormick Corporation", telephone: 000000000, email: "" },
  { name: "Agropur Cooperative", telephone: 000000000, email: "" },
  { name: "Tate & Lyle", telephone: 000000000, email: "" },
  { name: "Molson Coors Brewing Company", telephone: 000000000, email: "" },
  { name: "QP Corporation", telephone: 000000000, email: "" },
  { name: "J R Simplot", telephone: 000000000, email: "" },
  { name: "Brown-Forman", telephone: 000000000, email: "" },
  { name: "Coca-Cola West", telephone: 000000000, email: "" },
  { name: "E & J Gallo Winery", telephone: 000000000, email: "" },
  { name: "Groupe Bel", telephone: 000000000, email: "" },
  { name: "Flowers Foods", telephone: 000000000, email: "" },
  { name: "DE Master Blenders 1753", telephone: 000000000, email: "" },
  { name: "Keurig Green Mountain", telephone: 000000000, email: "" },
  { name: "WhiteWave Foods", telephone: 000000000, email: "" },
  { name: "Japan Tobacco International", telephone: 000000000, email: "" },
];
async function main() {
  const ProviderDocuments = [];
  for (const provider of providers) {
    ProviderDocuments.push(new Provider(provider));
  }
  const run = async () => {
    const allProviders = await Provider.find();
    if (allProviders.length > 0) {
      await Provider.collection
        .drop()
        .then(() => console.log("Provider collection dropped"));
    }
    await Provider.insertMany(ProviderDocuments).then(() =>
      console.log(
        "Provider collection filled with " +
          ProviderDocuments.length +
          " documents"
      )
    );
    mongoose.disconnect().then(() => console.log("Disconnected"));
  };
  await run();
}
main();
