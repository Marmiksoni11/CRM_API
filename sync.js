const { DataTypes } = require("sequelize");
const sequelize = require("./db/connect"); 

const sync_db = async () => {
  try {
    const syncCheck = await sequelize.sync({ alter : true});
    console.log(" ---- Reached Sync ---- ")
  } catch (e) {
    console.log(" ERROR IN SYNC ===== >>>>  ", e);
  }
};

module.exports = sync_db
