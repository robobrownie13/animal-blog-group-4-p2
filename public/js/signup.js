const form = document.querySelector('form')

const handleSubmit = async (event) => {
    event.preventDefault()
    const userInput = document.getElementById('username_input')
    const emailInput = document.getElementById('email_input')
    const passwordInput = document.getElementById('password_input')
    console.log(userInput.value, emailInput.value, passwordInput.value)  
    const response = await fetch('http://localhost:3001/api/users',  {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: userInput.value, email: emailInput.value, password: passwordInput.value }),
        });
        const data = await response.json();
        console.log(data)
        window.location.href = '/'
}


form.addEventListener('submit', handleSubmit)