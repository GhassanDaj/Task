# Bacterial Cell Growth Simulation

## Overview
This project simulates the growth of bacterial colonies on a grid (petri dish) using React and TypeScript. The simulation adheres to specific biological rules for cell division and includes user-interactive features.

## Features
- **Grid Representation**: A responsive 100x100 grid simulating a petri dish.
- **Bacterial Growth**: Cells divide based on available neighbors, lifespan, and division probability.
- **Interactive Controls**:
  - Start/Pause the simulation.
  - Reset the simulation.
  - Adjust the time interval for cell division.
  - Manually add/remove cells by clicking on the grid.
- **Dynamic Visualization**: Cells change color based on age.

## Project Structure
- **`src/App.tsx`**: Main application logic, including grid management and simulation rules.
- **`src/App.css`**: Styling for the grid and controls.
- **`src/types.ts`**: Type definitions for the grid cells.
- **`public/`**: Static assets such as `index.html`.

## Assumptions
- The grid size is fixed at 100x100 for performance.
- The minimum time interval for cell division is 100ms.
- Lifespan of a bacterial cell is 5 seconds.

## Performance Analysis
- **Grid Update Speed**: Updates are optimized to ensure smooth rendering even for large grids.
- **Memory Usage**: Efficient state management with React ensures low memory overhead.
- **Responsiveness**: The grid updates dynamically based on user interaction without noticeable lag.

## Deployment
- **Live Application**: [Deployed Application](https://your-deployment-link.com)
- **Source Code Repository**: [GitHub Repository](https://github.com/your-username/cell-growth-simulation)

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cell-growth-simulation.git
   cd cell-growth-simulation
