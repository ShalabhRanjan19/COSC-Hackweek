const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000';
const SESSION_ID = 'test-session-' + Date.now();

// Test utilities
class BlackBoxTester {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.results = [];
        this.discoveries = [];
    }

    async makeRequest(endpoint, method = 'POST', data = {}, headers = {}) {
        try {
            const config = {
                method,
                url: `${this.baseUrl}${endpoint}`,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            };

            if (method !== 'GET') {
                config.data = data;
            }

            const response = await axios(config);
            const result = {
                endpoint,
                method,
                input: data,
                headers,
                status: response.status,
                output: response.data,
                timestamp: Date.now()
            };

            this.results.push(result);
            return result;
        } catch (error) {
            const result = {
                endpoint,
                method,
                input: data,
                headers,
                status: error.response?.status || 0,
                output: error.response?.data || { error: error.message },
                timestamp: Date.now()
            };

            this.results.push(result);
            return result;
        }
    }

    async testEnigmaEndpoint() {
        console.log('\n🔍 Testing /api/enigma - Length-based behavior');
        
        const testCases = [
            { data: 'hi' },                    // 2 chars
            { data: 'hello' },                 // 5 chars
            { data: 'hello world' },           // 11 chars
            { data: 'this is a very long string that should trigger something' }, // 63 chars
            { data: 123 },                     // Number
            { data: '' },                      // Empty
        ];

        for (const testCase of testCases) {
            const result = await this.makeRequest('/api/enigma', 'POST', testCase);
            console.log(`Input: "${testCase.data}" (${testCase.data.toString().length} chars) -> ${JSON.stringify(result.output)}`);
        }
    }

    async testSequenceEndpoint() {
        console.log('\n🔢 Testing /api/sequence - Mathematical patterns');
        
        const fibNumbers = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];
        const random = [4, 6, 9, 10, 15, 20];

        console.log('Testing Fibonacci numbers:');
        for (const num of fibNumbers) {
            const result = await this.makeRequest('/api/sequence', 'POST', { number: num });
            console.log(`Fib ${num} -> ${JSON.stringify(result.output)}`);
        }

        console.log('\nTesting Prime numbers:');
        for (const num of primes.slice(0, 5)) {
            const result = await this.makeRequest('/api/sequence', 'POST', { number: num });
            console.log(`Prime ${num} -> ${JSON.stringify(result.output)}`);
        }

        console.log('\nTesting Random numbers:');
        for (const num of random.slice(0, 3)) {
            const result = await this.makeRequest('/api/sequence', 'POST', { number: num });
            console.log(`Random ${num} -> ${JSON.stringify(result.output)}`);
        }
    }

    async testTemporalEndpoint() {
        console.log('\n⏰ Testing /api/temporal - Time-based behavior');
        
        const now = Date.now();
        const testCases = [
            { timestamp: now },                    // Current time
            { timestamp: now - 5000 },            // 5 seconds ago
            { timestamp: now - 30000 },           // 30 seconds ago
            { timestamp: now - 1800000 },         // 30 minutes ago
            { timestamp: now - 7200000 },         // 2 hours ago
            {},                                    // No timestamp
        ];

        for (const testCase of testCases) {
            const result = await this.makeRequest('/api/temporal', 'POST', testCase);
            const timeDiff = testCase.timestamp ? Math.floor(Math.abs(now - testCase.timestamp) / 1000) : 0;
            console.log(`Time diff: ${timeDiff}s -> ${JSON.stringify(result.output)}`);
        }
    }

    async testIdentityEndpoint() {
        console.log('\n🎭 Testing /api/identity - Header-dependent behavior');
        
        const testCases = [
            { headers: {} },
            { headers: { 'User-Agent': 'Postman/1.0' } },
            { headers: { 'Authorization': 'Bearer secret-token' } },
            { headers: { 'x-mystery': 'reveal' } },
            { headers: { 'User-Agent': 'Postman/1.0', 'Authorization': 'Bearer token' } },
            { headers: { 'User-Agent': 'Mozilla/5.0', 'x-mystery': 'reveal' } },
        ];

        for (const testCase of testCases) {
            const result = await this.makeRequest('/api/identity', 'POST', {}, testCase.headers);
            console.log(`Headers: ${JSON.stringify(testCase.headers)} -> ${JSON.stringify(result.output)}`);
        }
    }

    async testCipherEndpoint() {
        console.log('\n🔐 Testing /api/cipher - Encoding/Decoding');
        
        const testCases = [
            { text: 'hello', operation: 'encode' },
            { text: 'hello', operation: 'encode', key: 3 },
            { text: 'khoor', operation: 'decode', key: 3 },
            { text: 'secret message', operation: 'encode', key: 13 },
            { text: 'frperg zrffntr', operation: 'decode', key: 13 },
        ];

        for (const testCase of testCases) {
            const result = await this.makeRequest('/api/cipher', 'POST', testCase);
            console.log(`${testCase.operation} "${testCase.text}" key:${testCase.key || 13} -> ${JSON.stringify(result.output)}`);
        }
    }

    async testStatefulEndpoint() {
        console.log('\n💾 Testing /api/stateful - State management');
        
        // Test without session
        let result = await this.makeRequest('/api/stateful', 'POST', {});
        console.log(`No session -> ${JSON.stringify(result.output)}`);

        // Test with session - multiple visits
        for (let i = 1; i <= 6; i++) {
            result = await this.makeRequest('/api/stateful', 'POST', {
                session_id: SESSION_ID,
                action: `visit_${i}`,
                data: `test_data_${i}`
            });
            console.log(`Visit ${i} -> ${JSON.stringify(result.output)}`);
        }
    }

    async testValidatorEndpoint() {
        console.log('\n✅ Testing /api/validator - Input validation');
        
        const testCases = [
            { email: 'test@example.com', password: 'password123', age: 25 },
            { email: 'admin@example.com', password: 'password123', age: 30 },
            { email: 'user@test.com', password: 'blackbox', age: 25 },
            { email: 'test@example.com', password: 'password123', age: 42 },
            { email: 'invalid-email', password: 'short', age: -5 },
            {},
        ];

        for (const testCase of testCases) {
            const result = await this.makeRequest('/api/validator', 'POST', testCase);
            console.log(`Validation ${JSON.stringify(testCase)} -> ${JSON.stringify(result.output)}`);
        }
    }

    async testHiddenEndpoints() {
        console.log('\n🕵️ Testing hidden endpoints');
        
        // Test hidden docs
        const docsResult = await this.makeRequest('/api/docs/hidden', 'GET');
        console.log('Hidden docs:', JSON.stringify(docsResult.output, null, 2));

        // Test health endpoint
        const healthResult = await this.makeRequest('/health', 'GET');
        console.log('Health check:', JSON.stringify(healthResult.output));

        // Test 404 behavior
        const notFoundResult = await this.makeRequest('/api/nonexistent', 'POST');
        console.log('404 response:', JSON.stringify(notFoundResult.output));
    }

    async runAllTests() {
        console.log('🚀 Starting Black Box Challenge Tests');
        console.log('=====================================');

        await this.testEnigmaEndpoint();
        await this.testSequenceEndpoint();
        await this.testTemporalEndpoint();
        await this.testIdentityEndpoint();
        await this.testCipherEndpoint();
        await this.testStatefulEndpoint();
        await this.testValidatorEndpoint();
        await this.testHiddenEndpoints();

        this.generateReport();
    }

    generateReport() {
        console.log('\n📊 ANALYSIS REPORT');
        console.log('==================');

        // Analyze patterns
        const endpointBehaviors = {};
        
        this.results.forEach(result => {
            if (!endpointBehaviors[result.endpoint]) {
                endpointBehaviors[result.endpoint] = {
                    patterns: [],
                    secrets_found: [],
                    behavior_type: 'unknown'
                };
            }

            const behavior = endpointBehaviors[result.endpoint];
            
            // Look for secrets
            if (result.output.secret) {
                behavior.secrets_found.push(result.output.secret);
            }

            // Identify behavior patterns
            if (result.endpoint === '/api/enigma') {
                behavior.behavior_type = 'length-dependent';
                behavior.patterns.push(`Input length ${result.input.data?.toString().length || 0} -> ${result.output.result}`);
            } else if (result.endpoint === '/api/sequence') {
                behavior.behavior_type = 'mathematical-pattern';
                behavior.patterns.push(`Number ${result.input.number} -> ${result.output.status}`);
            } else if (result.endpoint === '/api/temporal') {
                behavior.behavior_type = 'time-based';
                behavior.patterns.push(`Time state: ${result.output.temporal_state}`);
            } else if (result.endpoint === '/api/identity') {
                behavior.behavior_type = 'header-dependent';
                behavior.patterns.push(`Identity: ${result.output.identity}`);
            } else if (result.endpoint === '/api/cipher') {
                behavior.behavior_type = 'encoding-transformation';
                behavior.patterns.push(`${result.input.operation}: ${result.input.text} -> ${result.output.result}`);
            } else if (result.endpoint === '/api/stateful') {
                behavior.behavior_type = 'stateful-session';
                behavior.patterns.push(`Session state: ${result.output.status}`);
            } else if (result.endpoint === '/api/validator') {
                behavior.behavior_type = 'validation-with-easter-eggs';
                behavior.patterns.push(`Validation: ${result.output.status}`);
            }
        });

        // Print detailed analysis
        Object.entries(endpointBehaviors).forEach(([endpoint, behavior]) => {
            console.log(`\n${endpoint}:`);
            console.log(`  Type: ${behavior.behavior_type}`);
            console.log(`  Patterns discovered: ${behavior.patterns.length}`);
            if (behavior.secrets_found.length > 0) {
                console.log(`  🎉 Secrets found: ${behavior.secrets_found.length}`);
                behavior.secrets_found.forEach(secret => {
                    console.log(`    - "${secret}"`);
                });
            }
        });

        console.log(`\n📈 Total requests made: ${this.results.length}`);
        console.log(`📍 Endpoints discovered: ${Object.keys(endpointBehaviors).length}`);
        console.log(`🔓 Total secrets found: ${Object.values(endpointBehaviors).reduce((sum, b) => sum + b.secrets_found.length, 0)}`);
    }

    exportResults() {
        const report = {
            timestamp: new Date().toISOString(),
            session_id: SESSION_ID,
            total_requests: this.results.length,
            detailed_results: this.results,
            summary: 'Black Box Challenge reverse engineering complete'
        };

        console.log('\n💾 Export results to file:');
        console.log(JSON.stringify(report, null, 2));
        
        return report;
    }
}

// Run the tests
async function main() {
    const tester = new BlackBoxTester(BASE_URL);
    
    try {
        await tester.runAllTests();
        
        // Export detailed results
        console.log('\n' + '='.repeat(50));
        console.log('Export this data for your GitHub repository:');
        console.log('='.repeat(50));
        
        const exportData = tester.exportResults();
        
    } catch (error) {
        console.error('Test execution failed:', error.message);
        console.log('\n💡 Make sure the server is running: node server.js');
    }
}

// Individual test functions for targeted testing
async function testSpecificEndpoint(endpoint, testData) {
    const tester = new BlackBoxTester(BASE_URL);
    const result = await tester.makeRequest(endpoint, 'POST', testData);
    console.log(`Result: ${JSON.stringify(result.output, null, 2)}`);
    return result;
}

// Export for use in other scripts
module.exports = {
    BlackBoxTester,
    testSpecificEndpoint,
    SESSION_ID
};

// Run if called directly
if (require.main === module) {
    main();
}