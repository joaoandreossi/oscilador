var freqSwipe = document.getElementById("freq");
var primLFOfreq = document.getElementById("plfofreq");
var secLFOfreq = document.getElementById("slfofreq");
var filterSwipe = document.getElementById("filter");
var filterQ = document.getElementById("filterq");

var baseFreq = document.getElementById("basefreq");
var baseWave = document.getElementById("basewave");
var baseLFOFreq = document.getElementById("plfofreqvalues");
var baseLFOWave = document.getElementById("plfowave");

var filterFreq = document.getElementById("filterfreq");
var filterWave = document.getElementById("filterwave");
var filterLFOFreq = document.getElementById("filterlfofreq");
var filterLFOWave = document.getElementById("filterlfowave");
var filterQValue = document.getElementById("filterqvalue");

var baseGain = document.getElementById("basegain");
var baseGainValue = document.getElementById("basegainvalue");
var baseLFOGain = document.getElementById("baselfogain");
var baseLFOGainValue = document.getElementById("baselfogainvalue");
var filterLFOGain = document.getElementById("filterlfogain");
var filterLFOGainValue = document.getElementById("filterlfogainvalue");

var waveType = ["square", "sine", "triangle", "sawtooth"];
var filterType = ["bandpass", "lowpass", "highpass", "notch", "allpass"];
var baseCount = 1;
var baseLFOcount = 1;
var filterLFOcount = 2;
var filterCount = 2;

var timeout;
var tap = 1;
var counter = 0;
var direcao;
var prevPos;

var touchEnd;

var ctx = new (window.AudioContext || window.webkitAudioContext)();
var sound = new Sound(ctx);

sound.init();

function touchHandler(touchPos){
    if(counter == 0){
        prevPos = touchEnd;
        counter++;
    } else if(counter > 1){
        counter = 0;
    } else{
        counter++;
    }
    if(touchEnd < prevPos){
        direcao = "esquerda";
        console.log(direcao);
    }
    if(touchEnd > prevPos){
        direcao = "direita";
        console.log(direcao);
    }
}

function showValues(){
    baseFreq.innerHTML = sound.showBaseFreq() + "Hz";
    baseWave.innerHTML = sound.showBaseWave();
    baseLFOFreq.innerHTML = sound.showBaseLFOFreq() + "Hz";
    baseLFOWave.innerHTML = sound.showBaseLFOWave();
    
    filterFreq.innerHTML = sound.showFilterFreq() + "Hz";
    filterWave.innerHTML = sound.showFilterType();
    filterLFOFreq.innerHTML = sound.showFilterLFOFreq() + "Hz";
    filterLFOWave.innerHTML = sound.showFilterLFOWave();
    filterQValue.innerHTML = sound.showFilterQValue();
    
    baseGainValue.innerHTML = sound.showBaseGain();
    baseLFOGainValue.innerHTML = sound.showBaseLFOGain();
    filterLFOGainValue.innerHTML = sound.showFilterLFOGain();
}

function animateIn(obj){
    var percentage = 0;
    var interval = setInterval(() => {
        percentage = percentage + 10;
        obj.style.transform = "translateX(" + percentage + "%)";
        if(percentage == 100){
            clearInterval(interval);
        }
    }, 10);
}

function animateOut(obj){
    var percentage = 100;
    var interval = setInterval(() => {
        percentage = percentage - 10;
        obj.style.transform = "translateX(" + percentage + "%)";
        if(percentage == 0){
            clearInterval(interval);
        }
    }, 10);
}

freqSwipe.addEventListener('touchstart', (e) => {
    tap = 1;
    timeout = setTimeout(() => {
        if(tap){
            animateIn(baseGain);
            tap = 0;
        };
    }, 750);
});
freqSwipe.addEventListener('touchmove', (e) => {
    tap = 0;
    touchEnd = e.touches[0].clientX;
    touchHandler(touchEnd);
    if(direcao == "direita"){
        sound.changeBaseFreq(10);
    } else {
        sound.changeBaseFreq(-10);
    }
    showValues();
});
freqSwipe.addEventListener('touchend', (e) => {
    if(tap){
        sound.changeBaseWave(waveType[baseCount]);
        baseCount++;
        if(baseCount == waveType.length) baseCount = 0;
        clearTimeout(timeout);
    } else {
        tap = 1;
    }
    showValues();
});

