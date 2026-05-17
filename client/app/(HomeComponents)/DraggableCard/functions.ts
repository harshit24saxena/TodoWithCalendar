export function completeEventApiCall(user: any, item: any){
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/completeEvent/?user=${user}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id: item.id,
    }),
})
    .then(res => res.json())
        .then(data => {return data})
}

export function deleteEventApiCall(user: any, item: any){
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteEvent/?user=${user}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: item.id,
        }),
    }).then(res => res.json()).then(data => {return data})
}