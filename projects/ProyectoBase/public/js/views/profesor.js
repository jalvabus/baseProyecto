var app = angular.module('profesorApp', ['ngRoute'])
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
            .when("/alumnos", {
                templateUrl: "alumnos.html"
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
        var usuario = JSON.parse(localStorage.getItem("usuario"));
        $scope.usuario = usuario;
    })
    .controller("alumnosController", ($scope, $http) => {
        $scope.mensaje = "Alumnos";

        $scope.type = "create";
        $scope.usuario = {};
        $scope.submit = function () {
            if (!$scope.usuario.nombre || !$scope.usuario.apellido_paterno || !$scope.usuario.apellido_materno
                || !$scope.usuario.direccion || !$scope.usuario.telefono || !$scope.usuario.grupo || !$scope.usuario.sexo) {
                swal({
                    title: "Campos incompletos!",
                    text: "Complete los campos!",
                    icon: "error",
                });
            } else {
                $scope.closeModal();
                var data_String = $('#form_usuario').serialize();
                $.ajax({
                    type: 'POST',
                    url: '/projects/ProyectoBase/API/alumnos/?action=create',
                    data: data_String,
                    cache: false,
                    success: function (response) {
                        $scope.usuario = {};
                        swal({
                            title: "Registrado!",
                            text: "Registro realizado con exito!",
                            icon: "success",
                        });
                        $scope.getAll();
                    }
                })
            }

        }
        $scope.editarUsuario = function (usuario) {
            console.log(usuario);
            $scope.usuario = usuario;
            $scope.type = "update";
            $scope.openModal();
        }
        $scope.eliminarUsuario = function (usuario) {
            var data_String = 'id_alumno=' + usuario.id_usuario;
            swal({
                title: "¿Eliminar el alumno " + usuario.nombre + "?",
                text: "Una vez eliminado no se podra recuperar!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        $.ajax({
                            type: 'POST',
                            url: '/projects/ProyectoBase/API/alumnos/?action=delete',
                            data: data_String,
                            cache: false,
                            success: function (response) {
                                $scope.usuario = {};
                                swal("El alumno ah sido eliminado con exito!", {
                                    icon: "success",
                                });
                                $scope.getAll();
                            }
                        })
                    }
                });
        }
        $scope.alumnos = {};
        $scope.getAll = function () {
            $http({
                method: 'GET',
                url: '/projects/ProyectoBase/API/alumnos/'
            }).then(function successCallback(response) {
                $scope.alumnos = response.data.alumnos;
            }, function errorCallback(response) {
            });
        }
        $scope.getAll();
        $scope.actualizar = function () {
            if (!$scope.usuario.nombre || !$scope.usuario.apellido_paterno || !$scope.usuario.apellido_materno
                || !$scope.usuario.direccion || !$scope.usuario.telefono || !$scope.usuario.grupo || !$scope.usuario.sexo) {
                swal({
                    title: "Campos incompletos!",
                    text: "Complete los campos!",
                    icon: "error",
                });
            } else {

                $scope.closeModal();
                var data_String = $('#form_usuario').serialize();
                $.ajax({
                    type: 'PUT',
                    url: '/projects/ProyectoBase/API/alumnos/?action=update&id_alumno=' + $scope.usuario.id_alumno + '&' + data_String,
                    cache: false,
                    success: function (response) {
                        $scope.usuario = {};
                        swal({
                            title: "Actualizado!",
                            text: "Actualizacion realizada con exito!",
                            icon: "success",
                        });
                        $scope.getAll();
                    }
                })
                $scope.type = "create";
            }
        }
        $scope.cancelar = function () {
            $scope.type = "create";
            $scope.usuario = {};
            $scope.closeModal();
        }

        $scope.openModal = function () {
            var modal = document.getElementById('myModal');
            modal.style.display = "block";
        }

        $scope.closeModal = function () {
            var modal = document.getElementById('myModal');
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            var modal = document.getElementById('myModal');
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    })
    .controller("perfilController", ($scope, $routeParams) => {
        $scope.mensaje = "Perfil";
        console.log($routeParams);

        var usuario = JSON.parse(localStorage.getItem("usuario"));
        $scope.usuario = usuario;

    })
    .controller("cursosController", ($scope, $http) => {

        var usuario = JSON.parse(localStorage.getItem("usuario"));
        $scope.usuario = usuario;

        $scope.mensaje = "Cursos";
        $scope.type = "create";

        $scope.base = {};
        $scope.programacion = {};
        $scope.ingenieria = {};

        $scope.agregarCurso = {};


        $scope.alumnos = {};
        $scope.getAll = function () {
            $http({
                method: 'GET',
                url: '/projects/ProyectoBase/API/alumnos/'
            }).then(function successCallback(response) {
                $scope.alumnos = response.data.alumnos;
            }, function errorCallback(response) {
            });
        }
        $scope.getAll();

        $scope.alumnos_inscritos = {};
        $scope.getAllInscritos = function () {
            $http({
                method: 'GET',
                url: '/projects/ProyectoBase/API/cursos/'
            }).then(function successCallback(response) {
                console.log(response);
                // $scope.alumnos_inscritos = response.data.alumnos_inscritos;
                response.data.alumnos_inscritos.forEach((alumno, i) => {
                    $scope.alumnos_inscritos[i] = alumno;
                    $scope.alumnos_inscritos[i].promedio = (Number(alumno.primer_parcial) + Number(alumno.segundo_parcial) + Number(alumno.tercer_parcial)) / 3;
                })
                console.log($scope.alumnos_inscritos)
            }, function errorCallback(response) {
            });
        }
        $scope.getAllInscritos();


        $scope.submit = function () {
            if (!$scope.agregarCurso.id_alumno || !$scope.agregarCurso.materia) {
                swal({
                    title: "Campos incompletos!",
                    text: "Cpmplete los campos!",
                    icon: "error",
                })
            } else {
                $scope.closeModal();
                var data_String = $('#form_usuario').serialize();
                data_String += '&id_profesor=' + $scope.usuario.id_usuario;
                console.log(data_String);
                $.ajax({
                    type: 'POST',
                    url: '/projects/ProyectoBase/API/cursos/?action=create',
                    data: data_String,
                    cache: false,
                    success: function (response) {
                        console.log(response);
                        swal({
                            title: "Registrado!",
                            text: "Registro realizado con exito!",
                            icon: "success",
                        });
                        $scope.getAll();
                        $scope.getAllInscritos();
                    }
                })
            }

        }

        $scope.eliminarUsuario = function (usuario) {
            var data_String = 'id_curso=' + usuario.id_calificacion;
            swal({
                title: "¿Eliminar el alumno " + usuario.nombre + "?",
                text: "Una vez eliminado no se podra recuperar!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        $.ajax({
                            type: 'POST',
                            url: '/projects/ProyectoBase/API/cursos/?action=delete',
                            data: data_String,
                            cache: false,
                            success: function (response) {
                                console.log(response);
                                $scope.usuario = {};
                                swal("El alumno ah sido eliminado del curso con exito!", {
                                    icon: "success",
                                }).then(() => {
                                    $scope.getAll();
                                    $scope.getAllInscritos();
                                    window.location.reload();
                                });
                                $scope.getAll();
                                $scope.getAllInscritos();
                                
                            }
                        })
                    }
                });
        }

        $scope.submitCalificaciones = function () {
            $scope.closeModal();
            var data_String = $('#form_calificaciones').serialize();
            data_String += '&id_calificacion=' + $scope.calificaciones.id_calificacion;
            $.ajax({
                type: 'POST',
                url: '/projects/ProyectoBase/API/usuarios/?action=calificaciones',
                data: data_String,
                cache: false,
                success: function (response) {
                    $scope.closeModalCalificaciones();
                    swal({
                        title: "Calificacion Registrada!",
                        text: "Se ah registrado la calificacion con exito!",
                        icon: "success",
                    });
                    $scope.getAll();
                    $scope.getAllInscritos();
                }
            })
        }

        $scope.calificaciones = {};
        $scope.editarUsuario = function (alumno) {
            $scope.calificaciones = alumno;
            $scope.calificaciones.primer_parcial = Number(alumno.primer_parcial);
            $scope.calificaciones.segundo_parcial = Number(alumno.segundo_parcial);
            $scope.calificaciones.tercer_parcial = Number(alumno.tercer_parcial);
            $scope.openModalCalificaciones();
        }

        $scope.openModalCalificaciones = function () {
            var modal = document.getElementById('modalCalificaciones');
            modal.style.display = "block";
        }

        $scope.closeModalCalificaciones = function () {
            var modal = document.getElementById('modalCalificaciones');
            modal.style.display = "none";
        }

        $scope.openModal = function () {
            var modal = document.getElementById('modalCursos');
            modal.style.display = "block";
        }

        $scope.closeModal = function () {
            var modal = document.getElementById('modalCursos');
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            var modal = document.getElementById('modalCursos');
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        $scope.curso = null;
        $scope.activeNav = function (id) {
            $('#base').removeClass('active');
            $('#ing').removeClass('active');
            $('#progra').removeClass('active');
            $('#' + id).addClass('active');
            $scope.curso = id;
        }
    })
