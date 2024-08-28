const express = require('express') //Importa o módulo Express

//Define uma clase para organizar a lógica da aplicação
class AppController{

    constructor(){
        this.express = express();//Cria uma nova instância do Express dentro da classe
        this.middlewares();//Chama o método middlewares para configurar os middlewares
        this.routes();//Chama o método routes para definir as rotas da Api
    }
    middlewares(){
        //Permitir que a aplicação receba dados em formato JSON nas requisições 
        this.express.use(express.json());
    }

    //Define as rotas da nossa API
    routes(){
        const users = [];
        this.express.post("/users",(req,res)=>{
            const {id,nome,email,senha} = req.body
            users.push({id,nome,email,senha});
            res.status(200).send({message:"Usuário cadastrado com sucesso"})
        });

       
        this.express.post("/auth",(req,res)=>{
            const {email,senha} = req.body
            const user = users.find((user) => user.email == email && user.senha == senha);
            if(user){
                res.status(200).send({message: "Autenticação bem sucedida"});
            }
            else{
                res.status(400).send({message:"Falha na autenticação"});
            }
         });
           
        
        //Define uma rota GET para o caminho health
        this.express.get("/health/" ,(req, res) => {
            res.send({ status: "OK", nome:"Ana" });
        });//Essa rota é usada para verificar se a API está OK
    }
}

//Exportando a instância de Express configurada, para que seja acessada em outros arquivos
module.exports = new AppController().express;