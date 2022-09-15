
var can1 = document.getElementById("can1");
var context = can1.getContext("2d");
var update;
var words_object;
var current_words;
var words;
var words_visible = true;
var hidev;
var interval_speed = 5000;

window.addEventListener("load", Init, false);

function Init() {
   update = setInterval(drawCanvas, 100);
   words_object = new CreateWordsObject("test apples bannas strings monkey turkey gold silver green blue red chicken nugget turtle seeds farm knight night return operator overoad expression nintendo sega mario sonic special happiness sadness end of the world what she said when I was dead lost side manic depression hyperactive");
   FillWords();
   words_visible = true;
}

function HideWords() {
    words_visible = false;
    var text1 = document.getElementById("text1");
    var btn = document.getElementById("btn1");
    var intext = document.getElementById("intext");
    text1.value = "";
    clearInterval(hidev);
    text1.style.display = '';
    btn.style.display = '';
    intext.style.display = '';
}

function FillWords() {
   current_words = [];
   for(var i = 0; i < words_object.max_words; ++i) {
        current_words.push(words_object.nextWord());
   }
   words_visible = true;
   clearInterval(hidev);
   hidev = setInterval(HideWords, interval_speed);
   var text1 = document.getElementById("text1");
   text1.value = "";
   text1.style.display = 'none';
   var btn = document.getElementById("btn1");
   btn.style.display = 'none';
   var intext = document.getElementById("intext");
   intext.style.display = 'none';
}


function CreateWordsObject(input) {
    this.words = input.split(" ");
    this.cur_index = 0;
    this.max_words = 1;
    this.nextWord = function() {
        var r = Math.floor(Math.random()*this.words.length);
        return this.words[r];
    };
}

function checkSame() {
    var text1 = document.getElementById("text1");
    words = current_words.join(" ");
    if(text1.value === words) {
        alert('You are correct');
        words_object.max_words += 1;
        interval_speed -= 100;
        FillWords();
    } else {
        alert('You are incorrect starting over');
        words_object.max_words = 1;
        interval_speed = 5000;
        FillWords();
    }
}

function buildString() {
    var temp_words = [];
    for(var i = 0; i < current_words.length; i += 10) {
        var temp_words1 = [];
        for(var z = i; z < i + 10; ++z) {
            temp_words1.push(current_words[z]);
        }
        temp_words.push(temp_words1.join(" "));
    }
    return temp_words;
}

function drawCanvas() {
    context.fillStyle="#FFFFFF";
    context.fillRect(0, 0, 1280, 720);
    context.fillStyle="#FF0000";  
    context.font = "18px Verdana";
    var w = buildString();
      
    if(words_visible == true) {
        var y = 25;
        for (var i = 0; i < w.length; ++i) {
            context.fillText(w[i], 15, y);
            y += 22;
        }
    }
}