angular.module('aluno.modulo')

.controller("CursosCtrl", function($scope, $timeout, serviceDefinicaoAluno) {

	$scope.cursos = serviceDefinicaoAluno.getCursos();

	$scope.atual = serviceDefinicaoAluno.getCursoSelecionado();

	$scope.loadCurso = function(curso) {
		$scope.atual = curso;
		$timeout(function() {
			serviceDefinicaoAluno.selecionarCurso(curso);
		}, 500);
	};
});