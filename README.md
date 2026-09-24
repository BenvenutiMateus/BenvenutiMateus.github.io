# Mateus Jardim Benvenuti

Código-fonte do meu site pessoal e acadêmico, com informações sobre minha formação em Estatística e Ciência de Dados na Universidade Federal de São Carlos (UFSCar), pesquisa e projetos.

**Site:** [benvenutimateus.github.io](https://benvenutimateus.github.io)

## Sobre o projeto

O site é desenvolvido em HTML, CSS e JavaScript, sem frameworks ou dependências de compilação. As páginas são estáticas e a hospedagem é feita pelo GitHub Pages.

A interface possui layout responsivo, navegação por teclado e suporte aos temas claro e escuro. A preferência de tema é armazenada no navegador; na ausência de uma escolha, o site acompanha a configuração do sistema. O conteúdo e a navegação permanecem disponíveis sem JavaScript.

## Estrutura

| Arquivo ou diretório | Conteúdo |
| --- | --- |
| `index.html` | Apresentação pessoal e foto de perfil |
| `pesquisa.html` | Projeto de iniciação científica |
| `projetos.html` | Seleção de projetos |
| `trajetoria.html` | Formação e atividades acadêmicas |
| `contato.html` | Links de contato e vínculo acadêmico |
| `style.css` | Estilos compartilhados, responsividade e temas |
| `script.js` | Seleção de tema e atualização do ano no rodapé |
| `assets/` | Imagens utilizadas no site |

## Execução local

Para visualizar o site, abra `index.html` no navegador. Como alternativa, com Python 3 instalado, execute na raiz do repositório:

```sh
python3 -m http.server 8000
```

Acesse [localhost:8000](http://localhost:8000). Para encerrar o servidor, pressione `Ctrl+C` no terminal.

## Manutenção

Edite o conteúdo diretamente no arquivo HTML da página correspondente. Alterações no cabeçalho, na navegação ou no rodapé devem ser aplicadas a todas as páginas para manter a consistência do site.

Os estilos ficam centralizados em `style.css`, e os comportamentos compartilhados em `script.js`. Armazene novas imagens em `assets/` e inclua um texto alternativo descritivo no atributo `alt`.

Para adicionar um projeto, inclua uma seção em `projetos.html` com título, descrição e links para o repositório ou outros materiais relevantes. Atualize o texto de apresentação da página conforme os projetos forem publicados.

Antes de publicar alterações, confira a navegação entre as páginas, os links, a exibição em telas menores e os dois temas.
