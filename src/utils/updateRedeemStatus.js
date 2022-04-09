export const status = {
    canceled: "CANCELED",
    fulfilled: "FULFILLED"
}

export const updateRedeemStatus = (user_id, reward_id, redeem_id, status) => {
    fetch(`https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=${user_id}&reward_id=${reward_id}&id=${redeem_id}}`, {
        method: 'PATCH',
        body: JSON.stringify({ "status": status }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then(json => console.log(json));
}