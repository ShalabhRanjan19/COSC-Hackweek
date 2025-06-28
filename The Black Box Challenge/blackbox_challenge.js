const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for testing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Helper functions
const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const caesarCipher = (text, shift) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
};

// Endpoint 1: Simple but deceptive - Returns different responses based on input length
app.post('/api/enigma', (req, res) => {
    const { data } = req.body;
    
    if (!data) {
        return res.status(400).json({ error: 'Missing data field' });
    }
    
    const length = data.toString().length;
    
    if (length < 5) {
        res.json({ result: 'short', code: 100, message: 'Brevity is key' });
    } else if (length < 10) {
        res.json({ result: 'medium', code: 200, message: 'Getting warmer' });
    } else if (length < 20) {
        res.json({ result: 'long', code: 300, message: 'Almost there' });
    } else {
        res.json({ result: 'decoded', code: 400, secret: 'Length matters in mysterious ways' });
    }
});

// Endpoint 2: Mathematical pattern - Fibonacci sequence trigger
app.post('/api/sequence', (req, res) => {
    const { number } = req.body;
    
    if (typeof number !== 'number') {
        return res.status(400).json({ error: 'Number required' });
    }
    
    const fib = fibonacci(Math.abs(number) % 20); // Limit to prevent infinite computation
    
    if (fib === number) {
        res.json({ 
            status: 'fibonacci_match', 
            result: true, 
            message: 'The golden spiral reveals its secrets',
            next_hint: 'Try primes for the next challenge'
        });
    } else if (isPrime(number)) {
        res.json({ 
            status: 'prime_detected', 
            result: fib, 
            message: 'Primes unlock different paths'
        });
    } else {
        res.json({ 
            status: 'calculating', 
            result: fib,
            message: 'Numbers dance in patterns'
        });
    }
});

// Endpoint 3: Time-based behavior - Changes response based on timestamp
app.post('/api/temporal', (req, res) => {
    const { timestamp } = req.body;
    const currentTime = Date.now();
    const inputTime = timestamp || currentTime;
    
    const timeDiff = Math.abs(currentTime - inputTime);
    const seconds = Math.floor(timeDiff / 1000);
    
    if (seconds < 10) {
        res.json({ 
            temporal_state: 'present', 
            message: 'Living in the moment',
            time_drift: seconds
        });
    } else if (seconds < 60) {
        res.json({ 
            temporal_state: 'recent', 
            message: 'Recent memories fade',
            time_drift: seconds
        });
    } else if (seconds < 3600) {
        res.json({ 
            temporal_state: 'distant', 
            message: 'Time creates distance',
            time_drift: seconds
        });
    } else {
        res.json({ 
            temporal_state: 'ancient', 
            message: 'From a different era entirely',
            time_drift: seconds,
            secret: 'Time is the ultimate encryption'
        });
    }
});

// Endpoint 4: Header-dependent behavior
app.post('/api/identity', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const authorization = req.headers['authorization'] || '';
    const customHeader = req.headers['x-mystery'] || '';
    
    if (customHeader === 'reveal') {
        res.json({
            identity: 'revealed',
            message: 'Custom headers are the key',
            all_headers: req.headers,
            secret: 'Headers carry hidden information'
        });
    } else if (authorization.includes('Bearer')) {
        res.json({
            identity: 'authenticated',
            message: 'Bearer tokens suggest authentication',
            hint: 'Try x-mystery header with value "reveal"'
        });
    } else if (userAgent.includes('Postman')) {
        res.json({
            identity: 'postman_detected',
            message: 'Postman leaves traces',
            hint: 'Authorization header might help'
        });
    } else {
        res.json({
            identity: 'unknown',
            message: 'Who goes there?',
            hint: 'Your client reveals more than you think'
        });
    }
});

// Endpoint 5: Encoding/Decoding challenge
app.post('/api/cipher', (req, res) => {
    const { text, operation, key } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Text required' });
    }
    
    const numericKey = parseInt(key) || 13;
    
    if (operation === 'decode') {
        const decoded = caesarCipher(text, -numericKey);
        res.json({
            operation: 'decode',
            result: decoded,
            message: 'Decryption complete',
            hint: 'Try encoding with the same key'
        });
    } else {
        const encoded = caesarCipher(text, numericKey);
        res.json({
            operation: 'encode',
            result: encoded,
            message: 'Encryption applied',
            hint: 'Use operation: "decode" to reverse'
        });
    }
});

// Endpoint 6: State-dependent (uses simple in-memory state)
let globalCounter = 0;
const sessionData = new Map();

