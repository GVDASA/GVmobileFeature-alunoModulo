angular.module('aluno.modulo', [
	'core'
])

.config(function($stateProvider, AppModulosProvider, PerfilProvider, NotificacoesProvider, AppFeaturesProvider) {

	PerfilProvider.addPerfil({
		perfil: 'aluno'
	});

	AppModulosProvider.addAppModule([{
		nome: 'Aluno',
		modulo: "aluno",
		feature: "aluno.modulo",
		perfil: "aluno",
		resolve: ['navigationService', 'AppModulos', 'serviceDefinicaoAluno', function(navigationService, AppModulos, serviceDefinicaoAluno) {
			return serviceDefinicaoAluno.selecionarAluno().then(function() {
				serviceDefinicaoAluno.updateProfileData();
				navigationService.go('/main/inicial');
			});
		}]
	}]);
	NotificacoesProvider.addType([{
		tipo: "aviso",
		modulo: "aluno",
		feature: "aluno.modulo",
		desc: "Avisos",
		urlBase: "/main/aviso/",
		classe: "ion-pin",
		params: null
	}, {
		tipo: "sala",
		modulo: "aluno",
		feature: "aluno.modulo",
		desc: "Sala",
		urlBase: "/main/aviso/",
		classe: "ion-android-time",
		params: null
	}]);


	// Rotas padrões da aplicação
	$stateProvider.state("alunos", {
		url: "/alunos",
		templateUrl: 'aluno.modulo/alunos.html',
		controller: "AlunosCtrl",
		data: {
			disallowBack: true
		}
	})

	.state("cursos", {
		url: "/cursos",
		templateUrl: 'aluno.modulo/cursos.html',
		controller: "CursosCtrl",
		data: {
			disallowBack: true
		}
	});


})

.run(function($window, sidemenuService, serviceDefinicaoAluno, navigationService) {
	console.log('Run: aluno.modulo');

	sidemenuService.addProfileMenus([{
		action: function() {
			serviceDefinicaoAluno.selecionarAluno(true).then(function() {
				serviceDefinicaoAluno.updateProfileData();
				navigationService.go('/main/inicial');
			});
		},
		modulo: 'aluno',
		descricao: 'Mudar aluno',
		iconCls: 'ion-person-stalker'
	}, {
		action: function() {
			serviceDefinicaoAluno.selecionarCurso(true).then(function() {
				serviceDefinicaoAluno.updateProfileData();
				navigationService.go('/main/inicial');
			});
		},
		modulo: 'aluno',
		descricao: 'Ver outros cursos',
		iconCls: 'ion-university'
	}]);
});