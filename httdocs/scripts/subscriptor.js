const client = graphqlWs.createClient({
  url: 'ws://localhost:5000/graphql',
});

(async ()=> 
    client.subscribe(
        {
            query: 'subscription { createTask { data } }',
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
)();

