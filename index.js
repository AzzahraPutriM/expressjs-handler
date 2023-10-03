// import library expressjs
const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json()) // for parsing application/json
app.use(cors());

// create logger middleware function
function LoggerMiddleware(req, res, next) {
    console.log(`Request received at: ${new Date()}`);
    next(); //continue process next function
}
app.use(LoggerMiddleware);

// create handling http GET all customers 
app.get('/api/customers', (req, res) => {
    const { keyword, category, limit } = req.query; //req query string by keyword, category, limit

    res.status(200).json({
        code: 200,
        massage: "get success",
        data: [
            {
                name: "Azzahra Putri",
                email: "azzahra@gmail.com",
                role: "frontend"
            },
            {
                name: "Putri Maharani",
                email: "putri@gmail.com",
                role: "backend"
            }
        ],
        pagination: {
            total_record: 100, 
            current_page: 1,
            total_pages: limit
        },
        search: {
            keyword: keyword,
            category: category
        }
    })
})

// create handling http POST add customers
app.post('/api/customers', LoggerMiddleware, (req, res) => {
    console.log(req.body);
    const { name, email, role} = req.body;

    // res.send(`thank you, ${name} with email: ${email} and role: ${role} we have received your subbmision`);
    res.status(201).json({
        massage: "create data successfuly",
        data: {
            name: name, 
            email: email,
            role: role
        }
    })
})

// create handling http GET detail customers
app.get('/api/customers/:id', (req, res) => {
    const customersID = req.params.id; //req params by id customers
    res.status(200).json({
        massage: "get success",
        data: {
            customersID: customersID,
            name: "Azzahra Putri",
            email: "azzahra@gmail.com",
            role: "frontend"
        }
    })
})

// define to listener port using 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})