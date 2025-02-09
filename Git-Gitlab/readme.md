GIT

commands:

```bash
#ver se esta instalado:
git --version

#configuracoes globais de login:
git config --global user.name "xxxx"
git config --global user.email "xxxx"

#ver se configuracao esta correta:
git config --global user.name
git config --global user.email

#check all settings:
git config --global --list

#initialize git in the project:
git init

#create a new branch:
git branch <name_of_branch>

#delete a branch:
git branch -d <name_of_branch>

#switch branch:
git checkout <name_of_branch>

#create and switch branch at the same time:
git checkcout -b <name_of_branch>

#commit a branch to another:
git merge <name_of_branch>

#to push the changes to a new branch that doesn't exist in the remote repository: 
git push -u origin <name_of_new_branch>

#to update the branchs that were already deleted in the remote repo to the local repo:
git pull --prune

#see previous commits resumed:
git log --all --oneline
```

GITLAB:

```bash
#get SSH Key:
ssh-keygen -t ed25519 -C "Gitlab key pair"
## ed25519 is the kind of encryption that it will be used (instead of RSA)

#Comando para se autenticar com o Gitlab usando a chave SSH:
## -T desativa a criacao de um terminal interativo.
ssh -T git@gitlab.com
```

commands:

- Runners:
  Sao os "executores" que pegam as instrucoes do arquivo .gitlab-ci.yml e as processam, rodando comandos, testes, builds e deploys.
  Basicamente quando um pipeline eh disparado, o Gitlab atribui os jobs (tarefas) a um runner disponivel.
  Tipos: Shared, Specific, Custom
  Executors (determinam o ambiente de execucao dos jobs): Docker, Shell, Kubernetes, etc.
  Os runners sao configurados via um arquivo config.yml
