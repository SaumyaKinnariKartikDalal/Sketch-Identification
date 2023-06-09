var quick_draw_data_set = ["aircraft carrier", "airplane", "alarm clock", "ambulance", "angel", "animal migration", "ant", "anvil", "apple", "arm", "asparagus", "axe", "backpack", "banana", "bandage", "barn", "baseball", "baseball bat", "basket", "basketball", "bat", "bathtub", "beach", "bear", "beard", "bed", "bee", "belt", "bench", "bicycle", "binoculars", "bird", "birthday cake", "blackberry", "blueberry", "book", "boomerang", "bottlecap", "bowtie", "bracelet", "brain", "bread", "bridge", "broccoli", "broom", "bucket", "bulldozer", "bus", "bush", "butterfly", "cactus", "cake", "calculator", "calendar", "camel", "camera", "camouflage", "campfire", "candle", "cannon", "canoe", "car", "carrot", "castle", "cat", "ceiling fan", "cello", "cell phone", "chair", "chandelier", "church", "circle", "clarinet", "clock", "cloud", "coffee cup", "compass", "computer", "cookie", "cooler", "couch", "cow", "crab", "crayon", "crocodile", "crown", "cruise ship", "cup", "diamond", "dishwasher", "diving board", "dog", "dolphin", "donut", "door", "dragon", "dresser", "drill", "drums", "duck", "dumbbell", "ear", "elbow", "elephant", "envelope", "eraser", "eye", "eyeglasses", "face", "fan", "feather", "fence", "finger", "fire hydrant", "fireplace", "firetruck", "fish", "flamingo", "flashlight", "flip flops", "floor lamp", "flower", "flying saucer", "foot", "fork", "frog", "frying pan", "garden", "garden hose", "giraffe", "goatee", "golf club", "grapes", "grass", "guitar", "hamburger", "hammer", "hand", "harp", "hat", "headphones", "hedgehog", "helicopter", "helmet", "hexagon", "hockey puck", "hockey stick", "horse", "hospital", "hot air balloon", "hot dog", "hot tub", "hourglass", "house", "house plant", "hurricane", "ice cream", "jacket", "jail", "kangaroo", "key", "keyboard", "knee", "knife", "ladder", "lantern", "laptop", "leaf", "leg", "light bulb", "lighter", "lighthouse", "lightning", "line", "lion", "lipstick", "lobster", "lollipop", "mailbox", "map", "marker", "matches", "megaphone", "mermaid", "microphone", "microwave", "monkey", "moon", "mosquito", "motorbike", "mountain", "mouse", "moustache", "mouth", "mug", "mushroom", "nail", "necklace", "nose", "ocean", "octagon", "octopus", "onion", "oven", "owl", "paintbrush", "paint can", "palm tree", "panda", "pants", "paper clip", "parachute", "parrot", "passport", "peanut", "pear", "peas", "pencil", "penguin", "piano", "pickup truck", "picture frame", "pig", "pillow", "pineapple", "pizza", "pliers", "police car", "pond", "pool", "popsicle", "postcard", "potato", "power outlet", "purse", "rabbit", "raccoon", "radio", "rain", "rainbow", "rake", "remote control", "rhinoceros", "rifle", "river", "roller coaster", "rollerskates", "sailboat", "sandwich", "saw", "saxophone", "school bus", "scissors", "scorpion", "screwdriver", "sea turtle", "see saw", "shark", "sheep", "shoe", "shorts", "shovel", "sink", "skateboard", "skull", "skyscraper", "sleeping bag", "smiley face", "snail", "snake", "snorkel", "snowflake", "snowman", "soccer ball", "sock", "speedboat", "spider", "spoon", "spreadsheet", "square", "squiggle", "squirrel", "stairs", "star", "steak", "stereo", "stethoscope", "stitches", "stop sign", "stove", "strawberry", "streetlight", "string bean", "submarine", "suitcase", "sun", "swan", "sweater", "swingset", "sword", "syringe", "table", "teapot", "teddy-bear", "telephone", "television", "tennis racquet", "tent", "The Eiffel Tower", "The Great Wall of China", "The Mona Lisa", "tiger", "toaster", "toe", "toilet", "tooth", "toothbrush", "toothpaste", "tornado", "tractor", "traffic light", "train", "tree", "triangle", "trombone", "truck", "trumpet", "tshirt", "umbrella", "underwear", "van", "vase", "violin", "washing machine", "watermelon", "waterslide", "whale", "wheel", "windmill", "wine bottle", "wine glass", "wristwatch", "yoga", "zebra", "zigzag"]
score = 0;
timeLeft = 1500;
answer_holder = "";
time_status = "pending";
randomNo = Math.floor((Math.random() * quick_draw_data_set.length) + 1)
sketch = quick_draw_data_set[randomNo];
drawn_sketch = ""; 
document.getElementById('task').innerHTML = "Sketch To Be Drawn: " + sketch;

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
    canvas = createCanvas(1100, 380);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function draw() {
    stroke(0);
    strokeWeight(13);
    if (mouseIsPressed){
        line(pmouseX,pmouseY, mouseX, mouseY);
    }
    check_sketch();
    if (time_status == "over") {
        updateCanvas();
        score = score - 1;
        document.getElementById("score").innerHTML = "Score: " + score;
    } else {
        if (drawn_sketch == sketch) {
            score = score + 1;
            document.getElementById("score").innerHTML = "Score: " + score;
            answer_holder = "set";
        }
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}

function gotResult(error, results) {
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("label"). innerHTML = "Your Sketch: "+ results[0].label;
        drawn_sketch = results[0].label;
        document.getElementById("confidence"). innerHTML = "Confidence: "+ Math.round(results[0].confidence*100) + "%";
        var synth = window.speechSynthesis;
      speak_data = "Object detected is - " + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
    }
}

function check_sketch() {
    countdown();
}

function updateCanvas() {
    clearCanvas();
    randomNo = Math.floor((Math.random() * quick_draw_data_set.length) + 1)
    sketch = quick_draw_data_set[randomNo];
    document.getElementById('task').innerHTML = "Sketch To Be Drawn: " + sketch;
}

function countdown() {
    if (timeLeft == 0) {
        time_status = "over";
        timeLeft = 1500;
    } else {
        time_status = "pending";
        document.getElementById('timer').innerHTML = "Timer: " + timeLeft;
        timeLeft = timeLeft - 1;
    }
}

function clearCanvas() {
    background("white");
}
