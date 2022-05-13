const client = graphqlWs.createClient({
  url: 'ws://localhost:4000/graphql',
});
(async () => {
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
})();
