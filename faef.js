  // // Handle gifts
    tiktokLiveConnection.on('gift', data => {
        console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
    });

    // Handle user join events
    tiktokLiveConnection.on('user_join', data => {
        console.log(`${data.uniqueId} (userId:${data.userId}) joined the chat`);
    });

    // Handle user leave events
    tiktokLiveConnection.on('user_leave', data => {
        console.log(`${data.uniqueId} (userId:${data.userId}) left the chat`);
    });