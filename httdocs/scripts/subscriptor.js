const client = graphqlWs.createClient({
  url: 'ws://localhost:5000/graphql',
});

client.subscribe(
    {
        query: 'subscription { createTask { titulo } }',
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
