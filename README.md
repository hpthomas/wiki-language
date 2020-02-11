## NOTES

Requires a file called 'APIKey.js' in the /src directory, of the form:
let APIKey = "...key...";
export default APIKey;

This key must be kept a secret and is not tracked in git. 

This assumes wikipedia and google translate use the same two-letter codes for languages, which seems to hold true.

Code uses 'src' or 'source' to refer to language the article is shown in, which is actually the user's target language per language learning terminology. This will be changed eventually but it's not a priority.

