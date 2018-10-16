const http = require('http');
const fs = require('fs');
const port = 3000;

const petGiver = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        fs.readFile('./server/petStorage.json', 'utf8', (err, data) => {
            
            if (err) {
                console.log(err);
                res.end(JSON.stringify([]));
            } else {
                res.end(data);
            }
        });
    } 
    else if (req.method === 'POST') {
        req.on('data', newPet => {
            newPet = JSON.parse(newPet);

            return new Promise(function(resolve, reject) {
                fs.readFile('./server/petStorage.json', 'utf8', (err, petStorage) => {
                    if (err) {
                        reject(err);
                    }

                    petStorage = JSON.parse(petStorage);
                    resolve(petStorage);
                });
            })
            .then((petStorage) => {
                petStorage.push(newPet);
                fs.writeFile('./server/petStorage.json', JSON.stringify(petStorage), 'utf8', (err) => {
                    if (err) {
                        throw err;
                    } else {
                        res.end();
                    }
                });
            })
            .catch((error) => {
                console.log(error)
                res.end();
            });
        });
    } else {
        res.end();
    }
};

const petServer = http.createServer(petGiver);

petServer.listen(port, (err) => {
    if (err) {
        console.log('Something bad happened');
    }

    console.log('Succefully created connection on port ' + port);
});
