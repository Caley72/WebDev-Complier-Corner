//Startup Loader
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");
});

//Running the code
function run(){
    let htmlCode = document.getElementById("htmlcode").value;
    let CSSCode = document.getElementById("csscode").value;
    let JSCode = document.getElementById("jscode").value;
    let OutPut = document.getElementById("output");

    OutPut.contentDocument.body.innerHTML = htmlCode + "<style>" + CSSCode + "</style>";
    OutPut.contentWindow.eval(JSCode);
}

// Function to handle Tab key press and insert spaces in the textarea
function handleTab(event) {
    if (event.key === 'Tab') {
        event.preventDefault();  // Prevent default tab behavior (focus change)

        const textarea = event.target;
        const cursorPosition = textarea.selectionStart;

        // Get the text before and after the cursor position
        const textBefore = textarea.value.substring(0, cursorPosition);
        const textAfter = textarea.value.substring(cursorPosition);

        // Insert 4 spaces for a tab (or you can use '\t' for a real tab character)
        textarea.value = textBefore + '    ' + textAfter;  // 4 spaces for tab (replace '    ' with '\t' for a real tab)

        // Move the cursor after the inserted tab space
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 4;  // Adjust for 4 spaces
    }
}

// Attach the event listener to all three textareas (HTML, CSS, JS)
document.getElementById('htmlcode').addEventListener('keydown', handleTab);
document.getElementById('csscode').addEventListener('keydown', handleTab);
document.getElementById('jscode').addEventListener('keydown', handleTab);

// Track if both Enter and Space are pressed at the same time
let enterPressed = false;
let spacePressed = false;

// Function to handle key presses in the textareas
function handleKeyDown(event) {
    const textarea = event.target;

    // Check if Enter or Space is pressed
    if (event.key === 'Enter') {
        enterPressed = true;
    }
    if (event.key === ' ') {
        spacePressed = true;
    }

    // If both Enter and Space are pressed at the same time
    if (enterPressed && spacePressed) {
        event.preventDefault();  // Prevent default behavior (new line or space)

        // Get the current cursor position
        const cursorPosition = textarea.selectionStart;
        
        // Get the text before and after the cursor
        const textBefore = textarea.value.substring(0, cursorPosition);
        const textAfter = textarea.value.substring(cursorPosition);
        
        // Insert 3 spaces at the cursor position
        textarea.value = textBefore + '   ' + textAfter;

        // Update the cursor position after the inserted spaces
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3;
    }
}

// Reset the flags once the keys are released
function handleKeyUp(event) {
    if (event.key === 'Enter') {
        enterPressed = false;
    }
    if (event.key === ' ') {
        spacePressed = false;
    }
}

// Add event listeners to all the textareas
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.addEventListener('keydown', handleKeyDown);
    textarea.addEventListener('keyup', handleKeyUp);
});


    // A function to handle history tracking and actions (Undo, Redo, Delete)
    function handleHistory(textareaId) {
        const textarea = document.getElementById(textareaId);
        let undoStack = [];
        let redoStack = [];
        
        // Track the initial content and save it to undoStack
        undoStack.push(textarea.value);

        // Function to update history
        function updateHistory(newContent) {
            undoStack.push(newContent);
            redoStack.length = 0; // Clear redo stack when new content is added
        }

        // Handle undo action
        function undoAction() {
            if (undoStack.length > 1) {
                redoStack.push(undoStack.pop()); // Push the last content to redoStack
                textarea.value = undoStack[undoStack.length - 1]; // Restore to the previous state
            }
        }

        // Handle redo action
        function redoAction() {
            if (redoStack.length > 0) {
                const redoneContent = redoStack.pop();
                undoStack.push(redoneContent); // Push the redone content back to undoStack
                textarea.value = redoneContent; // Set the text area to the redone content
            }
        }

        // Handle delete action (clear the textarea content)
        function deleteAction() {
            textarea.value = '';
            // Optionally, you can add the current content to the undoStack before clearing
            updateHistory('');
        }

        // Add event listener to track changes and update history
        textarea.addEventListener('input', function() {
            updateHistory(textarea.value);
        });

        return {
            undoAction,
            redoAction,
            deleteAction
        };
    }

    // Initialize for each textarea
    const htmlEditor = handleHistory('htmlcode');
    const cssEditor = handleHistory('csscode');
    const jsEditor = handleHistory('jscode');

    // Button event listeners
    document.getElementById('undohtml').addEventListener('click', htmlEditor.undoAction);
    document.getElementById('redohtml').addEventListener('click', htmlEditor.redoAction);
    document.getElementById('deletehtml').addEventListener('click', htmlEditor.deleteAction);
    
    document.getElementById('undocss').addEventListener('click', cssEditor.undoAction);
    document.getElementById('redocss').addEventListener('click', cssEditor.redoAction);
    document.getElementById('deletecss').addEventListener('click', cssEditor.deleteAction);

    document.getElementById('undojs').addEventListener('click', jsEditor.undoAction);
    document.getElementById('redojs').addEventListener('click', jsEditor.redoAction);
    document.getElementById('deletejs').addEventListener('click', jsEditor.deleteAction);

    // Copy functionality
    function copyToClipboard(textareaId) {
        const textarea = document.getElementById(textareaId);
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(textarea.value)
            .then(() => {
                alert(`${textareaId} content copied to clipboard!`);
            })
            .catch(err => {
                console.error('Error copying text: ', err);
                alert('Failed to copy content');
            });
    }

    // Event listeners for copy buttons
    document.getElementById('copyhtml').addEventListener('click', function() {
        copyToClipboard('htmlcode');
    });
    document.getElementById('copycss').addEventListener('click', function() {
        copyToClipboard('csscode');
    });
    document.getElementById('copyjs').addEventListener('click', function() {
        copyToClipboard('jscode');
    });