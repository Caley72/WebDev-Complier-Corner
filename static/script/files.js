// Event listener for the 'saveBtn' button (downloads all files)
document.getElementById('saveBtn').addEventListener('click', function () {
  // Get the content from the textarea
  const htmlCode = document.getElementById('htmlcode').value;
  const cssCode = document.getElementById('csscode').value;
  const jsCode = document.getElementById('jscode').value;

  // Function to create a downloadable file
  function createFile(name, content, type) {
      const blob = new Blob([content], { type: type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url); // Clean up the object URL
  }

  // Trigger download for all files
  createFile('index.html', htmlCode, 'text/html');
  createFile('style.css', cssCode, 'text/css');
  createFile('script.js', jsCode, 'application/javascript');
});

// Event listeners for the individual download buttons
document.getElementById('downloadHtml').addEventListener('click', function () {
    const htmlCode = document.getElementById('htmlcode').value;
    createFile('index.html', htmlCode, 'text/html');
});

document.getElementById('downloadCss').addEventListener('click', function () {
    const cssCode = document.getElementById('csscode').value;
    createFile('style.css', cssCode, 'text/css');
});

document.getElementById('downloadJs').addEventListener('click', function () {
    const jsCode = document.getElementById('jscode').value;
    createFile('script.js', jsCode, 'application/javascript');
});

// Function to create a downloadable file
function createFile(name, content, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url); // Clean up the object URL
}

// Event listeners for the upload buttons to apply the code to the page

// Function to handle the file input and load the content into the appropriate textarea
function loadFileContent(inputElement, textareaId) {
  const file = inputElement.files[0]; // Get the selected file
  if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
          // Set the content of the textarea to the file's content
          document.getElementById(textareaId).value = e.target.result;
      };
      reader.readAsText(file); // Read the file as text
  }
}

// Event listeners for the individual file upload buttons

document.getElementById('uploadHtml').addEventListener('click', function () {
  // Create a file input dynamically and trigger the file selection dialog
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.html'; // Only accept HTML files
  input.addEventListener('change', function () {
      loadFileContent(input, 'htmlcode');
  });
  input.click(); // Trigger the file input dialog
});

document.getElementById('uploadCss').addEventListener('click', function () {
  // Create a file input dynamically and trigger the file selection dialog
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.css'; // Only accept CSS files
  input.addEventListener('change', function () {
      loadFileContent(input, 'csscode');
  });
  input.click(); // Trigger the file input dialog
});

document.getElementById('uploadJs').addEventListener('click', function () {
  // Create a file input dynamically and trigger the file selection dialog
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.js'; // Only accept JS files
  input.addEventListener('change', function () {
      loadFileContent(input, 'jscode');
  });
  input.click(); // Trigger the file input dialog
});