"use strict";
/* BGMなし。短い操作音・紙音・機械音・警告音のみをWeb Audio APIで生成します。 */
window.KMAAudio=(()=>{
 let ctx=null;
 function audio(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw new Error("Audio unavailable");ctx=ctx||new AC();if(ctx.state==="suspended")ctx.resume();return ctx;}
 function tone(freq,start,duration,type="sine",volume=.06,endFreq=null){
  const c=audio(),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,start);if(endFreq)o.frequency.exponentialRampToValueAtTime(Math.max(1,endFreq),start+duration);g.gain.setValueAtTime(.0001,start);g.gain.linearRampToValueAtTime(volume,start+.012);g.gain.exponentialRampToValueAtTime(.0001,start+duration);o.connect(g);g.connect(c.destination);o.start(start);o.stop(start+duration+.02);
 }
 function noise(duration,volume=.04,filterType="bandpass",frequency=900){const c=audio(),n=Math.floor(c.sampleRate*duration),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=b;f.type=filterType;f.frequency.value=frequency;g.gain.setValueAtTime(volume,c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+duration);s.connect(f);f.connect(g);g.connect(c.destination);s.start();s.stop(c.currentTime+duration);}
 function play(kind){try{const c=audio(),t=c.currentTime;switch(kind){
  case "start":tone(420,t,.12,"sine",.045,310);tone(620,t+.11,.2,"sine",.035,480);break;
  case "select":tone(1150,t,.045,"triangle",.025,850);break;
  case "page":noise(.16,.035,"bandpass",1200);tone(145,t,.1,"sine",.025,78);break;
  case "back":noise(.14,.025,"bandpass",700);tone(190,t,.12,"sine",.025,120);break;
  case "scan":tone(180,t,.55,"sawtooth",.035,520);noise(.48,.018,"highpass",1600);break;
  case "stamp":tone(95,t,.18,"triangle",.11,48);noise(.11,.055,"lowpass",500);break;
  case "warning":[0,.25,.5,.75].forEach((v,i)=>tone(i%2?690:480,t+v,.18,"square",.045));break;
  case "soft-alert":tone(780,t,.18,"sine",.04,620);tone(520,t+.22,.2,"sine",.035,420);break;
  case "lord":tone(42,t,.85,"sine",.14,28);tone(84,t+.12,.65,"triangle",.055,39);noise(.32,.035,"lowpass",190);break;
  case "slave":tone(160,t,.42,"sine",.055,62);noise(.22,.025,"bandpass",280);break;
  case "civil":tone(280,t,.18,"triangle",.04,210);tone(190,t+.16,.22,"sine",.03,130);break;
  case "dominant":tone(440,t,.22,"sine",.04,360);tone(660,t+.2,.3,"sine",.035,520);break;
  case "confirm":[660,880,1175].forEach((f,i)=>tone(f,t+i*.07,.48-i*.07,"sine",.045,f*.72));break;
 }}catch(e){/* 音声非対応環境では無音で続行 */}}
 function result({flags=[],rank=""}){if(rank==="ロード")play("lord");else if(rank==="スレイブ")play("slave");else if(rank==="シビル")play("civil");else if(rank==="ドミナント")play("dominant");else play("confirm");if(flags.some(x=>x.key==="danger"))setTimeout(()=>play("warning"),420);else if(flags.length)setTimeout(()=>play("soft-alert"),360);}
 return {play,result};
})();
