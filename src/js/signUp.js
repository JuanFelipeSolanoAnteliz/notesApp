// Define la función togglePassword
export function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "🙈"; // Cambia el ícono a "ocultar"
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "👁️"; // Cambia el ícono a "mostrar"
    }
  }
  
  // Lógica para el formulario
  document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
    } else {
      let object = Object.fromEntries(new FormData(event.target));
      console.log(object);
      
    }


  });
  // 