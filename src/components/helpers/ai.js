// AI logic for Tic-Tac-Toe using minimax algorithm
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Check if there's a winner
const checkWinner = (board) => {
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

// Check if the board is full
const isBoardFull = (board) => {
    return board.every(cell => cell !== '');
};

// Evaluate the board state
const evaluateBoard = (board) => {
    const winner = checkWinner(board);
    if (winner === 'X') return 10;
    if (winner === 'O') return -10;
    return 0;
};

// Minimax algorithm
const minimax = (board, depth, isMaximizing) => {
    const score = evaluateBoard(board);

    // Terminal states
    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                const score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

// Find the best move for the AI (Hard Difficulty - Minimax)
const findBestMove = (board) => {
    let bestScore = -Infinity;
    let bestMove = -1;

    // Try each empty cell
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            const score = minimax(board, 0, false);
            board[i] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
};

// Get a random valid move (Easy Difficulty)
const getRandomMove = (board) => {
    const emptyCells = board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }
    return -1; // No empty cells
};

// Get a move for Medium Difficulty
const getMediumMove = (board) => {
    const player = 'X'; // AI is always X
    const opponent = 'O';
    const emptyCells = board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);

    // 1. Check for immediate winning move
    for (const index of emptyCells) {
        const tempBoard = [...board];
        tempBoard[index] = player;
        if (checkWinner(tempBoard) === player) {
            return index;
        }
    }

    // 2. Check for immediate blocking move
    for (const index of emptyCells) {
        const tempBoard = [...board];
        tempBoard[index] = opponent;
        if (checkWinner(tempBoard) === opponent) {
            return index;
        }
    }

    // 3. Take the center if available
    if (board[4] === '') {
        return 4;
    }

    // 4. Take a random corner if available
    const corners = [0, 2, 6, 8].filter(i => board[i] === '');
    if (corners.length > 0) {
        const randomIndex = Math.floor(Math.random() * corners.length);
        return corners[randomIndex];
    }

    // 5. Take any random available move
    return getRandomMove(board);
};

// Make AI move with a slight delay to feel more natural
const makeAIMove = (board, onPlay, aiDifficulty = 'hard') => {
    let move = -1;
    switch (aiDifficulty) {
        case 'easy':
            move = getRandomMove(board);
            break;
        case 'medium':
            move = getMediumMove(board);
            break;
        case 'hard':
        default:
            move = findBestMove(board);
            break;
    }

    if (move !== -1) {
        setTimeout(() => {
            onPlay(move);
        }, 500); // 500ms delay
    }
};

export { makeAIMove, checkWinner, isBoardFull }; 