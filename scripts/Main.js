---
---

var SIZEX = 60, 
	SIZEY = 60,
	GAP = 10;
var infoBoxY = -50,
	infoBoxDelta = 30,
	SWidth = $(window).width();

var nodeValues=[],
	persons = [],
	activePersons = [];

var centerX =  Math.max(0, $(window).width() / 2 );	


// get all person data via jekyll-yml-processing
  {% for member in site.data.members %}
    persons.push(new Person("{{ member.name }}",
                            "{{ member.animal }}",
                            "{{ member.mission }}",
                            "{{ member.contact }}",
                            "{{ member.link}}"));
  {% endfor %}

// set initial node positions
setNodePosition();
// move info box
$("#personInfo").css("left",centerX+SIZEX+"px");


function setNodePosition(){
	var id = 0,
		offsetX = centerX-GAP-SIZEX,
		offsetY = $(".bigStripe").offset().top + Math.min(Math.max(SIZEY*5,40),150);

	// center logo on mobile devices
	if(SWidth <= 1024){
		offsetX = centerX + 0.5*(SIZEX);		
	}	

	// fill position values for all nine circles
	for(var i=0;i<3;i++){
		for(var i1=0;i1<3;i1++){
			
			nodeValues[id] = 'style="position:absolute;top:'+(offsetY+i*(SIZEY+GAP))+'px;left:'+(offsetX-i1*(SIZEX+GAP))+'px;"';			
			addNode(id);
			id++;
		}
	}
}


function Person(name,icon,mission,contact,link){
	this.name = name;
	this.icon = icon;
	this.mission = mission;
	this.contact = contact;
	this.link = link;
}


function ShowPersonInfo(personId){
	var $element;
	
	var person = persons[activePersons[personId]];

	// fill in info data
	$element = $('#personInfo .content').prev();
	$element.removeClass();
	$element.addClass("thumb "+person.icon);	

	$('#personInfo .name').html(person.name);

	$('#personInfo .mission').html(person.mission);	

	if(person.contact && person.link){
		$element = $('#personInfo .contact');

		$element.removeClass();
		$element.addClass("contact nowrap "+person.contact.toLowerCase());
		$element.html('<a href="'+person.link+'" title="'+person.contact+'">'+person.contact+'</a>');
	}else{
		$element = $('#personInfo .contact');
		$element.removeClass();
		$element.addClass("contact nowrap");
		$element.html("&nbsp;");
	}	
}


function addNode(id){
	// select a person
	var personId = Math.floor(Math.random()*(persons.length-1));
	activePersons[id] = personId;

	// hide image behind		
	$("#main").append('<div class="static" id="node'+id+'" '+nodeValues[id]+'"></div>');
	$("#node"+id).append('<div class="circleThumb '+persons[personId].icon+'" style="width:'+SIZEX+'px;height:'+SIZEY+'px"></div>');
	// draw animal icon on top to enable background-image fade
	$("#main").append('<div class="static cover" id="node-hidden-'+id+'" '+nodeValues[id]+'"></div>');
	$("#node-hidden-"+id).append('<div class="circleThumb empty" style="width:'+SIZEX+'px;height:'+SIZEY+'px"></div>');
	
	// animate empty & img node
	$("#node-hidden-"+id).css({"scale":"0.0"});
	$("#node"+id).css({"scale":"0.0"});
	$("#node-hidden-"+id).animate({"scale":1},900,'easeOutElastic');
	$("#node"+id).animate({"scale":1},900,'easeOutElastic');
}


function ActivateNode(e){

	//remove hover & click
	$(e).removeClass("static").off("mouseenter mouseleave click");
	$(e).prev().removeClass("static").off("mouseenter mouseleave click");

	// add to physic sim
	addElement($(e).prev()[0]);		

	// get node id
	var nodeId = $(e).prev().attr("id").replace('node','');
	
	// clear node id
	$(e).prev().attr("id","");
	
	// remove empty cover
	$(e).remove();

	// spawn new node on old position
	setTimeout(function(){addNode(nodeId)}, 2000);	
}


// HANDLER


$( window ).resize(function() {

	var factor = $(window).width()/1920.0*2;

	centerX =  Math.max(0, $(window).width() / 2 );	
	factor = Math.min(Math.max(factor, 0.48), 1.0);

	SIZEX = 60 * factor;
	SIZEY = 60 * factor;
	GAP = 10 * factor;

	SWidth = $(window).width()

	if(SWidth < 450){
		$(".bigStripe").css("height","235px");
		$("#personInfo").css("left","0px");
		$("#personInfo").hide();
		$(".logo").hide();
	}else{
		$(".bigStripe").css("height","400px");
		$("#personInfo").css("left","550px");
		$("#personInfo").show();
		$(".logo").show();
	}

	$(".static").remove();

  	setNodePosition();
	$("#personInfo").css("left",centerX+SIZEX+"px");

	setWalls();
});


$(document).on("touchstart",".static",function(){ 
	ActivateNode(this);
});

$(document).on("click",".static",function(){			
	ActivateNode(this);
});


$(document).on("mouseenter",".static",function(){	
	

	// reset
	$(".static.cover").stop().css({"scale":"1.0",opacity:1});
	
	if(SWidth > 1024){
		// set selected person info
		var personId = $(this).attr("id").replace("node-hidden-","");
		var newPosY = infoBoxY-infoBoxDelta;	
		
		ShowPersonInfo(personId);
		
		$("#personInfo").stop().css({"opacity":"1"});
	}
	
	// fade out empty cover
	$(this).transition({scale:1.3,opacity:0});
	// fade in person info
	if(SWidth > 1024){
		$("#personInfo").transition({opacity:1,y:infoBoxY+"px"});
	}
});


$(document).on("mouseleave",".static",function(){	
	// reset
	$(this).stop().css({"scale":"1.3",opacity:0});
	
	if(SWidth > 1024){
		$("#personInfo").stop().css({"opacity":"1"});
	}

	// fade in empty circle
	$(".static.cover").transition({scale:1.0,opacity:1});
	// fade out person info
	if(SWidth > 1024){
		var newPosY = infoBoxY-infoBoxDelta;
		$("#personInfo").transition({opacity:0,y:newPosY+"px"});
	}
});

// trigger resize to init correct values
$(window).trigger("resize");
