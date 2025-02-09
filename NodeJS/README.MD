NodeJS is a javascript runtime environment (runntime environment is the environment where a program or application is executed)
It executes javascript outsite the browser. It does that by running the V8 enginne (core of Chrome) outside the browswer.
it's single thread application (js is single thread), so we run multiple nodejs processes (each server running in a different port), so we use a load balancer like Nginx, PM2 as process manager, Kubernets as container manager and AWS as cloud platform. (all of these are solutions for the load balance problem).
Threads are lighter than processes, faster to spin up and take less memory.
It allows to use npm ("Node Package Manager" which is the fastest way to use JS modules), and modules are basically a block of code that can do someting.
Frameworks for NodeJS can be ExpressJS and NestJS

asyncronous = handle concurrent requests (mean that a request doesnt need to be completed to the process keep going).

to avoid callback hell, use Promises or async/await (which is a Promise with a different sintax); dont use Promises and async/await in the same project because it will make the project complex.

NODE QUESTIONS

- What is NodeJS?
  It's a Javascript runtime environment that runs on the V8 engine and executes JS code outside the browser. It's not a framework; its more like the JVM from JAVA and the CLR from .NET (both are runtime environment)

- Which tools we can use to guarantee a consistent quality code?
  ESLint with style guides (Airbnb and/or Google style guide); apply clean code practices

- What is a Runtime Environment?
  Is the environment where a program or application is executed. It focuses on providing the necessary infrastructure for code execution, including services like memory management and I/O operations.

- What is the difference between req.params and req.query?
  basicaly req.params is the param in the URL and req.query is everything afther the question mark ("?") in the URL.

- What is body-parser and what does it do?
  It's a middleware npm package which takes the body of a POST request and transforms it in string to JSON.

- What security mechanisms are available in Node?
  The standard security module (Helmet);
  X-frame-options
  XSS Protection
  Strict transport security

- What are 7 main features of NodeJS?
  Single threaded; Asyncronous; Event-Driven; V8 Engine; Cross-platform; NPM; Real-time capabilities.

- Explain what is the Event Loop in NodeJS:
  is a mechanism that handles asynchronous operations. It allows Node to perform non-blocking I/O operations despite the fact that JavaScript is single-threaded.
  Phases of Event Loop:
  timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
  pending callbacks: executes callbacks for some system operations.
  idle, prepare: only used internally.
  poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
  check: setImmediate() callbacks are invoked here.
  close callbacks: some close callbacks, e.g. socket.on('close', ...).

- Why NodeJS is Single Threaded?
  It's better for web applications because it avoids deadlock issues, which happens with multi-thread applications.

- Tell me about asynchronous programming in NodeJS:
  The asynchronous flow can be achive by its single-thread, non-blocking and event-driven architecture.

- Difference between synchronous and asynchronous programming?
  In synchronous programming, tasks are executed one after another in a sequential manner; Each task must complete before the program moves to the next task; The execution of code is blocked until a task is finished; Synchronous operations can lead to blocking and unresponsiveness.
  In asynchronous programming, tasks can start, run and complete concurrently; It can be executed independently of each other; They are tipically non-blocking; It enables better concurrency and responsiveness.

- What are Events, Event Emitter, Event Queue, Event Loop and Event Driven?
  Events are signals that something has happended in a program;
  Event Emitter creates or emit events;
  Event Queue stores an event in a queue;
  Event Handler(Event Listener) is a function that responds to specific events;
  Event Loop picks up event from the event queue and executes them in the order they were added;
  Event Driven Architecture means that operations in Node are drive or based by events;

- When to use Node and not?
  Node is ideal for real time applications like chat and games (with web socket) and web apps due to its event driven architecture; It's excellent for building lightweight and scalable RESTful APIs that handle a large number or concurrent conections; It's great for build microservices-based architectures enabling modular and scalable systems;
  Avoid use Node for apps that involve heavy CPU processing (image/video, data encryption/decrpytion) due to it's single thread (for heavy computation multi-thread is better).

- What is the difference between function and module?
  A module is a concept that contains specific functionality that can be reused in the application; A JS file can be treated as a module.
  Function is a specific set of instructions within the module;
  Module can contains multiple functions.

- What are the types of modules in Node?
  Built-in Module (core modules already presented in the application). Ex: fs (file system), HTTP (HTTP server), path (path manipulation), util (utilities);
  Local modules (modules created by developers for specific functionalities)
  Third-party modules (external packages or libraries)

