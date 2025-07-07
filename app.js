import { time } from "node:console";
import os from "node:os"

const calculateIdleTime = (oldCpu , newCpu) =>{
    const oldTotalTime = Object.values(oldCpu.times).reduce((a,b) => a+b)
    const newTotalTime = Object.values(newCpu.times).reduce((a,b) => a+b)
    const totalTimeDiff = newTotalTime - oldTotalTime
    const idle = newCpu.times.idle - oldCpu.times.idle
    const usedTime = totalTimeDiff - idle;
    return ((usedTime * 100)/totalTimeDiff).toFixed(2);
}

function taskmanager (){
    //snapshot of cpu at 0 second
    let oldCpus = os.cpus();

     setInterval(()=>{
        //snapshot of cpu after 1 second 
         let newCpus = os.cpus();
         let usage = newCpus.map((cpu,i) => {
            return {
                core:i+1,
                usage: calculateIdleTime(oldCpus[i],newCpus[i]) + '%'
            }
         })
         console.clear();
         console.table(usage)
         const usedMem = ((os.totalmem() - os.freemem())/(1024*1024*1024)).toFixed(2)
         console.log(`Memory Used: ${usedMem} / ${(os.totalmem()/(1024*1024*1024)).toFixed(2)} GB`)
         oldCpus = newCpus;
    },1000)
    

}

taskmanager()