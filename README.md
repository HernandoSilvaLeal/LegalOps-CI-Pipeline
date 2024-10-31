# LegalOps-CI-Pipeline

## File Structure
```
LegalOps-CI-Pipeline
├─ .gitignore
├─ backend
│  ├─ app.js
│  ├─ notificaciones.js
│  └─ package.json
├─ database
│  └─ reservas.json
├─ frontend
│  ├─ abogados.css
│  ├─ abogados.html
│  ├─ abogados.js
│  ├─ index.html
│  ├─ miStyles.css
│  ├─ onloadTable.js
│  └─ reservas.js
└─ README.md

```

## Prerequisites

-   **node.js** (version 20.16.0)
-   **npm** (for dependency management)
-   **Docker** (for containers)

## Getting Started

-   **Clone repository**:

    ```Bash
    git clone https://github.com/HernandoSilvaLeal/LegalOps-CI-Pipeline.git
    cd LegalOps-CI-Pipeline
    ```

-   **Install dependencies**:

    ```Bash
    npm install
    ```

-   **Run project**:

    ```Bash
    npm run dev
    ```

## Getting Started

-   **Up Docker containers**:

    ```Bash
    docker-compose up --build
    ```