app.post('/api/stateful', (req, res) => {
    const { session_id, action, data } = req.body;
    
    globalCounter++;
    
    if (!session_id) {
        return res.json({
            global_counter: globalCounter,
            message: 'Session ID required for personalized experience',
            hint: 'Include session_id in your request'
        });
    }
    
    if (!sessionData.has(session_id)) {
        sessionData.set(session_id, { visits: 0, history: [] });
    }
    
    const session = sessionData.get(session_id);
    session.visits++;
    session.history.push({ action, data, timestamp: Date.now() });
    
    // Keep only last 10 history items
    if (session.history.length > 10) {
        session.history = session.history.slice(-10);
    }
    
    if (session.visits === 1) {
        res.json({
            status: 'new_session',
            session_id,
            global_counter: globalCounter,
            message: 'Welcome, newcomer'
        });
    } else if (session.visits < 5) {
        res.json({
            status: 'returning_visitor',
            session_id,
            visits: session.visits,
            global_counter: globalCounter,
            message: 'Getting familiar'
        });
    } else {
        res.json({
            status: 'veteran',
            session_id,
            visits: session.visits,
            history: session.history,
            global_counter: globalCounter,
            message: 'You know the ways',
            secret: 'Persistence reveals patterns'
        });
    }
});

// Endpoint 7: Input validation with hidden logic
app.post('/api/validator', (req, res) => {
    const { email, password, age } = req.body;
    
    const errors = [];
    const warnings = [];
    
    // Email validation with hidden pattern
    if (!email) {
        errors.push('Email required');
    } else if (!email.includes('@')) {
        errors.push('Invalid email format');
    } else if (email.includes('admin')) {
        res.json({
            status: 'admin_detected',
            message: 'Admin credentials unlock special access',
            secret: 'Admin emails have special powers',
            bypass: true
        });
        return;
    }
    
    // Password with hidden complexity
    if (!password) {
        errors.push('Password required');
    } else {
        if (password.length < 8) warnings.push('Password too short');
        if (!/\d/.test(password)) warnings.push('Password needs numbers');
        if (password === 'blackbox') {
            res.json({
                status: 'secret_password',
                message: 'Secret word recognized',
                secret: 'Special passwords bypass normal rules'
            });
            return;
        }
    }
    
    // Age with hidden logic
    if (age !== undefined) {
        if (age < 0 || age > 150) errors.push('Invalid age range');
        if (age === 42) {
            res.json({
                status: 'answer_to_everything',
                message: 'The answer to life, universe, and everything',
                secret: '42 is always special'
            });
            return;
        }
    }
    
    if (errors.length > 0) {
        res.status(400).json({ errors, warnings });
    } else {
        res.json({
            status: 'valid',
            message: 'All validations passed',
            warnings
        });
    }
});

// Documentation endpoint (hidden)
app.get('/api/docs/hidden', (req, res) => {
    res.json({
        message: 'You found the hidden documentation!',
        endpoints: {
            '/api/enigma': 'Length-based responses - try different input lengths',
            '/api/sequence': 'Mathematical patterns - Fibonacci and primes',
            '/api/temporal': 'Time-based behavior - uses timestamps',
            '/api/identity': 'Header-dependent - check your headers',
            '/api/cipher': 'Encoding/decoding - Caesar cipher implementation',
            '/api/stateful': 'State tracking - requires session management',
            '/api/validator': 'Input validation - has special keywords'
        },
        hints: {
            'enigma': 'Try inputs of different lengths: 3 chars, 7 chars, 15 chars, 25 chars',
            'sequence': 'Try Fibonacci numbers: 1, 1, 2, 3, 5, 8, 13... or primes: 2, 3, 5, 7, 11...',
            'temporal': 'Send timestamps - current, past, or future',
            'identity': 'Try different User-Agent, Authorization, and x-mystery headers',
            'cipher': 'Send text with operation: encode/decode and optional key',
            'stateful': 'Use consistent session_id across requests',
            'validator': 'Try special values: admin@test.com, password: blackbox, age: 42'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Black Box Challenge is running', timestamp: Date.now() });
});

// Catch-all for undefined endpoints
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        hint: 'Maybe there are hidden paths?',
        discovered_methods: ['POST /api/enigma', 'POST /api/sequence', 'POST /api/temporal'],
        secret_hint: 'Try GET /api/docs/hidden for more information'
    });
});

app.listen(PORT, () => {
    console.log(`🔒 Black Box Challenge running on port ${PORT}`);
    console.log('🕵️  Start exploring the mysterious endpoints!');
    console.log('💡 Hint: Try POST requests to /api/enigma, /api/sequence, /api/temporal');
});

module.exports = app;