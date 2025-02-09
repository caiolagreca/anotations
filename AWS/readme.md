- O que é o usuário IAM e para que serve?
  Um usuário IAM (Identity and Access Management) é uma identidade dentro da conta AWS que pode ter permissões personalizadas para acessar serviços e recursos.

  O root user é o usuário “dono” da conta, criado no momento em que você se cadastra na AWS. Ele tem acesso irrestrito a todos os serviços e recursos da conta.

  Boas práticas de segurança recomendam não usar o root user para as tarefas diárias. Em vez disso, cria-se um usuário IAM com as permissões necessárias (por exemplo, AdministratorAccess se precisar de privilégios totais) e mantém-se o root user guardado para ações pontuais, como fechar a conta ou gerenciar informações de cobrança.

- Para que servem as tags na criação da Access Key?
  As tags são metadados opcionais que você pode atribuir a praticamente qualquer recurso na AWS, incluindo usuários IAM e suas chaves de acesso. Cada tag consiste em um par chave:valor (por exemplo, Projeto=EstudoEKS ou Ambiente=Desenvolvimento).
  Organização: As tags ajudam a organizar e categorizar recursos.
  Filtragem e Busca: Você pode usar tags para filtrar recursos dentro do console AWS e em relatórios de custos ou auditorias.
  Gestão de Custos: É comum usar tags para identificar gastos por projeto/equipe.
  Automação: Algumas ferramentas de automação podem buscar ou agir em recursos marcados com tags específicas.

- O Que é um Security Group na AWS?
  Security Group é uma espécie de firewall virtual que controla o tráfego de entrada e saída para recursos como instâncias EC2, Load Balancers, etc.
  Ele define quais portas e protocolos estão permitidos para acesso aos recursos protegidos por ele.

- O Que é CloudFormation?
  é um serviço da AWS que permite aos desenvolvedores e administradores de sistemas modelar e provisionar recursos da AWS de forma automatizada e programática. Ele utiliza templates em formato JSON ou YAML para descrever os recursos que você deseja criar e gerenciar na AWS.
  Por Que Usar CloudFormation?
  Infraestrutura como Código (IaC): Permite definir toda a infraestrutura necessária para suas aplicações de maneira declarativa.
  Automação: Facilita a criação, atualização e gerenciamento de recursos de forma repetível e consistente.
  Versionamento e Controle de Mudanças: Integrável com sistemas de controle de versão, facilitando o rastreamento de alterações na infraestrutura.
  Reutilização de Templates: Você pode reutilizar templates para criar ambientes similares, como desenvolvimento, teste e produção.
  Como o CloudFormation se Relaciona com o EKS?
  No contexto do Amazon EKS, o CloudFormation é frequentemente usado para provisionar e gerenciar os recursos necessários para um cluster Kubernetes, tais como:
  VPC (Virtual Private Cloud): Rede virtual onde o cluster será criado.
  Subnets: Partições dentro da VPC para organizar os recursos.
  Security Groups: Regras de firewall para controlar o tráfego de rede.
  Node Groups: Conjuntos de instâncias EC2 que executam os pods Kubernetes.
  Load Balancers: Para balanceamento de carga de serviços expostos

- O Que é EBS?
  Amazon Elastic Block Store (EBS) é um serviço de armazenamento de bloco fornecido pela AWS. Ele oferece volumes de armazenamento persistentes que podem ser anexados a instâncias EC2. Esses volumes são duráveis, altamente disponíveis e desempenham consistentemente.
  Características Principais do EBS:
  Persistência de Dados: Os dados nos volumes EBS persistem independentemente do ciclo de vida das instâncias EC2.
  Snapshots: Possibilidade de criar backups incrementais dos volumes EBS.
  Tipos de Volumes: Diversos tipos de volumes otimizados para diferentes casos de uso, como SSDs para aplicações de alto desempenho ou HDDs para armazenamento de dados em grande escala.
  Redimensionamento Dinâmico: Permite aumentar o tamanho e o desempenho dos volumes sem tempo de inatividade.
  Como o EBS se Relaciona com o EKS?
  No Amazon EKS, o EBS é usado para armazenamento persistente das aplicações que necessitam de dados duráveis. Por exemplo:
  Persistent Volumes (PV) e Persistent Volume Claims (PVC): Kubernetes abstrações que permitem aos pods solicitar e usar armazenamento persistente.
  Stateful Applications: Aplicações como bancos de dados que requerem armazenamento persistente utilizam EBS para manter os dados.

