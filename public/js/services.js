angular.module("myApp.services",[]).value("version","0.1").service("modalService",["$uibModal",modalService]);modalService.$inject=["$uibModal"];function modalService($uibModal){var modalDefaults={backdrop:true,keyboard:true,modalFade:true,templateUrl:"modal/modal.html",size:"lg"};var modalOptions={closeButtonText:"Отмена",actionButtonText:"OK",headerText:"Подтверждение",bodyText:"Вы уверены?"};this.showModal=function(customModalDefaults,customModalOptions){if(!customModalDefaults){customModalDefaults={}}customModalDefaults.backdrop="static";return this.show(customModalDefaults,customModalOptions)};this.show=function(customModalDefaults,customModalOptions){var tempModalDefaults={};var tempModalOptions={};angular.extend(tempModalDefaults,modalDefaults,customModalDefaults);angular.extend(tempModalOptions,modalOptions,customModalOptions);if(!tempModalDefaults.controller){tempModalDefaults.controller=["$scope","$uibModalInstance",function($scope,$uibModalInstance){$scope.modalOptions=tempModalOptions;$scope.modalOptions.ok=function(result){$uibModalInstance.close(result)};$scope.modalOptions.close=function(result){$uibModalInstance.dismiss("cancel")}}];tempModalDefaults.controller.$inject=["$scope","$uibModalInstance"]}return $uibModal.open(tempModalDefaults).result}}