- What are the top 5 built in modules commonly used in Node projects? Explain each one and their functions.

  1. fs = provides a set of methods for interacting with the file system; fs.readFile(), fs.writeFile(), fs.appendFile(), fs.unlink(), fs.readdir(), fs.mkdir(), fs.rmdir();
  2. path = provides utilities for joining, resolving, parsing, formatting and manipulating paths; path.join(), path.parse(), path.resolve(), path.dirname(), path.extname();
  3. OS = provides a set of modules for interacting with the operating system; os.type(), os.userInfo(), os.totalmem(), os.freemem();
  4. events = used to handle events; EventEmitter(), on();
  5. http = can create an HTTP server that listens to server ports and gives a response back to the client; createServer(), listen()

- What are Template Engines in Express.js?
  Are libraries that enable developers to generate dynamic HTML content by combining static HTML templates with data. Ex: EJS (Embedded Javascript), Handlebars, Pug (formely Jade), Mustache, Nunjucks;

- What is Request Pipeline in Express?
  Is a series of middleware functions that handle incoming HTTP requests and pass control to the next function.

- What are middlewares and it types?
  Eh uma funcao intermediaria que processa requisicoes antes de chegarem a rota final.
  Pode acessar, modificar ou validar os objetos (req e res) e decide se o fluxo continua com o next()
  Usado para autenticacao, registro de logs, tratamento de erros etc.

1. Application-level middleware = applies globally to all incoming requests in the entire application;
2. Route-level middleware = applies only to specific routes, not for all incoming requests;
3. Error-handling middleware = used to manage errors that happens while handling incoming requests;
4. Built-in middleware = are built-in functions inside Express which provides common functionalities;
5. Third-party middleware = are modules developed by third-party developers (external libraries/packages). Ex: Helmet (setting HTTP security headers); Body-parser (parsing request bodies); Compression (compressing HTTP responses); Morgan...

- What are the advantages using a middleware?
  Modularity (smaller, self-contained units), reusability, improved request handling, flexibel control flow, use external libraries/code (third-party middleware)

- What is REST and Restful API?
  REST is Representational State Transfer is an architectural style for designing networked applications (is a set of guidelines for creating APIs);
  Restful API is a service which follow REST principles/guidelines;

- What are top 5 REST guidelines and the advantages of them?
  Separation of Client and Server (maintenance and scalability); Stateless (simplify implementation); Uniform Interface (standardized URL); Cacheable (improves performance); Layered System (modular design).

- Explain the concept of Idempotence in Restful APIS:
  it means perfoming an operation multiple times with the same outcome as performing it once. Ex: sending identical GET requests will always return the same response.

- What is CORS in Restful APIs?
  Cross-Origin Resource Sharing is a security feature implemented in web browsers that restricts web pages or scripts from making requests to a different domain;
  It can be removed by enabling CORS middleware in application;

- What is Serialization and Deserialization?
  Serialization is the process of converting an object into a format that can be stored, transmitted or reconstructured later (Ex: JSON). Use JSON.stringify() to serialize the object;
  Deserialization is the process of converting serialized data, such as binary/XML/JSON, back into an object. Use JSON.parse() to deserialize a JSON string;

- What are the types of Authentication?
  Basic Authentication, API Key Auth, Token-Based Auth (JWT), Multi-factor Auth, Certificate-based Auth;

- What are Error handling and how many ways to do it?
  Is the process of managing errors that occur during the execution of a program. There are 4 ways to implement it:
  Try-catch(sync); Error-first callbacks(async); Promises(async); Try-catch with async-await (async)

- How to Debug Node applications?
  Console.log(); Debugger statement; Node.js Inspector; VSCode Debugger; Chrome DevTools

- Você está desenvolvendo uma API RESTful com Node.js e TypeScript para calcular orçamentos de seguro. Essa API precisa ser performática, garantir segurança nas requisições e manipular dados sensíveis de clientes. Como você estruturaria essa API? Quais pacotes e práticas você utilizaria?
  Utilizar uma estrutura modular dividida em camadas: controllers, services, e repositories garantindo que a lógica de negócio, os endpoints e o acesso ao banco de dados estejam desacoplados.
  Implementar middlewares de segurança como o Helmet para proteção de cabeçalhos HTTP e rate-limiting para evitar ataques DDoS.
  Implementar caching com Redis para armazenar as respostas de endpoints frequentes.
  Adicionar logs detalhados para monitorar o comportamento da aplicação e configurar um horizontal pod autoscaling para garantir escalabilidade.
  Escrever testes unitários e de integração usando Jest ou Mocha, cobrindo as principais funcionalidades da API.
  A latência dos endpoints críticos sera reduzida em 40%, e a API ficou mais robusta para lidar com picos de tráfego.

