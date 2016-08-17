function getInspired(tags) {
	
	var request = { 
		order: 'desc',
		sort: 'creation',
		};
	//string + var+string
	$.ajax({
		url: "http://api.stackexchange.com/2.2/tags/" + tags + "/top-answerers/all_time?site=stackoverflow",
		data: request,
		dataType: "jsonp",
		type: "GET",
	})
	.done(function(result){ 
		var searchResults = showSearchResultsI(request.tagged, result.items.length);
		console.log(result);

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

function getInspired(tags) {
	
	var request = { 
		tagged: tags,
		order: 'desc',
		sort: 'creation',
		};
	//string + var+string
	$.ajax({
		url: "http://api.stackexchange.com/2.2/tags/" + tags + "/top-answerers/all_time?site=stackoverflow",
		data: request,
		dataType: "jsonp",
		type: "GET",
	})
	.done(function(result){ 
		console.log(result);
		var searchResults = showSearchResults(request.tagged, result.items.length);

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
	
	questionElem.text(user.reputation);


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
