let url=window.location.href;
let swLoc="unatask/service-worker.js";
if(navigator.serviceWorker){
    if(url.includes('localhost') || url.includes('127.0.0.1')){
        swLoc='/service-worker.js';
    }
    navigator.serviceWorker.register(swLoc)
        .then(reg=>{
            // setTimeout(()=>{
            //     reg.sync.register('post-new-user');
            //     console.log("Se envió la información al servidor");
            // },3000);
        });
}