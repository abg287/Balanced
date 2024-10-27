import { foodsSchema } from "./schemas.js";
import mongoose from "mongoose";

export const Food = mongoose.model( "Food", foodsSchema );