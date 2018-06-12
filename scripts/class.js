class Sound{
    constructor(context){
        this.context = context;
    }
    
    init(){        
        this.pLFO = this.context.createOscillator();
        this.pLFO.type = "square";
        this.pLFO.frequency.value = 2;
        this.pLFOgain = this.context.createGain();
        this.pLFOgain.gain.value = 760;
        
        this.sLFO = this.context.createOscillator();
        this.sLFO.type = "sine";
        this.sLFO.frequency.value = 4;
        this.sLFOgain = this.context.createGain();
        this.sLFOgain.gain.value = 550;
        
        this.filter = this.context.createBiquadFilter();
        this.filter.type = "lowpass";
        this.filter.frequency.value = 600;
        this.filter.Q.value = 0;
        
        this.osc = this.context.createOscillator();
        this.osc.type = "square";
        this.osc.frequency.value = 700;
        
        this.gain = this.context.createGain();
        this.gain.gain.value = 0.2;
        
        this.sLFO.connect(this.sLFOgain).connect(this.filter.frequency);
        this.pLFO.connect(this.pLFOgain).connect(this.osc.frequency);
        this.osc.connect(this.filter).connect(this.gain).connect(this.context.destination);
        
        this.osc.start(0);
        this.sLFO.start(0);
        this.pLFO.start(0);
    }
    
    changeBaseGain(val){
        this.gain.gain.value = this.gain.gain.value + val;
    }
    changeBaseFreq(val){
        this.osc.frequency.value = this.osc.frequency.value + val;
    }
    changeBaseWave(wav){
        this.osc.type = wav;
    }
    changeBaseLFOGain(val){
        this.pLFOgain.gain.value = this.pLFOgain.gain.value + val;
    }
    changePLFOfreq(val){
        this.pLFO.frequency.value = this.pLFO.frequency.value + val;
    }
    changeBaseLFOWave(wav){
        this.pLFO.type = wav;
    }
    changeSLFOfreq(val){
        this.sLFO.frequency.value = this.sLFO.frequency.value + val;
    }
    changeFilterLFOWave(wav){
        this.sLFO.type = wav;
    }
    changeFilterFreq(val){
        this.filter.frequency.value = this.filter.frequency.value + val;
    }
    changeFilterType(wav){
        this.filter.type = wav;
    }
    changeFilterLFOGain(val){
        this.sLFOgain.gain.value = this.sLFOgain.gain.value + val;
    }
    changeFilterQ(val){
        this.filter.Q.value = this.filter.Q.value + val;
    }
    
    showBaseFreq(){
        return this.osc.frequency.value;
    }
    showBaseWave(){
        return this.osc.type;
    }
    showBaseGain(){
        return this.gain.gain.value;
    }
    showBaseLFOFreq(){
        return this.pLFO.frequency.value;
    }
    showBaseLFOWave(){
        return this.pLFO.type;
    }
    showBaseLFOGain(){
        return this.pLFOgain.gain.value;
    }
    showFilterFreq(){
        return this.filter.frequency.value;
    }
    showFilterType(){
        return this.filter.type;
    }
    showFilterLFOFreq(){
        return this.sLFO.frequency.value;
    }
    showFilterLFOWave(){
        return this.sLFO.type;
    }
    showFilterLFOGain(){
        return this.sLFOgain.gain.value;
    }
    showFilterQValue(){
        return this.filter.Q.value;
    }
}