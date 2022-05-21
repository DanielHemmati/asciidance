const fetch = require('node-fetch');

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// map every url to the promise of the fetch
// let requests = urls.map((url) => fetch(url));

// Promise.all waits until all jobs are resolved
// Promise.all(requests).then((responses) =>
//   responses.forEach((response) =>
//     console.log(`${response.url}: ${response.status}`)
//   )
// );

let urls2 = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

// Promise.allSettled(urls2.map(url => fetch(url))).then(res => {
//   res.forEach((res, index) => {
//     console.log(res.value)
//     if(res.status === "fulfilled"){
//       console.log(`${urls2[index]}: ${res.value.status}`);
//     }

//     if (res.status === "rejected") {
//       console.log((`${urls2[index]}: ${res.reason}`));
//     }

//   })
// })

Promise.allSettled([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log);
// Promise.any([
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
// ]).catch(error => {
//   console.log(error.constructor.name); // AggregateError
//   console.log(error.errors[0]); // Error: Ouch!
//   console.log(error.errors[1]); // Error: Error!
// });
