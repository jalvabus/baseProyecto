var app = angular.module('alumnoApp', ['ngRoute'])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(($routeProvider) => {
        $routeProvider
            .when("/", {
                templateUrl: "home.html"
            })
            .when("/perfil", {
                templateUrl: "perfil.html"
            })
            .when("/cursos", {
                templateUrl: "cursos.html"
            })
    })
    .controller("indexController", ($scope, $http) => {
        $scope.conexion = false;

        $http({
            method: 'GET',
            url: '/projects/ProyectoBase/API/config/'
        }).then(function successCallback(response) {
            console.log(response);
            if (String(response.data) === 'CONEXION A LA BASE EXITOSA') {
                $scope.conexion = true;
            } else {
                $scope.conexion = false;
            }
        }, function errorCallback(response) {
        });

    })
    .controller("homeController", ($scope) => {
        $scope.mensaje = "Cursos";

        var usuario = JSON.parse(localStorage.getItem("usuario"));
        $scope.usuario = usuario;

    })
    .controller("perfilController", ($scope, $routeParams, $http) => {
        $scope.mensaje = "Perfil";
        console.log($routeParams);

        var usuario = JSON.parse(localStorage.getItem("usuario"));
        $scope.usuario = usuario;


        $scope.alumno = {};
        $scope.getPerfil = function () {
            $http({
                method: 'GET',
                url: '/projects/ProyectoBase/API/alumnos/?action=getOne&id_usuario=' + $scope.usuario.id_usuario
            }).then(function successCallback(response) {
                console.log(response);
                $scope.alumno = response.data[0];

            }, function errorCallback(response) {
            });
        }

        $scope.getPerfil();

    })
    .controller("cursosController", ($scope, $http) => {
        $scope.mensaje = "Cursos";

        var usuario = JSON.parse(localStorage.getItem("usuario"));
        $scope.usuario = usuario;

        $scope.cursos = {};
        $scope.getCursos = function () {
            $http({
                method: 'GET',
                url: '/projects/ProyectoBase/API/usuarios/?id_usuario=' + $scope.usuario.id_usuario
            }).then(function successCallback(response) {
                console.log(response);
                // $scope.cursos = response.data.cursos;
                response.data.cursos.forEach((alumno, i) => {
                    $scope.cursos[i] = alumno;
                    $scope.cursos[i].promedio = (Number(alumno.primer_parcial) + Number(alumno.segundo_parcial) + Number(alumno.tercer_parcial)) / 3;
                })
            }, function errorCallback(response) {
            });
        }
        $scope.getCursos();

    })
