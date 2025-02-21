- Usado para criar imagens dos containers;
- Orquestradores: Kubernets, Terraform, ECS, Docker Swarm, Azure App Service;
- Containers usam o mesmo OS do Kernel, ja VMs usam OS individual para cada VM (consome mais recursos);
- Docker eh composto de um Dockerfile, Imagem e um Container.

1. Dockerfile:
   "Text document that contains commands to assemble the Image".
   Docker faz o build da "base Image" atraves das instrucoes do dockerfile.
   O arquivo Dockerfile deve ser criado no diretorio raiz do projeto.
   Cada instrucao no Dockerfile cria um layer da imagem.
   Esses layers sao empilhados e cada um eh uma versao delta das mudancas do layer anterior.
   Ex:

```bash
#always begin with a FROM instruction (build this image from the specified image)
FROM node:19-alpine

#copy application file from the host into the container (COPY <src> on our machine <dest> in the container)
# the "/" at the end of "/app/" says to docker to create the app folder if it doens't exist in the container
COPY package.json /app/
COPY src /app/

#set the working directory for all following commands (like changing into a directory: "cd.."), so instructions like RUN, CMD, ADD, COPY OR ENTRYPOINT gets executed in this directory
WORKDIR /app

#set the user name (or UID) and optionally the user group (or GID)
#the specified user is used for RUN instructions and at runtime, runs the relevant ENTRYPOINT and CMD commands
USER root

#will execute any command in a shell inside the container environment
#while "COPY" is executed on the host, "RUN" is executed in the cotainer
RUN npm install

#define the port that the container should listen on at runtime
EXPOSE 3000

#the instruction that is to be executed when a docker container starts
#there can only be one "CMD" instruction in a Dockerfile
#every Dockerfile must have at least a CMD or ENTRYPOINT command
CMD ["node", "server.js"]
```

The RUN instruction has two forms (shell form and exec form):
Shell form runs commands inside of a command shell (Linux defaults to using /bin/sh -c and Windows defaults to using cmd /S /C).
Exec form runs outside of a shell and doesn't provide shell processing such as environment variable replacement. The exec form is defined as a JSON array and must consist of a valid JSON.

```bash
#Shell form
RUN echo hello
#Exec form
RUN ["/bin/sh", "-c", "echo hello"]
```

2. Docker Image:
   Eh um template imutavel, como uma classe de um objeto.
   Define como o container sera utilizado.
   Inclui o app source code e todo o ambiente de configuracao.
   Com a mesma imagem voce pode rodar multiplos containers.
   Sao versionadas (cada versao possui uma tag).
   Toda imagem consiste de "multiple image layers", tornando docker eficiente pois os layers da Image sao cacheados.

   Boas praticas para construir uma imagem:
   Use minimal base images

3. Docker Container:
   Inicia e roda a aplicacao.
   Eh como a instancia da classe.

- Apos a criacao dos cgroups e namespaces no Linux em 2005 pela Google, foi possivel desenvolver os container da forma que vemos hoje pois eh atraves do namespace que conseguimos isolar os processos do OS, fazendo com que existam os containers (cada container eh executado apenas utilizando os processos isolados pelo namespace) e o cgroup funciona para informar a capacidade de recursos do OS disponivel para cada container (CPU, RAM, HD...);
- Docker funciona atraves do Client (CLI) e da Engine (deamon, containerd e runc).

- Docker Registry x Docker Repository:

1. Registry:
   Servico que armazena Docker Images (official e unnoficial images).
   Private Registry: Exigem uma autenticacao antes de acessar. Amazon ECR, Google Container Registry...
   Public Registry: Docker hub;

2. Repository:
   Colecao de imagens relacionadas com o mesmo nome porem diferentes versoes.

- Port Binding:
  Conecta a porta interna do container com a porta da maquina host, tornando possivel acessar o servico que esta rodando dentro do container.
  Isso ocorre porque a aplicacao dentro do container roda em uma rede docker isolada, sendo necessario expor a porta do container para o host (maquina local).
  Eh como uma ponte entre o computador e o container.

- Bind Mounts:
  Quando voce fizer o build de uma imagem e executa-la em um container, qualquer mudanca feita no diretorio do projeto apos o build nao sera refletida no container, pois ele estara rodando com o conteudo imutavel da imagem.
  Os Bind Mounts permitem que montemos um diretorio diretamente dentro do container, ou seja, o container usa os arquivos diretamente dos arquivos do host, refletindo qualquer alteracao.