- Explain about Streams:
  Streams are interfaces used to handle large amounts of data or continuous data flows.
  They process data in small chunks instead of loading everything into memory at once.
  Streams are useful for working with large files, data streaming, and real-time communication.

  - Types of Streams:
    Readable Stream: Reads data (ex: fs.createReadStream).
    Writable Stream: Writes data (ex: fs.createWriteStream).
    Duplex Stream: Reads and writes data simultaneously (ex: sockets).
    Transform Stream: Modifies or compresses data (ex: compression with zlib).
  - How Streams Work:
    Buffer Mode: Data is stored in small chunks and processed manually as needed.
    Flowing Mode: Data flows continuously and is processed as it becomes available.

- What are Clusters in Nodejs?
  The Cluster module enables the creation of child processes (also called workers) that run simultaneously. It uses cluster.fork()
  All created workers share the same server port.
  The cluster Module can be used to run multiple instances of Nodejs that can distribute workloads.
  The workers are created through a Cluster Master, which is only in charge of the workers, meaning that it doesn't execute the application neither handle incoming requests or read files (this is Worker responsability).
  It uses Round Robbin algorithm to apply load balance in the workers through the Cluster Master.
  Each worker gets its own Event Loop, Memory and V8 instance.
  We should only create as many workers as there are CPU cores on the machine the app is running.

- What are Worker threads in Nodejs?
  The worker threads module enables the use of threads that execute JS in parallel.
  Code executed in a worker thread runs in a seperated child process, preventing it from blocking your main application.
  The worker thread Module allows running multiple application threads within a single Nodejs instance.
  When process isolation is not needed (no separate instances of V8, memory, etc), we should use worker threads because the communication between threads are much more faster due to resource sharing.

- Explain about Thread Pool:
  Eh um conjunto de worker threads que sao reutilizaveis para executar multiplas tarefas.
  Executa operacoes bloqueantes, nao necessariamente sincronas (compressao em zlib, operacoes do file-system "fs", algumas conexaoes com DB) e por padrao o Node usa 4 threads na Thread Pool.
  O foco principal é manter o event loop livre para continuar lidando com tarefas não bloqueantes.
  Gerenciada pela biblioteca libuv.

- What are Process and the module child_process?
  Process is a instance in execution of Node environment. NodeJS is single-threaded meaning that it uses one main process to execute the code.
  The child_process module allows to create child processes to execute tasks in paralell to the main process. Usefull to process big files, complex tasks or OS commands.
  Benefits of child process: Paralelism, Performance, Scalability.

  - Main methods:
    spawn() - execute commands in a child process and keeps control of I/O
    exec() - execute commands in the shell and return the result as a callback
    fork() - create child process

  - Diferencas entre spwan() e exec():
    Spawn -
    Para executar comandos que produzem grandes quantidades de saída.
    Retorna um stream para processar os dados em tempo real.
    Mais eficiente, pois processa saída em chunks (streaming).
    Não usa callback; você trabalha diretamente com streams.
    Exec -
    Para executar comandos que produzem pouca saída ou comandos simples.
    Retorna o buffer completo contendo toda a saída do comando.
    Menos eficiente, pois armazena a saída inteira em memória antes de retornar.
    Usa callback para lidar com o resultado (saída e erro).

- What is EventEmitter?
  It's a class from Events Module in Nodejs used to create and listen to events.
  It applies the Observer Design Pattern.
  It works like a public/subscribe event where you emit the event and listen to it (execute a callback function).
  You must remember to remove the unecessary listeners such as removeListener or removeAllListeners to avoid memory leak.

  - Main methods:
    on(event, listener): Adiciona um listener para ouvir um evento.
    emit(event, [args]): Emite um evento, chamando todos os listeners associados.
    once(event, listener): Adiciona um listener que será executado apenas uma vez.
    removeListener(event, listener): Remove um listener de um evento.
    removeAllListeners([event]): Remove todos os listeners de um evento ou de todos os eventos.

