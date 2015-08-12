

var quizApp = quizApp || {}
var quiz = new quizApp.Quiz(getQuizData());
var quizView = new quizApp.QuizView({model: quiz, el:$('#quiz')});
	quizView.render();