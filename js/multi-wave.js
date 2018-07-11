/*
 * @ Author Aford
 * @ Date: 2017/07/11
 */

function MultiWave(el, opts) {

  this._parseNum = this._parseNum.bind(this);
  this._mergeParam = this._mergeParam.bind(this);
  if (Object.prototype.toString.call(opts) !== '[object Array]') {
    throw new Error('Function Parameter Error!');
  }
  this.opts = opts;
  this.wavesParam = [];
  this.$el = el;
  this._initContainer();
  this._initWavesParam();
  this._drawWaveFrame();
}

MultiWave.prototype = {
  _initContainer: function () {
    var el = this.$el;
    var canvas = this.$canvans = document.createElement('canvas');
    el.appendChild(canvas);

    var width = parseFloat(this._getComputedStyle(el, 'width'));
    var height = parseFloat(this._getComputedStyle(el, 'height'));
    this._width = width;
    this._height = height;

    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext('2d');
  },

  _mergeParam: function (oldParams, newParams) {
    oldParams = oldParams || {};
    var _parseNum = this._parseNum;
    var waveWidth = _parseNum(newParams.waveWidth || oldParams.waveWidth);
    var finalParams = {
      waveCount: Math.ceil(this._width / waveWidth) + 2
    };
    Object.keys(newParams).forEach(function (key) {
      if (key === 'waveHeight' || key === 'startFromTop' || key === 'endFromTop' || key === 'moveYStep') {
        finalParams[key] = _parseNum(newParams[key], 'y');
      } else if (key === 'moveXStep') {
        finalParams[key] = _parseNum(newParams[key]);
      } else if (key === 'offsetX') {
        finalParams[key] = _parseNum(newParams[key], null, waveWidth) * -1;
      } else if (key === 'moveXDirection') {
        finalParams['dir'] = newParams[key] === 'right' ? -1 : 1;
      } else if (key === 'waveWidth') {
        finalParams[key] = waveWidth;
      } else {
        finalParams[key] = newParams[key];
      }
    });
    return Object.assign({}, oldParams, finalParams);
  },

  _initWavesParam: function () {
    var _this = this;

    Array.prototype.forEach.call(this.opts, function (item, i) {
      _this.wavesParam[i] = _this._mergeParam({
        id: item.id || i,
        dir: 1,
        currentMoveX: 0,
        currentMoveY: 0
      }, item);
    });
  },

  _getComputedStyle: function (el, key) {
    var computedStyle = window.getComputedStyle(el);
    return computedStyle[key] || '';
  },

  _parseNum: function (num, coord, relSize) {
    var size = num;
    if (typeof num !== 'number') {
      var dis = this._width;
      if (coord === 'y') {
        dis = this._height;
      }
      if (relSize) {
        dis = relSize;
      }
      size = parseFloat(num) / 100 * dis;
    }
    return size;
  },

  _drawWaveFrame: function () {
    var _this2 = this;

    var tick = function () {
      var wavesParam = _this2.wavesParam;
      _this2.ctx.clearRect(0, 0, _this2._width, _this2._height);
      Array.prototype.forEach.call(wavesParam, function (item, i) {
        var offsetX = item.offsetX,
            currentMoveX = item.currentMoveX,
            waveWidth = item.waveWidth,
            waveHeight = item.waveHeight,
            waveCount = item.waveCount,
            waveColor = item.waveColor,
            startFromTop = item.startFromTop,
            endFromTop = item.endFromTop,
            moveXStep = item.moveXStep,
            currentMoveY = item.currentMoveY,
            moveYStep = item.moveYStep,
            dir = item.dir;

        var curX = offsetX + currentMoveX + (dir - 1) * 2 * waveWidth;
        var curY = startFromTop + currentMoveY;
        _this2._drawWave(curX, curY, waveCount, waveHeight, waveWidth, waveColor);
        if (Math.abs(currentMoveX) < waveWidth * 2) {
          _this2.wavesParam[i].currentMoveX -= moveXStep * dir;
        } else {
          _this2.wavesParam[i].currentMoveX = 0;
        }
        if (Math.abs(startFromTop + currentMoveY - endFromTop) <= moveYStep) {
          _this2.wavesParam[i].currentMoveY = endFromTop - startFromTop;
        } else {
          if (startFromTop > endFromTop || curY > endFromTop) {
            _this2.wavesParam[i].currentMoveY -= moveYStep;
          } else {
            _this2.wavesParam[i].currentMoveY += moveYStep;
          }
        }
      });
      _this2.animateRaf = requestAnimationFrame(tick);
    };
    tick();
  },

  _drawWave: function (offsetX, offsetTop, waveCount, waveHeight, waveWidth, waveColor) {
    var ctx = this.ctx;
    var h = this._height;
    var d = waveWidth;
    var hd = d / 2;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetTop);
    for (var i = 0; i < waveCount; i++) {
      ctx.quadraticCurveTo(offsetX + i * 2 * d + hd, offsetTop - waveHeight, offsetX + (i * 2 + 1) * d, offsetTop);
      ctx.quadraticCurveTo(offsetX + (i * 2 + 1) * d + hd, offsetTop + waveHeight, offsetX + (i * 2 + 2) * d, offsetTop);
    }
    ctx.lineTo(d * 2 * waveCount + offsetX, h);
    ctx.lineTo(offsetX, h);
    ctx.closePath();

    if (Object.prototype.toString.call(waveColor) === '[object Array]') {
      var linearGradient = ctx.createLinearGradient(0, 0, 0, this._height);
      waveColor.forEach(function (item) {
        linearGradient.addColorStop(item.position, item.color);
      });
      ctx.fillStyle = linearGradient;
    } else {
      ctx.fillStyle = waveColor;
    }
    ctx.fill();
  },

  dynamicSetParamsById: function (id, newParams) {
    var _this3 = this;

    this.wavesParam.forEach(function (item, i) {
      if (item.id === id) {
        _this3.wavesParam[i] = _this3._mergeParam(item, newParams);
      }
    });
  },

  dynamicSetParamsAll: function (newParamsArray) {
    var _this4 = this;

    newParamsArray.forEach(function (newItem) {
      _this4.dynamicSetParamsById(newItem.id, newItem);
    });
  },

  destroy: function () {
    window.cancelAnimationFrame(this.animateRaf);
  }
}
