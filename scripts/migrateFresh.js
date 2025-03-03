require("dotenv").config();
const mongoose = require("mongoose");
const readline = require("readline");

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

const clearAllCollections = async () => {
   try {
      console.log("Menghubungkan ke MongoDB...");
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Terhubung ke MongoDB.");

      rl.question(
         'Anda akan menghapus SEMUA collection/tabel di database. Tindakan ini tidak dapat dibatalkan.\nKetik "y" untuk melanjutkan: ',
         async (answer) => {
            if (answer === "y") {
               // Dapatkan semua nama collection
               const collections = await mongoose.connection.db.collections();

               console.log("Menghapus semua collection:");

               // Hapus setiap collection
               for (const collection of collections) {
                  const collectionName = collection.collectionName;
                  console.log(`Menghapus collection: ${collectionName}`);
                  await mongoose.connection.db.dropCollection(collectionName);
                  console.log(`Collection ${collectionName} berhasil dihapus`);
               }

               console.log("Semua collection telah dihapus!");
            } else {
               console.log("Penghapusan dibatalkan.");
            }

            rl.close();
            await mongoose.connection.close();
            process.exit(0);
         }
      );
   } catch (error) {
      console.error("Terjadi kesalahan:", error);
      rl.close();
      await mongoose.connection.close();
      process.exit(1);
   }
};

clearAllCollections();
