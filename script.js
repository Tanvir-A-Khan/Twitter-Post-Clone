// Get references to DOM elements
const form = document.getElementById("form");       // Reference to the form element
const input = document.getElementById("input");     // Reference to the input textarea
const msg = document.getElementById("msg");         // Reference to a message element
const post = document.getElementById("post");       // Reference to the container for posts
const success = document.getElementById("succ");    // Reference to the success message element

// Add a submit event listener to the form
form.addEventListener("submit", (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    console.log("Clicked"); // Log a message to the console
    checkValidation(); // Call the function to check validation
});

// Function to check input validation
function checkValidation() {
    if (input.value === "") {
        msg.innerHTML = "Post cannot be empty"; // Display an error message if input is empty
        success.innerHTML = ""; // Clear success message
    } else if (input.value.length <= 255) {
        success.innerHTML = "Posted"; // Display a success message if input is within the character limit
        msg.innerHTML = ""; // Clear error message
        console.log(input.value.length); // Log the character count to the console
        createPost(); // Call the function to create a new post
    } else {
        msg.innerHTML = "Post cannot be more than 255 characters"; // Display an error message for character limit exceeded
        success.innerHTML = ""; // Clear success message
    }
}

// Initialize an empty data object to store post text
let data = {};

// Function to create a new post and add it to the post container
let createPost = () => {
    data["text"] = input.value; // Store the input text in the data object

    // Add the new post HTML to the post container
    post.innerHTML +=
        `
    <div>
        <p>${data["text"]}</p>
        <span class="option">
            <i onClick="editPost(this)" class="fa-solid fa-pen-to-square"></i>
            <i onClick="deletePost(this)" class="fa-solid fa-trash"></i>
        </span>
    </div>
    `;

    input.value = ""; // Clear the input textarea after posting
}

// Function to delete a post
const deletePost = (e) => {
    e.parentElement.parentElement.remove(); // Remove the post's parent element (the entire post)
}

// Function to edit a post
const editPost = (e) => {
    input.value = e.parentElement.previousElementSibling.innerHTML; // Set the input textarea value to the text of the selected post
    deletePost(e); // Delete the selected post
}
