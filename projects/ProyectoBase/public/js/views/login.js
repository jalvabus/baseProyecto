var app = angular.module('loginApp', [])
    .controller("loginController", ($scope, $http) => {
        $scope.mensaje = "Cursos";

        $scope.usuario = {};

        $scope.login = function () {
            if (!$scope.usuario.password || !$scope.usuario.matricula) {
                swal("Complete los campos!", {
                    icon: "error",
                });
            } else {
                var string_form = $('#form').serialize();

                $.ajax({
                    type: 'POST',
                    url: '/projects/ProyectoBase/API/login/index.php',
                    data: string_form,
                    cache: false,
                    success: function (response) {
                        var json_response = JSON.parse(response);

                        if (json_response.data.length > 0) {
                            var usuario = json_response.data[0];
                            $scope.saveUsuario(usuario);
                            swal("Bienvenido " + usuario.tipo + "!", {
                                icon: "success",
                            }).then(() => {
                                if (usuario.tipo === 'Profesor') {
                                    window.location.replace('/projects/ProyectoBase/views/profesor');
                                } else {
                                    window.location.replace('/projects/ProyectoBase/views/alumno');
                                }
                            });
                        } else {
                            swal("Usuario o contraseña incorrectos!", {
                                icon: "error",
                            });
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        swal("Ocurrio un error!", {
                            icon: "error",
                        });
                    }
                })

            }

            $scope.saveUsuario = function (usuario) {
                window.localStorage.setItem("usuario", JSON.stringify(usuario));
            }
        }

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