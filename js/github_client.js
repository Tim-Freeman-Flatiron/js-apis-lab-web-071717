//define functions here
var createGist = function(file_name, content, description, token){
	let newUrl = 'https://api.github.com/gists' + '?access_token=' + token.toString()
	$.ajax({
		url: newUrl,
		type: 'POST',
		data: JSON.stringify({
			'description': description,
			 'public': true,
			  'files':{
			  [file_name]:{
			  	'content': content}
			  }
			}),
		success: function(data) {
			myGists(data.owner.login, token)
		}
	})
};

var myGists = function (username, token){
	var newUrl = 'https://api.github.com/users/' + username + '/gists' + '?access_token=' + token.toString()
	$.ajax({
		url: newUrl,
		success: function(data) {
			let rendered = data.map(function(gist) {
				return '<a href="'+ gist.html_url + '">' + gist.description + '</a><br>'
			})
			document.getElementById('my-gists').innerHTML = rendered
		}
	})
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
	const token = document.getElementById("personal-token")
	const fileName = document.getElementById("file-name")
	const description = document.getElementById("description")
	const content = document.getElementById("content")
	$('#form-submit').on('click', function(event){
		event.preventDefault()
		createGist(fileName.value, content.value, description.value, token.value)
	})
});
