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
    reviews: [
        {
            userName: String,
            rating: Number, // Calificación de la comida
            comment: String, // Comentario del usuario
            createdAt: { type: Date, default: Date.now } // Fecha de la reseña
        }
    ]
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
