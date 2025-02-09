- 3 main components:
  Producer
  Message Broker (Event Stream)
  Consumer

- Advantages:
  decoupled
  dependency inversion
  horizontal scalability
  flexibility
  resilient (the consumer's event can happens offline)

- Disadvantages:
  Data consistency (delay to delivery data)
  Eventual consistency
  Duplicate messages
  Complexity

- 3 ways for Microservices communication:

1. API-
   Synchronous communication;
   Each component/service has it's own API and DB, where they communicate with each other through endpoints with HTTP requests;
   As with all HTTP request, it will introduce latency in the application, so we can use gRPC and compression to speed up the communication;

2. Message Broker -
   Asynchronous communication;
   Ex: Application needs to send an email, so it doens't need to by a synchronous request. As a result, it's simpler to put this request in a message queue. Then we will have a microservice responsible for listen to the message queue, picks the message from the queue and send the email.
   Tools: RabitMQ, Kafka, AWS SQS

3. Service Mesh -
   Discoverability and Reliability

- Message Queue Tools:
  Temporary storage and automatic Retry - make sure that you don't lose any event in case the consumer is offline.

- Motivos que geram acumulo na fila de mensageria:

1. Limites de throughput definidos no RabbitMQ. Fila configurada com TTL (time to live) pode descartar mensagens antes de serem processadas.
   Ex: limite de mensagens por segundo ou tamanho maximo da fila.
2. Multiplos Producers gerando eventos para a mesma fila, enquanto ha poucos Consumers alocado para esses eventos.
   Ex: Aplicacao com varios microservicos gerando logs no mesmo stream, mas apenas um Consumer processando.
3. Consumer offiline, travado ou com bug.
4. Lentidao no Message Broker (pode estar sobrecarregado devido a baixa capacidade de hardware ou configuracao inadequada).

- Producers gerando eventos mais rapido que os Consumers conseguem processar:

1. Alta frequencia de producao de eventos.
   Ex: ecommerece em promocao gerando milhares de pedidos.
2. Consumers possuem menos recursos alocados (CPU, memoria) ou nao sao escalaveis suficiente para picos de eventos.
   Ex: voce possui apenas 2 pods configurados para processar pagamentos.
3. Consumer aguardando resposta de outros servicos como DB ou API externa (latencia em processos downstream).
   Ex: Consumer que processa pagamento depende de um gateway de pagamento lento.

- Mitigando e corrigindo problema:

1. Escalar Consumers - Adicionar mais replicas de Pods para Consumers usando Horizontal Pod Autoscaling.
2. Priorizar Eventos - Configurar prioridades na fila para processar eventos criticos.
3. Revisar processos downstream - Grantir que dependencias externas (consumo de API ou DB) estao otimizadas para suportar a carga.
4. Configurar rate limits no Producer - Reduzir a frequencia de eventos gerado, caso a prioridade seja manter a fila vazia.
5. Monitoramento continumo - Usar ferramentas como Prometheus, Grafana ou o console do RabbitMQ/Kafka.
