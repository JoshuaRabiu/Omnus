/**
 * Chunkify
 * Google Chrome Speech Synthesis Chunking Pattern
 * Fixes inconsistencies with speaking long texts in speechUtterance objects 
 * Licensed under the MIT License
 *
 * Peter Woolley and Brett Zamir
 * Modified by Haaris for bug fixes (https://gist.github.com/hsed/ef4a2d17f76983588cb6d2a11d4566d6)
 */
 
export const Chunker = (utt, settings, callback) => {
  settings = settings || {};
  var newUtt;
  var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
  if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
      newUtt = utt;
      newUtt.text = txt;
      newUtt.addEventListener('end', function () {
          if (Chunker.cancel) {
              Chunker.cancel = false;
          }
          if (callback !== undefined) {
              callback();
          }
      });
  }
  else {
      var chunkLength = (settings && settings.chunkLength) || 160;
      var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
      var chunkArr = txt.match(pattRegex);
      if (chunkArr == null || chunkArr[0] === undefined || chunkArr[0].length <= 2) {
          //call once all text has been spoken...
          if (callback !== undefined) {
              callback();
          }
          return;
      }
      var chunk = chunkArr[0];
      newUtt = new SpeechSynthesisUtterance(chunk);
      var x;
      for (x in utt) {
          if (utt.hasOwnProperty(x) && x !== 'text') {
              newUtt[x] = utt[x];
          }
      }
      newUtt.addEventListener('end', function () {
          if (Chunker.cancel) {
              Chunker.cancel = false;
              return;
          }
          settings.offset = settings.offset || 0;
          settings.offset += chunk.length;
          Chunker(utt, settings, callback);
      });
  }
  
  if (settings.modifier) {
      settings.modifier(newUtt);
  }
  console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
  //placing the speak invocation inside a callback fixes ordering and onend issues.
  setTimeout(function () {
      speechSynthesis.speak(newUtt);
  }, 0);
};