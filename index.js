// document.getElementById('generateAccessBtn').addEventListener('click', function () {
//   // Get the base URL and page path from the input fields
//   var baseURL = document.getElementById('baseURL').value.trim();
//   var pagePath = document.getElementById('pagePath').value.trim();

//   // Check if both fields are not empty
//   if (baseURL && pagePath) {
//     // Combine base URL and page path
//     var fullURL = baseURL + '/' + pagePath;

//     // Generate the QR Code
//     QRCode.toDataURL(fullURL, function (error, url) {
//       if (error) {
//         console.error(error);
//       } else {
//         // Display the QR Code
//         document.getElementById('accessQRCode').innerHTML = `<img src="${url}" alt="QR Code">`;
//         document.getElementById('accessTitle').textContent = "Scan the QR Code to access the page!";

//         // Hide the input fields and button
//         document.getElementById('accessForm').style.display = 'none';
//       }
//     });
//   } else {
//     alert("Please enter both the base URL and the page name.");
//   }
// });
// Automatically detect the base URL and current page
document.addEventListener('DOMContentLoaded', function () {
  // Get the base URL
  const baseURL = window.location.origin;

  // Get the page name (e.g., "index.html")
  const pagePath = "form.html"; // Change this to the desired page name if needed

  // Combine base URL and page name
  const fullURL = `${baseURL}/${pagePath}`;

  // Generate the QR Code
  QRCode.toDataURL(fullURL, function (error, url) {
    if (error) {
      console.error("Error generating QR code:", error);
    } else {
      // Display the QR Code
      document.getElementById('accessQRCode').innerHTML = `<img src="${url}" alt="QR Code">`;
    }
  });
});
