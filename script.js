'use strict';

const billInput = document.querySelector('.bill');
const tipBtns = document.querySelectorAll('.tip-btn');
const customTip = document.querySelector('.custom-tip')
const numOfPeople = document.querySelector('.num-of-people');
const errorMsg = document.querySelector('.error-msg');
const tipPerPerson = document.querySelector('.tip-amount-per-person');
const totalPerPerson = document.querySelector('.total-per-person');
const resetBtn = document.querySelector('.reset');

const unwantedChars = [ "-", "+", "e", "E"];
const validNumber = new RegExp(/^\d*\.?\d{0,2}$/);
let lastValid = billInput.value;
let storeTipPercent = 0;


//functions
function preventDisplay(e) {
    if (unwantedChars.includes(e.key)) {
        e.preventDefault();
    }
};

function restrictBillInput() {

    if(validNumber.test(this.value))
    {
        lastValid = this.value;
    } else {
        this.value = lastValid;
    }

};

function UpdateTipPercent() {
    storeTipPercent = Number(this.value);
    this.classList.add('tip-btn--active')
};

function restrictToTwoNum() {
    this.value = this.valueAsNumber;
    if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
};

function displayErrorMsg () {
    errorMsg.classList.remove('hidden');
    numOfPeople.classList.add('error-border');
};

function clearErrorMsg () {
    errorMsg.classList.add('hidden');
    numOfPeople.classList.remove('error-border');   
};

function customTipPercent() {
    storeTipPercent = Number(this.value) / 100;
    tipBtns.forEach(tipBtn => tipBtn.classList.remove('tip-btn--active'));
};

function computeTip() {
    if(billInput.value === '') return;
    const billValue = Number(billInput.value);
    const tipValue = billValue * storeTipPercent;
    const total = billValue + tipValue;
    const totalNumOfPeople = Number(numOfPeople.value);
    if (totalNumOfPeople === 0) {
        displayErrorMsg();
        tipPerPerson.textContent = `$0.00`;
        totalPerPerson.textContent = `$0.00`; 
    }; 

    if(totalNumOfPeople !== 0) {
        clearErrorMsg();
        const averageTip = tipValue / totalNumOfPeople;
        const averageTotal = total / totalNumOfPeople;
        tipPerPerson.textContent = `$${averageTip.toFixed(2)}`;
        totalPerPerson.textContent = `$${averageTotal.toFixed(2)}`; 
    };
        
};

function reset() {
    storeTipPercent = 0;
    clearErrorMsg();
    billInput.value = '';
    customTip.value = '';
    numOfPeople.value = '';
    tipPerPerson.textContent = `$0.00`;
    totalPerPerson.textContent = `$0.00`;
};


//event listeners
billInput.addEventListener('keydown', preventDisplay);
billInput.addEventListener('input', restrictBillInput);
numOfPeople.addEventListener('input', function() {
    restrictToTwoNum.bind(numOfPeople)();
    computeTip();
});
customTip.addEventListener('input', function () {
    restrictToTwoNum.bind(customTip)();
    customTipPercent.bind(customTip)();
});
resetBtn.addEventListener('click', reset);
tipBtns.forEach((tipBtn) => tipBtn.addEventListener('click', UpdateTipPercent));