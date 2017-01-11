$(function() {
	var heroesData = JSON.parse(data);
	var heroes = heroesData.heroes;
	var emptyColumn = "<td></td>";
	var heroesNames = [];
	var heroesTags = [];
	//Loop through every hero populating the list
	for(var i = 0; i< Object.keys(heroes).length; i++){
		var heroString = '<tr class="heroRow" data-name="' + heroes[i].name.cleanText() + '"><td><img src="img/' + heroes[i].name.cleanText().capitalize() + '.png" title="' + heroes[i].name + '" width="75" height="75" /></td>';
		heroString += "<td><span class='tagIcons " + heroes[i].tag + "' title='" + heroes[i].tag + "'></span></td>";
		heroesNames.push(heroes[i].name);
		heroesTags.push(heroes[i].tag);
		//Loop through basic abilities
		if (typeof heroes[i].basic != "undefined") {
			heroString += listBasics(heroes[i]);
		}else{
			heroString += emptyColumn;
		}
		//Loop through talents
		if (typeof heroes[i].talent != "undefined") {
			heroString += listTalents(heroes[i]);
		}else{
			heroString += emptyColumn;
		}
		//Loop through forms
		if (typeof heroes[i].form != "undefined") {
			heroString += listForms(heroes[i]);
		}else{
			heroString += emptyColumn;
		}
		heroString += "</tr>";
		$("#dataTable").append(heroString);
	}
	heroList(heroesNames, heroesTags);
	//Add hero to team comp
	$('.listedHero').click(function(){
		if($(this).data('name') == "chogall" && ($('.heroRow.active').length < 4 || $(this).hasClass("active"))){
			$(this).toggleClass('active');
			$('.heroRow[data-name="cho"]').toggleClass('active');
			$('.heroRow[data-name="gall"]').toggleClass('active');
		}else if(($('.heroRow.active').length < 5 || $(this).hasClass("active")) && $(this).data('name') != "chogall"){
			$(this).toggleClass('active');
			$('.heroRow[data-name="'+ $(this).data('name').cleanText() +'"]').toggleClass('active');
		}
	});
	//Tag filter
	$('.filter').click(function(){
		$('.listedHero').removeClass("filtered");
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else{
			$('.filter').removeClass('active');
			$(this).addClass('active');
			$('.listedHero:not([data-tag*="'+$(this).attr('title').substring(0, $(this).attr('title').length - 1)+'"])').addClass('filtered');
		}
	});
	//Search Filter
	$('.search').keyup(function(){
		$('.listedHero').removeClass("filtered");
		if($(this).val()){
			$('.listedHero:not([data-name*="'+$(this).val().cleanText()+'"])').addClass('filtered');
		}
	});
	//Clear filters
	$("#clearFilters").click(function(){
		$('.search').val('');
		$('.listedHero').removeClass("filtered");
		$('.filter').removeClass('active');
	});
	//Reset Everything
	$("#reset").click(function(){
		$('.search').val('');
		$('.listedHero').removeClass("filtered").removeClass("active");
		$('.filter').removeClass('active');
		$('.heroRow').removeClass('active');
	});
});

//Uniformize the text
String.prototype.cleanText = function() {
    return this.replace(/'/g, '').replace(/ /g, '').replace(/\./g,'').toLowerCase();
}

//Capitalize
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//Fill the Hero List, special code for Cho'gall
function heroList(heroesNames, heroesTags){
	for(var i = 0; i<heroesNames.length; i++){
		if(heroesNames[i] == "Cho" || heroesNames[i] == "Gall"){
			if($(".listedHero[data-name='chogall']").length == 0){
				$('#heroList').append('<span class="listedHero" data-name="chogall" data-tag="Warrior Assassin"><img src="img/Chogall.png" title="Cho\'Gall" width="55" height="55" /></span>');
			}
		}else{
			$('#heroList').append('<span class="listedHero" data-name="' + heroesNames[i].cleanText() + '" data-tag="' + heroesTags[i] + '"><img src="img/' + heroesNames[i].cleanText().capitalize() + '.png" title="' + heroesNames[i] + '" width="55" height="55" /></span>');
		}
	}
}

//Fill basic abilities information
function listBasics(heroData){
	var heroString = "<td>";
	var basicAbilities = {};
	for(var i = 0; i< Object.keys(heroData.basic).length; i++){
		for(var key in heroData.basic[i]) {
		  if (heroData.basic[i].hasOwnProperty(key)) {
		  	basicAbilities[key] = ( typeof basicAbilities[key] != 'undefined' && basicAbilities[key] instanceof Array ) ? basicAbilities[key] : []
		  	basicAbilities[key].push(heroData.basic[i][key]);
		  }
		}
	}
	for(var key in basicAbilities) {
		 if (basicAbilities.hasOwnProperty(key)) {
		 	if(basicAbilities[key].length > 1){
			 	heroString += "<span class='grouped'>";
			 	for(var i=0; i<basicAbilities[key].length; i++){
			 		heroString += "<span class='" + basicAbilities[key][i] + "'>" + basicAbilities[key][i] + "</span>";
			 	}
			  	heroString += " <strong>["+key+"]</strong></span>";
			}else{
				heroString += "<span class='" + basicAbilities[key] + "'>" + basicAbilities[key] + " <strong>["+key+"]</strong></span>";
			}
		}
	}
	heroString += "</td>";
	return heroString;
}

//Fill talent information
function listTalents(heroData){
	var heroString = "<td>";
	var f = 0;
	for(var i = 0; i< Object.keys(heroData.talent).length; i++){
		for (var key in heroData.talent[i]) {
		  	if (heroData.talent[i].hasOwnProperty(key)) {
		  		if(typeof heroData.talent[i][key] === "object" && f == 0){
		  			heroString += "<span class='grouped'>";
		  			for(var subkey in heroData.talent[i][key]) {
		  				heroString += "<span class='" + heroData.talent[i][key][subkey] + "'>" + heroData.talent[i][key][subkey] + "</span>";
		  			}
		  			f = 1;
		  		}else if(typeof heroData.talent[i][key] === "object" && f == 1){
		  			for(var subkey in heroData.talent[i][key]) {
		  				heroString += "<span class='" + heroData.talent[i][key][subkey] + "'>" + heroData.talent[i][key][subkey] + "</span>";
		  				heroString += " <strong>["+subkey+"]</strong></span>";
		  			}
		  			f = 0;	
		  		}else{
				  	heroString += "<span class='" + heroData.talent[i][key] + "'>" + heroData.talent[i][key] + " <strong>["+key+"]</strong></span>";
		  		}
		  	}
		}
	}
	heroString += "</td>";
	return heroString;
}

//Fill form information
function listForms(heroData){
	var heroString = "<td>";
	for(var i = 0; i< Object.keys(heroData.form).length; i++){
		for (var key in heroData.form[i]) {
		  if (heroData.form[i].hasOwnProperty(key)) {
		  	heroString += "<span class='" + heroData.form[i][key] + "'>" + heroData.form[i][key] + " <strong>["+key+"]</strong></span>";
		  }
		}
	}
	heroString += "</td>";
	return heroString;
}