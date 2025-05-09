/* written by: Anthony McAlpin 
tested by: Anthony McAlpin 
debugged by: Anthony McAlpin  */


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resetPasswordForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("pwd");
    const confirmPassInput = document.getElementById("confirmPass");
    const messageDiv = document.getElementById("resetMessage");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const username = usernameInput.value.trim();
      const newPassword = passwordInput.value;
      const confirmPassword = confirmPassInput.value;
  
     
  
      // Validation
      if (!username || !newPassword || !confirmPassword) {
        messageDiv.textContent = "Please fill out all fields.";
        return;
      }
  
      if (newPassword !== confirmPassword) {
        messageDiv.textContent = "Passwords do not match.";
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/users/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, newPassword })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          messageDiv.textContent = "Password reset successful! Redirecting to login...";
          messageDiv.style.color = "white";
          setTimeout(() => {
            window.location.href = "LogIn.html";
          }, 2000);
        } else {
          messageDiv.textContent = data.message || "Failed to reset password.";
          messageDiv.style.color = "white";
        }
      } catch (error) {
        console.error("Reset password error:", error);
        messageDiv.textContent = "An error occurred. Please try again.";
        messageDiv.style.color = "white";
      }
    });
  });
  
