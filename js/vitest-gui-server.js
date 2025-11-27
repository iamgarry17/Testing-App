const express = require('express');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');
const glob = require('glob');

const app = express();
const port = 4001;

app.use(cors());
app.use(express.json());

const workspaceDir = process.cwd();

// --- DATA ---
    const mockFiles = [
      "src/components/button.test.ts",
      "src/components/modal.test.ts",
      "src/utils/date-formatter.test.js",
      "src/hooks/use-user.test.tsx",
      "src/features/login/login.spec.js",
      "src/features/signup/signup.spec.js",
      "src/features/payment/payment.spec.js",
      "src/features/home/home.spec.js",
      "src/features/myaccount/myaccount.spec.js",
      "src/features/creditcard/creditcard.spec.js"
      
    ];

// --- ENDPOINTS ---

// 1. Get Workspace Path
app.get('/workspace', (req, res) => {
  res.json({ path: workspaceDir });
});

// 2. Get Tests (MOCKED)
app.get('/tests', (req, res) => {
  console.log('Mock tests requested. Sending 5 mock files.');
  res.json(mockFiles);
});

// 3. Run All Tests (MOCKED)
app.post('/run-all', (req, res) => {
  console.log('Mock "Run All" requested. Generating random results...');
  
  // Generate a fake report
  const results = {
    numTotalTests: Math.floor(Math.random() * 10) + 5,
    numPassedTests: 0,
    numFailedTests: 0,
    testResults: []
  };

  mockFiles.forEach(file => {
    const isFailed = Math.random() > 0.5; // 50% chance of failure
    const numTests = Math.floor(Math.random() * 3) + 1;
    let numPassedInSuite = 0;
    let numFailedInSuite = 0;
    
    let assertionResults = [];
    for(let i=0; i<numTests; i++) {
        const testFailed = (isFailed && i === 0) || Math.random() > 0.7; // Ensure at least one test fails in a failed suite
        if(testFailed) {
            numFailedInSuite++;
            assertionResults.push({
                title: `test ${i+1} (mock)`,
                status: 'failed',
                failureMessages: [`AssertionError: expected ${i} to be ${i+1}.`]
            });
        } else {
            numPassedInSuite++;
            assertionResults.push({
                title: `test ${i+1} (mock)`,
                status: 'passed',
                failureMessages: []
            });
        }
    }

    results.testResults.push({
      name: path.join(workspaceDir, file), // Send full path to match 'real' server
      status: numFailedInSuite > 0 ? 'failed' : 'passed',
      assertionResults: assertionResults
    });
    
    results.numPassedTests += numPassedInSuite;
    results.numFailedTests += numFailedInSuite;
  });
  
  results.numTotalTests = results.numPassedTests + results.numFailedTests;

  res.json(results);
});

// 4. Run Selected Tests (MOCKED)
// This will just run all tests as a mock, for simplicity.
app.post('/run', (req, res) => {
    console.log('Mock "Run Selected" requested. Running all mocks instead...');
    // Just re-route to the /run-all logic
    // In a real app, you'd filter `req.body.testPaths`
    
      const results = {
        numTotalTests: Math.floor(Math.random() * 10) + 5,
        numPassedTests: 0,
        numFailedTests: 0,
        testResults: []
      };

      mockFiles.forEach(file => {
        const isFailed = Math.random() > 0.5; // 50% chance of failure
        const numTests = Math.floor(Math.random() * 3) + 1;
        let numPassedInSuite = 0;
        let numFailedInSuite = 0;
        
        let assertionResults = [];
        for(let i=0; i<numTests; i++) {
            const testFailed = (isFailed && i === 0) || Math.random() > 0.7; // Ensure at least one test fails in a failed suite
            if(testFailed) {
                numFailedInSuite++;
                assertionResults.push({
                    title: `test ${i+1} (mock)`,
                    status: 'failed',
                    failureMessages: [`AssertionError: expected ${i} to be ${i+1}.`]
                });
            } else {
                numPassedInSuite++;
                assertionResults.push({
                    title: `test ${i+1} (mock)`,
                    status: 'passed',
                    failureMessages: []
                });
            }
        }

        results.testResults.push({
          name: path.join(workspaceDir, file), // Send full path to match 'real' server
          status: numFailedInSuite > 0 ? 'failed' : 'passed',
          assertionResults: assertionResults
        });
        
        results.numPassedTests += numPassedInSuite;
        results.numFailedTests += numFailedInSuite;
      });
      
      results.numTotalTests = results.numPassedTests + results.numFailedTests;

      res.json(results);
});


app.listen(port, () => {
  console.log(`Vitest GUI Agent is running on http://localhost:${port}`);
  console.log(`Serving tests from: ${workspaceDir}`);
});

