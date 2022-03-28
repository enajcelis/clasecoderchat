let socket = io();
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let user;

/* ALERT DE IDENTIFICACIÓN */
Swal.fire({
	title: "Identifícate",
	input: "text",
	allowOutsideClick: false,
	inputValidator: (value) => {
		return !value && '¡Necesitas escribir un nombre de usuario para participar!'
	}
}).then(result => {
	user = result.value;
});

chatBox.addEventListener('keyup', evt => {
	if(evt.key === "Enter"){
		if(chatBox.value.trim().length > 0){
			socket.emit('message', {user, message: chatBox.value.trim()});
			chatBox.value = "";
		}
	}
});

/* EVENTOS DE SOCKETS */
socket.on('log', data => {	
	let messages = "";
	data.forEach(log => {
		messages = messages + `<strong>${log.user} dice:</strong> ${log.message}<br>`;
	});
	log.innerHTML = messages;
});