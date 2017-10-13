// Include data for accessing Google APIs

const apiKey = 'AIzaSyC6nOxjnzoBeT-7eGM_hLe5rcKo5NIabL0';
const url = 'https://www.googleapis.com/urlshortener/v1/url';

// Some page elements


const $inputField = $('#input');
const $expandButton = $('#expand');
const $shortenButton = $('#shorten');
const $responseField = $('#responseField');

// AJAX functions

function expandUrl() {
	const urlToExpand = url + '?shortUrl=' + $inputField.val() + '&key=' + apiKey;
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
    $responseField.append('<p>Your expanded url is: </p><p>' + xhr.response.longUrl + '</p>');
		}
  };
  xhr.open('GET', urlToExpand);
  xhr.send();
}

function shortenUrl() {
	const urlWithKey = url + '?key=' + apiKey;
  const urlToShorten = $inputField.val();
  const data = JSON.stringify({longUrl: urlToShorten});
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    if(xhr.readyState ===XMLHttpRequest.DONE) {
      $responseField.append('<h4>Here is your URL: ' + xhr.response.id + '</h4>');
    }
  };
  xhr.open('POST', urlWithKey);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
}


function expand() {
  $responseField.empty();
  expandUrl();
  return false;
}

function shorten() {
  $responseField.empty();
  shortenUrl();
  return false;
}

// Call functions on submit

$expandButton.click(expand);
$shortenButton.click(shorten);
