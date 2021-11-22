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
        vm.answer = () => answer();

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

        vm.solvingQuestionChar = null;
        vm.solvingQuestionValue = null;

        let minRow = null;

        function startSolving(newMatrix) {
            !newMatrix ? matrix = [...vm.matrix] : matrix = newMatrix;
            matrix = removeRowsWithZeroValues(matrix);

            let minRow = finedMinRow(matrix);
            console.log("MIN ROW: ", minRow);
            vm.solvingQuestionChar = vm.charsArr[minRow];
        }

        function answer() {
            vm.solvingQuestionValue == 1 ? removeObjectsWithoutChar(vm.solvingQuestionChar) : removeObjectsWithoutChar(vm.solvingQuestionChar);
        }

        function removeRowsWithZeroValues(array) {
            const zeroRows = [];

            const filtered = array.filter(function (value, index, arr) {
                let sum = 0;
                for (let i = 0; i < value.length; i++) {
                    sum += 1 * value[i];
                }
                if (sum !== 0) {
                    return value;
                } else {
                    zeroRows.push(index);
                }
            });
            console.log("WITHOUT ZEROS: ", filtered);

            vm.charsArr = vm.charsArr.filter(function (value, index) {
                if (!zeroRows.includes(index)) {
                    return value;
                }
            });

            console.log("WITHOUT ZEROS CHARS: ", vm.charsArr);
            return filtered;
        }

        function removeObjectsWithoutChar(characteristic) {

            let charNumber = vm.charsArr.indexOf(characteristic);
            console.log("WITHOUT CHAR NUMBER: ", charNumber);
            console.log("OBJECTS ARRAY1: ", vm.objectsArr);

            matrix = transpose(matrix, matrix.length);
            console.log("TRANSPOSE1: ", matrix);

            if (vm.solvingQuestionValue == 1) {
                matrix = matrix.filter(function (value, index) {
                    if (value[charNumber] == 1) {
                        return value;
                    } else {
                        vm.objectsArr[index] = null;
                    }
                });
            } else {
                matrix = matrix.filter(function (value, index) {
                    if (value[charNumber] == 0) {
                        return value;
                    } else {
                        vm.objectsArr[index] = null;
                    }
                });
            }

            vm.objectsArr = vm.objectsArr.filter(function (value) {
                if (value != null) {
                    return value;
                }
            });

            console.log("FILTERED1: ", matrix);

            matrix = transpose(matrix, matrix.length);
            console.log("TRANSPOSE BACK: ", matrix);
            console.log("OBJECTS ARRAY2: ", vm.objectsArr);
            vm.solvingQuestionValue = null;

            vm.objectsArr.length !== 1 ? startSolving(matrix) : finish(matrix);

            return;
        }

        function finish(array) {
            array.length === 0 ? alert("Undetected object") : alert(`Object is: ${vm.objectsArr[0]}`);
        }

        const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));

        function finedMinRow(array) {
            let minSum = Number.MAX_VALUE;
            let minNumber = 0;
            let sum = 0;
            let count = 0;

            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    sum += 1 * array[i][j];
                }
                if (sum === 1) {
                    return count;
                } else if (sum < minSum) {
                    minNumber = count;
                    minSum = sum;
                }
                sum = 0;
                count++;
            }
            return minNumber;
        }
    }
    ,
    controllerAs: 'vm',
});
