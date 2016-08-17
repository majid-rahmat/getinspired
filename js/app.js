$(document).ready( function() {
	onSubmit('.unanswered-getter', 'tags', getUnanswered);
    onSubmit('.inspiration-getter', 'answerers', getInspired);
});

function onSubmit(selector, inputName, get) {
    $(selector).submit(function(e) {
        e.preventDefault();
        $('.results').html('');
        var tags = $(this).find("input[name=" + inputName + "]").val();
        get(tags);
    });
}

function getUnanswered(tags) {
	
	var request = { 
		tagged: tags,
		site: 'stackoverflow',
		order: 'desc',
		sort: 'creation'
	};
	
	$.ajax({
		url: "http://api.stackexchange.com/2.2/questions/unanswered",
		data: request,
		dataType: "jsonp",
		type: "GET",
	})
	.done(function(result){ 
		var searchResults = showSearchResults(request.tagged, result.items.length);

		$('.search-results').html(searchResults);
		$.each(result.items, function(i, item) {
			var question = showQuestion(item);
			$('.results').append(question);
		});
	})
	.fail(function(jqXHR, error){ 
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};

var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query + '</strong>';
	return results;
};

var showQuestion = function(question) {
	
	var result = $('.templates .question').clone();
	
	var questionElem = result.find('.question-text a');
	questionElem.attr('href', question.link);
	questionElem.text(question.title);

	var asked = result.find('.asked-date');
	var date = new Date(1000*question.creation_date);
	asked.text(date.toString());

	var viewed = result.find('.viewed');
	viewed.text(question.view_count);

	var asker = result.find('.asker');
	asker.html('<p>Name: <a target="_blank" '+
		'href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
		question.owner.display_name +
		'</a></p>' +
		'<p>Reputation: ' + question.owner.reputation + '</p>'
	);

	return result;
};

var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

