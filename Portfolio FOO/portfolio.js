function toggleNavbar() {
    var navLinks = document.querySelectorAll('.navbar a');

    for (var i = 0; i < navLinks.length; i++) {
        if (navLinks[i].style.display === 'block') {
            navLinks[i].style.display = 'none';
        } else {
            navLinks[i].style.display = 'block';
        }
    }
    
    var dropdownContent = document.querySelector('.navbar .dropdown-content');
    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
}
function addEntry() {

    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;


    var newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${email}</td><td>${name}</td><td>${message}</td>`;

    var tableBody = document.getElementById('entriesBody');
    tableBody.appendChild(newRow);

    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
}
