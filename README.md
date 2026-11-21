# ♛ Eight Queens Problem — Genetic Algorithm

An interactive visualization of the **Eight Queens Problem** solved using a **Genetic Algorithm (GA)**.

This project demonstrates how evolutionary computation can find a valid solution by evolving a population of candidate solutions through selection, crossover, and mutation.

Instead of simply displaying the final chessboard, the application allows you to explore the algorithm's execution and understand how solutions evolve across generations.

## ✨ Features

- **Interactive Chessboard:** Visualize queen positions and identify conflicts.
- **Population Visualization:** Explore chromosomes and their fitness scores.
- **Fitness Evaluation:** Track the quality of candidate solutions.
- **Step-by-Step Execution:** Follow each stage of the genetic algorithm individually.
- **Automatic Execution:** Let the algorithm run automatically.
- **Algorithm Inspector:** Explore selection, crossover, mutation, and generation updates.
- **Real-time Statistics:** Monitor generation count, best fitness, conflicts, and execution time.
- **Animated Interface:** Smooth visual transitions powered by Framer Motion.

## 🧬 How the Genetic Algorithm Works

Each candidate solution is represented as a chromosome containing a permutation of numbers from 1 to 8.

For example:

```js
[4, 1, 7, 3, 6, 8, 2, 5]
```

Each index represents a column, and its corresponding value represents the row containing a queen.

This representation guarantees that no two queens share the same row or column. Therefore, only diagonal conflicts need to be evaluated.

The algorithm follows these steps:

### 1. Generate Population
Create an initial population of random chromosomes.

### 2. Fitness Evaluation
Evaluate each chromosome by counting the number of non-conflicting queen pairs.

The maximum possible fitness is:

\[
Fitness_{max} = \frac{8 \times 7}{2} = 28
\]

A chromosome with a fitness score of 28 represents a valid solution.

### 3. Selection
Use **Tournament Selection** to choose parents.

Random candidates compete, and the candidate with the highest fitness becomes the winner.

Two tournaments are performed to select a pair of parents.

### 4. Crossover
Apply **Order Crossover (OX)** to combine two selected parents and generate offspring while preserving the permutation of genes.

### 5. Mutation
Apply **Swap Mutation** with a predefined probability by exchanging two randomly selected genes.

This operation introduces diversity into the population.

### 6. Next Generation
Build the next population using the newly generated offspring.

The algorithm also uses **Elitism** to preserve the best chromosomes from the previous generation.

These steps repeat until a valid solution is found or the maximum generation limit is reached.

## ⚙️ Default Configuration

| Parameter | Value |
|---|---:|
| Population Size | 50 |
| Elite Count | 2 |
| Tournament Size | 3 |
| Crossover Rate | 0.9 |
| Mutation Rate | 0.25 |
| Maximum Generations | 500 |
| Maximum Fitness | 28 |

## 🛠️ Tech Stack

- **React** — Component-based user interface
- **JavaScript** — Genetic algorithm implementation
- **Tailwind CSS** — Styling and responsive layout
- **Framer Motion** — Animations and transitions
- **React Icons** — UI icons
- **Vite** — Development server and build tool

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/BaharVahabi/eight-queens-genetic-algorithm.git
```

2. Navigate to the project directory:

```bash
cd eight-queens-genetic-algorithm
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL provided by Vite in your browser.

## 🎮 Execution Modes

The application provides two execution modes:

- **Auto Mode:** Runs the genetic algorithm automatically and updates the visualization as it progresses.
- **Step Mode:** Allows you to control the execution step by step, inspect intermediate operations, and explore how chromosomes are transformed.

## 📚 Learning Objectives

This project was developed to explore and demonstrate:

- Genetic Algorithm fundamentals
- Chromosome representation
- Fitness functions
- Tournament Selection
- Order Crossover (OX)
- Swap Mutation
- Elitism
- Evolution of populations across generations

## 📄 License

This project is available for educational and learning purposes.
