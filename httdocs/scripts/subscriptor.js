const client = graphqlWs.createClient({
  url: 'ws://localhost:5000/graphql',
});

client.subscribe(
    {
        query: 'subscription { createTask { data { estado } } }',
    },
    {
        next:  (data) =>{
            console.log('funcionandooooo!!!!');
        },
        error: (error)=>{
            console.log(error);
        },
        complete: ()=> {
            console.log('Subscripcion terminada');
        },
    }

)




/*(async () => {
    const onNext = () => {
        console.log('on next')  //???
    };
    let unsubscribe = () => {

    };

    await new Promise((resolve, reject) => {
        unsubscribe = client.subscribe(
            {
                query: 'subscription { createTask }',
            },
            {
                next: onNext,
                error: reject,
                complete: resolve,
            },
        );
    });
    expect(onNext).toBeCalledTimes();
})();*/