- O Que é AWS Fargate?
  AWS Fargate é um motor de computação serverless para contêineres fornecido pela AWS. Ele permite que você execute contêineres sem precisar gerenciar ou provisionar servidores (instâncias EC2). Com o Fargate, a AWS gerencia toda a infraestrutura subjacente, permitindo que você se concentre apenas no desenvolvimento e implantação de suas aplicações.
  Principais Características do Fargate:
  Serverless: Não há necessidade de gerenciar servidores ou clusters de EC2.
  Escalabilidade Automática: O Fargate escala automaticamente os recursos de computação conforme a demanda da aplicação.
  Segurança: Isola cada tarefa ou pod, melhorando a segurança das aplicações.
  Custo-Efetivo: Paga apenas pelos recursos utilizados pelas tarefas ou pods, sem custos fixos de infraestrutura.

- Max number of pods depends on EC2 instance type. Bigger the instance, means more pods allowed.

- O Que é uma AMI?
  AMI significa Amazon Machine Image (Imagem de Máquina da Amazon). É uma imagem pré-configurada que contém todas as informações necessárias para lançar uma instância Amazon EC2. Em termos simples, uma AMI é como um modelo que define o sistema operacional, aplicações e configurações que uma instância EC2 terá ao ser iniciada (eh como uma Imagem docker).

- O Que São Node Groups?
  Node Groups são conjuntos de nós (instâncias EC2) que fazem parte do seu cluster EKS. Eles são responsáveis por executar os pods (unidades de execução de containers) das suas aplicações Kubernetes.

  - Tipos:

    - Managed Node Groups (Grupos de Nós Gerenciados):
      Gerenciamento pela AWS: A AWS cuida do provisionamento, atualização e escalonamento das instâncias EC2.
      Facilidade de Uso: Simplifica operações como upgrades de versão do Kubernetes e patches de segurança.
      Auto Scaling Integrado: Suporta auto scaling automático baseado em políticas definidas.
      Ideal Para: Usuários que preferem delegar o gerenciamento de infraestrutura à AWS.

    - Unmanaged Node Groups (Grupos de Nós Não Gerenciados):
      Gerenciamento Manual: Você é responsável por criar, configurar, atualizar e escalar as instâncias EC2.
      Maior Controle: Permite personalizações avançadas nas instâncias, como tipos específicos de hardware, configurações de rede, etc.
      Flexibilidade: Útil para casos onde você precisa de configurações específicas que os grupos gerenciados não suportam.
      Ideal Para: Usuários que precisam de maior controle sobre suas instâncias EC2.

- O que eh AWS Auto Scaling Group (ASG)?
  Servico da AWS que permite gerenciar automaticamente a quantidade de instancias EC2, garantindo que voce tenha a quantidade certa de recursos para atender a demanda atual do app.
  Ajuda a manter a disponibilidade e escalabilidade.
  Horizontal Scaling (Escalonamento Horizontal): Adiciona ou remove instâncias EC2 para lidar com aumentos ou diminuições na demanda.
  Health Checks: Monitora a saúde das instâncias e substitui automaticamente as que estiverem com problemas.
  Rolling Updates: Atualiza instâncias de forma gradual para evitar downtime durante atualizações de software ou patches.
  Managed Node Groups no EKS são, na verdade, Auto Scaling Groups gerenciados pela AWS.
  No contexto do Amazon EKS, os ASGs gerenciam os nodes do cluster.

  - Cluster Autoscaler:
    Um componente que ajusta automaticamente o tamanho do ASG com base na demanda de recursos do cluster.
    Adiciona nodes quando há pods que não podem ser agendados devido à falta de recursos.

