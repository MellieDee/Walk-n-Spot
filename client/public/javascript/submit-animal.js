
/* 
When user submits what animal he/she saw for a specific trail, a GET response will start first
that gets the 'value' of the animal and trail. That value will be the trail/animal's id that is 
currently being auto increment. Those values will be placed into the api route so user can get the 
sighting count of that specific animal on the specified trail. 

The sighting count is assigned to a variable and then the count is increased by 1. Then a PUT method 
is started. With the same trail and animal value, the new sighting count is passed to this route
so the sighting count can be updated in the database

If there has been no sighting (null) of this specific animal on the specified trail then 
a POST route will be started which will then pass the indicated trail/animal id and have a sighting 
of 1
*/

function submitAnimal() {
    const trail_submit = document.querySelector("select[name='trailSubmit']").value;
    const animal_submit = document.querySelector("select[name='animalSubmit']").value;
    console.log(trail_submit);
    console.log(animal_submit);

    const response = fetch(`/api/animal/${parseInt(trail_submit)}/${parseInt(animal_submit)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
       })
       .then(response => response.json())
       .then((json) => {
           if (json.id) {
                console.log(json)
                console.log('----------------------------------------Here is the sighting data------------------------------------');
                console.log(json.sighting)
                let oldSighting = json.sighting;
                var newSighting = oldSighting + 1
                var sighting = newSighting
                console.log(sighting)
                const trail_submit = document.querySelector("select[name='trailSubmit']").value;
                const animal_submit = document.querySelector("select[name='animalSubmit']").value;
                console.log(trail_submit)
                console.log(animal_submit)
                // var sighting = await submitAnimal()
                console.log(sighting)
                fetch(`/api/animal/${parseInt(trail_submit)}/${parseInt(animal_submit)}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                    sighting
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                }).then((res) => {
                    document.location.replace('/dashboard');
                    console.log('works')
                })
                .catch((err) => { console.warn(err)});
           } else if (json.id == null) {
                console.log("Doesn't exist")
                const trail_id = document.querySelector("select[name='trailSubmit']").value;
                const animal_id = document.querySelector("select[name='animalSubmit']").value;
                console.log(trail_submit)
                console.log(animal_submit)
                var sighting = 1
                console.log(sighting)
                fetch(`/api/animal/${parseInt(trail_id)}/${parseInt(animal_id)}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        trail_id,
                        animal_id,
                        sighting
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                }).then((res) => {
                    document.location.replace('/dashboard');
                    console.log('works')
                    return 
                })
                .catch((err) => { console.warn(err)});
           }

        })
        .catch((error) => { console.warn(error); })
}

// When button with class ".submitAnimal" in the dashboard.handlebars is clicked
// will trigger submitAnimal function

document.querySelector('.submitAnimal').addEventListener('click', submitAnimal);
