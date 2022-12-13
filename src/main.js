var _ = require('lodash');
var $ = require ('jquery');
var QRious = require('qrious');

var genBtn, textInput, outputDiv;
var SIZE = 300;

function generateQR(input) {
  var div = document.createElement('div');
  div.className = 'qrBox';
  var tDiv = document.createElement('div');
  tDiv.className = 'qrTitle';
  div.appendChild(tDiv);
  //todo escape
  var strlenth=input.length;
  if (strlenth % 7 !=0) {
    tDiv.innerHTML='请输入长度为7的整数倍的二进制编码'
    outputDiv.appendChild(div)
  }else{
    // 0110101011010101101010110101
  var ascii_str=''
  for (let index = 0; index < strlenth; index+=7) {
    var substr=input.substr(index, 7)
    // tDiv.innerHTML+=substr+'_'
    var strvalue=parseInt(substr, 2)
    //tDiv.innerHTML+=strvalue+'__'
    var ascii=String.fromCharCode(strvalue)
    ascii_str+=ascii
  }
  tDiv.innerHTML+='ASCII: '+ascii_str
  var canvas = document.createElement('canvas');

  var qr = new QRious({
    element: canvas,
    value: ascii_str
  });
  qr.size = SIZE;

  div.appendChild(canvas);
  outputDiv.appendChild(div);

  }
  
}


$(function(){
  textInput = document.getElementById('textInput');
  genBtn = document.getElementById('genBtn');
  outputDiv = document.getElementById('outputDiv');

  $(genBtn).click(function() {
    console.log('clicked', $(textInput).val());
    generateQR($(textInput).val());
  });
  $(textInput).keyup(function(e){
    if(e.keyCode == 13) {
      generateQR($(textInput).val());
    }
  });

});
