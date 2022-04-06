
/*
saveTrail function is being called from the event listener in results.js. In that function in 
result.js, we are finding the trailID which is then passed to the saveTrail function 
*/

async function saveTrail(trailID, event) {
    event.preventDefault();
    var user_id = 1
    var trail_id = document.querySelector(`.btn-save-${trailID}`).id.trim();
    console.log(user_id)
    console.log(trail_id)
    if (user_id && trail_id) {
      const response = await fetch('/api/user/usertrail', {
        method: 'post',
        body: JSON.stringify({
          user_id,
          trail_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });
      if (response.ok) {
        document.location.replace('/');
      } else {
        console.log(response.status);
        if(response.status === 503) {
          window.alert("Please sign up or log in.");
        }
        else {
          console.log('User has saved this trail already');
        }
      }
    }
}

// The eventListener is dynamically added with the button since that is how we are rendering the cards/results
// document.querySelector('.trail-save-btn').addEventListener('click', saveTrail);
