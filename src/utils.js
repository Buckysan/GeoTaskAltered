/**
* Utility Functions
* Author: Raj Aiyer
*/

function genRandInt(min, max) {
  return Math.floor(min + Math.random()*(max + 1 - min));
}

/* returns the longform string version of the date */
function longformDate() {
  var currentDate = new Date();
  return currentDate.toTimeString();
}

/* calculate average for an array */
function mean(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++) {
    total += array[i];
  }
  var avg = total / array.length;
  return avg;
}

/* calculates minutes and seconds from milliseconds */
function msToMinSec(ms) {
  var min = ms / 1000 / 60;
  var r = min % 1;
  var sec = Math.floor(r * 60);
  if (sec < 10) {
    sec = '0'+sec;
  }
  min = Math.floor(min);
  return (min + ':' + sec);
}


/* jQuery-powered -- creates a confidence slider - hover & scroll versions */
function noDragSlider(name, parent, tooltipLabels, endLabels, buttonLabels) {
  var noDragSlider = createGeneral(
    noDragSlider,
    parent,
    'div',
    'noDragSlider ' + name,
    'noDragSlider ' + name,
    ''
  );
  var tooltipTop = createGeneral(
    tooltipTop,
    noDragSlider,
    'div',
    'noDragSlider tooltip-row tooltip-top ' + name,
    'tooltip-row-top',
    ''
  );
  var tooltipText1 = createGeneral(
    tooltipText1,
    tooltipTop,
    'div',
    'tooltip tooltip-top tooltip-left tooltip-1 ' + name,
    'tooltip-1',
    tooltipLabels[0]
  );
  var tooltipText2 = createGeneral(
    tooltipText2,
    tooltipTop,
    'div',
    'tooltip tooltip-top tooltip-left tooltip-2 ' + name,
    'tooltip-2',
    tooltipLabels[1]
  );
  var tooltipText3 = createGeneral(
    tooltipText3,
    tooltipTop,
    'div',
    'tooltip tooltip-top tooltip-right tooltip-3 ' + name,
    'tooltip-3',
    tooltipLabels[2]
  );
  var tooltipText4 = createGeneral(
    tooltipText4,
    tooltipTop,
    'div',
    'tooltip tooltip-top tooltip-right tooltip-4 ' + name,
    'tooltip-4',
    tooltipLabels[3]
  );
  var tooltipArrowTop = createGeneral(
    tooltipArrowTop,
    noDragSlider,
    'div',
    'tooltip-arrowArea arrow-top ' + name,
    'tooltip-arrow-top',
    ''
  );
  var tooltipArrowTop1 = createGeneral(
    tooltipArrowTop1,
    tooltipArrowTop,
    'div',
    'arrow arrow-down arrow-left arrow-1 ' + name,
    'arrow-1',
    ''
  );
  var tooltipArrowTop2 = createGeneral(
    tooltipArrowTop2,
    tooltipArrowTop,
    'div',
    'arrow arrow-down arrow-left arrow-2 ' + name,
    'arrow-2',
    ''
  );
  var tooltipArrowTop3 = createGeneral(
    tooltipArrowTop3,
    tooltipArrowTop,
    'div',
    'arrow arrow-down arrow-right arrow-3 ' + name,
    'arrow-3',
    ''
  );
  var tooltipArrowTop4 = createGeneral(
    tooltipArrowTop4,
    tooltipArrowTop,
    'div',
    'arrow arrow-down arrow-right arrow-4 ' + name,
    'arrow-4',
    ''
  );
  var scaleRow = createGeneral(
    scaleRow,
    noDragSlider,
    'div',
    'scale-row ' + name,
    'scale-row',
    ''
  );
  var labelLeft = createGeneral(
    labelLeft,
    scaleRow,
    'div',
    'overlay-label ' + name,
    'overlay-label-left',
    endLabels[0]
  );
  var scale = createGeneral(
    scale,
    scaleRow,
    'div',
    'scale ' + name,
    'scale',
    ''
  );
  var labelRight = createGeneral(
    labelRight,
    scaleRow,
    'div',
    'overlay-label ' + name,
    'overlay-label-right',
    endLabels[1]
  );
  var scaleLeft = createGeneral(
    scaleLeft,
    scale,
    'div',
    'scale-content scale-left ' + name,
    'scale-left',
    ''
  );
  var scaleRight = createGeneral(
    scaleRight,
    scale,
    'div',
    'scale-content scale-right ' + name,
    'scale-right',
    ''
  );
  var scaleLeftFill = createGeneral(
    scaleLeftFill,
    scaleLeft,
    'div',
    'scale-content scale-left scale-fill ' + name,
    'scale-left-fill',
    ''
  );
  var scaleRightFill = createGeneral(
    scaleRightFill,
    scaleRight,
    'div',
    'scale-content scale-right scale-fill ' + name,
    'scale-right-fill',
    ''
  );
  var tooltipBottom = createGeneral(
    tooltipBottom,
    noDragSlider,
    'div',
    'tooltip-row tooltip-bottom ' + name,
    'tooltip-row-bottom',
    ''
  );
  if (buttonLabels.escape != undefined) {
    var escapeButton = createGeneral(
      escapeButton,
      tooltipBottom,
      'div',
      'scale-button escape-button invisible ' + name,
      'escape-button',
      buttonLabels.escape
    );
  }

  if (buttonLabels.moreInfo != undefined) {
    var moreInfoButton = createGeneral(
      moreInfoButton,
      tooltipBottom,
      'div',
      'scale-button more-button invisible ' + name,
      'more-button',
      buttonLabels.moreInfo
    );
  }
  if (buttonLabels.submit != undefined) {
    var submitButton = createGeneral(
      submitButton,
      tooltipBottom,
      'div',
      'scale-button submit-button invisible ' + name,
      'submit-button',
      buttonLabels.submit
    );
  }

  var rightConfidenceValue = createGeneral(
    rightConfidenceValue,
    scaleRightFill,
    'div',
    'scale-value ' + name,
    'confidence-value-right',
    ''
  );
  var leftConfidenceValue = createGeneral(
    leftConfidenceValue,
    scaleLeftFill,
    'div',
    'scale-value ' + name,
    'confidence-value-left',
    ''
  );
}

/**
 * Round x to a specified number of decimal places
 * @param x {number} - number to round
 * @param {number} [decimals=0] - number of decimal places to which to round x
 * @param {boolean} [asPaddedString=false] - whether to return a string with zeros added to fill out truncated values
 * @return {number|string} - x rounded to *decimals* decimal places
 */
function round (x, decimals = 0, asPaddedString=false) {
    let y = Math.pow(10, decimals);
    let ans = Math.round(x * y) / y;
    if(!asPaddedString || decimals <= 0)
        return ans;
    ans = ans.toString();
    let d = 0;
    if(ans.indexOf('.')===-1) {
        d = decimals;
        ans = ans + '.';
    }
    else
        d = decimals - ans.split('.')[1].length;
    for(let i=0;i<d;i++)
        ans = ans + '0';
    return ans;
}

/* Shuffle an array */
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/**
 * The standard deviation of numbers in a list
 * @param {[]} list
 * @param {boolean} [population=true] whether to return the population as opposed to the sample standard deviation
 * @return {number}
 */
function stDev(list, population = true) {
    let m = mean(list);
    let errors = 0;
    list.forEach((x)=>errors += Math.pow(parseFloat(x) - m, 2));

    let variance = errors / (population? list.length : list.length - 1);

    return Math.sqrt(variance);
}


// export {genRandInt, longformDate, mean, msToMinSec, noDragSlider, round, shuffle, stDev}

