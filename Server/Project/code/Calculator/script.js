let string = "";
let buttons = document.querySelectorAll(".button");

// Function to handle button clicks
const handleButtonClick = (value) => {
    if (value === "=") {
        try {
            string = eval(string); // Use eval carefully; consider a safer alternative for production
            document.querySelector('input').value = string;
        } catch (error) {
            document.querySelector('input').value = "Error"; // Handle any evaluation errors
        }
    } else if (value === "AC") {
        string = "";
        document.querySelector('input').value = "0";
    } else {
        string += value;
        document.querySelector('input').value = string;
    }
};

// Add click event listeners to buttons
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        handleButtonClick(e.target.innerHTML);
    });
});

// Add keyboard event listener
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Map keyboard inputs to button values
    const keyMapping = {
        '0': '0', '1': '1', '2': '2', '3': '3',
        '4': '4', '5': '5', '6': '6', '7': '7',
        '8': '8', '9': '9', '+': '+', '-': '-',
        '*': '*', '/': '/', '=': '=', 'Enter': '=',
        'Escape': 'AC', 'Backspace': 'AC', 'Delete': 'AC', // AC for clearing
        '.': '.', '%': '%', '+-': '+/-'
    };

    if (keyMapping[key]) {
        handleButtonClick(keyMapping[key]);
    }
});
