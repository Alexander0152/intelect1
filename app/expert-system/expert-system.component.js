// Register `phoneList` component, along with its associated controller and template
angular.module('expertSystem').component('expertSystem', {
    templateUrl: 'expert-system/expert-system.html',
    controller: function ExpertSystemController() {
        const vm = this;

        let matrix = null;
        vm.mode = 'knowledge1';
        vm.numberOfChars = null;
        vm.numberOfObjects = null;
        vm.charsNumberArr = [];
        vm.objectsNumberArr = [];
        vm.charsArr = [];
        vm.objectsArr = [];
        vm.step3 = false;

        vm.startSolving = () => startSolving();

        vm.matrix = [];

        vm.setCharsArr = () => setCharsArr();
        vm.setObjectsArr = () => setObjectsArr();
        vm.createMatrix = () => createMatrix();
        vm.show = () => console.log(vm.matrix);

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
            vm.matrix = new Array(vm.numberOfChars);
            for (let i = 0; i < vm.numberOfChars; i++) {
                vm.matrix[i] = new Array(vm.numberOfObjects);
                for (let j = 0; j < vm.numberOfObjects; j++) {
                    vm.matrix[i][j] = '';
                }
            }
        }

        vm.solvingQuestionObject = null;
        vm.solvingQuestionChar = null;
        vm.solvingQuestionValue = null;

        function startSolving() {
            matrix = [...vm.matrix];
            matrix = removeRowsWithZeroValues(matrix);

            console.log("MAAAATRix: ", matrix);
        }

        function removeRowsWithZeroValues(array) {
            const zeroRows = [];

            const filtered = array.filter(function (value, index, arr) {
                let sum = 0;
                for (let i = 0; i < value.length; i++) {
                    sum += 1*value[i];
                }
                if (sum !== 0) {
                    zeroRows.push(index);
                    return value;
                }
            });
            console.log("FILTERED: ", filtered);

            vm.charsArr = vm.charsArr.filter(function (value, index) {
                if (zeroRows.includes(index)) {
                    return value;
                }
            });

            console.log("AAAAA: ", vm.charsArr);
            return filtered;
        }
    }
    ,
    controllerAs: 'vm',
});
