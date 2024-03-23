
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}



function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function displayError(inputElement, message) {
  const errorElement = document.getElementById('error-' + inputElement.id);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function clearError(inputElement) {
  const errorElement = document.getElementById('error-' + inputElement.id);
  errorElement.textContent = '';
  errorElement.style.display = 'none'; 
}

function getSelectedLocation() {
  const locations = document.getElementsByName('location');
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
     return locations[i].value;
    }
  }
  return '';
}

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function validateAge(birthdate, minimumAge) {
  const age = calculateAge(birthdate);
  return age >= minimumAge;
}




document.addEventListener('keydown', function(event) {
  if (event.key === 'Alt') {
  
    const modalInfos = document.querySelectorAll('.modal-info');
    modalInfos.forEach(function(info) {
      info.style.visibility = 'visible';
    });
  }
});

document.addEventListener('keyup', function(event) {
  if (event.key === 'Alt') {
    const modalInfos = document.querySelectorAll('.modal-info');
    modalInfos.forEach(function(info) {
      info.style.visibility = 'hidden';
    });
  }
});

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', closeConfirmationModal);




document.querySelector('.modal-btn').addEventListener('click', function() {
  openModal();
  resetAndPrepareNewForm(); 
});

function validate(event) {
  event.preventDefault();
  let isValid = true;



  const termsCheckbox = document.getElementById('checkbox1');
  if (!termsCheckbox.checked) {
    displayError(termsCheckbox, 'Vous devez accepter les conditions d\'utilisation.');
    isValid = false;
  } else {
    clearError(termsCheckbox);
  }



  const firstName = document.getElementById('first');
  if (firstName.value.trim().length < 2) {
      displayError(firstName, 'Le prénom doit contenir au moins 2 caractères.');
      isValid = false;
  } else {
      clearError(firstName);
  }

  
  const lastName = document.getElementById('last');
  if (lastName.value.trim().length < 2) {
      displayError(lastName, 'Le nom doit contenir au moins 2 caractères.');
      isValid = false;
  } else {
      clearError(lastName);
  }

  
  const email = document.getElementById('email');
  if (!email.value.trim() || !validateEmail(email.value)) {
      displayError(email, 'Veuillez entrer une adresse e-mail valide.');
      isValid = false;
  } else {
      clearError(email);
  }

 
  const birthdate = document.getElementById('birthdate');
  const minimumAge = 18; 
  if (!birthdate.value.trim()) {
    displayError(birthdate, 'Veuillez entrer votre date de naissance.');
    isValid = false;
  } else if (!validateAge(birthdate.value, minimumAge)) {
    displayError(birthdate, `Vous devez avoir au moins ${minimumAge} ans pour vous inscrire.`);
    isValid = false;
  } else {
    clearError(birthdate);
  }


  const quantity = document.getElementById('quantity');
  if (quantity.value.trim() === '' || isNaN(quantity.value) || parseInt(quantity.value) < 0) {
      displayError(quantity, 'Veuillez entrer un nombre valide de tournois.');
      isValid = false;
  } else {
      clearError(quantity);
  }

  
  const locations = document.getElementsByName('location');
  let locationSelected = Array.from(locations).some(radio => radio.checked);
  if (!locationSelected) {
      displayError({id: 'location'}, 'Veuillez sélectionner un tournoi. ');
      isValid = false;
  } else {
      clearError({id: 'location'}); 
  }

  document.getElementById('modalFirstName').textContent = 'Prénom: ' + document.getElementById('first').value;
  document.getElementById('modalLastName').textContent = 'Nom: ' + document.getElementById('last').value;
  document.getElementById('modalmail').textContent = 'Mail: ' + document.getElementById('email').value;
  document.getElementById('modalbirthdate').textContent = 'Nom: ' + document.getElementById('birthdate').value;
  document.getElementById('modalQuantity').textContent = 'Quantité: ' + document.getElementById('quantity').value;
  document.getElementById('modalLocation').textContent = 'Emplacement: ' + getSelectedLocation();

  
  if (isValid) {
    document.querySelector('.modal-body').style.display = 'none'; 
    document.querySelector('.Confirmation-body').style.display = 'block';
  }


  return isValid;
}







function closeConfirmationAndResetForm() {

  closeModal(); 

 
  resetAndPrepareNewForm(); 


  document.querySelector('.Confirmation-body').style.display = 'none';
  document.querySelector('.modal-body').style.display = 'block';
}


document.getElementById('closeConfirmation').addEventListener('click', closeConfirmationAndResetForm);


document.querySelector('.modal-btn').addEventListener('click', function() {
 openModal();
 resetAndPrepareNewForm(); 
});



function resetAndPrepareNewForm() {
  document.forms['reserve'].reset();
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function(message) {
    message.textContent = '';
    message.style.display = 'none'; 

  const modalBody = document.querySelector('.modal-body');
  modalBody.style.height = 'auto'; 
  });
}



function openModal() {
  const modal = document.getElementById('firstModal');
  modal.classList.remove('modal-closed');
  modal.classList.add('modal-open');
}

function closeModal() {
  const modal = document.querySelector('.FormModal.modal-open');
  if (modal) {
    modal.classList.add('modal-closed');
    modal.classList.remove('modal-open');
  }
}

function closeConfirmationModal() {
  const confirmationModal = document.getElementById('firstModal'); 
  if (confirmationModal) {
    confirmationModal.classList.add('modal-closed');
    confirmationModal.classList.remove('modal-open');
  }
  }

document.addEventListener('DOMContentLoaded', function () {
  const modalBtn = document.querySelector('.modal-btn');
  modalBtn.addEventListener('click', openModal);




  document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', closeConfirmationModal); 
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });


  const form = document.querySelector('form[name="reserve"]');
  form.addEventListener('submit', validate);



  const closeConfirmationModalBtn = document.getElementById('closeConfirmationModal');
  closeConfirmationModalBtn.addEventListener('click', function() {
    closeModal(); 
    form.reset(); 
  });

  document.getElementById('closeConfirmation').addEventListener('click', closeConfirmationAndResetForm);
document.getElementById('modalbirthdate').textContent = 'Date de naissance: ' + document.getElementById('birthdate').value;




  window.addEventListener('click', function(event) {
    const modal = document.querySelector('.FormModal');
    if (event.target === modal) {
      closeModal();
    }
  });
});