- O que sao Promises?
  são uma abstração para gerenciar operações assíncronas no JS permitindo trabalhar com o resultado de uma tarefa futura. Possui 3 estados/parametros (pending, resolved, rejected) e voce utiliza then() para lidar com o sucesso e catch() para lidar com erros.

- Explain async/await:
  evita callback hell pois elimina encadeamentos complexos.
  Utiliza Promises de forma mais legível e direta, deixando o código mais parecido com síncrono, mas mantém o comportamento assíncrono.
  utiliza await para esperar a resposta de uma Promisse e try/catch para capturar errors, sendo mais intuitivo e natural.

- Caching in Nodejs:
  Improves performance and decrease latency

  1. In memory caching: stores frequently accessed data in the application's memory space.
     Ex: NodeCache
  2. Distributed cache: store cache data across multiple nodes.
     Instead of storage memory locally within the application, it distributes cache memory across a network of nodes.
     Benefits:
     Scalability - ensures cache handle increased loads and demands
     High Throughput - handles higher volume of requests simultaneously
     Availability - Even if one node goes down, the data can still be retrieved from other nodes
     Ex: Redis Cluster, Memcache
  3. CDN - static data
     Reduces load on origin server
     Improves user experience anywhere in the world
     Ex: Cloudflare
  4. Client-side caching- Cache on the hardware (L1, L2, L3 layers)
     Reduces need for repeated download
     Offline availability of resources
  5. Message Broker (Kafka) - Cache on disk
  6. Load balancer
  7. Elastic Search (full text search engine)
  8. Cache in the DB (WAL - Write ahead log, Bufferpool, Replication Log, Transaction Log)

- What are Buffers in Nodejs?
  chunk of memory allocated outside the V8 heap (intentionally limited in size, we cannot resize an allocated buffer).
  são áreas de armazenamento temporário na memória usadas para manipular dados binários brutos (raw binary data).
  armazenam pequenos pedaços de dados (chunks) em memória enquanto os dados estão sendo processados.
  são usados principalmente quando o fluxo de dados é maior do que a capacidade de processamento imediato.
  permitem trabalhar diretamente com dados que não estão no formato de strings, como arquivos, streams de vídeo, ou dados recebidos de redes.

- Explain me about Nestjs and the difference for Expressjs:
  Express eh um framework minimalista no qual voce pode estruturar o projeto como preferir. Baseado em funcoes e callbacks e requer mais esforco para escalar projetos grandes devido a falta de estrutura definida.
  NestJS eh um framework baseado em modulos, com uma arquitetura baseada no Angular, sendo organizado e escalavel, fazendo com que seja ideal para projetos grandes e complexos.
  Suporta programacao orienta a objetos e programacao funcional usando Design Patterns como injecao de dependencias.
  Eh escrito nativamente em Typescript e possui suporte a webSocket, GraphQL e Microservices.
  Utiliza Jest para testes.
  Conceitos e componentes:
  Modules - Onde os componentes sao registrados.
  Decorators - Funcoes especiais que adicionam metadados ou logica aos elementos da aplicacao.
  Controllers - Lidam com requisicoes HTTP e retornam a resposta ao cliente; Sao quem definem as rotas da aplicacao.
  Providers - Encapsulam a lógica de negócio ou integração com APIs/DB; Podem ser servicos ou repositorios.
  Depency Injection - Os Providers podem ser injetados em outras partes do codigo com o Decorator @Injectable(); Vantagens: Desacoplamento, facilidade para testes, escalabilidade e reutilizacao.
  Middleware - Funcionalidade executadas antes de entrar no Controller.
  Guards - Implementam a logica de autorizacao, protegendo rotas ou recursos.
  Interceptors - Interceptam req/res para adicionar logica antres ou depois da execucao de um metodo; Usados para log, cache etc.
  Pipes - Usados para transformar ou validar dados antes de serem processados pelo Controller.
  Route Handler -
  Exception filter - Gerenciam erros e excecoes lancados na aplicacao.

- Lidando com errors em NestJS:
  Exception filter para capturar e tratar erros de maneira personalizada.
  Validation Pipes para validar dados de entrada e lancar erros automaticamente.
  Global Filters para centralizar o tratamento de erros.
  Interceptors para manipular erros e respostas de maneira flexivel.
  Logger nativo do NestJS para monitoramento.

