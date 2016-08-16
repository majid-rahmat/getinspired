$(document).ready( function() {
	$('.unanswered-getter').submit( function(e){
		e.preventDefault();
		$('.results').html('');
		var tags = $(this).find("input[name='tags']").val();
		getUnanswered(tags);
	});
	$('.inspiration-getter').submit( function(e){
		e.preventDefault();
		$('.results').html('');
		var tags = $(this).find("input[name='tags']").val();
		getInspired(tags);
	});

var getUnanswered = function(tags) {
	
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

var getInspired = function(tags) {
	
	var request = { 
		tagged: tags,
		site: 'stackoverflow',
		order: 'desc',
		sort: 'creation',
		"items": [],
  		"has_more": false,
  		"quota_max": 10000,
	};
	
	$.ajax({
		url: "http://api.stackexchange.com/2.2/tags/{tag}/top-answerers/all_time?site=stackoverflow",
		data: request,
		dataType: "jsonp",
		type: "GET",
	})
	.done(function(result){ 
		var searchResults = showSearchResultsI(request.tagged, result.items.length);

		$('.search-results').html(searchResults);
		$.each(result.items, function(i, item) {
			var question = showQuestionI(item);
			$('.results').append(question);
		});
	})
	.fail(function(jqXHR, error){ 
		var errorElem = showErrorI(error);
		$('.search-results').append(errorElem);
	});
};

var showSearchResultsI = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query + '</strong>';
	return results;
};

var showQuestionI = function(question) {
	
	var result = $('.templates .question').clone();
	
	var questionElem = result.find('.question-text a');
	questionElem.attr('href', user.link);
	questionElem.text(user.title);

	var asked = result.find('.asked-date');
	var date = new Date(1000*user.creation_date);
	asked.text(date.toString());

	var viewed = result.find('.viewed');
	viewed.text(user.view_count);

	var asker = result.find('.asker');
	asker.html('<p>Name: <a target="_blank" '+
		'href=http://stackoverflow.com/users/' + user.user_id + ' >' +
		user.display_name +
		'</a></p>' +
		'<p>Reputation: ' + user.reputation + '</p>'
	);

	return result;
};

var showErrorI = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};
});
