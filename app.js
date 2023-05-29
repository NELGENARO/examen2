const express = require('express');
const app = express();

const http = require('http');
// const { dirname } = require('path');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

let jugador = false;
let cantJugadores = 0;
let jugada = 0;


let game = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
];

app.get('/', (req,res) =>{
    // res.send('<h1>Puerto funciopnando</h1>');
    res.sendFile(`${__dirname}/pages/index.html`)
});

server.listen(3004, ()=>{
    cantJugadores = 0;
    // console.log('Puerto funcionando');
    // game = [
    //     ['-', '-', '-'],
    //     ['-', '-', '-'],
    //     ['-', '-', '-']
    // ];
});

let ultimo = 'O';
io.on('connection', (socket) => {
    // console.log('a user connected');
    cantJugadores++;
    console.log('Usuarios conectados '+cantJugadores);
    
    socket.on('disconnect', () => {
        cantJugadores--;
        console.log('Usuarios conectados '+cantJugadores);
        // console.log('Usuario desconectado');
    });

    // if(jugador){
    //     io.emit('jugador','X');
    // }else{
    //     io.emit('jugador','Y');
    // }
    
    io.emit('jugadas',game);

    socket.on('coordenadas', (valor) =>{
        console.log(valor);
        let coordenadas = valor.split('_');
        if(ultimo != coordenadas[2]){
            game[coordenadas[0]][coordenadas[1]] = coordenadas[2]; 
            let estado = verificarFila(coordenadas[0],coordenadas[2]) || verificarColumna(coordenadas[1],coordenadas[2]) 
            || verificarDiagonalPrincipal(coordenadas[2]) || verificarDiagonalSecundaria(coordenadas[2]);
            jugada ++;
            if(estado){
                io.emit('jugada',valor+'_ganado');
            }else{
                if(jugada == 9){
                    io.emit('jugada',valor+'_empate');
                }else{
                    io.emit('jugada',valor+'_sigue');
                }
            }
            // if(!jugador){
            //     game[coordenadas[0]][coordenadas[1]] = 'X';
            //     io.emit('jugada',valor);
            // }else{
            //     game[coordenadas[0]][coordenadas[1]] = 'O';
            //     io.emit('jugada',valor);
            // }
            // console.log(game);
            jugador = !jugador;
            ultimo = coordenadas[2];
        }else{
            // console.log('Invalido');
            socket.emit('jugada', 'Turno del otro jugador');
        }
            
    });

    socket.on('nuevoUsuario', () => {
    // Emitir un mensaje de bienvenida al nuevo usuario
        if(cantJugadores %2 === 0){
            socket.emit('Jugador', 'O');
        }else{
            socket.emit('Jugador', 'X');
        }
    });

    socket.on('reiniciar', () => {
        game = [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ];
        jugada = 0;
        io.emit('respuestaReinicio',true);
    });
});

function verificarFila(fila,jugador){
    for (let i = 0; i < 3; i++) {
        let element = game[fila][i];
        if( jugador == element){
            continue;
        }else{
            return false;
        }
    }
    return true;
}

function verificarColumna(columna,jugador){
    for (let i = 0; i < 3; i++) {
        let element = game[i][columna];
        if( jugador == element){
            continue;
        }else{
            return false;
        }
    }
    return true;
}

function verificarDiagonalPrincipal(jugador){
    return game[0][0] == game[1][1] && game[2][2] == game[1][1] && game[0][0] == jugador;
}

function verificarDiagonalSecundaria(jugador){
    return game[0][2] == game[1][1] && game[1][1] == game[2][0] && game[0][2] == jugador;
}





