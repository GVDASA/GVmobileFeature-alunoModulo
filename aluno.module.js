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
})

.run(function(ajudaService){
	
	ajudaService.addSecao('aluno.modulo', [{
		"title": "Aluno",
		"questoes": [{
			"title": "Como faço para visualizar os dados de outro aluno?",
			"text": "Se você possui mais de um aluno vinculado em seu perfil, como outro dependente ou filho(a), vá até o menu principal e clique no nome do aluno. Selecione a opção <strong>Mudar aluno</strong> e selecione o outro aluno."
		}]
	}, {
		"title": "Cursos",
		"questoes": [{
			"title": "Como faço para visualizar os dados de outro curso?",
			"text": "Se você possui mais de um curso vinculado no período atual, vá até o menu principal e clique no nome do aluno. Selecione a opção <strong>Ver outros cursos</strong> e selecione o curso desejado."
		}]
	}, {
		"title": "Lembretes ",
		"questoes": [{
			"title": "Por que não estou recebendo os lembretes que marquei?",
			"text": "Você deverá estar conectado a uma rede Wi-Fi, 3g ou 4g para receber os lembretes."
		}]
	}]);
});