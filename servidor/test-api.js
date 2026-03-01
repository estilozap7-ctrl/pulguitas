const axios = require('axios');

async function testLogin() {
    try {
        console.log('Probando endpoint de login...');
        const response = await axios.post('http://localhost:3001/api/auth/login', {
            email: 'admin@pulguitas.com',
            password: 'admin123'
        });

        console.log('¡Respuesta exitosa!');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error al probar el endpoint:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testLogin();
