// Register `phoneList` component, along with its associated controller and template
angular.module('expertSystem').component('expertSystem', {
    templateUrl: 'expert-system/expert-system.html',
    controller: function ExpertSystemController() {
        const vm = this;

        vm.mode = 'knowledge';
        vm.numberOfChars = null;
        vm.numberOfObjects = null;
        vm.charsNumberArr = [];
        vm.objectsNumberArr = [];
        vm.charsArr = [];
        vm.objectsArr = [];
        vm.step3 = false;

        vm.matrix = [[]];

        vm.setCharsArr = () => setCharsArr();
        vm.setObjectsArr = () => setObjectsArr();
        vm.createMatrix = () => createMatrix();

        function setCharsArr() {
            vm.charsNumberArr = [];
            vm.charsArr = [];
            for (let i = 0; i < vm.numberOfChars; i++) {
                vm.charsNumberArr[i] = i + 1;
                vm.charsArr[i] = i + 1;
            }
        }

        function setObjectsArr() {
            vm.objectsNumberArr = [];
            vm.objectsArr = [];
            for (let i = 0; i < vm.numberOfObjects; i++) {
                vm.objectsNumberArr[i] = i + 1;
                vm.objectsArr[i] = i + 1;
            }
        }

        function createMatrix() {
            vm.matrix = [[]];
            let counter = 0;
            for (let i = 0; i < vm.numberOfObjects; i++) {
                for (let j = 0; j < vm.numberOfChars; j++) {
                    vm.matrix[i][j] = counter;
                    counter++;
                }
            }
            console.log(vm.matrix);
        }
    }
    ,
    controllerAs: 'vm',
});
