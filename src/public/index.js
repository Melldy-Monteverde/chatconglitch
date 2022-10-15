console.log('Esto será un chat')

const socketCLient = io()

let user

Swal.fire({
  title: 'Hi User',
  text: 'Sign in',
  input: 'text',
  allowOutSIdeClick: false
}).then(res => {
  // console.log(res)
  user = res.value
  console.log(user)
})

const messageContainer = document.getElementById('messageContainer')

const field = document.getElementById('messageFied')

field.addEventListener('keydown', e => {
  console.log(e.key)
  if (e.key === 'Enter') {
    socketCLient.emit('message', {
      username: user,
      message: field.value
    })
  }
})

socketCLient.on('historial', data => {
  // console.log(data)
  let elements = ''
  data.forEach(msg => {
    elements = elements + `
    <p><strong>${msg.username}</strong>: ${msg.message}</p>
    `
  });
  messageContainer.innerHTML = elements
})

socketCLient.on('newUser', () => {
  Swal.fire({
    text: 'nuevo usuario conectado',
    toast: true
  })
})