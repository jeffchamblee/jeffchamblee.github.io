

var quizApp = quizApp || {}
var SOCRATA_DATA_SET_URL = "https://opendata.socrata.com/resource/cche-kwgt.json";
var SOCRATA_QUERY_SELECT = "?$select=question, option_1, option_2, option_3, option_4, option_5, answer";
var SUBTITLE = '4 total questions';

var quiz = new quizApp.Quiz(getQuizData(SOCRATA_DATA_SET_URL, SOCRATA_QUERY_SELECT, SUBTITLE));
var quizView = new quizApp.QuizView({model: quiz, el:$('#quiz')});
	quizView.render();