- O que eh o Karpenter?
  Eh um Cluster Autoscaler = Otimiza automaticamente a infraestrutura de nodes do cluster para atender a demanda da aplicacao.

  - Caracteristicas:
    Lança instâncias EC2 de forma rápida, sem pré-configuração de ASGs.
    Seleciona automaticamente os tipos de instância mais adequados e econômicos.
    Utiliza instâncias Spot para reduzir custos, mantendo a disponibilidade com instâncias sob demanda quando necessário.

- Logging:
  Its a container DaemonSet-

  - EFK Stack = Elasticsearch service, Fluentd, Kibana;
  - Fluentd x Fluentbit:
    FLuentd is older so it has more plugins, but it has a slow propagation and loss of logs.
    Fluentd buffer can be increased to solve this, but is not dynamic.
    Fluentd to Kinesis Data Firehose to logging backend.
    Fluentbit doesnt need streamming architecture to logging backend.
    Fluentbit is lightweight and keeps up with higher traffic.
    Ambos sao ferramentas para gerenciamento de logs e usados como clusters Kubernetes.
    Podem se complementarem: Utilizar o FluentBit como agente de coleta em cada Node (iva DeamonSet) que coleta os logs dos containers e os encaminha para um Fluentd central. Assim o FluentBit cuida da coleta eficiente e o Fluentd realiza um processamento e roteamento mais detalhados dos logs para os destinos finais.

- Amazon ECR: Elastic Container Repository
  Servico da AWS para gerenciar, armazenar e distribuir imagens (como o Docker Hub).
  A diferenca eh que eh integrado nativamente com os servicos da AWS.
  Facilita automacao e implementacao dos containers, sem precisar gerenciar a infra de um repositorio de imagens.
- Comandos:

```bash
#configurando credenciais da AWS no terminal:
aws configure
## aparecera AWS Access Key ID [None]:
## AWS Secret Access Key [None]:
## Default region name [None]: ap-southeast-2
## Default output format [None]: json

##para verificar se essas credenciais funcionaram:
aws sts get-caller-identity
### ira retornar algo como:
{
    "UserId": "...",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/MeuUsuario"
}

#para verificar se AWS CLI esta instalado:
aws --version

#Instalando eksctl:
##O eksctl é a ferramenta oficial para criar e gerenciar clusters EKS
choco install eksctl #No windows

#verificando se eksctl esta instalado:
eksctl version

#criando cluster economico pelo terminal via eksctl:
eksctl create cluster --name eks-cluster --region us-east-1 --nodegroup-name eks-group --nodes 2 --nodes-min 1 --nodes-max 2 --node-type t3.micro


#listar clusters existentes:
eksctl get cluster

#listar os Node Groups de um cluster:
eksctl get nodegroup --cluster meu-cluster

#deletar um cluster:
eksctl delete cluster --name meu-cluster --region us-east-1
eksctl delete cluster --name eks-cluster --region ap-southeast-2

#atualizar um nodegrup:
eksctl updgrade nodegroup --name<nodegroup_name> --cluster=<cluster_name>

#Porém, para tarefas dentro do cluster (gerenciar nós, pods, serviços, deployments, etc.), você deve usar kubectl ao inves de eksctl.
```

- Para acessar uma instancia EC2 via terminal ssh linux:

```bash
# 1.Na criacao da instancia, baixe a chave.pem

# 2.Como estamos usando windows, essa chave precisar ser copiada para uma pasta Linux (para que o ubuntu possa localiza-la);
#Acesse via WS2 e localize a chave (provavelmente estara na pasta Downloads do Windows). OBS: No WS2, a unidade C: do windows sao montadas no /mnt/c
cd /mnt/c/Users/caiolagreca/Downloads/<sua-chave.pem>

# 3.Copie o arquivo para o diretorio home (ou outro que preferir) no terminal Ubuntu WS2:
cp /mnt/c/Users/caiolagreca/Downloads/<sua-chave.pem> ~/

# 4.Para que o SSH aceite a chave, eh necessario que ela tenha permissoes restritas. Execute:
chmod 400 ~/<sua-chave.pem>

# 5.Agora que o arquivo esta no sistema de arquivos do WSL2 e com as permissoes corretas, voce pode acessar a instancia EC2:
#Copie o endereco IPV4 na instancia EC2 da AWS
ssh -i "~/<sua-chave.pem>" ec2-user@<endereco-ipv4>
```
