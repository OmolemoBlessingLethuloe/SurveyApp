const {getView} = require('./survey_response_answers/answers');
var Mustache = require("mustache");
let fs = require("fs");


async function test(){
    const testing = await getView();
    // let testTemplate = [];
    let result = [];

    testing.forEach(test => {
            for (const { Text, QuestionId, PossibleAnswers, Answer, Name} of test) {
                if (!result[Text]) result[Text] = [];

                result[Text].push({
                    Text, QuestionId, Answer, Name,  PossibleAnswers,
                })
            }
        })

    console.log(result)

        let file = fs.createWriteStream(`test.txt`);

        let testingTemplate =`
{{Text}}--{{PossibleAnswers}}--{{Answer}}
`


    Object.entries(result).forEach((currentItem) => {
        currentItem[1].forEach(item => {
                var output = Mustache.render(testingTemplate,item);
                file.write(output);
        })

    })

}

test()


