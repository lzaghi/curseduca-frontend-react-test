# Curseduca - Social Media

## Instalação e execução local

Certifique-se de ter as portas 3000 e 3001 desocupadas!

1. Clone o repositório e entre no diretório
```bash
  git clone git@github.com:lzaghi/curseduca-frontend-react-test.git
  cd curseduca-frontend-react-test
```

2. A partir da raiz do projeto, acesse /backend, instale as dependências e inicie o servidor
```bash
  cd backend
  npm install
  npm run serve
```

2. A partir da raiz do projeto, acesse /frontend, instale as dependências e inicie a aplicação
```bash
  cd frontend
  npm install
  npm run build
  npm start
```

A aplicação já estará rodando! :)</br>
Acesse ```http://localhost:3000``` para a experiência de usuário. O back-end estará rodando em ```http://localhost:3001```.


## Credenciais de acesso

Para logar na aplicação, utilize alguma das seguintes credenciais:

```bash
  email: dev1@curseduca.com
  password: dev1
```

```bash
  email: dev2@curseduca.com
  password: dev2
```

```bash
  email: dev3@curseduca.com
  password: dev3
```

## Funcionalidades implementadas

- Cadastro de postagem
    - Campos
        - **Título**: campo texto
        - **Categoria**: campo _select_
        - **Conteúdo**: campo com editor WYSIWYG
    - Ações
        - Agendar
            - Perguntar ao usuário para quando ele quer agendar a postagem desse conteúdo
        - Postar agora
- Listagem de postagens
    - Buscar as postagens na API e exibi-las para o usuário
    - Ter uma opção para apagar uma postagem
    - Criar sistema de filtragem
        - Por Autor
        - Por Categoria