```bash
docker run -p 3000:3000 -v "$(pwd)":/app <nameOfImage>
#-p 3000:3000 roda o container da porta 3000 para a porta 3000 do host
#-v "$(pwd)":/app monta o diretorio atual do host  (onde clonamos o projeto) no diretorio /app dentro do container; pode usar -v ou --volume
```

- Rodando projeto em empresa que utiliza Docker Compose:

```bash
#Clonar o repositorio:
git clone <URL_DO_REPOSITORIO>
cd <nome-do-repositorio>

#Configurar variáveis de ambiente (se necessário); Copiar o arquivo .env.example:
cp .env.example .env

#Rodando com Docker Compose:
##Levantar os containers pela primeira vez (O build eh necessário na primeira vez ou após alterações relevantes)
docker-compose up --build

##Verificar o status dos containers:
docker-compose ps

##Ver logs de todos os serviços:
docker-compose logs
###Logs de um serviço específico:
docker-compose logs <nome-do-servico>

##Acessar a aplicação (Use a URL definida no docker-compose.yml, por exemplo):
http://localhost:3000

#Final do dia (encerrar os containers)
##Derrubar os containers e liberar os recursos:
docker-compose down

# No dia seguinte (voltar ao trabalho)
##Levantar os containers sem rebuild (se não houve mudanças no código):
docker-compose up

##Se houve mudanças no código ou no Dockerfile, faça o rebuild:
docker-compose up --build
```

- Docker commands:

```bash
docker pull {nameOfImage}:{tag}
#pull an image from a registry (docker hub)
#Ex:
docker pull ngnix:1.23

docker run {nameOfImage}:{tag}
#creates a container from the given image and starts it
#Ex:
docker run nginx:1.23

docker run -d {nameOfImage}:{tag}
#runs container in background and prints the container ID (doesn't block the terminal)
#creates a new container every time you run it

docker run -p {host_port}:{container_port} {nameOfImage}:{tag}
#publish a container's port to the host
#only 1 service can run on a specific port on the host
#its a standard to use the same port on the host as container is using
#Ex:
docker run -p 9000:80 nginx:latest

docker run --name {randomName} {nameOfImage}:{tag}
#assign a name to the container
#Ex:
docker run --name web-app -d -p 9000:80 nginx:latest

docker start {container}
#start one or more stopped container (it reuses an existed container)

docker stop {container}
#stops one or more containers

docker build {path}
#builds a docker image from a Dockerfile
#Ex:
#"-t" or "--tag" sets a name and optionally a tag in the "name:tag" format
#"." at the end says the location of the Dockerfile (in this case "." refers to the current directory)
docker build -t node-app:1.0 .

docker images
#list all docker images locally

docker ps
#list running containers

docker ps -a
#list all containers (stoped and running)

docker logs {container}
#view logs from service running inside the container.

docker inspect {nameOfImage}
#ver informacoes detalhadas da imagem em formato JSON
```

- COMMOM ISSUES:

1. Using .env files:

```bash
#create a .env file in the project root;
#ensure .env file is added to .gitignore and .dockerignore to prevent it from being commited to version control or included in Docker image;
#update the compose.yaml with the .env file:
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
     - .:/app
     - ./node_modules:/app/node_modules
    env_file:
      - .env
    stdin_open: true
    tty: true
    command: npm start
```

2. Dockerfile with multi-stage building:

```bash
# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Leverage caching by installing dependencies first
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code and build for production
COPY . ./
RUN npm run build

# Stage 2: Development environment
FROM node:18-alpine AS development
WORKDIR /app

# Install dependencies again for development
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the full source code
COPY . ./

# Expose port for the development server
EXPOSE 3000
CMD ["npm", "start"]

# Stage 3: Production environment
FROM nginx:alpine AS production

# Copy the production build artifacts from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

3. "Port 3000 is already in use":

```bash
#map the app to a different port when running the container
docker run -p 4000:3000 my-react-app
```

4. Changes aren't reflected during development:

```bash
#Use Docker volumes to enable hot-reloading;
volumes:
  - .:/app
  - ./node_modules:/app/node_modules
```

5. Container exits immediately:

```bash
#ensure you are running the container interectively;
docker run -it -p 3000:3000 my-react-app
```

6. File permission errors:

```bash
#Adjust file permissions or specify a user in the Dockerfile using the USER directive.
# Add before CMD
USER node
```
