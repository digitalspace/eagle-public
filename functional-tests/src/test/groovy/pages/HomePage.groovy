package pages

import geb.waiting.WaitTimeoutException

/**
 * The initial landing page the user is redirected to after logging in.
 */
class HomePage extends BaseAppPage {
  static at = { isAngularReady() && pageTitle.text() == 'Environmental Assessments' }
  static url = '/'
  static content = {
    // todo update selectors
    pageTitle { $('#main .hero-banner h1') }
  }
}
