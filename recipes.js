const { getDBClient } = require('./db');

async function displayRecipes() {
    try {
        const client = await getDBClient();
        const db = client.db("recipes"); // Assurez-vous que c'est le bon nom de votre base de données
        const collection = db.collection("recipes"); // Assurez-vous que c'est le bon nom de votre collection

        const recipes = await collection.find({}).toArray();
        console.log("Recettes trouvées : " + recipes.length);
        return recipes;
    } catch (err) {
        console.error("Erreur lors de l'affichage des recettes :", err);
    }
}

// Vous pouvez ajouter d'autres fonctions liées aux recettes ici, par exemple :
async function getRecipeById(id) {
    try {
        const client = await getDBClient();
        const db = client.db("recipes");
        const collection = db.collection("recipes");

        const recipe = await collection.findOne({ _id: id });
        return recipe;
    } catch (err) {
        console.error("Erreur lors de la récupération de la recette :", err);
    }
}

async function addRecipe(recipeData) {
    try {
        const client = await getDBClient();
        const db = client.db("recipes");
        const collection = db.collection("recipes");

        const result = await collection.insertOne(recipeData);
        console.log("Recette ajoutée avec succès :", result.insertedId);
        return result.insertedId;
    } catch (err) {
        console.error("Erreur lors de l'ajout de la recette :", err);
    }
}

module.exports = { displayRecipes, getRecipeById, addRecipe };