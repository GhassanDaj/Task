import React, { useState, useEffect } from 'react';
import './App.css';
import { Cell } from './types';

const GRID_SIZE = 100; // Reduced size for better performance with larger cells

// Helper: Create an empty grid
const createEmptyGrid = () => {
    return Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => ({
            occupied: false,
            age: 0,
        }))
    );
};

// Helper: Find neighbors of a cell
const getNeighbors = (grid: Cell[][], x: number, y: number) => {
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    return directions
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(
            ([nx, ny]) =>
                nx >= 0 && ny >= 0 && nx < GRID_SIZE && ny < GRID_SIZE && !grid[nx][ny].occupied
        );
};

// Helper: Update grid based on growth rules
const updateGrid = (grid: Cell[][]) => {
    return grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
            if (cell.occupied) {
                const neighbors = getNeighbors(grid, rowIndex, colIndex);
                if (neighbors.length > 0 && Math.random() > 0.2) {
                    const [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
                    grid[nx][ny] = { occupied: true, age: 0 };
                }

                if (cell.age > 5) {
                    return { occupied: false, age: 0 };
                }
                return { ...cell, age: cell.age + 1 };
            }
            return cell;
        })
    );
};

const App: React.FC = () => {
    const [grid, setGrid] = useState<Cell[][]>(createEmptyGrid);
    const [isRunning, setIsRunning] = useState(false);
    const [timeInterval, setTimeInterval] = useState(1000); // Default interval of 1 second
    const [inputInterval, setInputInterval] = useState(1000); // Input field for user adjustments

    const handleStartPause = () => setIsRunning(!isRunning);
    const handleReset = () => setGrid(createEmptyGrid);

    // Simulation Timer
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setGrid((prevGrid) => updateGrid(prevGrid));
        }, timeInterval);

        return () => clearInterval(interval);
    }, [isRunning, timeInterval]);

    const handleIntervalChange = () => {
        if (inputInterval >= 100) {
            setTimeInterval(inputInterval); // Minimum interval of 100ms
        } else {
            alert("Interval must be at least 100 milliseconds.");
        }
    };

    return (
        <div className="container">
            <div className="controls">
                <button onClick={handleStartPause}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={handleReset}>Reset</button>
                <div className="interval-control">
                    <label>
                        Time Interval (ms):
                        <input
                            type="number"
                            value={inputInterval}
                            onChange={(e) => setInputInterval(Number(e.target.value))}
                        />
                    </label>
                    <button onClick={handleIntervalChange}>Set Interval</button>
                </div>
            </div>
            <div className="grid">
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`cell ${cell.occupied ? 'occupied' : ''}`}
                            style={{
                                backgroundColor: cell.occupied
                                    ? `rgba(0, ${255 - cell.age * 40}, 0, 0.9)` // Color fades as cells age
                                    : '#e0e0e0', // Empty cell color
                            }}
                            onClick={() => {
                                const newGrid = [...grid];
                                newGrid[rowIndex][colIndex] = {
                                    ...cell,
                                    occupied: !cell.occupied,
                                };
                                setGrid(newGrid);
                            }}
                        ></div>
                    ))
                )}
            </div>
        </div>
    );
};

export default App;
