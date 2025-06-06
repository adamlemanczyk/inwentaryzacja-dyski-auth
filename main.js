import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  'https://spulxfwbnljpahuwpmze.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwdWx4ZndibmxqcGFodXdwbXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTA4OTIsImV4cCI6MjA2NDc2Njg5Mn0.8_AeRUAZN8Z8JkXwR2m_63MeroPcHHwY7hLXp_5vXw8'
)

window.login = async function () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    alert(error ? error.message : 'Zalogowano!')
}

window.register = async function () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const { error } = await supabase.auth.signUp({
        email,
        password
    })
    alert(error ? error.message : 'Rejestracja zakończona!')
}

window.recover = async function () {
    const email = document.getElementById('email').value
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    alert(error ? error.message : 'Sprawdź skrzynkę email')
}

window.uploadPhotos = async function () {
    const files = document.getElementById('fileInput').files
    const output = document.getElementById('output')
    for (const file of files) {
        const { data, error } = await supabase.storage
            .from('photos')
            .upload(`dyski/${file.name}`, file)
        output.innerHTML += `<p>${file.name}: ${error ? error.message : 'Załadowano!'}</p>`
    }
}