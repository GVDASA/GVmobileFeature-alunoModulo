angular.module('aluno.modulo')

.controller("AlunosCtrl", function($scope, $timeout, serviceDefinicaoAluno) {

	$scope.alunos = serviceDefinicaoAluno.getAlunos();
	$scope.atual = serviceDefinicaoAluno.getAlunoSelecionado();

	$scope.loadAluno = function(aluno) {
		$scope.atual = aluno;
		$timeout(function() {
			serviceDefinicaoAluno.selecionarAluno(aluno);
		}, 500);
	};
});