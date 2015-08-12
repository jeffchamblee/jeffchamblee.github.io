// multiple choice type question, select multiple answers
var quizApp = quizApp || {};

quizApp.MultiChoiceQuestionView = Backbone.View.extend({
    tagName: 'div',
    template: $("#multiChoiceQuestionTemplate").html(),

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

    checkResults: function () {
		var selected = [];
		$('input:checkbox:checked').each(function() {
			selected.push($(this).attr("value") + this.id);
		});
        var score = this.getScore(selected);
        this.model.set({
            score: score,
            possibleScore: 1
        });

        this.$el.find('.questionCtn').remove();
        this.$el.find('.status').html(score === 1 ? 'Correct!' : 'Incorrect!');
        this.$el.find('.answerCtn').fadeIn();
		if (score === 1) {
			this.$el.find('#explanation').hide();
		}
        this.$el.find('.buttons button').each(function () {
            $(this).toggle();
        });
    },

    getScore: function (selected) {
		var answer = this.model.get('answer');
		if (selected.length !== answer.length) {
			return 0;
		}
		for (var index = 0; index < selected.length; index++) {
			if (selected[index] !== answer[index]) {
				return 0;
			}
		}
        return 1;
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