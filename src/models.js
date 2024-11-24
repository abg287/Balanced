import { foodsSchema, usersSchema, reviewsSchema } from "./schemas.js";
import mongoose from "mongoose";

export const Food = mongoose.model( "Food", foodsSchema );
export const User = mongoose.model( "User", usersSchema );
export const Review = mongoose.model( "Review", reviewsSchema );