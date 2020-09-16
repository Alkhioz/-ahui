chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message,sender,sendresponse)
{
	console.log(message.txt);
	let paragraphs = document.getElementsByTagName("p");
	for(elt of paragraphs)
	{
		elt.style['background-color'] = '#00CED1';
	}
}