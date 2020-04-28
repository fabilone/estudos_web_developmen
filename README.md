# Estudos WEB Development
Repositório para estudos de desenvolvimento WEB

Estudo 1 - NodeJS + MySQL

Integração de NodeJS e banco de dados MySQL

Primeira alternativa:
O arquivo src/create-table.js faz a conexão com o banco de dados, cria e povoa a tabela Clientes. Toda vez que as operações ocorrem com sucesso é exibida mensagens de log que confirmam a execução com sucesso. 

No diretório API encontra-se o arquivo index.js que funciona como uma pequena API e realiza as operações de: busca de usuários, delete de usuários, insert de usuários e update de usuários. Essas operações podem ocorrer atrávez da URL ou por meio do POSTMAN para forjar um comando.  

Segunda alternativa:
O arquivo routes2.js irá gerenciar nossas requisições POST e GET, que utilizaremos pra puxar ou inserir dados no nosso banco de dados. Será nesse arquivo também que faremos a conexão com o banco.

Terceira alternativa:
Datalhamento de cada uma das operações do CRUD usando MySQL.

Estudo 2 - Criando uma API NodeJS + MySQL

Criação de uma API de integração NodeJS com MySQL.

Instalações:
npm install --save express
npm install --save-dev nodemon
npm install -g nodemon
npm install --save morgan
npm install --save body-parser
npm install --save mysql
npm install --save multer


