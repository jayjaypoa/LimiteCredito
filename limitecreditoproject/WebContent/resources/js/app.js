// MODULO
var app = angular.module('credito', [ 'ngRoute', 'ngResource', 'ngAnimate' ]);

// ROTAS
app.config(function($routeProvider) {

	$routeProvider.when("/clientelist", {
		controller : "clienteController",
		templateUrl : "cliente/list.html"
	})
	
	.when("/clienteedit/:id", {
		controller : "clienteController",
		templateUrl : "cliente/cadastro.html"
	})
	
	.when("/cliente/cadastro", {
		controller : "clienteController",
		templateUrl : "cliente/cadastro.html"
	})
	
	.otherwise({
		redirectTo : "/"
	});			
			
});


// CONTROLLER CLIENTE
app.controller('clienteController', function($scope, $http, $location, $routeParams) {
	
	// Alimenta com os riscos possíveis
	$scope.listaRisco = ["A","B","C"];
	
	// Completa com a taxa correta
	$scope.update = function() {
	   
	   if ($scope.cliente.risco == "C"){
		   $scope.cliente.taxa = 20;
	   } else if ($scope.cliente.risco == "B"){
		   $scope.cliente.taxa = 10;
	   } else {
		   $scope.cliente.taxa = 0;
	   }
	   
	}
	
	if ($routeParams.id != null && $routeParams.id != undefined
			&& $routeParams.id != ''){ // se estiver editando o cliente
		
		// entra pra editar
		$http.get("cliente/buscarcliente/" + $routeParams.id).success(function(response) {			
			$scope.cliente = response;			
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
		
	} else { // novo registro
		$scope.cliente = {};
	}
		
	
	$scope.editarCliente = function(id) {
		$location.path('clienteedit/' + id);
	};
	
	
	// Salva o registro (novo ou em edição)
	$scope.salvarCliente = function() {		
		$http.post("cliente/salvar", $scope.cliente).success(function(response) {			
			$scope.cliente = {};
			sucesso("Registro salvo com sucesso!");
		}).error(function(response) {
			erro("Error: " + response);
		});
		
	};
          
	// listar todos os registros
	$scope.listarClientes = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("cliente/listar/" + numeroPagina).success(function(response) {
			
			$scope.data = response;
			
			// total da página
			$http.get("cliente/totalPagina").success(function(response) {
				$scope.totalPagina = response;
			}).error(function(response) {
				erro("Error: " + response);
			});
			
		}).error(function(response) {
			erro("Error: " + response);
		});
		
	};
	
	
	// próxima página
	$scope.proximo = function () {
		if (new Number($scope.numeroPagina) < new Number($scope.totalPagina)) {
		 $scope.listarClientes(new Number($scope.numeroPagina + 1));
		} 
	};
	
	// página anterior
	$scope.anterior = function () {
		if (new Number($scope.numeroPagina) > 1) {
		  $scope.listarClientes(new Number($scope.numeroPagina - 1));
		}
	};
		
	// remove o registro
	$scope.removerCliente = function(codCliente) {
		$http.delete("cliente/deletar/" + codCliente).success(function(response) {
			$scope.listarClientes($scope.numeroPagina);
			sucesso("Registro removido com sucesso!"); 
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		});
	};	
	
});


// mensagem de sucesso
function sucesso(msg) {
	$.notify({
		message: msg
	
	},{
	    type: 'success',
	    timer: 1000
	});
}

// mensagem de erro
function erro(msg) {
	$.notify({
		message: msg
	},{
	    type: 'danger',
	    timer: 1000
	});
}

// indetificar navegador
function identific_nav(){
    var nav = navigator.userAgent.toLowerCase();
    if(nav.indexOf("msie") != -1){
       return browser = "msie";
    }else if(nav.indexOf("opera") != -1){
    	return browser = "opera";
    }else if(nav.indexOf("mozilla") != -1){
        if(nav.indexOf("firefox") != -1){
        	return  browser = "firefox";
        }else if(nav.indexOf("firefox") != -1){
        	return browser = "mozilla";
        }else if(nav.indexOf("chrome") != -1){
        	return browser = "chrome";
        }
    }else{
    	alert("Navegador desconhecido!");
    }
}