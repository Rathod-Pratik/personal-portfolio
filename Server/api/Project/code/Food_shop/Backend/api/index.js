const express = require('express');
const path = require('path');
const cors = require('cors');

const router = express.Router();
// Route to serve food data
router.get("/food", (req, res) => { 
    const foodData = [
        {
            name: "Boiled Egg",
            price: 10,
            text: "A simple yet nutritious start to your day.",
            image: "/images/egg.png",
            type: "breakfast",
        },
        {
            name: "RAMEN",
            price: 25,
            text: "A quick and flavorful Japanese noodle soup.",
            image: "/images/ramen.png",
            type: "lunch",
        },
        {
            name: "GRILLED CHICKEN",
            price: 45,
            text: "A lean and healthy protein option, perfect for a balanced meal.",
            image: "/images/chicken.png",
            type: "dinner",
        },
        {
            name: "CAKE",
            price: 18,
            text: "Indulge in a sweet treat, perfect for any occasion.",
            image: "/images/cake.png",
            type: "breakfast",
        },
        {
            name: "BURGER",
            price: 23,
            text: "A classic American favorite, customizable to your taste.",
            image: "/images/burger.png",
            type: "lunch",
        },
        {
            name: "PANCAKE",
            price: 25,
            text: "Fluffy pancakes, a delicious breakfast or brunch option.",
            image: "/images/pancake.png",
            type: "dinner"
        },
        {
            name: "Biriyani",
            price: 25,
            text: "Aromatic rice dish cooked with spices, herbs, and tender meat or vegetables.",
            image: "/images/biriyani.avif",
            type: "dinner"
        },
        {
            name: "Veg burger",
            price: 20,
            text: "A tasty burger with a veggie patty, fresh lettuce, and tomatoes.",
            image: "/images/burder.avif",
            type: "dinner"
        },
        {
            name: "Samosa",
            price: 30,
            text: "Crispy pastry filled with spicy potatoes and peas, perfect for a snack.",
            image: "/images/chaii-samosa.jpg",
            type: "breakfast"
        },
        {
            name: "Chocolate cake",
            price: 40,
            text: "Rich and moist chocolate cake topped with a creamy chocolate frosting.",
            image: "/images/choklate cake.avif",
            type: "dinner"
        },
        {
            name: "Dosa",
            price: 30,
            text: "Thin and crispy South Indian crepe made from rice and lentils.",
            image: "/images/dosa.avif",
            type: "lunch"
        },
        {
            name: "Faluda",
            price: 15,
            text: "Refreshing cold dessert drink with vermicelli, sweet basil seeds, and rose syrup.",
            image: "/images/faluda.avif",
            type: "dinner"
        },
        {
            name: "Macron pizza",
            price: 35,
            text: "Pizza topped with a combination of macaroni, cheese, and vegetables.",
            image: "/images/macron pizza.avif",
            type: "dinner"
        },
        {
            name: "Manchuriyan dry",
            price: 32,
            text: "Crispy, spicy Indo-Chinese dish with fried vegetables in a tangy sauce.",
            image: "/images/manchuriyan dry.avif",
            type: "dinner"
        },
        {
            name: "Noodles",
            price: 32,
            text: "Stir-fried noodles with vegetables and savory sauces, a popular lunch choice.",
            image: "/images/noobles.avif",
            type: "lunch"
        },
        {
            name: "Paneer Tikka",
            price: 45,
            text: "Marinated paneer cubes grilled to perfection, a delicious Indian appetizer.",
            image: "/images/panner.avif",
            type: "lunch"
        },
        {
            name: "Pasta",
            price: 32,
            text: "Pasta tossed with vegetables and herbs, topped with a flavorful sauce.",
            image: "/images/pasta.avif",
            type: "dinner"
        },
        {
            name: "Pav Bhaji",
            price: 25,
            text: "Spicy mashed vegetables served with buttered buns, a popular street food.",
            image: "/images/pav bhaji.avif",
            type: "dinner"
        },
        {
            name: "Sandwich",
            price: 20,
            text: "Fresh sandwich with layers of vegetables and cheese, great for breakfast.",
            image: "/images/sand which.avif",
            type: "breakfast"
        },
        {
            name: "Strawberry cake",
            price: 35,
            text: "Light and fluffy cake with fresh strawberries and whipped cream.",
            image: "/images/strow barry cake.avif",
            type: "dinner"
        }
    ];

    res.json(foodData);
});

module.exports = router;
