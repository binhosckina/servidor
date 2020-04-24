const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
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
        var produto = produtos.find(x => x.id == id)

        if (produto) {
            produto.quantidade = quantidade
            console.log(quantidade + 'x ' + produto.nome + ' adicionado');
            socket.emit('adicionarProduto', produto);
        } else {
            console.log('Produto não encontrado');
            socket.emit('produtoNaoEncontrado');
        }
    });
});

server.listen(3030, () => {
    console.log('listening on *:3030')
})

produtos = [
    { "id": 1, "nome": "Arroz", "valor": 3.40 },
    { "id": 2, "nome": "Feijão", "valor": 4.90 },
    { "id": 3, "nome": "Batata", "valor": 5.95 },
    { "id": 4, "nome": "Água", "valor": 2.10 },
    { "id": 5, "nome": "Carne", "valor": 40.05 },
    { "id": 6, "nome": "Cerveja", "valor": 4.50 },
    { "id": 7, "nome": "Tomate", "valor": 8.20 },
    { "id": 8, "nome": "Cebola", "valor": 1.99 },
    { "id": 9, "nome": "Pizza", "valor": 12.10 }
]