- Explain me what is a callback and callback hell:
  Eh uma funcao passada como argumento em outra funcao, no qual eh chamada depois que outra funcao termina sua tarefa.
  Sao utilizadas para trabalhar com tarefas assincronas e eventos.
  Callback hell ocorre quando voce tem varios callbacks aninhados, dificultando a leitura e manutencao do codigo.
  Utilizamos Promises ou async/await para evitar o callback hell.

- Why Nodejs uses V8 engine?
  High performance, Just in Time compilation, C++ and integration, open-source.
  V8 foi desenvolvida pelo Google com foco em desempenho, seguranca e JIT compilation. Isso permitiu que o JS pudesse ser executado com alto desempenho tambem no lado do servidor (com Nodejs).

- Publish/Subscribe:
  Similar ao Observer Pattern (publish = subject, subscrribe = observer) e consequentemente ao modulo Event (EventEmitter).
  A diferenca eh que o Publisher (subject) nao sabe quem sao os Subscribers (observers) e vice-versa (eh mais desacoplado que o Observer Pattern);
  Existe um Broker (intermediario) que atua como um correio, entregando mensagens de um para outro;
  Ou seja, não há conexão direta entre quem emite e quem escuta. O Broker gerencia essa comunicação. Isso torna o sistema mais flexível, especialmente em sistemas distribuídos.
  Ex: Um Publisher pode publicar em um tópico, e múltiplos Subscribers em diferentes partes da aplicação (ou até em diferentes servidores) podem reagir ao mesmo evento.
  Util para sistemas distribuidos como em servicos de microservicos que se comunicam via eventos (RabbitMQ Redis Pub/Sub, Kafka)

- O que sao Generators?
  Recurso do JS usado para implementar o comportamento do Iterator Design Pattern.
  Eh uma funcao que pode ser pausada e retomada em diferentes pontos durante sua execucao (diferentemente de uma funcao normal).
  Antes de ser introduzido async/await, os Generators eram usados para gerenciar fluxos assincronos em Promises.
  Util para trabalhar com grande volume de dados e Streams.
  Lidam com tarefas sincronas e asincronas.
  Componentes: function\*, yield, next(), done.

- O que eh o Reactor Pattern:
  Eh a base do funcionamento do Node, no qual lida com tarefas I/O.
  Eh implementado atraves do Event Loop.
  Usa o mecanismo Event Demultiplexer, implementado pela libuv.
  Similar ao Observer Pattern.

