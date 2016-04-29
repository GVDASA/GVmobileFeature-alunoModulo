angular.module('aluno.modulo')
    .factory('serviceDefinicaoAluno', ServiceDefinicaoAluno);

function ServiceDefinicaoAluno($rootScope, $q, $filter, localStorage, AppModulos, sidemenuService, navigationService, controleAcesso) {
    return {
        selecionarAluno: selecionarAluno,
        selecionarCurso: selecionarCurso,
        getCursos: getCursos,
        getAlunos: getAlunos,
        getAlunoSelecionado: getAlunoSelecionado,
        getCursoSelecionado: getCursoSelecionado,
        getUnidadeSelecionada: getUnidadeSelecionada,
        updateProfileData: updateProfileData,
        getContextData: getContextData
    };
    //////////////////////////////////////////////////////////////////////////////
    function getUnidadeSelecionada() {
        var curso = getCursoSelecionado();
        if (curso) {
            return {
                codUnidade: curso.codUnidade,
                codEmpresa: curso.codEmpresa
            };
        };
        return;
    };

    function selecionarCurso(curso) {
        if (angular.isObject(curso)) {
            localStorage.set('cursoSelecionado', curso);
            navigationService.go('/main/inicial');
            $rootScope.$broadcast('CURSO_SELECIONADO', curso);
            $rootScope.$broadcast('CONTEXT_FORMED', true);
        } else {
            var deferred = $q.defer();
            var off = $rootScope.$on('CURSO_SELECIONADO', function (e, curso) {
                deferred.resolve($q.when(curso));
                off();
            });

            // Seleciona o primeiro módulo ou manda para tela de seleção
            var cursos = getCursos();
            if (curso !== true && cursos.length === 1) {
                selecionarCurso(cursos[0]);
            } else {
                navigationService.go('/cursos');
            }
            return deferred.promise;
        }
    };

    function selecionarAluno(aluno) {
        if (angular.isObject(aluno)) {
            localStorage.set('alunoSelecionado', aluno);
            $rootScope.$broadcast('ALUNO_SELECIONADO', aluno);
        } else {
            var deferred = $q.defer();
            var off = $rootScope.$on('ALUNO_SELECIONADO', function (e, aluno) {
                deferred.resolve(selecionarCurso());
                controleAcesso.logarAcesso();
                off();
            });

            // Seleciona o primeiro módulo ou manda para tela de seleção
            var alunos = getAlunos();
            if (aluno !== true && alunos.length === 1) {
                selecionarAluno(alunos[0]);
            } else {
                navigationService.go('/alunos');
            }
            return deferred.promise;
        }
    };

    function getCursos() {
        var aluno = getAlunoSelecionado();
        if (aluno) {
            return $filter('unique')(aluno.cursos, 'id');
        }
        return;
    };

    function getCursoSelecionado() {
        return localStorage.get('cursoSelecionado');
    }

    function getAlunos() {
        return AppModulos.getCurrentPerfil().data.alunos;
    };

    function getAlunoSelecionado() {
        return localStorage.get('alunoSelecionado');
    }

    function updateProfileData() {
        var aluno = getAlunoSelecionado();
        if (aluno) {
            sidemenuService.descricao = aluno.nome;
            sidemenuService.fotoUrl = aluno.foto;

            var curso = getCursoSelecionado();
            sidemenuService.extradata = [{
                descricao: curso.unidade,
                class: 'unidade'
            }, {
                    descricao: curso.descricao,
                    class: 'curso'
                }];
        };
    };

    function getContextData() {
        return {
            unidade: getUnidadeSelecionada(),
            curso: getCursoSelecionado(),
            aluno: getAlunoSelecionado()
        };
    };
};