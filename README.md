# examen2
Librerias o framework usadas navegador:
 - socket.io (backend)
 - node (backend)
 - Bootstrap 5 (frontEnd)
 - Sweet alert (frontEnd)
 
Eventos (socket.io) en el navageador - Cliente 
 RECIVE
 - socket.on('connect', ...); Solicita conexion por protocolo socket
 - socket.on('Jugador', ...); El jugador que va ser en el juego
 - socket.on('jugadas', ...); La lista jugadas en el tablero en caso de conexion
 - socket.on('respuestaReinicio', ...) En caso de reinicio el juego
 - socket.on('jugada', ...) En caso de se realizo una jugada de este o el otro jugador
 ENVIA
 - socket.emit('coordenadas', ...); Envia las cordenadas de la jugada al srivos
 - socket.emit('nuevoUsuario', ...); Solicita el tablero con las jugadas y el tipo de jugador que es
 - socket.emit('reiniciar', ...); Para reiniciar el juego
 
Eventos (socket.io) en el servidor
 RECIVE
 - socket.on('disconnect',..);	Cambia el numero de jugadores 
 - socket.on('coordenadas' ...); Marca la jugada en el tablero  
 - socket.on('nuevoUsuario', ....); Cambia el tipo de jugador si es 'X' o 'O'
 - socket.on('reiniciar', ...); Reinicia el juego para todos los jugadores
 ENVIA
 - io.emit('jugadas', ...); Envia el tablero con las jugadas a todos los jugadores
 - io.emit('jugada', ...); Reenvia las cordenadas de la jugada a todos los jugadores
 - io.emit('respuestaReinicio',true); Envia un estado reinicio de juego a todos los jugadores
 - socket.emit('jugada', ...); Envia un mensaje a un usuario en especifico
 - socket.emit('Jugador', ); Envia el tipo de jugador 'X' o 'O' a un jugador en especifico
