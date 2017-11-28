export function getRestaurant (data) {
 fetch('https://easy-as-pie-api.herokuapp.com/api/v1/places/ChIJuT9kTBKjpBIRNSy1Grt_ge4', {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json'
   }
 })
 .then(data => data.json())
 .then(data => {
   this.setState({restaurantInfo: data});
 })
}
