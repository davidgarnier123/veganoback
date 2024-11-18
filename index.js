const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db');
const { displayRecipes, getRecipeById, addRecipe } = require('./recipes');
const { ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;


const corsOptions = {
    // origin: 'http://localhost:4000', // L'URL de votre frontend Angular
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions))


// Middleware pour parser le JSON
app.use(express.json());

// Connexion à la base de données
connectToDB().catch(console.error);

// Route pour obtenir toutes les recettes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await displayRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des recettes', error: error.message });
    }
});

// Route pour obtenir une recette par son ID
app.get('/api/recipes/:id', async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const recipe = await getRecipeById(id);
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: 'Recette non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la recette', error: error.message });
    }
});

// Route pour ajouter une nouvelle recette
app.post('/api/recipes', async (req, res) => {
    try {
        const recipeData = req.body;
        
        // Vérifier si recipeData contient une propriété 'image'
        if (recipeData.hasOwnProperty('image')) {
            // Supprimer la propriété 'image'
            delete recipeData.image;
        }
        
        const insertedId = await addRecipe(recipeData);
        res.status(201).json({ message: 'Recette ajoutée avec succès', id: insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la recette', error: error.message });
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur API démarré sur le port ${port}`);
});