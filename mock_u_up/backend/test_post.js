const http = require('http');

const data = JSON.stringify({
  email: 'test@example.com',
  password: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let chunks = [];
  res.on('data', d => chunks.push(d));
  res.on('end', () => console.log('Response:', Buffer.concat(chunks).toString()));
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