- Design Patterns:
  Solucoes reutilizaveis para problemas comuns no desenvolvimento de software.
  Facilita a implementação de funcionalidades como autenticação, cache e rotas.

  1. Creational

     - Singleton:
       Garante que apenas uma instancia de um objeto seja criada e compartilhada.
       Util quando precisa-se de um unico ponto de controle.
       Ex: Conexao com DB, configuracoes globais, gerenciadores de cache...

     - Factory:
       Fornece uma interface para criar objetos sem especificar a classe exata que sera instanciada.
       Em vez de usar o "new" diretamente, delega-se a criacao do objeto para o metodo factory()
       Util quando precisa-se criar um objeto que compartilha uma logica comum mas possui variacoes;
       Util quando o tipo exato do objeto a ser criado eh determinado em tempo de execucao;

     - Builder:
       Usado para criar objetos complexos passo a passo.
       Em vez de instanciar diretamente o objeto com um construtor complicado, você usa um "builder" para construir o objeto gradualmente.
       Beneficios: Manutencao, Organizacao, Reutilizacao.

  2. Structural

     - Proxy:
       Age como um substituto ou intermediario para outro objeto, controlando o acesso a ele.
       Util para melhorar desempenho (cache ou lazy loading), seguranca (protege de acessos indevidos) e para introduzir funcionalidades adicionais (loggin, autenticacao).

     - Decorator:
       Permite adicionar novas funcionalidades extras a um objeto de forma dinamica, sem modificar a estrutura original.
       Em vez de alterar a classe base ou criar subclasses, voce "decora" o objeto com as novas funcionalidades.
       Basicamente voce herda/estende as funcionalidades da instancia da classe base.
       Util quando eh inviavel utilizar heranca de uma classe base ou nao quer modificar a classe base.
       Beneficios: Flexibilidade, clean code, reutilizacao.

     - Adapter:
       Funciona como um "tradutor" entre duas interfaces incompativeis.
       Converte a interface de uma classe em outra interface esperada pelo cliente.
       Util para integrar com APIs ou bibliotecas externas que possuem uma interface diferente; tambem quando se esta migrando sistemas ou para integrar codigo legado.
       Beneficios: reuso de codigo, isolamento de mudancas, facilidade de integracao.

  3. Behavioral

     - Strategy:
       Promove o principio Open/Close (aberto para extensao e fechado para modificacao).
       Voce cria strategies (classes individuais) que implementam variações de comportamento.
       Voce cria um contexto (classe principal) que ira encapsular a strategy escolhida.
       Por fim, voce utiliza a instancia do strategy desejado como parametro para o contexto.
       Isso faz com que seja possivel mudar de estrategia em tempo de execucao.
       Faz com que evite o uso de condicionais (if-else ou switch).
       Beneficios: Flexibilidade, Organizacao, Reutilizacao.

     - State:
       Permite que um objeto altere seu comportamento quando seu estado interno muda.
       Organiza o codigo separando os diferentes estados do objeto em classes distintas.
       Substitui longas condicionais (if-else, switch-case).
       Beneficios: Organizacao, Extensibilidade, Isolamento, Manutenabilidade.

     - Template:
       Define a estrutura geral de um algoritmo em uma classe base (ou abstrata) e delega algumas etapas específicas para as subclasses.
       útil quando você deseja reutilizar o fluxo geral de um algoritmo, mas permite que algumas partes sejam personalizadas pelas subclasses.
       Beneficios: Reutilizacao, Flexibilidade, Organizacao.
       Desvantagens: Depencencia de herancas, rigidez para mudancas.

     - Iterator:
       Fornece uma maneira de acessar elementos de uma coleção (array, lista ou conjunto) sequencialmente, sem expor os detalhes internos dessa coleção.
       JS ja implementa iterator em estruturas como arrays e maps via o protocolo Iterable (Ex: Symbol.iterator)
       Beneficios: Encapsulamento, consistencia, flexibilidade.

     - Observer:
       Um objeto (subject) mantem uma lista de dependentes (observers) e os notifica automaticamente sempre que ocorrem mudancas de estado (events).
       O module Events eh uma aplicacao direta do Observer Pattern (EventEmitter = subject; Callbacks = observers)
       Util em aplicacoes que lidam com eventos.
       Util quando voce precisa que varias partes do sistema sejam notificadas a respeito de uma mudanca.
       Util para implementar logica de publish/subscribe onde objetos podem "se inscrever" para receber updates.
       Ex: um servidor que precisa avisar varios clientes conectados sempre que uma mensagem eh enviada.
       Beneficios: Desacoplamento, reatividade, flexibilidade.

- O que eh Rate Limiting?
  Tecnica utilizada para controlar a quantidade de requisicoes que um cliente pode fazer a um servidor.
  Tem como objetivo proteger contra ataques de forca bruta e DDoS.
  Em sistemas distribuidos, o Redis compartilha o estado do rate-limiting entre as instancias do server.

- Me fale sobre testes no Node:
  Oferece vários tipos de teste, como unitários, integração, end-to-end e stress test. No NestJS, o Jest é a escolha padrão devido à sua integração nativa e facilidade para criar mocks e configurar módulos de teste. Eu priorizaria testes unitários para isolar componentes críticos e usaria testes de integração para verificar a comunicação entre módulos. Também configuraria pipelines CI/CD para automatizar os testes, garantindo qualidade contínua do código.

