$.ajaxSetup ({
	cache: false
});
var campos = [trocha = false, durmientesporkmporvia = false, rieltipo = false, largobarra = false, eclisasagujeros = false, longitudvia = false]; 
var trocha = [tipo = undefined, metros = undefined, milimetros = undefined]; 
var durmiente = [alto = undefined, ancho = undefined, cantporkmvia = undefined]; 
var balasto = [tipo = undefined, pesoespecifico = undefined]; 
var riel = [tipo = undefined, peso = undefined, largobarra = undefined]; 
var longitudvia = [kilometros = undefined, metros = undefined]; 
var agujeroseclisas = undefined; 
var trapecio = [basemenor = undefined, basemayor = undefined, altura = undefined, resultado = undefined]; 
var resultado = [
	barrapeso = undefined, 
	durmientestotales = undefined, 
	ocupaciondurmiente = undefined, 
	ocupaciondurmientetodos = undefined, 
	ocupacionbalasto = undefined, 
	ocupacionbalastotrapecio = undefined, 
	balasto = undefined, 
	rielesbarras = undefined, 
	rielespeso = undefined, 
	eclisas = undefined
]; 

var mostrarcalculos = function(valor) {
	if (valor) {
		$('.calculo').removeClass('hidden'); 
		$('.btn.btn-primary#calculos').attr('onClick', 'mostrarcalculos(false)').text('Ocultar cálculos'); 
	} else {
		$('.calculo').addClass('hidden'); 
		$('.btn.btn-primary#calculos').attr('onClick', 'mostrarcalculos(true)').text('Mostrar cálculos'); 
	}
}

var verifcampos = function(){
	if ((((campos.trocha) && (campos.durmientesporkmporvia)) && ((campos.rieltipo) && (campos.largobarra))) && ((campos.eclisasagujeros) && (campos.longitudvia))) {
		$('button#resultados').prop('disabled', ''); 
	} else {
		$('button#resultados').prop('disabled', 'true'); 
	}
}

