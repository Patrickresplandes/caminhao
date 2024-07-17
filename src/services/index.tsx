

export const register_user = async (formData: any) => {
    try {
        const res = await fetch('https://api-express-mongodb-1.onrender.com/usuarios', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log('Error in register_user (service) => ', error);
        return { success: false, message: error.message };
    }
};


export const login_user = async (formData: any) => {
    try {
        const res = await fetch('https://api-express-mongodb-1.onrender.com/auth', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        });
        console.log(res)
        const data = res.json();
        return data;
    } catch (error : any) {
        console.log('Error in login_user (service) => ', error);
        return error.message
    }
};