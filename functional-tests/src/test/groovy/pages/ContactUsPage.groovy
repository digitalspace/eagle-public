package pages

class ContactUsPage extends BaseAppPage {
  static at = { isAngularReady() && pageTitle.text() == 'Connect with us...' }
  static url = '/contact'
  static content = {
    pageTitle { $('.hero-banner h1')}
  }
}
