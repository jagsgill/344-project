$(document).ready(function(){
    
    // <script type="text/javascript" src="custom.js"></script>
    
    var best1 = $axure('@best1')
    var best2 = $axure('@best2')
    var best1url = $axure('@best1url')
    var best2url = $axure('@best2url')
    var likesText = $axure('@likes')
    var currentText = $axure('@current')
    var firstRun = $axure('@firstrun')
    var currUrl = $axure('@currUrlBox')
    var endMsgBox1 = $axure('@endmsg1')
    var endMsgBox2 = $axure('@endmsg2')
	var lastChoice = $axure('@prevchoice')
	var currPicsUrl = $axure('@currPicsUrlBox')
    var endMsgReg = "Reached the end! \n You can go through again to change your choices.";

    var current = 0
    likes = 0
    var selections = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	var prevSelections = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    
    var phantom_1 =  [1,1,1,1,1,1,0,0,0,0,0,0,0,0]
    var phantom_2 =  [1,1,1,1,1,1,0,0,0,0,0,0,0,0]
    var phantom_3 =  [1,1,1,1,1,1,0,0,0,0,0,0,0,0]
    var phantom_4 =  [1,1,1,1,1,1,0,0,0,0,0,0,0,0]
    var phantom_5 =  [1,1,1,1,1,1,0,0,0,0,0,0,0,0]
    var phantom_6 =  [1,1,1,1,1,1,0,0,0,0,0,0,0,0]

    shuffle(phantom_1)
    shuffle(phantom_2)
    shuffle(phantom_3)
    shuffle(phantom_4)
    shuffle(phantom_5)
    shuffle(phantom_6)
    
    var result = [];
    
    var rest_names = ["Le Crocodile", "Vij's Restaurant", "Tojo's Restaurant", "The Fish Shack",
		  "Sushi Den", "Basil Pasta Bar", "Nero Belgian Waffle Bar", "Go Fish Ocean Emporium", "Zefferelli's",
		  "The Flying Pig", "Trilussa Pizza and Pane", "Moderne Burger", "Hokkaido Ramen Santouka", 
		  "Gyu-Kaku Japanese BBQ"]
    
    var rest_urls = ["http://www.yelp.ca/biz/le-crocodile-restaurant-vancouver",
		 "http://www.yelp.ca/biz/vijs-restaurant-vancouver",
		 "http://www.yelp.ca/biz/tojos-restaurant-vancouver",
		 "http://www.yelp.ca/biz/the-fish-shack-vancouver",
		 "http://www.yelp.ca/biz/sushi-den-vancouver",
		 "http://www.yelp.ca/biz/basil-pasta-bar-vancouver",
		 "http://www.yelp.ca/biz/nero-belgian-waffle-bar-vancouver-2",
		 "http://www.yelp.ca/biz/go-fish-ocean-emporium-vancouver",
		 "http://www.yelp.ca/biz/zefferellis-vancouver",
		 "http://www.yelp.ca/biz/the-flying-pig-vancouver",
		 "http://www.yelp.ca/biz/trilussa-pizza-and-pane-vancouver",
		 "http://www.yelp.ca/biz/moderne-burger-vancouver",
		 "http://www.yelp.ca/biz/hokkaido-ramen-santouka-vancouver",
		 "http://www.yelp.ca/biz/gyu-kaku-japanese-bbq-vancouver-4"];
		
	var pics_urls = [ "http://www.yelp.ca/biz_photos/le-crocodile-restaurant-vancouver?select=tyyT_h7-JklXGqybp4dIIA",
	"http://www.yelp.ca/biz_photos/vijs-restaurant-vancouver?select=qM5khEzu0LAMOC9U6Z4O6w",
	"http://www.yelp.ca/biz_photos/tojos-restaurant-vancouver?select=4NRo0iFmgbqulMycASZk2w",
	"http://www.yelp.ca/biz_photos/the-fish-shack-vancouver?select=_nDswtn8frAuyU1I8YWj8g",
	"http://www.yelp.ca/biz_photos/sushi-den-vancouver?select=TW7kFz_uKmGjhVLfTebdJw",
	"http://www.yelp.ca/biz_photos/basil-pasta-bar-vancouver?select=WfXfvzHQjLbEoU4bDosCbA",
	"http://www.yelp.ca/biz_photos/nero-belgian-waffle-bar-vancouver-2?select=wYoo6KIf5EPVFtp9jk3fAA",
	"http://www.yelp.ca/biz_photos/go-fish-ocean-emporium-vancouver?select=Zo2_zPKdHKDkH-KSG-1Nag",
	"http://www.yelp.ca/biz_photos/zefferellis-vancouver?select=6xMIh6VVsZA8hwgSV_aA9g",
	"http://www.yelp.ca/biz_photos/the-flying-pig-vancouver?select=XqNNuaVeeAbGWUL667C8-w",
	"http://www.yelp.ca/biz_photos/trilussa-pizza-and-pane-vancouver?select=WQbAWdEKA_ocfgPocf6cQg",
	"http://www.yelp.ca/biz_photos/moderne-burger-vancouver?select=cojVDVxJ1LdaE3zYF_TwcA",
	"http://www.yelp.ca/biz_photos/hokkaido-ramen-santouka-vancouver?select=vH7yfBXCNTvKE7awMCM0qg",
	"http://www.yelp.ca/biz_photos/gyu-kaku-japanese-bbq-vancouver-4?select=f0t8u7RBMz4aLxG_ckCKoA"];
		 

    function setSelection(i){
	
	selections[current] = i;
	if (current < 13){
	    current += 1;
	} else {
	    current = 0;
		firstRun.text("0")
		prevSelections = selections
	}
	lastChoice.text(String(prevSelections[current]))
	console.log("Current selections:" ,selections);
	total = 0
	for(i = 0; i < 14; i++){
	    total += selections[i];
	}
	remainingLikes = 6 - total
	findMatches() 
	console.log("Current total:  ", String(total))
	if(total < 6){
		likesText.text(String(total))
	} else {
		likesText.text("6")
	}
	currentText.text(String(current))
	console.log("Current Url:", rest_urls[current])
	currUrl.text(rest_urls[current])
	currPicsUrl.text(pics_urls[current])
	

	endMsgNeedMoreLikes = "You need to like " + String(remainingLikes) + " more! \n We're taking you back to the start."
	console.log("Likes :  ", total)
	endMsgBox2.text(endMsgNeedMoreLikes)
	console.log(endMsgNeedMoreLikes)
	
}
		  
    function findMatches(){
	for(i = 0; i < 14; i++){
	    result[i] = selections[i] + phantom_1[i] + phantom_2[i] + phantom_3[i] +
		phantom_4[i] + phantom_5[i] + phantom_6[i];
		console.log("3")
	}
	
	var max = Math.max.apply(Math, result);
	var i1 = result.indexOf(max);
	result[i1] = -Infinity;
	var i2 = result.indexOf(Math.max.apply(Math, result));
	result[i1] = max;
	
	// Remember the 2 best matches
	best1.text(rest_names[i1]);
	best2.text(rest_names[i2]);
	best1url.text(rest_urls[i1]);
	best2url.text(rest_urls[i2]);
	
	console.log("Current votes:" , result);
	console.log("Best matches:", rest_names[i1],"  ", rest_names[i2])
	
    }
    
    // shuffle : taken verbatim from 
    // http://stackoverflow.com/questions/15585216/how-to-randomly-generate-numbers-without-repetition-in-javascript
    function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
    };
    
    // Remember selections made
    
    $( "#u0" ).click(function() {
	setSelection(1);
    });
    
    $( "#u4" ).click(function() {
	setSelection(0);
    });
    
    $( "#u51" ).click(function() {
	findMatches();
    });	
    
    firstRun.text("1")
    currUrl.text(rest_urls[0])
	currPicsUrl.text(pics_urls[0])
    console.log("Current Url:", rest_urls[current])
    endMsgBox1.text(endMsgReg);
    
})
