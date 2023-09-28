

const socket = io("http://localhost:8080");
socket.on('chatHistory', (msgs) => {
    const msgHTML = msgs.map(msg => createMessage(msg));
    $("#messages").html(msgHTML.join(" "));

});

socket.on('newMessage', (msgs) => {
  const msgHTML = createMessage(msgs)
  $("#messages").append(msgHTML);
});

function createMessage(msg) {
    return `        <div class="chat-message">
    <div class="flex items-end">
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
      >
        <span class="brand-color">${msg.user}</span>
        <div>
          <span
            class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
            >${msg.message}</span
          >
        </div>
      </div>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("miFormulario").addEventListener("submit", function (e) {
      e.preventDefault(); // Evitar el envío predeterminado del formulario

      // Obtener el valor del campo de entrada
      const message = document.getElementById("message").value;
      const username = getCookie("username")
      const accessToken = getCookie("Token")
      console.log(JSON.stringify({message, user:username}))
      if (message !== "") {
        // Enviar el mensaje al servidor a través de Socket.io
        socket.emit("sendMessage", { message, username });

        fetch("http://localhost:8080/chat", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json', // Establece el tipo de contenido a JSON
            // 'Cookie': `accessToken=${accessToken}`
          },
          body: JSON.stringify({ message, user:username }) // Convierte el objeto en una cadena JSON
        })
          .then((response) => {
            if (!response.ok) {
              // Manejar errores aquí si la respuesta no es exitosa
              throw new Error('La solicitud POST no tuvo éxito');
            }
            // Si la respuesta es exitosa, puedes hacer algo con la respuesta si es necesario
            return response.json(); // O response.text() u otros métodos según el tipo de respuesta
          })
          .then((data) => {
            // Manejar los datos de la respuesta del servidor aquí
            console.log('Respuesta del servidor:', data);
          })
          .catch((error) => {
            // Manejar errores de la solicitud POST
            console.error('Error:', error);
          });
        
        

      }



      // Limpia el campo de entrada después de enviar
      document.getElementById("message").value = "";
  });
});


function getCookie(givenCookie) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === givenCookie) {
          return cookieValue;
      }
  }
  return null;
}