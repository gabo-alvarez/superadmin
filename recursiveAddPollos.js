var oldCuate="";
var minTime=15552000	//6 meses de antiguedad.
//var minTime=315360000;
function recursiveApproval(){
		var  a=document.getElementsByName("approve button")[0];
		if(typeof(a)!='undefined' && a!=null){
			var currentCuate=processUserData(a);
			if(currentCuate.name!=oldCuate){
				oldCuate=currentCuate.name;
				console.log("----------------------------------------");
				console.log("Pollo : "+currentCuate.name);
				console.log("Fecha de creación del pollo: "+currentCuate.date.printDate);
				var time=new Date();
					time=time.getTime();
				var deltaTime=time-currentCuate.date.timestamp;
				if(deltaTime>(minTime*1000)){
					console.log("Pollo añadido al grupo");
				}else{
					console.log("Pollo rechazado, pollo demasiado joven (menos de 6 meses)");
					a=getDeclineUser(a);	//Reemplazo el botón que voy a clickear por "Rechazar".
				}
				a.dispatchEvent(new MouseEvent("click",{cancelable:false, bubbles: true, view: window}));	//Clickeo.
				var tTime=3000+Math.random()*2000;
				console.log("----------")
				console.log("Proximo pollo en  "+Math.round(tTime/1000)+ " segundos");
				setTimeout(function(){
					recursiveApproval();
				},tTime);
			}else{
				console.log(currentCuate.name+" repetido, reintentando en 1 seg.");
				setTimeout(function(){
					recursiveApproval();
				},1000);
			}
		}else{
			console.log("No se encontraron mas pollos :/");
			
		}
	
}
//////Obtiene el nombre y fecha de creación del DOM:
function processUserData(elm){
	var _element=elm.parentNode.parentNode;
	_element=_element.childNodes[1];
	var _obj={};
	_obj.name=getName(_element);
	_obj.date=getDate(_element);
	return _obj;
	//Nombre:
	function getName(p){
		var auxDiv=document.createElement("div");
			auxDiv.innerHTML=p.innerHTML;
		var n=auxDiv.getElementsByTagName("a")[0]
	return n.innerText;
	}
	//Fecha de creación:
	function getDate(e){
		var calendar={
		"enero":"01",
		"febrero":"02",
		"marzo":"03",
		"abril":"04",
		"mayo":"05",
		"junio":"06",
		"julio":"07",
		"agosto":"08",
		"septiembre":"09",
		"octubre":"10",
		"noviembre":"11",
		"diciembre":"12"
		};
		var dateString=e.getElementsByClassName("timestampContent")[0].innerText;
		var splitDate=dateString.split(" de ");
			splitDate[1]=calendar[splitDate[1]];
		var firstDate=new Date(splitDate[2],(splitDate[1]-1),splitDate[0],0,0,0);
			firstDate=firstDate.getTime();
		return {printDate:dateString, timestamp: firstDate};
	}
}

// Obtiene el botón de rechazo a partir del Approval.
function getDeclineUser(e){
	var    _element=e.parentNode
		   _element=_element.childNodes[1];
	return _element;
}


 recursiveApproval();
 