$(document)
	.ready(function(){
		$(".navbar a").click(function(ev) {
			var link = this.href; 
			var reshash = (link.substr(link.indexOf("#"))).substring(1);
			if (reshash === "about") {$('#about').modal('show');} 
			ev.preventDefault();
			return false;
		});
		$("select").click(function() {
			verifcampos(); 
		});

		$('select#trocha').change(function(){
			console.log('trocha'); 
			trocha.tipo = $('select#trocha').val(); 
			switch(trocha.tipo){
				case "Ancha": 
					trocha.metros = 1.676;
					trocha.milimetros = 1676;
					durmiente.largo = 2.7;
					break;
				case "Media": 
					trocha.metros = 1.435;
					trocha.milimetros = 1435;
					durmiente.largo = 2.5;
					break;
				case "Angosta": 
					trocha.metros = 1;
					trocha.milimetros = 1000;
					durmiente.largo = 2;
					break;
				default: 
					break; 
			}; 
			campos.trocha = true; 
			verifcampos(); 
		}); 
		$('select#riel-tipo').change(function(){
			console.log('rieltipo'); 
			riel.tipo = $('select#riel-tipo').val(); 
			switch(riel.tipo){
				case "100BS": 
					riel.peso = 49.61;
					break;
				case "U50": 
					riel.peso = 50.88;
					break;
				case "UIC54": 
					riel.peso = 54.77;
					break;
				case "UIC60": 
					riel.peso = 60.34;
					break;
				default: 
					break; 
			}; 
			campos.rieltipo = true; 
			$('input#riel-peso').val(riel.peso); 
			verifcampos(); 
		}); 
		$('select#eclisas-agujeros').change(function(){
			campos.eclisasagujeros = true; 
			agujeroseclisas = $('select#eclisas-agujeros').val(); 
			console.log('eclisas'); 
			verifcampos(); 
		}); 

		$('input#riel-largobarra').on('input', function(){
			console.log('largobarra'); 
			if ($('input#riel-largobarra').val() !== "") {
				campos.largobarra = true;
			} else {campos.largobarra = false};
			verifcampos(); 
		}); 
		$('input#durmiente-cantporkmvia').on('input', function(){
			console.log('cantporkmvia'); 
			if ($('input#durmiente-cantporkmvia').val() !== "") {
				campos.durmientesporkmporvia = true;
			} else {campos.durmientesporkmporvia = false;}
			verifcampos(); 
		}); 
		$('input#longitud-via').on('input', function(){
			console.log('longitudvia'); 
			if ($('input#longitud-via').val() !== "") {
				campos.longitudvia = true;
			} else {campos.longitudvia = false;}
			verifcampos(); 
		}); 
	})
	.on("submit", function(ev) {
		ev.preventDefault();
		$('.btn.btn-primary#calculos').removeClass('hidden').prop('disabled', ''); 
		$('.container#cuadro-resultados').removeClass('hidden'); 
		// Paso de los valores en campos a variables. 
			// Seccion riel
				riel.tipo = $('select#riel-tipo').val(); 
				riel.largobarra = $('input#riel-largobarra').val(); 
			// Seccion balasto
				//balasto.pesoespecifico = $('input#balasto-pesoespecifico').val(); 
			// Seccion durmiente 
				durmiente.alto = $('input#durmiente-alto').val(); 
				durmiente.ancho = $('input#durmiente-ancho').val(); 
				durmiente.cantporkmvia = $('input#durmiente-cantporkmvia').val(); 
			// Seccion longitud de via
				longitudvia.kilometros = $('input#longitud-via').val(); 
		// Cálculo de durmientes totales
			resultado.durmientestotales = durmiente.cantporkmvia * longitudvia.kilometros; 
			$('#calculo-durmientestotales').text(durmiente.cantporkmvia + " unidades/km x " + longitudvia.kilometros + "km = "); 
			$('#resultado-durmientestotales').text(resultado.durmientestotales); 
		// Cálculo de ocupación del durmiente en el espacio 
			resultado.ocupaciondurmiente = durmiente.alto * durmiente.ancho * durmiente.largo; 
			$('#calculo-ocupaciondurmiente').text(durmiente.alto + "m x " + durmiente.ancho + "m x " + durmiente.largo + "m = "); 
			$('#resultado-ocupaciondurmiente').text(resultado.ocupaciondurmiente); 
		// Cálculo de ocupación de área de todos los durmientes 
			resultado.ocupaciondurmientetodos = resultado.ocupaciondurmiente * resultado.durmientestotales; 
			$('#calculo-ocupaciondurmientetodos').text(resultado.ocupaciondurmiente + "m³ x " + resultado.durmientestotales + " unidades/km = "); 
			$('#resultado-ocupaciondurmientetodos').text((resultado.ocupaciondurmientetodos).toFixed(2)); 
		// Calculo de peso de cada barra de riel. 
			resultado.barrapeso = riel.peso * riel.largobarra;  
			$('#calculo-pesobarra').text(riel.peso + "kg/m x " + riel.largobarra + "m = "); 
			$('#resultado-pesobarra').text(resultado.barrapeso); 
		// Cálculo del balasto. Esto tiene varios pasos adicionales. 
		// Tenemos que tener en cuenta el área de un trapecio. 
			// Sacar bases. 
				trapecio.basemenor = 0.95 + 0.95 + trocha.metros; 
				trapecio.basemayor = 0.63 + 0.63 + trapecio.basemenor; 
				trapecio.resultado = ((trapecio.basemenor + trapecio.basemayor)/2)*0.42; 
			// Pasar longitud de via a metros. 
				longitudvia.metros = longitudvia.kilometros * 1000; 
			// Ocupación del balasto
				resultado.ocupacionbalasto = trapecio.resultado * longitudvia.metros; 
			// Ocupación del balasto restando el área de ocupación de los durmientes 
				resultado.ocupacionbalastotrapecio = resultado.ocupacionbalasto - resultado.ocupaciondurmientetodos; 
			// Balasto a utilizar 
				//resultado.balasto = resultado.ocupacionbalastotrapecio * balasto.pesoespecifico; 
				resultado.balasto = resultado.ocupacionbalastotrapecio * 1.6; 
				$('#calculo-balasto').html('<br/>\
												<strong>Para calcular este dato se tienen que realizar los siguientes cálculos: </strong><br/>\
												<strong>Base menor: </strong><span title="Entre la cara interna del riel y el límite de la base menor tiene que haber 0.95m de separación." data-toggle="tooltip" data-placement="top">' + 0.95 + 'm</span> + <span title="Entre la cara interna del riel y el límite de la base menor tiene que haber 0.95m de separación." data-toggle="tooltip" data-placement="top">' + 0.95 + 'm</span> + <span title="Tamaño de la trocha en metros." data-toggle="tooltip" data-placement="top">' + trocha.metros + 'm</span> = ' + trapecio.basemenor + 'm <br/>\
												<strong>Base mayor: </strong><span title="Hacé click acá para ver cómo se obtiene este valor." data-toggle="tooltip" data-placement="top"><span id="explicacion-pendiente-1">' + 0.63 + 'm</span></span> + <span title="Hacé click acá para ver cómo se obtiene este valor." data-toggle="tooltip" data-placement="top"><span id="explicacion-pendiente-2">' + 0.63 + '</span></span>m + ' + trapecio.basemenor + 'm = ' + trapecio.basemayor + 'm <br/>\
												<strong>Área del trapecio: </strong>' + "((" + trapecio.basemenor + " + " + trapecio.basemayor + ") / 2) x 0.42 = " + trapecio.resultado + 'm2 <br/>\
												<strong>Ocupación del balasto en el trapecio (superficie):</strong> ' + trapecio.resultado + "m2 x " + longitudvia.metros + 'm = ' + resultado.ocupacionbalasto + 'm³ <br/>\
												<strong>Ocupación del balasto en el trapecio sin contar la superficie total de todos los durmientes:</strong><br/> ' + resultado.ocupacionbalasto + "m³ - " + resultado.ocupaciondurmientetodos + "m³ = " + resultado.ocupacionbalastotrapecio + 'm³ <br/>\
												<strong>Cantidad de balasto a utilizar:</strong> ' + resultado.ocupacionbalastotrapecio + "m³ x 1.6 ton/m³ = " + resultado.balasto + "ton<br/><br/>"); 
				$('#resultado-balasto').text((resultado.balasto).toFixed(2)); 
			// Tirafondos 
				resultado.tirafondos = Math.round(resultado.durmientestotales * 4); 
				$('#calculo-tirafondos').text(resultado.durmientestotales + " unidades x 4 = "); 
				$('#resultado-tirafondos').text(resultado.tirafondos); 
			// Rieles 
				// Cantidad de barras
					resultado.rielesbarras = Math.round((longitudvia.metros * 2)/riel.largobarra); 
					$('#calculo-rielesbarras').text("(" + longitudvia.metros + " x 2)/"+ riel.largobarra +"m = "); 
					$('#resultado-rielesbarras').text(resultado.rielesbarras); 
				// Peso de todas las barras
					resultado.rielespeso = resultado.rielesbarras*(riel.peso * riel.largobarra)/1000; 
					$('#calculo-rielespeso').text(resultado.rielesbarras + " unidades x (" + riel.peso + "kg/m x " + riel.largobarra + "m)/1000 = "); 
					$('#resultado-rielespeso').text(resultado.rielespeso); 
			// Eclisas 
				resultado.eclisas = Math.round((longitudvia.metros*2/riel.largobarra)*2); 
				$('#calculo-eclisas').text("((" + longitudvia.metros + "m x 2)/" +riel.largobarra + "m) x 2 = "); 
				$('#resultado-eclisas').text(resultado.eclisas); 
			// Arandelas y bulones 
				resultado.arandelasbulones = resultado.eclisas*agujeroseclisas; 
				$('#calculo-arandelasbulones').text(resultado.eclisas + " unidades x " + agujeroseclisas + " agujeros = "); 
				$('#resultado-arandelasbulones').text(resultado.arandelasbulones); 
			console.log(resultado.ocupacionbalastotrapecio); 
			console.log(resultado.balasto); 
			$('[data-toggle="popover"]').popover(); 
			$('[data-toggle="tooltip"]').tooltip(); 
			$('#explicacion-pendiente-1').popover({
				html : true, 
				title: '¿Cómo se obtiene este valor?', 
				content: 'Hay que tener en cuenta que la pendiente se mide en 3:2 => Para 3 de ancho hay 2 de alto. <br/><br/>En este caso este trapecio tiene como dato conocido 0.42 de alto. <br/>Si 2 = 0.42m, entonces dividimos 0.42/2, y tenemos 0.21m de referencia en ese trapecio. <br/>Multiplicamos 0.21m por 2 para sacar el alto (obtenés de nuevo 0.42m), y luego 0.21m por 3 para sacar el alto, y ahí es como sale 0.63m como valor.', 
			}); 
			$('#explicacion-pendiente-2').popover({
				html : true, 
				title: '¿Cómo se obtiene este valor?', 
				content: 'Hay que tener en cuenta que la pendiente se mide en 3:2 => Para 3 de ancho hay 2 de alto. <br/><br/>En este caso este trapecio tiene como dato conocido 0.42 de alto. <br/>Si 2 = 0.42m, entonces dividimos 0.42/2, y tenemos 0.21m de referencia en ese trapecio. <br/>Multiplicamos 0.21m por 2 para sacar el alto (obtenés de nuevo 0.42m), y luego 0.21m por 3 para sacar el alto, y ahí es como sale 0.63m como valor.', 
			}); 
	});

	$(function () {$('[data-toggle="tooltip"]').tooltip()})