[![grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)]([https://www.blender.org/](https://grafana.com/))

# Graforb - High-Performance Graph Visualization Panel

**Graforb** is a custom [Grafana](https://grafana.com/) panel plugin designed for visualizing large-scale graph networks. Built on top of the [**Orb** library](https://github.com/memgraph/orb), it utilizes **HTML5 Canvas** to render nodes and relationships efficiently, overcoming the performance overhead typically associated with SVG-based graph visualizations.

This plugin was developed to enable the visualization of complex datasets (such as those from Neo4j) directly within Grafana, offering superior performance for datasets containing thousands of nodes and edges.

## Key Features

* **Canvas-based Rendering:** Uses the Orb library to minimize DOM overhead and maximize rendering speed.
* **Multiple Layout Strategies:** Supports various algorithms for node positioning using the Strategy pattern:
    * Force-directed (D3-based)
    * Hierarchical
    * Circular
    * Grid
* **Dynamic Styling:** Customizable node sizes and colors based on data attributes.

## Getting Started

### Prerequisites

* Node.js
* Docker (for running the Grafana test instance)

### Development Steps

1.  **Install dependencies**

    ```bash
    npm install
    ```

2.  **Build plugin in development mode and run in watch mode**

    ```bash
    npm run dev
    ```

3.  **Spin up a Grafana instance and run the plugin inside it (using Docker)**

    ```bash
    npm run server
    ```

4.  **Build plugin for production**

    ```bash
    npm run build
    ```

5.  **Run the tests (using Jest)**

    ```bash
    # Runs the tests and watches for changes
    npm run test

    # Exits after running all the tests
    npm run test:ci
    ```

6.  **Run the E2E tests (using Playwright)**

    ```bash
    # Spins up a Grafana instance first that we test against
    npm run server

    # Starts the tests
    npm run e2e
    ```

7.  **Run the linter**

    ```bash
    npm run lint
    ```

## Distributing your plugin

To create a production build of the plugin:

```bash
npm run build
