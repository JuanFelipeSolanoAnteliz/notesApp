// Define la función togglePassword
export function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'; // Cambia el ícono a "ocultar"
    } else {
      passwordInput.type = "password";
      toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'; // Cambia el ícono a "mostrar"
    }
  }
  
  // Lógica para el formulario
  document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    if (password !== confirmPassword) {
    } else {
      let object = Object.fromEntries(new FormData(event.target));
      console.log(object);

      let config={
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
              'x-version': '1.0.0'  
          },
          body:JSON.stringify(object)
      };

      let uri = `https://localhost:5000/users`;
      let request = await fetch(uri, config);
      console.log(request)
      let response = await request.json();
      if(response.status === 406) console.log({ status:406, message:'the password dos not match'});           
      window.location.href='https://localhost:5000/notes';
      
    }


  });
  // 