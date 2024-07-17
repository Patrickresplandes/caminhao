export async function signInRequest(data: { email: string; senha: string }) {
    const response = await fetch('https://api-express-mongodb-1.onrender.com/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      return {
        tokenCar: result.token,
        user: {
          email: result.user.email,
        },
      };
    } else {
      throw new Error(result.message);
    }
  }
  
  export async function recoverUserInformation(token: string) {
    const response = await fetch('https://api-express-mongodb-1.onrender.com/auth', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const result = await response.json();
  
    if (response.ok) {
      return {
        user: {
          email: result.email,
        },
      };
    } else {
      throw new Error(result.error);
    }
  }