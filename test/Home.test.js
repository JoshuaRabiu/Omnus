const { expect } = require('chai');
const { By, Builder, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

const driver = new Builder().forBrowser('chrome').build();

describe('The homepage', function() {
  
  this.timeout(100000)
  beforeEach(function(done) {
    driver.get('http://localhost:3000/')
    driver.executeScript(`script: window.localStorage.setItem('alerted', 'yes')`)
    done()
    .catch(err => {
      done(err)
      driver.quit()
    })
  })

  it('Directs to the about page when the about link is clicked', function(done){
    driver.findElement(By.className('swal-button')).click()
    driver.findElement(By.className('heading about')).click()
    .then(() => {return driver.wait(until.elementLocated(By.className('center about-text'))).getText()})
    .then((text) => {
      //There are 576 characters that make up the description paragraph on the about page
      expect(text.length).to.equal(576)
      done()
    })
    .catch(err => done(err))
  })

  it('Mic icon animates when clicked', function(done){
    // driver.findElement(By.className('swal-button')).click()
    const mic = driver.findElement(By.className('mic-icon'))
    mic.click()
    mic.getAttribute('className')
    .then((className) => {
      expect(className).to.equal('mic-icon active-mic')
      done()
    })
    .catch(err => done(err))
  })

  it('Can send data to the server, then recieve a response from the server and render it', function(done) {
    // driver.findElement(By.className('swal-button')).click()
    const input = driver.findElement(By.className('input-field'))
    input.click()
    .then(() => input.sendKeys('Hello'))
    .then(() => input.sendKeys(Key.ENTER))
    .then(() => {return driver.wait(until.elementLocated(By.className('center results-view'))).getText()})
    .then((text) => {
      expect(text.slice(23, 35)).to.equal('Hello, human')
      done()
    })
  .catch(err => done(err))
  })

  it('Back arrow on the results view brings the user back to the default view', function(done){
    // driver.findElement(By.className('swal-button')).click()
    var input = driver.findElement(By.className('input-field'))
    input.click()
    .then(() => input.sendKeys('Hello'))
    .then(() => input.sendKeys(Key.ENTER))
    .then(() => {return driver.wait(until.elementLocated(By.className('center results-view')))})
    .then(() => driver.findElement(By.className('arrow')).click())
    .then(() => {return driver.wait(until.elementLocated(By.className('input-field'))).getTagName()})
    .then((tagName) => {
      //Checks that the input was rendered, meaning the default view has also been rendered
      expect(tagName).to.equal('input')
      done()
    })
    .catch((err) => {
      done(err)
    })
  })

  after(function(done){
    driver.quit()
    done()
    .catch(err => {
      done(err)
      driver.quit()
    })
  })
});
