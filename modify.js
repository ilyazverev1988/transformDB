const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('./tmp.db');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    var text = ``;
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        text +=line;
        //console.log(`Line from file: ${line}, ${line.length}`);
    }
    //console.log(text, "text", text.length);
    //var pattern = /[,]{1}["]{1}[0-9a-z]{5,8}[.]{1}[0-9a-z]{1,3}["]{1}[:]{1}/g;
    var pattern = /[,]{1}["]{1}[0-9a-z]{4,8}[.]{1}[0-9a-z]{1,4}["]{1}[:]{1}/g;
    //var pattern = /[0-9a-z]{4,8}[.]{1}[0-9a-z]{1,4}[\t]{1}/g;
    let replacer = (match)=>{
        //console.log(match);
        let newString;
        if (match.length===16) {
            newString = match.slice(2, 14);
        } else if (match.length===15) {
            newString = match.slice(2, 13);
        } else if (match.length===14) {
            newString = match.slice(2, 12);
        } else if (match.length===13) {
            newString = match.slice(2, 11);
        } else if (match.length===12) {
            newString = match.slice(2, 10);
        } else if (match.length===11) {
            newString = match.slice(2, 9);
        }
        //console.log(newString);
        return `\n${newString}\t`
    }
    var newText = text.replace(pattern, replacer);
    fs.writeFileSync("new.db", newText);
    console.log("все");
}
processLineByLine();