/**
 * FILE: manipulacion_dom.js
 * DESCRIPTION: Logic for adding/removing notes with Local Storage persistence.
 */

// TASK 2: Selecting elements using different methods
// Using getElementById for the input and the list
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');
// Using querySelector for the button
const addBtn = document.querySelector('#addBtn');

// Logging references to confirm they exist in the console
console.log("DOM Elements Loaded:", { noteInput, addBtn, notesList });

// TASK 5: Initialize the array from Local Storage or empty if no data exists
let notes = JSON.parse(localStorage.getItem("notes")) || [];

/**
 * TASK 3 & 5: Function to render notes from the array to the DOM
 */
function renderNotes() {
    // Clear current list to avoid duplication
    notesList.innerHTML = "";

    notes.forEach((noteText, index) => {
        // Create <li> element
        const li = document.createElement('li');
        
        // Use textContent to set the note text (Criteria of acceptance)
        li.textContent = noteText;

        // Create the "Delete" button for each note
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Eliminar";
        deleteBtn.classList.add('delete-btn');

        // TASK 4: Remove note from DOM and Array when clicked
        deleteBtn.onclick = () => {
            deleteNote(index);
        };

        // Append the button to the <li> and the <li> to the <ul>
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });

    // Log the number of notes loaded
    console.log(`Currently loaded: ${notes.length} notes.`);
}

/**
 * TASK 3: Logic to add a new note
 */
addBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();

    // Basic validation to prevent empty notes
    if (text === "") {
        alert("Please enter a valid note.");
        return;
    }

    // Add note to the array
    notes.push(text);
    
    // Save to Local Storage and refresh UI
    saveAndRefresh();

    // Clean and focus the input
    noteInput.value = "";
    noteInput.focus();
    
    console.log("Note added successfully.");
});

/**
 * TASK 4: Logic to delete a note by index
 */
function deleteNote(index) {
    // Remove the specific item from the array
    notes.splice(index, 1);
    
    // Save to Local Storage and refresh UI
    saveAndRefresh();
    
    console.log("Note deleted successfully.");
}

/**
 * TASK 5: Persist data using Local Storage
 */
function saveAndRefresh() {
    // Save the array as a JSON string
    localStorage.setItem("notes", JSON.stringify(notes));
    
    // Render the updated list
    renderNotes();
}

// Initial render when the page loads
renderNotes();