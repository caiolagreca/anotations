What is?
Solution to deploy, manage and scale complex distributed applications

Kubernetes Components:

- Pod:
  smallest deployable unit of kubernetes (its an abstraction layer over a container)
  you can run multiple containers inside a Pod, but it's common to run one application per Pod
  each Pod gets its own IP Address
  Pods are ephemeral (can die very easy) so everytime this happens a new IP Address is assigned

- Services:
  It has permanent IP Address and a stable DNS
  Lifecycle of Pod and Service are not connected
  Pods communicate with each other using the Service
  The service knows which pods it must do the connection through the label selector
  You specify the type of Service on creation (Internal Service is the default type)
  Its a load balancer (it will catch the request and foward it to a Pod that is least busy)
  Service Types:

  1. ClusterIP (Default, is an internal Service)

  2. NodePort = Tipo de Service que permite expor uma aplicação fora do cluster Kubernetes, acessando-a através de uma porta estática em cada nó (máquina) do cluster. (external Service, it creates a range of cluster's port); A porta NodePort está dentro de um intervalo específico (geralmente 30000-32767)

  3. LoadBalancer (external)

  4. ExternalName (redirect to a external DNS)

- Ingress:
  Route traffic into cluster
  It acesses a reverse proxy (load balancer)
  External connection between the Nodes and the external requests.
  Ex: nginx, haproxy, traefik ,AWS ALB

  - Ingress Controller:
    Monitors and create the necessary Ingress resources
    One cluster can have more than one Ingress controller

  - Ingress Resources:
    Defines which Ingress Controller to use
    Defines the URL Path and corresponding backend service

- ConfigMap:
  External configuration of the Pods
  It's used for non-confidental data only

- Secret:
  Its like ConfigMap but used to store secret data (ex: credentials)
  it doesnt store data in Plain text, but in base64 encoded
  Use it as environment variables or as a properties file

- Volumes:
  Kuberenetes doesnt manage data persistance, so the Volumes attaches an external HD to the Pods.
  Storage on local machine (on the same server Node) or remote (outside the k8 cluster)
  With Volume, when the Pod is restarted, all the data is persisted

- Node:
  Virtual or physical architecture
  We replicate multiples Nodes (the replicas are connected to the same Service)

- Deployment:
  Define blueprint for Pods
  Specify how many replicas you want to have for each Node
  Ideal for stateless server (like a web server)
  It's an abstraction of Pods

- StatefulSet:
  DB can't be replicate via Deployment (because DB has state/data), so that's the purpose of StatefulSet
  So StatefulSet is used for stateFULL apps or Databases.
  DB are often hosted outside of K8 cluster

- Kubelet:
  kubernetes process that makes it possible for the cluster to communicate to each other.

- Cluster

- Kubectl:
  Command-line tool for K8 cluster

- Minikube
  Is one Node Cluster where the Master processes and the Worker processes run on the same machine. Used when you want to dev on local machine and doesn't have enough resourcer (memory, CPU...)

- Labels:
  são usadas para identificar e categorizar recursos. Elas permitem que os Services selecione pods específicos para gerenciar. Exemplo: usamos labels app: backend e app: frontend para garantir que cada Service roteasse tráfego para o grupo correto de pods

- Namespace:
  Cria um isolamento lógico, como se fosse um cluster virtual. Ele separa recursos, políticas e restrições (constraints), garantindo que pods e serviços de um Namespace só se comuniquem entre si. Isso melhora a organização, economiza tempo e recursos, e facilita o gerenciamento de múltiplos ambientes

Benefits:
Self-healing = If a container crashes due to any reason, K8 will automatically replace it
Automated rollbacks = It updates the application and provide rollback changes without disrupting user activities
Disaster recovery (backup and restore)
Horizontal scaling = it scales up and down the number of container instances based on resource utilisation
High-availability = helps the application to keep accessible with minimal interruption (no downtime)
Cloud Portability = Deployment and management of application in Cloud, On-Premise or Hybrid

Drawback:
Complexity
Costs = requires many nodes for resiliency and safety; manages resource allocation...

Kubernetes Architecture:

1. Control Plane (master node):
   Serves as the command centre (manages the entiry cluster's operation)
   Where important processes are running
   much more important than the Worker Node (so you must have a backup of the master node in production environment)

   Components:
   API Server - Entrypoint to K8 cluster (its a process and also a containner); It handle requests (REST APIs) from the users and components through Kubernetes CLI (kubectl) and other APIs; Act as a front end for the etcd datastore, persisting cluster state.

   Scheduler - Decides on which Node a new Pod should be scheduled (ensures Pod replacement); It decides where to deploy pods in the cluster but it doesn't actually do it.

   etcd - Distributed key-value store that serves as kubernetes primary datastore (it has all the configuration and data of each Node and hold the current status of any k8 component); It replicates data across a cluster of etcd nodes, providing tolerance and high availability

   Controller-Manager - It runs controller processes that monitor the state of the cluster and respond to changes. It basically keeps track of whats happening in the cluster; It maintains the desired number of Pods replicas; It combines Services and Pods populating the Endpoint objects.

   Cloud controller-manager (optional) - In cloud-based kubernetes installation, this component integrates with cloud APIs to manage external resources like load balancers and storage volumes

2. Worker Node:
   Receives instructions from the Master Node and manages local execution of workloads
   Responsible for running the containners of application
   Each worker runs a process called Kubelet
   Higher workload
   Much bigger and more resources

   Components:
   Pods -

   Container runtime Interface (CRI) - Interface communication between the kubelet and the container runtime, defining how containers are managed within Pods. Ex: Container-d, cri-o, docker

   Container Network Interface (CNI) - Interface specifying how networks plugins interact with container runtime to provide networking for Pods in a K8 cluster. Ex: Flannel, Calico, Amazon NPC CNI

   Container Storage Interface (CSI) - Interface enabling K8 to work with various storage systems and drivers for persistent storage volumes attached to Pods. Ex: Rook, AWS EBS Driver

   Kubelet - It creates the Pods decided by the Scheduler into the Worker Node; It listens for pod instructions from the Control Plane (kube-apiServer); It ensures containers within Pods are running and healthy.

   Kube-proxy - Responsible for routing traffic, network proxying and load balacing, ensuring communication between services and external traffic to the correct Pods.

3. Virtual Network:
   Creates one unified machine (it turns all the Nodes inside of a cluster into one machine)

Market options:
Amazon EKS
Google Kubernetes Engine
Azure Kubernetes Service (AKS)

Production Cluster Setup:
Multiple Master (Control Plane) and Worker Nodes
Separate virtual or virtual machines

Horizontal Pod Autoscaling (HPA):
Is a control loop that keep monitoring the resource usage of an application and automatically adjusts the number of replica Pods (increase or decrease) to maintain a desired level of utilization. Resources can be CPU, memory, etc.

Rolling Update:
It's a mechanism to update the Pods gradually, without causing downtime in the application.
It creates the new updated Pods; As soon the new Pods are ready, it removes the old ones; The process keep going until all the old Pods be replaced by the new ones.
Use rolling update always that you need to update something in the Cluster and need to avoid downtime. Ex: update image container, change resources metrics, change environment variables...
O Rolling Update ocorre de forma automática no Kubernetes, mas é necessário que você esteja usando um Deployment como controlador dos pods. Quando você faz alterações no arquivo YAML do Deployment e reaplica com kubectl apply -f, o Kubernetes automaticamente inicia o processo de rolling update para substituir os pods gradualmente.

Rollback:
Eh a reversão para uma versão anterior do Deployment, feita com o comando kubectl rollout undo;
Ele restaura a configuração funcional anterior, sem a necessidade de modificar o arquivo YAML imediatamente.

Significado Termo Workload:
Refere-se a qualquer aplicação ou serviço que está sendo executado no cluster. Em outras palavras, é a carga de trabalho que o cluster está processando. Pode ser uma aplicação web, um banco de dados, uma API, ou qualquer outro serviço que você deseje executar em contêineres.
Tipos: Pods, Deployments, StatefulSets, DaemonSets, Jobs e CronJobs, cada um adequado para diferentes necessidades.

- Helm:
  Gerenciador de pacotes para Kubernetes. Ele facilita a instalação, configuração e gerenciamento de aplicações Kubernetes complexas por meio de pacotes chamados "charts".

  - Conceitos:
    - Charts:
      Sao colecoes pre configuradas de recursos k8s
      Facilitam a implantacao de aplicacoes completas com apenas um comando
      Incluem arquivos YAML que definem deployment, services, ingress etc
      Podem aceitar input parameters
    - Releases:
      Instancias de um Chart que foram isntaladas em um cluster
      Permitem multiplas versoes de uma aplicacao coexistirem em um mesmo cluster
    - Repositorie:
      Locais onde os Charts sao armazenados e distribuidos
      Facilitar o compartilhamento e reutilziacao de charts entre diferentes users

- Metrics Server:
  Responsável por coletar métricas de uso de recursos (como CPU e memória) das instâncias de pods e nós no cluster. Essas métricas são essenciais para funcionalidades como Horizonta Pod Autoscaler (HPA), que ajusta automaticamente o número de réplicas de pods com base na demanda.

  - Utilidade:
    Coleta dados sobre consumo de CPU e memoria dos pods e nodes.
    Fornece metrica em tempo real para escalonamento e monitoramento.
    Permite que o HPA ajuste automaticamente o numero de replicas de um deployment ou replicaSet com base nas metricas de uso. Sem o Metrics Server, o HPA não consegue obter as informações necessárias sobre o uso de recursos, tornando-o inútil para escalonamento automático baseado em métricas.

- Vertical Pod Autoscaler:
  Nao utilize em producao pois reinicializa os Pods!
  Ajusta automaticamente os recursos (CPU e memória) alocados para os containers dentro dos pods existentes.
  Aplica mudanças nos requests e limits de recursos dos pods para otimizar o desempenho.
  Pode conflitar com HPA se ambos ajustarem CPU (nao devem ser usados juntos).
  Usado em DB, aplicacoes que mantem estado, processamento de dados intensivo...

- Addons:
  Sao componentes adicionais que expandem as funcionalidades basicas do Kubernetes (nao fazem parte do nucleo do k8s).

  - Sao essenciais para operacoes avancadas, monitoramento, seguranca:
    Adicionam capacidades como Load Balance, gerenciamento de DNS, monitoramento, logging;
    Simplifica tarefas administrativas e operacionais;
    Exemplos: CoreDNS, kube-proxy, Ingress Controller, kubernetes dashboard, Metrics Server, Prometheus e Grafana.

- Prometheus:
  Sistema de monitoramentoque coleta e armazena metricas, tendo como foco a observabilidade para entender o estado e desempenho da aplicacao.

  - Arquitetura:

  1. Data Model:
     Metricas - Dados numericos que a ferramenta coleta;
     Time Series - Cda metrica eh armazenada com um timestamp;
  2. Scraping (coleta de dados):
     Pull Model - Geralmente os sistemas de monitoramento utilizam o modelo "push", no quial os agentes enviam dados para o servidor (Prometheus). Porem o Prometheus trabalha no modelo "pull", o que significa que o servidor faz periodicamente requisicoes HTTP para os endpoints das aplicacoes ou servicos (targets) para coletar as metricas.
     Exporters - Nem todos os sistemas expoem metricas no formato que o Prometheus entende. Assim, os Exporters sao utilizados para traduzir dados de sistema externos (DB, servidores ou hardwares) para o formato que o Prometheus pdoe coletar.
  3. Storage:
     DB de series temporais - Armazena os dados coletados localmente em um DB otimizado, permitindo consultas eficientes mesmo em grande volume de dados historicos.
     Retencao e compactacao - Os dados sao retidos por um periodo configuravel, e para reduzir o espaco de armazenamento, ele realiza operacoes de compactacao das series temporais.
  4. Querying:
     PromQL (Prometheus Query Language) - Linguagem de consulta que permite extrair e manipular os dados armazenados. Com ela eh possivel calcular taxas, somas, medias, etc..
  5. Alerting:
     Alertmanager - Responsavel por gerenciar os alertas com base em regras definidas. Silencia, roteia e envia notificacoes para diferentes canais (slack, email, etc).
     Regras de alerta - Voce configura as regras que determinam quando um alerta deve ser disparado (Ex: quando a taxa de erro de um API ultrapassa um certo limiar).
  6. Visualizacao:
     Integracao com Grafana - Eh comum utilizar Grafana para dashboards de monitoramento mais elaborados.

- Grafana:
  Ferramenta que possibilita criar dashboards customizaveis para monitoramento. Se conecta a varias fontes de dados como Prometheus, Elastricsearch, PostgreSQL... Permitindo visualizacao integrada de metricas, logs e outros dados importantes.
  Permite criar dashboards com graficos, mapas de calor, tabelas, medidores, etc de maneira facil e intuitiva.
  Basicamente o Prometheus eh o sistema de monitoramento que coleta e armazena as metricas, e o Grafana eh utilizado para visualizar essas metricas.

  grafana password: x8iwvAwdzs9AfTb3bCWvvId7AySvcqH5Qielp6Rc

- LENS:
  Ferramenta de interface grafica para o k8s, permitindo ao usuario visualizar os clusters sem a necessidade de utilizar CLIs.
  Possui informacoes do cluster, como status dos Nodes, Pods, Services, Logs etc.
  Facilita a criacao, modificacao e exclusao de objetos no k8s.

- Open Telemetry:
  Conjunto de ferramentas open source que facilita a instrumentacao de aplicacoes para a coleta de dados de observability, como rastreamento (tracing), metricas (metrics) e logs.
  Ex de uso: os dados sao instrumentados pelo OpenTelemetry e depois sao enviados para diferentes ferramentas como Grafana, Prometheus, ClodWatch, correlacionando diferentes tipos de dados.

- Principais tipos de dados para observabilidade:

1. Metrics:
   Dados quantitativos que medem o desempenho ou comportamento de um sistema ao longo do tempo;
   Sao expressos em numeros, coletados em intervalos de tempo e podem ser agregados (media, soma, maximo...);
   Ideais para dashboards e podem ser usados para definir alarmes;

   - Exemplos:
     Numero de requisicoes por segundo
     Utilizacao de CPU e memoria
     Latencia (tempo medio de resposta de uma API)

2. Trace (rastreamento distribuido):
   Acompanha a jornada de uma requisicao ou transacao atraves de multiplos servicos e componentes de um sistema distribuido. Cada passo dessa jornada eh registrado como um "span" que contem informacoes sobre o tempo gasto em cada etapa;
   Permite entender a sequencia de chamadas entre servicos para identificar pontos de falha ou lentidao;
   Ferramentas: AWS X-Ray, OpenTelemetry, Jaeger, Zipkin;

   - Exemplos:
     Rastreamento de uma requisicao - Em uma arquitetura de microservicos, uma requisicao do user passa por um servico de autenticacao, servico de catalogo, e um servico de pagamento. Cada etapa eh regsitrada para que se veja onde ocorreram atrasos ou falhas;
     Se um servico especifico estiver demorando muioto, os traces identificam esse ponto de latencia;

3. Logs:
   Registros em texto detalhados de eventos gerados por aplicacoes e sistemas;
   Contem informacoes sobre erro, aviso, status de operacao...
   Correlacionam-se com traces para entender a falha;
   Ferramentas: ELK Stack (Elasticsearch, Logstash e Kibana), Fluentd, Cloudwatch Logs;

   - Exemplos:
     Erros e excecoes
     Informacoes de depuracao
     Eventos operacionais

- Service Mesh:
  Camada de infraestrutura dedicada a comunicacao entre os servicos de uma aplicacao distribuida. Eh como uma malha que intercepta a comunicacao de redes entre os servicos e as gerencia, sem que os proprios servicos se preocupem com roteamento, seguranca, load balance, observability...
  A maneira mais comum de implementar um Service Mesh eh injetando um proxy ao lado de cada pod. Esse padrao eh chamado de sidecar, no qual age como um intermediario entre o servico e a rede, interceptando toda a comunicacao.

  - Componentes:
    1. Data Plane - Sao os proxies (sidecars) que sao injetados a cada servico. Os proxies interceptam todas as requisicoes dos servicos, aplicando politicas de rede, seguranca e observabilidade. Em k8s, o proxie eh um container que fica junto a outros containers dentro do mesmo pod (esse eh um exemplo de quando temos mais de um container no mesmo pod).
    2. Control Plane - Eh o cerebro do service mesh, gerenciando a configuracao, politicas e a distribuicao dessas regras para os proxies do Data Plane. Permite definir regras de roteamento, autenticacao mutua (mTLS), limites de taxa...

- Kubernetes Network Policy:
  Sao regras que definimos para controlar o trafego de rede entre os pods dentro de um cluster.
  Permitem que especifiquemos quais pods podem se comunicar com quais outros pods, tanto para trafego de entrada (ingress) quanto para trafego de saida (egress).
  Restringe o acesso - Permite que somente determinados pods se comuniquem com outros especificos;
  Aumenta a seguranca - Impede que servicos nao autorizados acessem dados ou funcionalidades de outros servicos;
  Controla o fluxo de trafego - Define regras para entrada e saida dosp pods.
  As regras sao baseadas em labels e quando ciramos uma NetworkPolicy, ela usa sleectors para identificar quais pods serao afetados e quais os pods ou namespaces que tem permissao para se comunicar com eles.
  Pod selector - conjunto de labels que identifica os pods a que a politica se aplica;
  Namespace selector - seleciona pods com base nos labels atribuidos ao namespace;

- EKS Worker X EKS Fargate:

1. EKS Worker:
   Control Plane runs on EKS
   Worker Node runs on EC2; user need to manage Nodes
   Pods can be exposed using Services (Load Balancer) and Ingress
   DeamonSets are supported and used heavily
   Able to run stateful apps (using EFS)
   Wide range of workload dependant EC2 selection (ex: GPU)
   Can work in public and private subnet

2. EKS Fargate:
   Control Plane runs on EKS
   No worker nodes requires; much less management overhead
   Classic and NLBs not supporte; Pods can be exposed using Ingress
   DeamonSets are not supported; Need to run as Sidecar
   Stateful apps not recommended
   Can't select workload specific underlying hardware, no GPU; max pod size 4vCPU and 30Gb memory per pod
   Only works in private subnet

- Subnets:
  Imagine uma rede grande como uma cidade inteira. Para organizar o trafego e seguranca, a cidade eh dividida em bairros.
  A cidade eh o VPC (Virtual Private Cloud) e os bairros sao as subnets.
  Cada subnet tem um conjunto de IP address e pode abrigar recursos como EC2, DB, etc.
  Atraves da subnet eh possivel aplicar politicas de seguranca e controle de trafego (ex: isolar recursos publicos dos privados).
  Distribui os recursos de forma mais organizada
  Permite definir quais recursos podem ou nao ser acessados diretamente da internet.

  1. Public subnet:
     Possui uma rota (no route table) para um Internet Gateway (IGW). Esse IGW conecta a VPC com a internet.
     Os recursos que estao em subnets publicas podem se comunicar diretamente com a internet (desde que o security groups permita a comunicacao).
     Ex: Instancias que precisam receber trafego da internet como servidor web, load balancer, jump boxes...
     Uma instancia com um endereco IP publico em uma subnet publica pode enviar e receber trafego direto da internet.

  2. Private subnet:
     Nao possui uma rota direta para o Internet Gateway.
     Para acessar a internet, os recursos precisam passar por uma instancia NAT (Network Adress Translation) ou um NAT Gateway que fica em uma subnet publica.
     Ex: Bancos de dado, servidores de aplicacao e outros recursos que nao devem ser acessados diretamente a internet, aumentando a seguranca.
     Uma instancia em uma subnet privada pode acessar a internet para atualizacoes ou downloads, mas o trafego sai com o endereco IP do NAT Gateway e a instancia nao eh acessada diretamente pela internet.

     

- Ways of cost optimization:

1. Sizing:
   Utilize pods requests, limits, resouce quotas1
   Use open source tools = rsg (right size guide), kubecost, Kubernetes Resource Report, Goldilocks
   Or use third-party tools = kubecost, New Relic, CloudHealth

2. Auto Scaling:
   Once pods are optimized, enable auto scaling
   Utilize HPA, Cluster Autoscaling, Proportional Autoscaling

3. Down Scaling:
   Terminate pods unnecessary during nights, weekends
   Utilize DevOps

4. EC2 Purchase Options:
   Use RI, Spot, Savings Plan

commands:

```bash
#verify if kubectl is installed:
kubectl version --client

#check k8s clusters and nodes:
kubectl get all

#check nodes:
kubectl get nodes

#deploy a yaml file:
kubectl apply -f <file_name.yaml>

#delete a yaml file:
kubnectl delete -f <file_name.yaml>

#monitor real time changes in replicaSet:
kubectl get rs --watch

#check deployment | service | replicaSet | pods | nodes | HPA:
kubectl get deployment
kubectl get service
kubectl get rs
kubectl get pods
kubectl get nodes
kubectl get hpa

#describe deployment | service | replicaSet | pods | nodes:
kubectl describe deployment
kubectl describe service
kubectl describe rs
kubectl describe pods
kubectl describe pods
kubectl describe nodes

#delete deployment | service | replicaSet | pod | node:
kubectl delete deployment <depoyment_name>
kubectl delete service <service_name>
kubectl delete rs <rs_name>
kubectl delete pod <pod_name>
kubectl delete node <node_name>

#to get the IP of the pods and the IP of the EC2:
kubectl get pods -o wide

#check logs of the pod:
kubectl logs <pod_name> -n <namespace_name>

#verify which cluster is configured:
kubectl config view

#create a namespace:
kubectl create namespace <namespace_name>

#to see the label of a namespace:
kubectl describe namespace <namespace_name>

#check cluster in EKS
eksctl get cluster

#create a cluster with managed node group (example):
eksctl create cluster --name <cluster_name> --version 1.15 --nodegroup-name <nodegp_name> --node-type t3.micro --nodes 2 --managed

#create a cluster with Fargate Profile:
eksctl create cluster --name <cluster_name> --fargate

#delete a cluster:
eksctl delete cluster --name <nome_cluster> --region <regiao_utilizada>

#atualizar um nodegrup:
eksctl updgrade nodegroup --name<nodegroup_name> --cluster=<cluster_name>

#para ver o cluster que esta sendo utilizado no momento:
kubectl config current-context

#Listar Todos os Contextos (clusters) Disponíveis:
kubectl config get-contexts

#alternar entre clusters:
kubectl config use-context <nome-do-contexto>

#ver se o Metrics Server esta funcionando:
kubectl get deployment metrics-server -n kube-system

#ver o uso de recursos (CPU e memoria) de todos os pods ou nodes no namespace atual:
kubectl top pods
kubectl top nodes

#listar os pods do Metrics Server para garantir que estão rodando:
kubectl get pods -n kube-system | grep metrics-server

#ver logs para identificar problemas no metrics server:
kubectl logs -n kube-system deployment/metrics-server

#Conferir os recursos disponíveis no cluster:
kubectl api-resources | grep metrics

#verificar se os pods estao estao no prometheus namespace:
kubectl get pods -n prometheus







```
