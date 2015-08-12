// multiple choice type question, select one answer
var quizApp = quizApp || {};

quizApp.MultiQuestionView = Backbone.View.extend({
    tagName: 'div',
    template: $("#multiQuestionTemplate").html(),

    initialize: function () {

    },

    events: {
        'click .checkResults': 'checkResults',
        'click .nextQuestion': 'nextQuestion'
    },

    render: function () {
        var tmpl = _.template(this.template);
        this.$el.append(tmpl(this.model.toJSON()));
        return this;
    },

    getScore: function (selected) {
		var answer = this.model.get('answer');
		//answer must be an array of length 1 for multiple choice, single answer questions
		if (answer.length === 1) {
			return (selected === answer[0] ? 1 : 0);
		} else {
		    return 0;
		}
    },

    checkResults: function () {
        var selected = this.$el.find('input:radio:checked').val();
        var score = this.getScore(selected);
        this.model.set({
            score: score,
            possibleScore: 1
        });

        this.$el.find('.questionCtn').remove();
        this.$el.find('.status').html(score === 1 ? 'Correct!' : 'Incorrect!');
		if (score === 1) {
			this.$el.find('#explanation').hide();
		}
        this.$el.find('.answerCtn').fadeIn();
        this.$el.find('.buttons button').each(function () {
            $(this).toggle();
        });
    },

    nextQuestion: function () {
        this.trigger('nextQuestion');
    },

    //use instead of remove() because it empties $el instead of removing it.
    close: function () {
        this.unbind();
        this.undelegateEvents();
        this.stopListening();
        this.$el.empty();
    }

});