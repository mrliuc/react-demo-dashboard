const fs = require('fs');
const Express = require('express');
const bodyParser = require('body-parser');
const Storage = require('./storage')

const dataPath = './data'
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath)
}
const storage = new Storage(dataPath + '/data.json')

const app = new Express();

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10MB',
}));

app.use(bodyParser.json({ limit: '10MB' }));

app.all('*', async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, if-modified-since');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // 让options请求快速返回/
    } else {
        next();
    }
});

app.use('/dataSource1', (req, res) => {
    return res.send('dataSource1')
})

app.use('/dataSource2', (req, res) => {
    return res.send('dataSource2')
})

app.use('/updateOrAdd', (req, res) => {
    const widget = req.body.Widget;

    storage.updateOrAdd(widget);

    res.status(200).send();
})

app.use('/del', (req, res) => {

    const name = req.body.Name

    storage.del(name)

    res.status(200).send();
})

app.use('/list', (req, res) => {
    const groupName = req.body.GroupName;
    const name = req.body.Name;

    let data = storage.list();
  
    if (groupName) {
        data = data.filter(s => s.GroupName === groupName)
    }
    if (name) {
        data = data.filter(s => s.Name === name)
    }

    res.status(200).send(data);
})

app.listen(10001, () => {
    console.log('Service is started');
});