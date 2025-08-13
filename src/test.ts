import mongoose from "mongoose";
import { UsuarioModel } from "./schema/UsuarioSchema";

async function test() {
  await mongoose.connect("mongodb://localhost:27017", { dbName: "gestion_agro" });

  const usuarios = await UsuarioModel.find();
  console.log(usuarios);
  mongoose.disconnect();
}

test();
