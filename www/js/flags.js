//teting
//Do this as soon as the DOM is ready
$(document).ready(function() {
    //$("wantaclue").hide();
    //$("countrySearch").hide();
    //$("idSearch").hide(); style="display: none;"
    document.getElementById("idSearch").style="display: none;";
    document.getElementById("countrySearch").style="display: none;";
    document.getElementById("nextFlag").style="display: none;";
    document.getElementById("playAgainBtn").style="display: none;";
    document.getElementById("flagimage").style="display: none;";
    document.getElementById("clueimage").style="display: none;";
    document.getElementById("flagclue").style="display: none;";
    document.getElementById("imageclue").style="display: none;";
    //$("nextFlag").hide(); 
});

var currentQuestion = 0;
var correctAnswers = 0;
var totalFlags;
var answer;


    // Play the game again
function playAgain(){
    //document.getElementById("intro").style="display: inline;";
    currentQuestion = 0;
    correctAnswers = 0;
    document.getElementById("playAgain").style="display: none;";
    document.getElementById("playAgainBtn").style="display: none;";
    document.getElementById("flagRequest").style="display: inline;";
    document.getElementById("flagRequestInput").style="display: inline;";
    document.getElementById("endResults").style="display: none;";
    document.getElementById("flagNo").style="display: none;";
    //getFlags();
    
};

    // Get all of the requested flags from FME Server
    // You will need to change the URL to match your FME Server isntance
function getFlags() {
        currentQuestion = 0;
        correctAnswers = 0;
        var flagsRequested = document.getElementById('flagRequestInput').value;   
        document.getElementById("idSearch").disabled = false;
        document.getElementById("flagRequest").style="display: none;";
        document.getElementById("flagRequestInput").style="display: none;";
        document.getElementById("nextFlag").style="display: inline;";
        document.getElementById("flagimage").style="display: inline;";
        document.getElementById("clueimage").style="display: inline;";
        document.getElementById("countrySearch").style="display: inline;";
        document.getElementById("idSearch").style="display: inline;";
        document.getElementById("flagclue").style="display: inline;";
        document.getElementById("imageclue").style="display: inline;";
        var source = 'https://demos-safe-software.fmecloud.com/fmedatastreaming/Flags/flagRequestorCIA.fmw?flags=' + flagsRequested;
        $.getJSON(source)
            .always(function(data) {
            Flags = data;
            totalFlags = data.length;
            qno = data[currentQuestion].QuestionNo;
            answer = data[currentQuestion].countryAnswer;
            clueURL = data[currentQuestion].clueURL;
            flagURL = data[currentQuestion].flagURL;
            $('#flagimage').attr("src",flagURL);
            $('#clueimage').attr("src",clueURL);
            flagNumber = currentQuestion + 1;
            $('#flagNo').text("Flag "+ flagNumber +"/" +totalFlags);
});
};

// Get the next flag if there are more flags to play, otherwise it's game over
function getNextFlag(){
    currentQuestion = currentQuestion + 1;
    $('#guessStatus').empty();
    $('#idSearch').val("");
    if (currentQuestion < totalFlags) {
        qno = Flags[currentQuestion].QuestionNo;
        answer = Flags[currentQuestion].countryAnswer;
        clueURL = Flags[currentQuestion].clueURL;
        flagURL = Flags[currentQuestion].flagURL;
        $('#flagimage').attr("src",flagURL);
        $('#clueimage').attr("src",clueURL);
        document.getElementById("idSearch").disabled = false;
        flagNumber = currentQuestion + 1;
        $('#flagNo').text("Flag "+ flagNumber +"/" +totalFlags);
        $('#intro').remove();
    } else {
        $('#flagNo').text("Game Over");
        document.getElementById("nextFlag").style="display: none;";
        document.getElementById("nextFlag").style="display: none;";
        document.getElementById("flagimage").style="display: none;";
        document.getElementById("clueimage").style="display: none;";
        document.getElementById("flagclue").style="display: none;";
        //document.getElementById("intro").style="display: none;";
        document.getElementById("imageclue").style="display: none;";
        document.getElementById("countrySearch").style="display: none;";
        document.getElementById("idSearch").style="display: none;";
        document.getElementById("endResults").style="display: inline;";
        $('#endResults').text("You got "+ correctAnswers +" out of " + totalFlags + " correct");
        $('#playAgain').text("Would you like to play again?");
        document.getElementById("playAgain").style="display: inline;";
        document.getElementById("playAgainBtn").style="display: inline;";
    }
};

// Flag Validation
function validateCountry() {
    var Canswer = document.getElementById('idSearch').value;
            document.getElementById("idSearch").disabled = true;
            if (Canswer.toLowerCase() == answer.toLowerCase()) {
                document.getElementById('guessStatus').setAttribute("class","label label-success");
                document.getElementById('guessStatus').textContent = "You are correct";
                correctAnswers = correctAnswers + 1;
            } else {
                document.getElementById('guessStatus').setAttribute("class","label label-error");
                document.getElementById('guessStatus').textContent = " The correct answer is " + answer;
            };
};