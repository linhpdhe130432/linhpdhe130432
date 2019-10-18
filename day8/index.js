const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');


app.use(express.static('./public'));

app.use(bodyParser.json());

app.get("/ask", (req, res) => {

    //__dirname: current working directory
    res.sendFile(path.resolve(__dirname, './public/ask.html'));
});

app.get('/questions/:questionId', (req, res) => {
    //params

    res.sendFile(path.resolve(__dirname, './public/question.html'));
});

app.get('/get-question-by-id/:questionId', (req, res) => {
    const questionId = req.params.questionId;

    // get Question
    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        } else {
            let array = JSON.parse(data);

            //duyệt vòng for để lấy id
            for (let i = 0; i < array.length; i++) {
                if (array[i].id == questionId) {
                    res.json({
                        success: true,
                        data: array[i],
                    });
                    break;
                }

            }
        }
    })
});

//random id
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
app.get('random-question', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        } else {
            var questData = JSON.parse(data);
            var i = getRandomInt(0, questData.length);
            const questContent = {
                id: questData[i].id,
                content: questData[i].content,
                like: questData[i].like,
                dislike: questData[i].dislike
            };
            res.json({
                success: true,
                data: questContent,
            });
        }
    });
});



//send question to database
app.post('/create-question', (req, res) => {
    const newQuestion = {
        id: new Date().getTime(),
        content: req.body.questionContent,
        like: 0,
        dislike: 0,
    }
    // read data + convert json
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        const questions = JSON.parse(data);

        //push new question
        questions.push(newQuestion);

        //convert array => json + write new data
        fs.writeFile('data.json', JSON.stringify(questions), (err) => {

            res.json({
                success: true,
                data: newQuestion,
            });
        })

    })

});

//update vote
app.put('/vote', function (req, res) {
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        } else {

            const question = JSON.parse(data);
            for (let i = 0; i < question.length; i++) {
                if (req.body.id === question[i].id) {
                    question[i].like = req.body.like;
                    question[i].dislike = req.body.dislike;
                    fs.writeFile('./data.json', JSON.stringify(question), (err, data) => {
                        if (err) {
                            res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        } else {
                            res.json({
                                success: true,
                                data: question[i],
                            })
                        }
                    })
                }
            }
        }


    })
})

app.listen(3000, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server listen on port 3000...');
    }
});