$(document).ready(function() {
    let currentInput = '';
    // displayクラスを持つ要素を変数に保存
    let display = $('.display');
    // currentInputを値として表示する
    function updateDisplay() {
        display.val(currentInput || '0');
    }

    function addToCurrentInput(value) {
        // currentInputの最後の文字を変数に保存
        const lastChar = currentInput.slice(-1);
        const isLastCharOperator = isOperator(lastChar); // 真偽値
        const isLastCharDecimal = lastChar === '.'; // 真偽値
        
        if ((currentInput === '' || currentInput === '0') && (value === '00' || value === '0')) {
            // 先頭に0または00の追加を防ぐ
            return;
        } else if (currentInput === '' && (isOperator(value) || value === '.')) {
            // 最初の入力で演算子または小数点が来た場合は無視
            return;
        } else if (currentInput === '0' && value !== '.') {
            // 先頭が0で次に来るのが.以外なら0を削除
            currentInput = '';
        } else if (isOperator(value) && isLastCharOperator) {
            // 連続する演算子の置換
            currentInput = currentInput.slice(0, -1);
        } else if ((value === '.' && isLastCharOperator) || (isOperator(value) && isLastCharDecimal)) {
            // 演算子の後や小数点の後に小数点または演算子が来るのを防ぐ
            return;
        } else if (value === '.' && currentInput.includes('.') && !isLastCharOperator) {
            // 小数点の重複入力を防ぐ（ただし演算子によって区切られている場合は許可）
            return;
        }
        currentInput += value;
        updateDisplay();
    }

    // 演算子かどうかを真偽値として評価
    function isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }

    $('.button').click(function() {
        const value = $(this).text();
        if (value === 'AC') {
            currentInput = '';
        } else if (value === '=') {
            try {
                currentInput = eval(currentInput).toString();
            } catch {
                currentInput = 'Error';
            }
        } else {
            addToCurrentInput(value);
        }
        updateDisplay();
    });

    updateDisplay();
});