- OWASP Top 10:
  lista as 10 vulnerabilidades mais criticas em aplicacoes web.

  1. Broken Access Control - Permite que usuários obtenham permissões indevidas, como acessar dados de outros usuários ou funções administrativas.
     Ex: Um usuário consegue alterar seu nível de acesso de "cliente" para "admin" manipulando um parâmetro em uma URL.
     Como mitigar: Use validações no servidor.
  2. Cryptographic failures - Dados sensíveis, como senhas ou informações financeiras, não estão protegidos adequadamente.
     Ex: Senhas armazenadas em texto simples no banco de dados.
     Como mitigar: Algoritmos de hash seguro (bcrypt), implemente HTTPS e evite algoritmos criptográficos obsoletos.
  3. SQL Injection - Dados não validados são usados diretamente em consultas ou comandos, permitindo ataqueS.
     Ex: Um atacker insere ' OR '1'='1 em um campo de login, obtendo acesso.
     Como mitigar: Evite concatenar strings em comandos, sempre valide entradas (Scheme validation) e utilize consultas parametrizadas.
  4. Insecure Design - Falta de princípios de segurança na arquitetura ou design da aplicação.
     Ex: Permitir uploads de arquivos sem validações adequadas, possibilitando execução de scripts maliciosos.
     Como mitigar: Adote princípios de segurança desde o início (Secure by Design).
  5. Security Misconfiguration - Configurações padrão ou incorretas que expõem a aplicação a ataques.
     Ex: Página de administração acessível publicamente sem autenticação.
     Como mitigar: Desative recursos desnecessários, atualize softwares regularmente e use ferramentas de verificação de segurança; Aplique rate-limiting corretamente.
  6. Vulnerable and Outdated Components - Uso de bibliotecas ou pacotes desatualizados com vulnerabilidades conhecidas.
     Como mitigar: Monitore pacotes com ferramentas como Dependabot, Snyk ou npm audit, e atualize dependências frequentemente.
  7. Identification and Authentication Failures - Falhas em mecanismos de autenticação permitem ataques como brute force ou sequestro de sessões.
     Ex: Tokens JWT sem expiração ou protegidos inadequadamente.
     Como mitigar: Use autenticação multifator (MFA), tokens de expiração e proteja sessões com cookies seguros.
  8. Software and Data Integrity Failures - Aplicações confiam em pacotes, plugins ou módulos de fontes não confiáveis.
     Como mitigar: Use assinaturas digitais para verificar a integridade dos pacotes e dependa de repositórios confiáveis.
  9. Security Logging and Monitoring Failures - Falta de logs ou monitoramento adequado dificulta a identificação de ataques.
     Como mitigar: Implemente logs detalhados e use ferramentas como ELK Stack ou Splunk para monitoramento em tempo real.
  10. Server-Side Request Forgery (SSRF) - O servidor é induzido a fazer requisições para destinos não autorizados.
      Como mitigar: Valide URLs antes de enviar requisições e limite os endereços IP acessíveis.

  Como aplicar OWASP no dia a dia:

  1. Implemente validacoes de entrada (input validations).
  2. Use jsonwebtoken para criar tokens JWT seguros e expiraveis; Configure cookies com flags como HttpOnly e Secure.
  3. Configurar seguranca no CORS (especifique origens confiaveis).
  4. Auditoria regulares (ferramentas como npm audit).
  5. Monitoramento e logging (use ferramentas de log).

- Improve performance and scaling an application:

1. Read heavy systems:
   Use Cache (tools like Memecache and Redis);
   Challenge of Cache is to sync it with the DB and manage cache expiration; For that we can use strategies such as TTL (time to live) and Keys.

2. High write traffic:
   Use an event driven architecture with a Message Broker (Apache Kafka, Redis Pub/Sub, RabbitMQ) and worker processes.

3. Single point of failure:
   Solve this with redundancy and failover
   Implement DB replication with replica instances
   Use Kubernetes for that.

4. High availability:
   Use a Load Balancer (it distributes traffic across mulitple servers)
   For DB we have a primary (for write) and replicas (for read), so if the primary fails, a replica can take over

5. High latency:
   Use CDN for static data and Edge computing (cache) for dinamic data.

6. Handling large files:
   Use Streams and different kinds of storage (block and object storage).

7. Monitoring and alerting:
   Use tools such as Prometheus (to collect logs and metrics) and Grafana (for visualization)

8. Slow DB Queries:
   Indexes the table
   Sharding - Split the DB across multiple machines
   Composite index (apply in a group of columns) - its a non-cluster index

- GraphQL Components:

1. Schema - Define os tipos de dados, relações entre eles e as operações que podem ser executadas.
2. Query - Usadas para buscar dados (cliente especifica exatamente os campos que deseja, evitando over-fetching ou.under-fetching).
3. Mutation - Usadas para criar, atualizar ou deletar dados.
4. Resolver - funções responsáveis por conectar o schema à fonte de dados.
5. Types - Define os tipos de dados que a API suporta (string, int, float, bool...)
6. Subscription - Permite atualizações em tempo real com base em eventos.

- Backend interview:
  Dinamic and low cost operation
  MongoDB provides Sharding (horizontal scale the DB)
  Separeted performance test environment on AWS
  multiple replicas of read DB and the primary DB (write)
  dinamic scalability with kubernetes and AWS lambda
  deploy load balancers
