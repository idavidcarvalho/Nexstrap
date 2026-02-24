# Nexstrap

Nexstrap é um Design System moderno baseado em Bootstrap 5, com alta personalização visual, componentes acessíveis e documentação completa.

## Características

- **Customizável**: Variáveis CSS para fácil personalização
- **Acessível**: Suporte completo a WCAG 2.1
- **Responsivo**: Layout adaptável para todos os dispositivos
- **Documentado**: Documentação completa com exemplos
- **Open Source**: Licença MIT

## Instalação

### Via NPM

```bash
npm install nexstrap
```

### Via CDN

```html
<link href="https://cdn.jsdelivr.net/npm/nexstrap/dist/css/nexstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/nexstrap/dist/js/nexstrap.min.js"></script>
```

### Download

[Baixar versão mais recente](https://github.com/idavidcarvalho/Nexstrap/releases)

## Uso Rápido

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página</title>
    <link href="https://cdn.jsdelivr.net/npm/nexstrap/dist/css/nexstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-custom">
        <div class="container">
            <a class="navbar-brand" href="#">
                <span class="navbar-brand-icon">N</span>
                Nextrap
            </a>
        </div>
    </nav>

    <main class="main-content">
        <div class="container">
            <h1>Bem-vindo ao Nextrap</h1>
            <p class="lead">Um Design System moderno baseado em Bootstrap 5.</p>
        </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/nexstrap/dist/js/nexstrap.min.js"></script>
</body>
</html>
```

## Documentação

Acesse a documentação completa em: [https://idavidcarvalho.github.io/Nexstrap](https://idavidcarvalho.github.io/Nexstrap)

## Estrutura

```
nexstrap/
├── docs/           # Documentação
├── dist/           # Arquivos para produção
├── examples/       # Exemplos completos
└── LICENSE         # Licença MIT
```

## Compatibilidade

- Bootstrap 5.3+
- Navegadores modernos
- Screen readers

## Licença

MIT License - see [LICENSE](LICENSE) for details.

---

Feito com ❤️ usando Bootstrap 5
