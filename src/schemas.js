export const reviewsSchema = {
    userName: String,
    rating: Number,
    comment: String
}

export const foodsSchema = {
    name: String,
    calories: Number,
    totalFat: Number,
    saturatedFat: Number,
    polyunsaturatedFat: Number,
    monounsaturatedFat: Number,
    transFat: Number,
    cholestorol: Number,
    sodium: Number,
    potassium: Number,
    totalCarbs: Number,
    dietaryFiber: Number,
    sugars: Number,
    protein: Number,
    vitaminA: Number,
    vitaminC: Number,
    calcium: Number,
    iron: Number,
    review: reviewsSchema
};

export const usersSchema = {
    userName: String,
    password: String,
    age: Number,
    gender: String,
    activityLevel: String,
    weight: Number,
    height: Number
};