primLFOfreq.addEventListener('touchstart', (e) => {
    tap = 1;
    timeout = setTimeout(() => {
        if(tap){
            animateIn(baseLFOGain);
            tap = 0;
        };
    }, 750);
});
primLFOfreq.addEventListener('touchmove', (e) => {
    tap = 0;
    touchEnd = e.touches[0].clientX;
    touchHandler(touchEnd);
    if(direcao == "direita"){
        sound.changePLFOfreq(0.5);
    } else {
        sound.changePLFOfreq(-0.5);
    }
    showValues();
});
primLFOfreq.addEventListener('touchend', (e) => {
    if(tap){
        sound.changeBaseLFOWave(waveType[baseLFOcount]);
        baseLFOcount++;
        if(baseLFOcount == waveType.length) baseLFOcount = 0;
        clearTimeout(timeout);
    } else {
        tap = 1;
    }
    showValues();
});

secLFOfreq.addEventListener('touchstart', (e) => {
    tap = 1;
    timeout = setTimeout(() => {
        if(tap){
            animateIn(filterLFOGain);
            tap = 0;
        };
    }, 750);
});
secLFOfreq.addEventListener('touchmove', (e) => {
    tap = 0;
    touchEnd = e.touches[0].clientX;
    touchHandler(touchEnd);
    if(direcao == "direita"){
        sound.changeSLFOfreq(0.5);
    } else {
        sound.changeSLFOfreq(-0.5);
    }
    showValues();
});
secLFOfreq.addEventListener('touchend', (e) => {
    if(tap){
        sound.changeFilterLFOWave(waveType[filterLFOcount]);
        filterLFOcount++;
        if(filterLFOcount == waveType.length) filterLFOcount = 0;
        clearTimeout(timeout);
    } else {
        tap = 1;
    }
    showValues();
});

filterSwipe.addEventListener('touchmove', (e) => {
    tap = 0;
    touchEnd = e.touches[0].clientX;
    touchHandler(touchEnd);
    if(direcao == "direita"){
        sound.changeFilterFreq(10);
    } else {
        sound.changeFilterFreq(-10);
    }
    showValues();
});
filterSwipe.addEventListener('touchend', (e) => {
    if(tap){
        sound.changeFilterType(filterType[filterCount]);
        filterCount++;
        if(filterCount == filterType.length) filterCount = 0;
    } else {
        tap = 1;
    }
    showValues();
});

filterQ.addEventListener('touchmove', (e) => {
    tap = 0;
    touchEnd = e.touches[0].clientX;
    touchHandler(touchEnd);
    if(direcao == "direita"){
        sound.changeFilterQ(0.5);
    } else {
        sound.changeFilterQ(-0.5);
    }
    showValues();
});

baseGain.addEventListener('touchmove', (e) => {
    tap = 0;
    touchEnd = e.touches[0].clientX;
    touchHandler(touchEnd);
    if(direcao == "direita"){
        sound.changeBaseGain(0.001);
    } else if(sound.showBaseGain() > 0){
        sound.changeBaseGain(-0.001);
    }
    showValues();
});
baseGain.addEventListener('touchend', (e) => {
    if(tap){
        animateOut(baseGain);
    } else {
        tap = 1;
    }
    showValues();
});

baseLFOGain.addEventListener('touchmove', (e) => {
    tap = 0;
    touchEnd = e.touches[0].clientX;
    touchHandler(touchEnd);
    if(direcao == "direita"){
        sound.changeBaseLFOGain(10);
    } else if(sound.showBaseLFOGain() > 0){
        sound.changeBaseLFOGain(-10);
    }
    showValues();
});
baseLFOGain.addEventListener('touchend', (e) => {
    if(tap){
        animateOut(baseLFOGain);
    } else {
        tap = 1;
    }
    showValues();
});

filterLFOGain.addEventListener('touchmove', (e) => {
    tap = 0;
    touchEnd = e.touches[0].clientX;
    touchHandler(touchEnd);
    if(direcao == "direita"){
        sound.changeFilterLFOGain(10);
    } else if(sound.showFilterLFOGain() > 0){
        sound.changeFilterLFOGain(-10);
    }
    showValues();
});
filterLFOGain.addEventListener('touchend', (e) => {
    if(tap){
        animateOut(filterLFOGain);
    } else {
        tap = 1;
    }
    showValues();
});

showValues();