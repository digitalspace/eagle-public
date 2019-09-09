package specs

import pages.HomePage

import spock.lang.Title
import spock.lang.Stepwise
import spock.lang.Narrative

@Stepwise
@Title('Test home page loads')
@Narrative('''as dev I want to see this run in browserstack''')
class HomePageSepc extends BaseSpec {

  void 'Open the EPIC main page'() {
    given: 'I browse to the main page'
      // go to homepage
      to HomePage
    then: 'I am at the home page'
      at HomePage
  }
}
