package pages.traits

/**
 * Generic re-usable utility methods.
 */
trait Utils {
  /**
   * Wait for the document to finish loading
   * @return true if document has finished loading, false otherwise.
   */
  boolean isAngularReady() {
        js.exec('window.MYAPP.waitForAngular();');
        waitFor {
            js.MYAPP.APP_READY == true
        }

    }
}
