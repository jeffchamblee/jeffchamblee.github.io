//get options
function getOptions(questionRecord) {
	//'"options":["' + data[index].option_1 + '","' + data[index].option_2 + '","' + data[index].option_3 + '","' + data[index].option_4 + '","' + data[index].option_5 + '"],' +
	//return '"options":["' + questionRecord.option_1 + '","' + questionRecord.option_2 + '","' + questionRecord.option_3 + '","' + questionRecord.option_4 + '","' + questionRecord.option_5 + '"],'
    var options = [];
	if (questionRecord.option_1) {
		options.push(questionRecord.option_1);
	}
	if (questionRecord.option_2) {
		options.push(questionRecord.option_2);
	}
	if (questionRecord.option_3) {
		options.push(questionRecord.option_3);
	}
	if (questionRecord.option_4) {
		options.push(questionRecord.option_4);
	}
	if (questionRecord.option_5) {
		options.push(questionRecord.option_5);
	}
	//console.log(options);
    //return options;
	var optString = "";
	for (var index = 0; index < options.length; index++) {
		optString += options[index];
		if (index < (options.length - 1)) {
			optString += '","';
		}
	}
	return '"options":["' + optString + '"],'
}

//convert answer from a list of numbers (for example 1,3,5) to array of answers
function getAnswersList(questionRecord) {
	//Append answers to array
    var answers = [];
	for (var index=1; index<=5; index++) {
		if (questionRecord.answer.indexOf(index) >= 0) {
			switch (index) {
			case 1:
				answers.push(questionRecord.option_1);
				break;
			case 2:
				answers.push(questionRecord.option_2);
				break;
			case 3:
				answers.push(questionRecord.option_3);
				break;
			case 4:
				answers.push(questionRecord.option_4);
				break;
			case 5:
				answers.push(questionRecord.option_5);
				break;
			}
		}
	}
	//console.log(answers);
    return answers;
}

function getAnswerString(answersList) {
	var answerString = "";
	for (var index=0; index < answersList.length; index++) {
		answerString += answersList[index];
		if (index < (answersList.length - 1)) {
			answerString += '","';
		}
	}
	return '"answer":["' + answerString + '"],';
	
}

function getAnswerHtml(answersList) {
	var answerString = "The correct answer is: <ul>";
	for (var index=0; index < answersList.length; index++) {
		answerString += ('<li>' + answersList[index] + '</li>');
	}
	answerString += '<ul>';
	return answerString;
	
}

//Get Socrata data synchronously
function querySocrataSync(SOCRATA_URL) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", SOCRATA_URL, false);
    //xmlHttp.setRequestHeader("X-App-Token", "8hzhcVTrYlqmyTLwV2RExyqAG");
    xmlHttp.send();
    return jQuery.parseJSON(xmlHttp.responseText);
}

//The data model of the questions stored in Socrata is different from the data model needed by the views, so the data must be transformed. 
function transformSchema(data, subtitle) {
    //here's what the data schema needs to be:
    var result = {
        'title': 'Test Your Knowledge of Web Application Security',
        'subtitle': subtitle,
        'introText': 'Learn about Web Application Security at the Open Web Application Security Project (OWASP) http://www.owasp.org',
/*         'questions': [
            {
                'title': 'What is your favorite color?',
                'subtitle': '',
                'type': 'multi',
                'question': '',
                'options': [
                    'Red',
                    'Green',
                    'Blue',
                    'Yellow'
                ],
                'answer': 'Blue',
                'explanation': 'Your favorite color is blue!'
            },
        ]
 */    };
    var questionsList = "";
    var questionRec;
    var index = 0;
    for (index = 0; index < data.length; index++) {
		answers = getAnswersList(data[index]);
		type = (answers.length === 1 ? "multi" : "multi-select");
		answerString = getAnswerString(answers);
        questionRec =
            '{"title":"","subtitle":"","type":"' + type + '" ,"question":"' + data[index].question + '" ,' +
            //'"options":"' + getOptions(data[index]) + '",' +
			getOptions(data[index]) + 
			//'"options":["' + data[index].option_1 + '","' + data[index].option_2 + '","' + data[index].option_3 + '","' + data[index].option_4 + '","' + data[index].option_5 + '"],' +
            answerString +
            '"explanation":"' + getAnswerHtml(answers) + '"}';
		//console.log(questionRec);
        questionsList += (questionRec + ',');
    }
    result.questions = eval("([" + questionsList + "])");
    return result;
}

//called by owaspQuiz*.js
function getQuizData(socrataDataSetUrl, socrataQuerySelect, subtitle) {
    var SOCRATA_URL = socrataDataSetUrl + socrataQuerySelect;
    var data = querySocrataSync(SOCRATA_URL);
    return transformSchema(data, subtitle);
}