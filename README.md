# Omnus
A web app inspired by Apple's Siri Personal assistant, powered by the [Wolfram Alpha Api](http://products.wolframalpha.com/api/).
![Omnus website](https://imgur.com/L5B8vGD.png)

## Table of Contents
- [Built With](https://github.com/JoshuaRabiu/Omnus#built-with)
- [Features](https://github.com/JoshuaRabiu/Omnus#features)
- [Running the application](https://github.com/JoshuaRabiu/Omnus#running-the-application)
 - - [Setup](https://github.com/JoshuaRabiu/Omnus#Setup)
 - - [Running With Docker](https://github.com/JoshuaRabiu/Omnus#with-docker)
 - - [Running Without Docker](https://github.com/JoshuaRabiu/Omnus#without-docker)
- [Running Tests](https://github.com/JoshuaRabiu/Omnus#running-tests)
- [License](https://github.com/JoshuaRabiu/Omnus#license)
- [Additional Attributions](https://github.com/JoshuaRabiu/Omnus#additional-attributions)

## Built with
- [React JS](https://github.com/facebook/react)
- [Express JS](https://github.com/expressjs/express)
- [Docker](https://www.docker.com/)
- [Selenium Webdriver](https://www.seleniumhq.org/) - Integration Tests
- [Mocha](https://mochajs.org/),[Chai](http://www.chaijs.com/) & [SuperTest
](https://github.com/visionmedia/supertest#readme) - Unit Tests

## Features
 - Speech Recognition on Chrome for Desktop/Android (voice queries)
 - Speaks results back to you (but not on iOS)
 - Can answer general knowledge questions, obscure questions and do complex calculations ([capabilities directory](http://www.wolframalpha.com/examples/))

## Running the application

### Setup

To run the application locally, you'll first need a Wolfram Alpha Api key. Get yours [here](https://products.wolframalpha.com/api/).

Once you have an api key, clone this repo:  
```sh
git clone https://github.com/JoshuaRabiu/Omnus.git
```  

cd into the project directory
```sh
cd Omnus
```


And create a `config.js` file in the root directory of the application. Paste your api key inside of the file like so:
```js
module.exports = {apiKey: 'yourApiKey'}
```

Then refer to the following sections:

### Running With Docker


Build the Docker image using the local dockerfile
```sh
docker build -t JoshuaRabiu/omnus .
```

Then, run the following commands, replacing PORT_NUMBER with the port you want the application to run on locally:

```sh
docker run -p $PORT_NUMBER:8000 JoshuaRabiu/omnus
```

For regular Docker users, the app will be running on
```sh
localhost:$PORT_NUMBER
```

For Docker Machine users, it will run on 
```sh
$DOCKER_IP:$PORT_NUMBER
``` 

To find your Docker Macine IP, run this command: 
```sh
docker machine ip
```

### Running Without Docker


Install the dependencies:

```sh
yarn
```

Then start the Express Server:

```sh
yarn start
```

Then, open a new terminal tab/window in the same directory and `cd` to the react subfolder like so:

```sh
cd client
```

Install the dependencies:

```sh
yarn
```

Then start the react app:

```sh
yarn start
```

## Running Tests
Omnus's test suite is composed of Selenium Webdriver, Mocha, Chai and SuperTest and includes both Integration/e2e testing and unit tests.

Tests are run with the following command:

```sh
mocha
```

Which should output the following, given that everything works:

![Omnus Tests](https://i.imgur.com/bpjSPeu.png)

## License

Omnus is licensed under the [MIT](https://github.com/JoshuaRabiu/Omnus/blob/master/LICENSE) license.

## Additional Attributions

- [Wolfram Alpha Api](http://products.wolframalpha.com/api/)
- [Loading Spinner](https://codepen.io/mrrocks/pen/EiplA)
- [Pulse Animation](https://codepen.io/seansean11/pen/dhwzj)
- [SweetAlert](https://sweetalert.js.org/)
- [Speech Synthesis Chunker](https://gist.github.com/hsed/ef4a2d17f76983588cb6d2a11d4566d6)
- Icons: [Mic](https://www.flaticon.com/free-icon/microphone-black-shape_25682#term=mic&page=1&position=1) | [Arrow](https://www.flaticon.com/free-icon/left-arrow_61752#term=back%20arrow&page=1&position=17)



