const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const axios = require('axios')
var cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})

io.on('connection', (socket) => {
    socket.on('abrirCaixa', () => {
        console.log('Caixa aberto');
        var dataHora = new Date();
        socket.emit('abrirCaixa', dataHora);
    });

    socket.on('fecharCaixa', () => {
        console.log('Caixa fechado');
        socket.emit('fecharCaixa');
    });

    socket.on('adicionarProduto', (id, quantidade) => {
        axios.get(`http://localhost:3000/produtos/${id}`)
        .then(data => {
            produto = data.data

            if (produto) {
                produto.quantidade = quantidade
                console.log(quantidade + 'x ' + produto.nome + ' adicionado');
                socket.emit('adicionarProduto', produto);
            } else {
                console.log('Produto não encontrado');
                socket.emit('produtoNaoEncontrado');
            }
        })
    });
});

server.listen(3030, () => {
    console.log('listening on localhost:3030')
})