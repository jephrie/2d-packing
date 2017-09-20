var app = angular.module('binPacker', ['ngMaterial','ngMessages']);

app.controller('binCtrl', function($scope) {
    var ctrl = this;

    ctrl.initialised = false;
    ctrl.adding = false;
    ctrl.canvasDiv = null;
    ctrl.boxCanvas = null;
    ctrl.bins = [];
    ctrl.binIndex = -1;

    $scope.config = {
        height: 600,
        width: 600
    };

    ctrl.defaultBox = {
        height: 50,
        width: 50
    };

    $scope.box = {
        height: ctrl.defaultBox.height,
        width: ctrl.defaultBox.width
    };

    $scope.isInit = function() {
        return ctrl.initialised;
    };

    $scope.isAdding = function() {
        return ctrl.adding;
    }

    $scope.toggleAdd = function() {
        ctrl.adding = !ctrl.adding;
    }

    $scope.hasBinBefore = function() {
        return ctrl.binIndex - 1 > 0;
    }

    $scope.hasBinAfter = function() {
        return ctrl.binIndex + 1 > 0 && ctrl.binIndex + 1 < ctrl.bins.length;
    }

    $scope.initialise = function() {
        var carousel = document.getElementById('carousel');
        carousel.style.height = $scope.config.height + 'px';

        ctrl.canvasDiv = document.getElementById('binCanvas');
        var bin = ctrl.makeBin($scope.config.width, $scope.config.height);
        ctrl.bins.push(bin);
        ctrl.showBin(ctrl.canvasDiv, bin);
        ctrl.binIndex = 0;

        var boxCanvas = document.getElementById('boxCanvas');
        ctrl.boxCanvas = boxCanvas;
        $scope.drawPreviewBox();

        ctrl.initialised = true;
    };

    ctrl.makeBin = function(w, h) {
        var canvas = ctrl.makeBinCanvas(w, h);
        var canvasCtx = canvas.getContext('2d');
        return {
            canvas: canvas,
            canvasCtx: canvasCtx
        };
    }

    ctrl.makeBinCanvas = function(w, h) {
        var canvas = document.createElement('canvas');
        canvas.innerHTML = 'Your browser does not support the canvas element.';
        canvas.className = 'binCanvas';
        canvas.width = w;
        canvas.height = h;
        return canvas;
    }

    ctrl.showBin = function(canvasParent, bin) {
        while (canvasParent.hasChildNodes()) {
            canvasParent.removeChild(canvasParent.lastChild);
        }
        canvasParent.appendChild(bin.canvas);
    }

    $scope.drawPreviewBox = function() {
        ctrl.boxCanvas.width = $scope.box.width;
        ctrl.boxCanvas.height = $scope.box.height;
    }

    $scope.packBox = function() {
        ctrl.drawBox(ctrl.bins[ctrl.binIndex].canvasCtx, 0, 0, $scope.box.width, $scope.box.height);
    }

    ctrl.drawBox = function(ctx, x, y, w, h) {
        ctx.strokeStyle = '#2f4f4f';
        ctx.rect(x, y, w ,h);
        ctx.stroke();
        $scope.box.height = ctrl.defaultBox.height;
        $scope.box.width = ctrl.defaultBox.width;
        $scope.toggleAdd();
    }
});
