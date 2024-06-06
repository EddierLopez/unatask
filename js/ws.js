const wsAPI='ws://localhost:9000/graphql'
accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhQXN4ZXFzZXJmc2QiLCJlbWFpbCI6ImVkZGllckB1bmEuY3IiLCJuYW1lIjoiRWRkaWVyIiwiaWF0IjoxNzE1ODE5NDY5fQ.ASo1uQWXgNdLubpvbBKbs5loYhQIaHkN2t9TxT_ehhc"

const newTaskSubscription=()=>{
    
    const websocket=new WebSocket(wsAPI,'graphql-transport-ws')
    websocket.onerror=(err)=>{
        console.log(err)
    }
    websocket.onopen=()=>{
        console.log('Conectando a la suscripción')
        const message=JSON.stringify({
            type:'connection_init',
            payload:{
                accessToken
            }
        })
        websocket.send(message)
    }
    websocket.onclose=(e)=>{
        console.log("Conexión con ws cerrada")
    }
    websocket.onmessage=(event)=>{
        const data=JSON.parse(event.data)        
        if(data.type==='connection_ack'){
            const msg=JSON.stringify({
                id:'1',
                type:'subscribe',
                payload:{
                    query:`subscription{
                            newTask {
                                id
                                name
                                deadline
                                created_at
                            }
                      }                    
                    `
                }
            })
            websocket.send(msg)
        }
        else if(data.type==='next'){
            console.log(data.payload.data)
            new Notification("notificación")

        }
    }
}