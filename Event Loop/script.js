// Everything runs synchronously (line by line).
// callStack();
// SynchronousCode();
// webApi();
// AsynchronousCodeSetTimeout();
// AsynchronousCodeFetch();
// AsynchronousCodePromise();
// explainPromise();
// MicrotaskQueue();
// challenge1();
// challenge2();
// challenge3();
// challenge4();
// challenge5();
// challenge6();

function SynchronousCode() {
  console.log("A"); 
  console.log("B"); 
  console.log("C"); 
}

function callStack() {
  function greet() {
    console.log("World");
  }

  function start() {
    greet();
    console.log("Hello");
  }

  start();
}

function webApi() {
  console.log("Start");

  // passed to Web API => timer runs in the background.
  setTimeout(() => {
    console.log("Timeout!");
  }, 2000);

  console.log("End");
}

function AsynchronousCodeSetTimeout() {
  console.log("A");

  setTimeout(() => {
    console.log("B");
  }, 0);

  console.log("C");
}

function AsynchronousCodeFetch() {
  const username = "hamzalafsioui";

  console.log("Start");

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(`${username} has ${data.public_repos} public repositories.`);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  console.log("End");
}

// I promise to give you the result later,either success or failure.
// Promise has 3 states: pending - fulfilled - rejected
function AsynchronousCodePromise() {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B"); 
  });

  console.log("C");
}

function explainPromise() {
  // create promise manual 
  const myPromise = new Promise((resolve, reject) => {
    console.log("Promise starts");
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("data loaded sucessfully -)");
      } else {
        reject("something wrong (-");
      }
    }, 2000);
  });
  myPromise
    .then((result) => console.log(result))
    .catch((result) =>
      console.log(result).finally(() => console.log("promise finished"))
    );


    // Why we use Promises
    // Before Promises => developers used callbacks (callback hell)
    // fetch() uses Promises under the hood. => Every time you use fetch(), you’re already using Promises => you just don’t create them manually.
}

function MicrotaskQueue() {
  console.log("Start"); // runs

  setTimeout(() => console.log("Timeout"), 0); //  goes to Web API (callback queue)

  Promise.resolve().then(() => console.log("Promise")); // goes to microtask queue

  console.log("End"); // runs
}


function challenge1() {
  console.log("Start");

  setTimeout(() => console.log("setTimeout #1"), 0);

  Promise.resolve().then(() => console.log("Promise #1"));

  setTimeout(() => console.log("setTimeout #2"), 0);

  Promise.resolve().then(() => console.log("Promise #2"));

  console.log("End");
}

function challenge2() {
  console.log("Start");

  fetch("https://api.github.com/users/hamzalafsioui")
    .then(() => console.log("Fetch then #1"))
    .then(() => console.log("Fetch then #2"));

  setTimeout(() => console.log("Timeout!"), 0);

  Promise.resolve().then(() => console.log("Promise resolved"));

  console.log("End");
}

function challenge3() {
  console.log("Start");

  const myPromise = new Promise((resolve) => {
    console.log("Promise starts");
    setTimeout(() => {
      console.log("Inside timeout");
      resolve("Promise resolved!");
    }, 1000);
  });

  myPromise.then((msg) => console.log(msg));

  console.log("End");
}

function challenge4() {
  console.log("A");

  setTimeout(() => console.log("B"), 0);

  Promise.resolve().then(() => {
    console.log("C");

    setTimeout(() => console.log("D"), 0);

    Promise.resolve().then(() => console.log("E"));
  });

  console.log("F");
}

function challenge5() {
  console.log("Start");

  setTimeout(() => console.log("setTimeout"), 0);

  Promise.resolve().then(() => console.log("Promise"));

  fetch("https://api.github.com/users/hamzalafsioui")
    .then(() => console.log("Fetch"))
    .then(() => console.log("Fetch Done"));

  console.log("End");
}

async function challenge6() {
  console.log("Start");

  try {
    // Kick off fetch but don't await yet
    const userPromise = fetch("https://api.github.com/users/hamzalafsioui");
    console.log("Fetch started...");

    setTimeout(() => console.log("Timeout finished!"), 0);

    // Wait for fetch response
    const response = await userPromise; // while the async function is paused => Node looks at other tasks that are ready, like My setTimeout.
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    console.log("Response received!");

    // Convert to JSON
    const data = await response.json();
    console.log(`User: ${data.login}`);

  } catch (error) {
    console.error("Fetch failed:", error.message);
  }

  console.log("End");
}






// Key Idea
// The code doesn’t actually wait, it just appears to.
// Async functions (fetch, setTimeout, Promise) are handled outside the main thread.
// Their results are queued and executed later, when the main thread is free.
// Promise.resolve() => microtask (runs before other async tasks)
